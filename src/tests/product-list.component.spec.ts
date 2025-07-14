import { ComponentFixture, TestBed } from "@angular/core/testing";
import { map, of, throwError } from "rxjs";

import { ProductListComponent } from "../app/product-list/product-list.component";
import { ProductService } from "../app/services/product.service";
import { Product } from "src/app/models/Product";
import { ProductDetailsComponent } from "src/app/product-details/product-details.component";
import { ProductFormComponent } from "src/app/product-form/product-form.component";

describe("ProductListComponent", () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    productService = jasmine.createSpyObj("ProductService", [
      "getProducts",
      "addProduct",
    ]);

    TestBed.configureTestingModule({
      declarations: [
        ProductListComponent,
        ProductFormComponent,
        ProductDetailsComponent,
      ],
      providers: [{ provide: ProductService, useValue: productService }],
    });

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should fetch products on ngOnInit", () => {
    const mockProducts: Product[] = [
      {
        "id": 1,
        "productName": "Smartphone",
        "quantity": 500,
        "productionDate": "2023-09-01",
        "status": "In Assembly",
        "destination": "Retailer A"
      },
      {
        "id": 2,
        "productName": "Laptop",
        "quantity": 300,
        "productionDate": "2023-08-25",
        "status": "Shipped",
        "destination": "Retailer B"
      }
    ];

    productService.getProducts.and.returnValue(of(mockProducts));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.products$).toBeTruthy();
    component.products$.subscribe((products: Product[]) => {
      expect(products).toEqual(mockProducts);
    });
  });

  it("should handle errors when fetching products on ngOnInit", () => {
    productService.getProducts.and.returnValue(throwError("Error"));

    fixture.detectChanges(); // Trigger ngOnInit

    expect(component.products$).toBeTruthy();
    component.products$.subscribe({
      error: (error: any) => {
        expect(error).toEqual("Error");
      },
    });
  });

  it("should add a product", () => {
    const newProduct: Product =   {
      "id": 1,
      "productName": "Smartphone",
      "quantity": 500,
      "productionDate": "2023-09-01",
      "status": "In Assembly",
      "destination": "Retailer A"
    }

    productService.addProduct.and.returnValue(of({}));

    component.addProduct(newProduct);

    expect(productService.addProduct).toHaveBeenCalledWith(newProduct);
  });

  it("should search products", () => {
    const mockProducts: Product[] = [
      {
        "id": 1,
        "productName": "Smartphone",
        "quantity": 500,
        "productionDate": "2023-09-01",
        "status": "In Assembly",
        "destination": "Retailer A"
      },
      {
        "id": 2,
        "productName": "Laptop",
        "quantity": 300,
        "productionDate": "2023-08-25",
        "status": "Shipped",
        "destination": "Retailer B"
      }
    ];

    productService.getProducts.and.returnValue(of(mockProducts));
    component.ngOnInit();

    component.searchProducts({ target: { value: "Smartphone" } });

    component.filterdProducts$.subscribe((filteredProducts) => {
      expect(filteredProducts.length).toBe(1);
      expect(filteredProducts[0].status).toBe("In Assembly");
    });
  });
});
