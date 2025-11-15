# CodePath E-commerce

CodePath WEB103 Final Project

Designed and developed by: Esterlin Jerez Paulino, Rico Chen

🔗 Link to deployed app:

## About
An specialized Econmmerce Store platform based on Codepath to provide a easy one and done place for Codepath merchandise.  

### Description and Purpose

Serve the CodePath Community: To meet demand for CodePath-branded accessories, and gear among students, Teaching Fellows, and instructors.  

Brand Building: To enhance the CodePath community spirit and brand visibility by providing high-quality, desirable merchandise.

### Inspiration

We see a gap in the market for codepath merch, so we decided to create a website to meet the demands of students, TF's and teachers to acquire them easily. 

## Tech Stack

Frontend: React.js

Backend: Express with Render Database

## Features

### 1. Product Catalog & Browsing
Browse CodePath merch by category (apparel, accessories, tech gear) with an intuitive filtering system to quickly find products.
[gif goes here]

### ✅*created in the backend will need to be connected 2. Shopping Cart with Persistence
Add items to cart and save them across sessions, allowing users to shop at their own pace and complete purchases later.
[gif goes here]

### 3. Role-Based Discounts
Automatic discount application based on user role (Student, Tech Fellow, Staff) with clear pricing display at checkout.
[gif goes here]

### ✅ *created in the backend will need to be connected  4. User Authentication & Accounts
Secure login system that identifies user roles and maintains order history for easy reordering and tracking.
[gif goes here]

### 5. Product Reviews & Ratings
View and submit reviews from the CodePath community to make informed purchasing decisions about sizing and quality.
[gif goes here]

### 6. Admin Dashboard
Manage product inventory, view sales analytics, and create promotional campaigns through a staff-only admin interface.
[gif goes here]

### [ADDITIONAL FEATURES GO HERE - ADD ALL FEATURES HERE IN THE FORMAT ABOVE; you will check these off and add gifs as you complete them]

## Installation Instructions

[instructions go here]



## Features Issues
### 1. Role base discounts are difficult to verify without also having their emails. Even with their emails, we need some sort of verification systems which can be spoofed.
### 2. Data for the shopping cart will be difficult to keep track of, specially when multiple customers buy or add to cart the same item. If the item is out of stock, the items in the shopping cart needs to be removed. Or we can inform the customer.
### 3. Having a admin dashboard can be great for viewing the stats of the website. However, if the database gets too large, it'll take a long time to calculate it. 
### 4. Since we are using a home grown authentication system, we need to make sure attackers cannot impersonate a user. (XSS, token jacking, etc).
### 5. A filtering system will be difficult to implement if the items added in are spontaneous (with out order or labeling).
