---
Implement CRUD in Angular using JSON Data for a Manufacturing Supply Chain

In the manufacturing sector, a streamlined supply chain is the backbone of successful production. Each product batch, as it moves through the supply chain, is tagged with a unique Batch ID. Employees and stakeholders often need to track the status and details of these batches using this unique Batch ID. Use reactive form with name productForm and implement function with name dateValidator().
for save use onSubmit() function.
Use status with name productionStatus = 'In Production', 'In Assembly', 'Shipped', 'Delivered'
Implement function name searchProducts(),getProducts() and declare list with name products.
Implement a service with name ProductService and getProducts(),getProduct(),addProduct()



Your objective is to design a segment of a supply chain management platform using Angular. This platform should enable users to log new product batches and retrieve detailed information of a specific batch using its Batch ID.


db.json



{
  "products": [
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
   
  ]
}


Task:

Develop an Angular application offering:



A form enabling users to log a new product batch with attributes:
Product Name
Quantity
Production Date
Current Status (e.g., "In Production", "In Assembly", "Shipped", "Delivered")
Destination (e.g., which retailer or warehouse it's headed to)
Apply validations on each input (e.g., quantity should be a positive number, date format as YYYY-MM-DD, etc.)
An interface where users can enter a batchID to fetch and display the associated batch's detailed information.


1. src/app/product-form/product-form.component.ts
2. src/app/product-list/product-list.component.ts
3. src/app/services/product.service.ts

Notes:

1. Do not change file names, class names , method declarations.
2. Use Test App & Submit option often so you will be guided by test error messages.
3. You do not need to add template files or styles to the application
4. Do not remove entries from db.json

Testing & Submitting your code:

Step 1: Click on the WeCP Projects Button.
Step 2: Click on Test & Submit app button to test your code.
Step 3: You will receive a congratulations message upon successful completion of the task.
