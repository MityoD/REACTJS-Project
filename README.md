# REACTJS-Project
SoftUni ReactJS Project - Solar Solutions

## Available Users

### `Owner`

email: owner@abv.bg
password: 123456
role: owner

### `Guest`

email: peter@abv.bg
password: 123456
role: guest

email: john@abv.bg
password: 123456
role: guest

On registration the user is given role 'guest'.

### `Unauthenticated`

Users without registration

## Available Menus

In the project, you can find:

### `Home`

Carousel with the last three added tools and link for the details.

### `Products`

**Owner** can apply all CRUD operations (create, read, update, delete)

**Guest** & **Unauthenticated** can see products catalog and product details

#### Tabs to:

* All Products  

* Solar panels  

* Invertors  

* Constructions  

### `Projects`

Not implemented yet.

### `Tools`

**Owner** & **Guest** can apply all CRUD operations (create, read, update, delete) on their items

**Unauthenticated** can see tools catalog and tool details

#### Tabs to:

* All tools  

* Add tool  - redirecting unauthenticated usert to login page.

* My tools  - available for authenticated users

#### `Tools Likes`

**Registered** users can 'Like' an item once, then the button is disabled.   

**Owner** of the item can not like own items.   

**All users** can see the count of likes.   

### `Contractors`

Not implemented yet.

### `Q&A`

Not implemented yet.

### `User cart`

Not implemented yet.

## Used npm's

* create-react-app  

* react-router-dom  

* bootstrap  

* react-bootstrap  

##  Back-End Service

### `Softuni-Practice-Server`

https://github.com/softuni-practice-server/softuni-practice-server#readme

Added to the project folder, with seeded data for Products, Tools and Users.  


##  Automatic page load progress bar

### `pace`

https://codebyzach.github.io/pace/

Visible on top of the page
