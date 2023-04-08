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

**Authorized** users can add products to their cart

#### Tabs to:

* All Products  

* Solar panels  

* Invertors  

* Constructions  

### `Projects`

Unauthenticated users can see the projects and their details and comments.

A place where authenticated users can share their solar projects with the comunity. 

In the project details menu authenticated users can add comments and reply to existing ones.

#### Tabs to:

* All Projects  

* Share your project  

* My Projects  

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

#### `Add to cart`

**Registered** users can add tool in the user's cart.   

### `User cart`

#### `Cart`

Display list of tools added from user.   

Delivery addres table with loaded Econt(https://ee.econt.com/services api) offices for 100 cities in the first dropdown menu.   

On selected city the available Econt offices are loaded in the second dropdown menu and the map display the offices locations with markers.   

On 'Share your location to find the nearest Econt office' switch selected the browser prompts message for the user to allow the location sharing and then user location is shown on the map with 'star'. 

When location is shared and city is selected the map displays all available Econt offices with markers, onClick on the marker show the direction, distance and time. Button `Find nearest office` is available and it finds the closest office to the user's location.

#### `Orders`

Display list of user's checkout carts with status for the order

### `Received orders` available for owner 

Display list of users orders with button to update the order status from 'Pending' to 'Dispatched'

## Used npm's

* create-react-app  

* react-router-dom  

* bootstrap  

* react-bootstrap  

* @react-google-maps/api

* node-geometry-library

##  Back-End Service

### `Softuni-Practice-Server`

https://github.com/softuni-practice-server/softuni-practice-server#readme

Added to the project folder, with seeded data for Products, Tools and Users.  


##  Automatic page load progress bar

### `pace`

https://codebyzach.github.io/pace/

Visible on top of the page
