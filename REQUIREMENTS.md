# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

### Products

- [x] Index
- [x] Show
- [x] Create [token required]
- [x] [OPTIONAL] Top 5 most popular products
- [ ] [OPTIONAL] Products by category (args: product category)

### Users

- [x] Index [token required]
- [x] Show [token required]
- [x] Create [token required]

### Orders

- [x] Current Order by user [args: user id](token required)
- [x] [OPTIONAL] Completed Orders by user [args: user id](token required)

## Data Shapes

### Database Tables

![store-front-api tables](tables.png)

### Product

- id
- name
- price
- [OPTIONAL] category

![store-front-api products](products.png)

### User

- id
- firstName
- lastName
- email
- password

![store-front-api users](users.png)

### Order

- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

![store-front-api orders](orders.png)

### order_products

- id of each order_products
- quantity
- order_id
- product_id

![store-front-api order_products](order_products.png)
