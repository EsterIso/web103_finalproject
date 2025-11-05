# 🧢 CodePath Merch Central: Entity Relationship Diagram (ERD)

This document outlines the logical structure of the database for the **CodePath Merch Central** e-commerce platform.  
The design supports core e-commerce functions, role-based discounts, inventory management, and product ordering.

---

## 📘 1. List of Tables (Entities)

| #  | Table Name       | Purpose |
|----|------------------|----------|
| 1  | **Users**        | Authentication, user info, role assignment |
| 2  | **Roles**        | Defines user type and automatic discounts |
| 3  | **Categories**   | For browsing products |
| 4  | **Products**     | Base merch items like “T-Shirt” |
| 5  | **Inventory**    | Handles stock levels and specific variants like size/color |
| 6  | **Reviews**      | Community feedback and ratings |
| 7  | **Carts**        | The user’s shopping session |
| 8  | **CartItems**    | Items in the active cart or “saved for later” |
| 9  | **Orders**       | Completed transactions |
| 10 | **OrderLineItems** | Detailed record of items purchased in an order |

---

## 📗 2. Schema Details

### **1. Users**
Maps to CodePath accounts and determines role-based discounts.

| Column Name | Type | Description |
|--------------|------|-------------|
| `user_id` | UUID | **Primary Key.** Unique identifier (e.g., Firebase UID). |
| `role_id` | INT | **Foreign Key** → `Roles`. |
| `first_name` | TEXT | User’s first name. |
| `last_name` | TEXT | User’s last name. |
| `email` | TEXT | User’s email (**UNIQUE**). |
| `created_at` | TIMESTAMP | Account creation date. |

---

### **2. Roles**
Defines user categories and associated automatic benefits.  
*(User Story: Tech Fellow discount)*

| Column Name | Type | Description |
|--------------|------|-------------|
| `role_id` | INT | **Primary Key.** |
| `name` | TEXT | Role name (e.g., `Student`, `Tech Fellow`, `Staff`, `Professor`). |
| `default_discount_rate` | DECIMAL(3,2) | Automatic discount applied (e.g., `0.15` for 15% off). |

---

### **3. Categories**
For product filtering.  
*(User Story: Browse merch by category)*

| Column Name | Type | Description |
|--------------|------|-------------|
| `category_id` | INT | **Primary Key.** |
| `name` | TEXT | Category name (e.g., `Apparel`, `Tech Gear`). |

---

### **4. Products**
The base item in the store.

| Column Name | Type | Description |
|--------------|------|-------------|
| `product_id` | UUID | **Primary Key.** |
| `category_id` | INT | **Foreign Key** → `Categories`. |
| `name` | TEXT | Product name (e.g., “CodePath Hoodie”). |
| `description` | TEXT | Detailed product description. |
| `base_price` | DECIMAL(10,2) | Standard retail price before any discounts. |
| `image_url` | TEXT | Link to the main product image. |
| `average_rating` | DECIMAL(2,1) | Pre-calculated average of linked reviews. |

---

### **5. Inventory**
Handles stock management for variants.  
*(User Story: Staff manage inventory)*

| Column Name | Type | Description |
|--------------|------|-------------|
| `inventory_id` | UUID | **Primary Key.** |
| `product_id` | UUID | **Foreign Key** → `Products`. |
| `variant_name` | TEXT | Specific variation (e.g., “Size: Large”, “Color: Blue”). |
| `stock_level` | INT | Current quantity in stock. |

---

### **6. Reviews**
For community feedback.  
*(User Story: See product reviews and ratings)*

| Column Name | Type | Description |
|--------------|------|-------------|
| `review_id` | UUID | **Primary Key.** |
| `product_id` | UUID | **Foreign Key** → `Products`. |
| `user_id` | UUID | **Foreign Key** → `Users`. |
| `rating` | INT | Star rating (1–5). |
| `review_text` | TEXT | The body of the review. |
| `created_at` | TIMESTAMP | Date/time the review was posted. |

---

### **7. Carts**
Represents the user’s active or saved shopping session.

| Column Name | Type | Description |
|--------------|------|-------------|
| `cart_id` | UUID | **Primary Key.** |
| `user_id` | UUID | **Foreign Key** → `Users` (one cart per user). |
| `last_updated` | TIMESTAMP | Last modification time. |

---

### **8. CartItems**
Items within the cart.  
*(User Story: Add items to my cart and save them for later)*

| Column Name | Type | Description |
|--------------|------|-------------|
| `cart_item_id` | UUID | **Primary Key.** |
| `cart_id` | UUID | **Foreign Key** → `Carts`. |
| `inventory_id` | UUID | **Foreign Key** → `Inventory`. |
| `quantity` | INT | Quantity desired. |
| `saved_for_later` | BOOLEAN | `TRUE` = saved, `FALSE` = active cart. |

---

### **9. Orders**
Final record of a successful transaction.

| Column Name | Type | Description |
|--------------|------|-------------|
| `order_id` | UUID | **Primary Key.** |
| `user_id` | UUID | **Foreign Key** → `Users`. |
| `shipping_address` | TEXT | Snapshot of shipping address at order time. |
| `role_discount_rate` | DECIMAL(3,2) | Automatic role discount snapshot. |
| `order_date` | TIMESTAMP | Date/time of purchase. |
| `subtotal` | DECIMAL(10,2) | Total before tax/shipping/discounts. |
| `total_amount` | DECIMAL(10,2) | Final amount charged. |
| `status` | TEXT | Order status (`Processing`, `Shipped`, `Delivered`). |

---

### **10. OrderLineItems**
Immutable record of what was purchased.  
*(Crucial for sales analytics)*

| Column Name | Type | Description |
|--------------|------|-------------|
| `order_line_id` | UUID | **Primary Key.** |
| `order_id` | UUID | **Foreign Key** → `Orders`. |
| `product_id` | UUID | **Foreign Key** → `Products`. |
| `variant_details` | TEXT | Snapshot of size, color, etc. |
| `quantity` | INT | Quantity purchased. |
| `unit_price_at_purchase` | DECIMAL(10,2) | Exact price per item after all discounts. |

---

## 🧩 Relationships Summary

- **Users ↔ Roles** → `role_id`
- **Products ↔ Categories**
- **Products ↔ Inventory**
- **Products ↔ Reviews**
- **Users ↔ Carts** (1:1)
- **Carts ↔ CartItems** (1:N)
- **Orders ↔ OrderLineItems** (1:N)
- **Users ↔ Orders** (1:N)

---

**Author:** CodePath Merch Central Database Design Team  
**Version:** 1.1  
**Date:** November 2025
