import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ProductFormComponent } from "../app/product-form/product-form.component";

describe("ProductFormComponent", () => {
  let component: ProductFormComponent;
  let fixture: ComponentFixture<ProductFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductFormComponent],
      imports: [ReactiveFormsModule],
    });

    fixture = TestBed.createComponent(ProductFormComponent);
    component = fixture.componentInstance;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should emit a product when the form is submitted with valid data", () => {
    const formBuilder: FormBuilder = TestBed.inject(FormBuilder);
    const product = {
      "id": 1,
      "productName": "Smartphone",
      "quantity": 500,
      "productionDate": "2023-09-01",
      "status": "In Assembly",
      "destination": "Retailer A"
    };

    // Set up the form with valid data
    component.productForm = formBuilder.group({
      id: 1,
      productName: [product.productName],
      quantity: [product.quantity],
      destination: [product.destination],
      status: [product.status],
      productionDate: [product.productionDate],
    });

    spyOn(component.addProduct, "emit");

    component.onSubmit();

    expect(component.addProduct.emit).toHaveBeenCalledWith(product);
  });
});
