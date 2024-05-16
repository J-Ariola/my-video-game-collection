# my-video-game-collection
A web application designed for the purpose of cataloging information pertaining to video games you have experienced, want to experience, or are presently engaged with.

## Tech Stack

- Project Structure: Microservice
- Programming Language: Typescript
- Frontend Library: React
- Backend Framework: Express using Prisma
- Database: PostgreSQL
- Videogame Database API: Giant Bomb
- User Authentication: Firebase
- Styling: CSS, MUI
- Build Tools: Vite

## Disclaimer
- The corresponding backend code is currently private. Please message me for details.

## Installation

- Prequisites: 
  1. Firebase (https://firebase.google.com/)
  2. Giant Bomb API Key (https://www.giantbomb.com/api/)

- Install dependencies `npm install`
- Change `env.example` to `.env` and replace the placeholders.

- Development CLI: `npm run dev`

  ## Documentation
  The following diagram is a representation on how the client interacts with the backend.
  ```
                           +-----------------+
                           | React Component |
                           |      App        |
                           +-----------------+
                                   |
                                   v
                      +-------------------------+
                      | Header (Search Bar)     |
                      +-------------------------+
                                   |
                                   v
                      +-------------------------+
                      | GameCardSmall Component |
                      +-------------------------+
                                   |
                                   v
                        +-------------------+
                        | AddToCollectionsMenu|
                        +-------------------+
                                   |
                                   v
                      +-------------------------+
                      | Firebase Authentication |
                      +-------------------------+
                                   |
                                   v
                         +-----------------+
                         | Backend API     |
                         |   (BASE_URL)    |
                         +-----------------+
### Front End
  - Vite Bundler and Typescript were used to create this project.

### Styling
  - Utilizing the pre-built CSS components of Material-UI to quickly style the page and layout of the front end.

Additional Information:

  - The backend utilizes a Model-View-Controller (MVC) architectural pattern to seperate the logic between the server's requests on each route (The View) and the application logic (The Controller) and the logic to either access the database or to send requests to the 3rd party API (The Model).
  - Utilizing Firebase's Admin SDK, middleware was created to verify user id tokens for sessions.
  - Any calls made to the custom made PostgreSQL database utilizes Prisma ORM to handle game entries to the user's game collection.
  - Both frontend and backend utilize Typescript to reduce runtime and behaviorial errors for quicker implementation flow.

## Acknowledgments

Special thanks to everybody at Code Chrysalis and

- **[Manu] (https://github.com/lmanul)**
- **[Chad] (https://github.com/chadgrover)**
- **[Michael] (https://github.com/vyridian17)**

### Contributors
- **[Jarrod Ariola] (https://github.com/J-Ariola)**

### Libraries and Packages

- **[cors](https://github.com/expressjs/cors)** - A Node.js package for providing a Connect/Express middleware for handling CORS
- **[express](https://expressjs.com/)** - A fast and minimalist web application framework for Node.js
- **[nodemon](https://nodemon.io/)** - A tool that automatically restarts the Node.js application when file changes are detected
- **[@emotion/react](https://emotion.sh/docs/introduction)** - A library for styling React components using CSS-in-JS
- **[@emotion/styled](https://emotion.sh/docs/@emotion/styled)** - A library for styling React components using tagged template literals
- **[@fontsource/roboto](https://github.com/fontsource/fontsource)** - Self-hosted Open Source fonts
- **[@mui/icons-material](https://mui.com/material-ui/icons/)** - Material Design icons from the official Google Material Design library
- **[@mui/material](https://mui.com/material-ui/getting-started/installation/)** - React components for faster and easier web development with Material Design
- **[firebase](https://firebase.google.com/)** - A comprehensive app development platform from Google
- **[firebase](https://firebase.google.com/docs/auth)** - a secure and easy-to-implement solution for user authentication, allowing developers to authenticate users via email/password and more, seamlessly integrating with Firebase's suite of services
- **[giant bomb api](https://www.giantbomb.com/api/)** - provides developers access to a vast array of gaming-related data, offering a treasure trove of information for building innovative gaming applications.
- **[prisma](https://www.prisma.io/)** - a powerful database toolkit that simplifies database workflows and enables seamless interaction with databases through a type-safe and intuitive API
- **[react](https://reactjs.org/)** - A JavaScript library for building user interfaces
- **[react-router-dom](https://reactrouter.com/web/guides/quick-start)** - A routing library for React applications

## License

[MIT](https://choosealicense.com/licenses/mit/)
