# Project is devided in three part (Frontend)  1- ReactJS (Backend) 2- Node-ExpressJs 3- Socket.io

### Project has 3 basic folder 1- Client 2- Server 3- Socketio

## 1 - In the Client directory, you can run:

### `npm install`  run this command to install node_modules folder

### `npm start`  run this command to start this server locally

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

When the frontend run you will see first login page on this route ./ if user doesn't exist user have to create an account by clicking on signup and it will route you to ./signup.

The ./signup you will create user account page when a user can create an account.

When you on ./ route (Login Page) you will top-right corner admin , when you click on it you will route to ./adminlogin (Admin Login Page).

# admin login Email - admin@admin.com
# admin login Password -  admin1234

By using this credential you will go to ./admin route you will see all votes given by users to nominees.

##### ----------------------------------------------------------------------------------




## 2 - In the Server directory, you can run:

### `npm install`  run this command to install node_modules folder

### `npm run dev`  run this command to start this server locally

Runs the app in the development mode.\
Open [http://localhost:1000](http://localhost:1000) to view it in your browser.

# Server's directory has a index.js file 

### `you have to put mongodb url in line number 35`


##### ----------------------------------------------------------------------------------




## 3 - In the Socketio directory, you can run:

### `npm install`  run this command to install node_modules folder

### `npm run dev`  run this command to start this server locally

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

# Socketio's directory has a index.js file 

### `you have to put mongodb url in line number 17 , and line number 20 set mongodb database name`


# The main motive to divide this api in two part server socketio to prevent of multiple request at a time in the server user will feel free login without any request limits or you want to merge it as one it is possible.
