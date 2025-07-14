import { TestBed, inject } from "@angular/core/testing";
import {
  HttpClientTestingModule,
  HttpTestingController,
} from "@angular/common/http/testing";

import { ProductService } from "../app/services/product.service";
import { Product } from "../app/models/Product";
import { environment } from "src/environments/environment";

describe("ProductService", () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify that there are no outstanding HTTP requests.
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should retrieve shipments from the API via GET", () => {
    const mockProducts: Product[] = [
      {
        id: 1,
        productName: "Smartphone",
        quantity: 500,
        productionDate: "2023-09-01",
        status: "In Assembly",
        destination: "Retailer A",
      },
      {
        id: 2,
        productName: "Laptop",
        quantity: 300,
        productionDate: "2023-08-25",
        status: "Shipped",
        destination: "Retailer B",
      },
    ];

    service.getProducts().subscribe((products: Product[]) => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe("GET");
    req.flush(mockProducts);
  });

  it("should add a product via POST", () => {
    const newProduct: Product = {
      id: 1,
      productName: "Smartphone",
      quantity: 500,
      productionDate: "2023-09-01",
      status: "In Assembly",
      destination: "Retailer A",
    };

    service.addProduct(newProduct).subscribe(() => {
      // Do any necessary assertions here
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(newProduct);

    // Simulate a successful HTTP response
    req.flush({});
  });

  it("should retrieve a product by ID via GET", () => {
    const mockProduct: Product = {
      id: 1,
      productName: "Smartphone",
      quantity: 500,
      productionDate: "2023-09-01",
      status: "In Assembly",
      destination: "Retailer A",
    };

    service.getProduct(1).subscribe((product: Product) => {
      expect(product.id).toEqual(mockProduct.id);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products/1`);
    expect(req.request.method).toBe("GET");
    req.flush(mockProduct);
  });
});
