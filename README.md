This project demonstrates how to implement JWT (JSON Web Token) authentication in a Next.js application using the Tailwind CSS framework. The objective is to enable user login and access to a protected dashboard page. This README provides an overview of the project, how to run it, the code structure, and how the authentication flow is implemented.


## Getting Started

First, install the packages by running

```bash
npm install
# or
yarn 
```


After that, run the development server:

```bash
npm run dev
# or
yarn dev
```


After that, you can run the tests with:

```bash
npx jest
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the project running.

# Specifications 

### Code Structure

For the structure of the code I used the basic NextJS and Shadcn-UI structure.

#

### Authentification Flow

For the authentification flow I used the next-auth package + jsonwebtoken. (Creating the JWT, storing the token, the login and logout method).

#

### Login page

Designed a clean and intuitive login page using Tailwind CSS and Shadcn UI components.

The login page features input fields for username and password, as well as a "Login" button.

Implemented client-side validation to ensure that input fields are not empty before submission.

Displayed appropriate error messages for incorrect credentials or server errors.

#

### Authentification

Implemented JWT authentication on the server-side.

Upon successful authentication, a JWT is created and sent to the client.

Securely stored the JWT on the client-side and used it to manage the user's session.

#

### Dashboard Page

Upon successful login, users are redirected to a dashboard page.

Displayed a welcome message on the dashboard, mentioning the username of the logged-in user.

Implemented a "Logout" button that clears the JWT and redirects the user back to the login page.

