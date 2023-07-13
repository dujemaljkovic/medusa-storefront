
=======
# medusa-storefront
This project is a simple storefront that displays products in a grid (landing page) and allows customers to visit a details page for each product. It uses Medusa as the backend and Create React App as the frontend framework.

# Time spent
I spent about 12 hours working on this project.

# The implementation that was most challenging
The most challenging part of the project was implementing the product details page and the product variants logic. I had to use the Medusa React hooks library to fetch the product data and handle the variant selection.

# The implementation I am most proud of
The implementation I am most proud of is the responsive design and the Tailwind CSS styling. I think the storefront looks modern and sleek on different screen sizes and devices.

# How I structured the project and any considerations I had
I structured the project using a modular component-based approach. I created reusable components for the product card, the product details, the filter menu, and the header. I used Create React App’s routing to create pages for each product based on its slug. I used Tailwind CSS for styling and TypeScript for type checking. I also used ESLint and Prettier for code formatting and linting.

# Installation
To run this project locally, you need to have Node.js and npm installed. You also need to have a Medusa server running with some sample products. Follow these steps to set up the project:

# Clone this repository: git clone https://github.com/dujemaljkovic/medusa-storefront.git
Install dependencies: npm install
Create a .env.local file with your Medusa store API URL: REACT_APP_MEDUSA_API_URL=your-medusa-api-url
Run the development server: npm start
Open http://localhost:3000 in your browser
Usage
You can browse the products on the landing page and filter them by price. You can click on any product to see its details and choose among its variants. You can also view the Figma design here: https://www.figma.com/file/GGWEglZ400r9Ut6e15ZDAJ/Medusa—Frontend-challenge

# Contributors
This project was created by Duje Maljkovic as part of the Agilo frontend pre-internship case. You can contact me at duje.maljkovic@gmail.com if you have any questions or feedback.
