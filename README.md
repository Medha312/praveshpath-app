PraveshPath 

PraveshPath is a full-stack MERN (MongoDB, Express, React, Node.js) web application designed as a comprehensive career guidance tool for students seeking admission to engineering colleges in India. It allows users to find eligible colleges based on their entrance exam ranks, search for specific institutions, and save their choices to a personalized shortlist. The application also features a secure admin panel for managing college data.

Live Demo: https://68e80fc09f2bfb1a62c1c8b7--praveshpath-app.netlify.app/



Key Features 

College Prediction Engine: Recommends colleges based on a student's rank, category, and preferred branch.

Dynamic College Search: A powerful search bar to find specific colleges by name.

User Authentication: Secure user registration and login system using JSON Web Tokens (JWT).

Personalized Shortlist: Logged-in users can save colleges to a personal shortlist and manage their selections.

Secure Admin Panel: A protected backend route system allows administrators to add, update, and delete college data.

Rich UI: A modern, professional user interface built with React and Material-UI (MUI).

Fully Deployed: The backend is live on Render, and the frontend is live on Netlify.



System Architecture
The application follows a modern MERN stack architecture with a decoupled frontend and backend.

The React Frontend is a static site hosted on Netlify, providing a fast user experience via a global CDN.

The Backend API is a Node.js/Express server hosted on Render, handling all business logic and data processing.

The MongoDB Atlas database serves as the persistent data store in the cloud.

Communication between the frontend and backend happens via a RESTful API.



Technology Stack 
Frontend: React, React Router, Material-UI (MUI), Axios

Backend: Node.js, Express.js

Database: MongoDB (with Mongoose)

Authentication: JSON Web Tokens (JWT), bcryptjs

Deployment: Netlify (Frontend), Render (Backend)



API Endpoints
A brief overview of the main API routes available.

Method	Endpoint	Description	Access

POST	/api/users/register	Register a new user.	Public

POST	/api/users/login	Authenticate a user.	Public

GET	/api/colleges/search	Search colleges by name.	Public

POST	/api/predict	Predict eligible colleges.	Public

PUT	/api/users/shortlist/:id	Add college to shortlist.	Private

GET	/api/users/shortlist	Get user's shortlist.	Private

POST	/api/colleges	Create a new college.	Admin

DELETE	/api/colleges/:id	Delete a college.	Admin

