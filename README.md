# MOS Burgers POS Website

This project is a simple yet effective Point of Sale (POS) website built for MOS Burgers. It features a secure login page, a user-friendly dashboard for cashiers, and streamlined payment processes.

## Features

### Admin Dashboard
- **Login Credentials (Default):**
  - **Username:** admin
  - **Password:** 12345
- Admins can easily manage users by adding or removing them from the `data/users.json` file.

### Cashier Dashboard
- **Product Management:**  
  Cashiers can add products to the cart using search and filtering options, making it quick and efficient to build an order.
  
- **Cart Overview & Checkout:**  
  The cashier can view all items in the cart and proceed to the checkout page, which provides an overview of the order in a detailed table format.

### Payments
- Supports both **Card** and **Cash** payments.
- Each payment method comes with necessary validations to ensure a smooth transaction.

### Invoice Generation
- After a successful payment, the bill is automatically generated and downloaded as a **PDF**.
  
### Order Tracking
- Orders are recorded in the **Purchases** section of the session database. These records can be accessed from the cashier's dashboard for tracking and management.

## Technologies Used
- HTML/CSS for frontend
- JavaScript for client-side functionality
- PDF generation library for creating the bill
- Session storage and local storages for managing user sessions and purchases

## How to Use
1. **Visit the github deployment**:
   ```bash
   https://danula2008.github.io/mos_burgers/
   ```
   
3. **Login**:  
   Use the default login credentials to access the admin dashboard.

4. **Explore Features**:  
   - 

## Future Enhancements
- Adding reports and analytics for better sales tracking.
- Integration with third-party payment gateways.
- Inventory management features.

## License
This project is licensed under the [MIT License](LICENSE).
