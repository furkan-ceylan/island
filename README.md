# island
### A Social Network App built with Vue.js, Node.js, Express and MongoDB
==============

## Demo and Live application

### Sign up and Login Page

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/32003938/125349152-dcc48200-e365-11eb-9f21-1807009c4a46.gif)


### Follow/Unfollow

![ezgif com-gif-maker (4)](https://user-images.githubusercontent.com/32003938/125349173-e1893600-e365-11eb-8fe8-d5a0b2e0eae5.gif)


### Adding Text Post, Image Post, Comment and Image Comment

![ezgif com-gif-maker (5)](https://user-images.githubusercontent.com/32003938/125349400-3167fd00-e366-11eb-9325-cf2704046081.gif)


## Installation

### Step 1: Clone the repo
```
git clone https://github.com/fcyln/island
```

### Step 2: Prerequisites(Frontend)
This will install the dependencies of this website's frontend. It will pull in several packages like Vue, vue-router, vuex, axios, vue-skeletor, vue-spinner and sass-loader
```
cd frontend
npm install (in frontend directory)
```

### Step 3: Prerequisites(Backend)
This will install the dependencies of this website's backend. It will pull in several packages like express, express-fileupload, bcrypt, cors, dotenv, helmet, jsonwebtoken, mongoose, morgan, multer, nodemailer, nodemon and xoauth2
```
cd backend
npm install (in backend directory)
```

### Step 4: Run the project
```
cd frontend
npm run serve

cd backend
npm start
```

### Step 5: Configure environment variables
Configure environment variables and add keys for island.

```
MONGO_URL=your mongodb connection string

SECRET_KEY= your secret key
EMAIL_SECRET= your email secret key

AUTH_USER = your gmail account
AUTH_CLIENT_ID = your client id
AUTH_CLIENT_SECRET = your client secret
AUTH_REFRESH_TOKEN = your refresh token
AUTH_ACCESS_TOKEN = your access token

```

## Features

### 1. User
* 1.1 Authentication
  * 1.1.1 User can sign up for application with an email and password.
  * 1.1.2 User can sign into application with email and password specified at sign up.
  * 1.1.3 User can reset the his/her own password associated with the email.
  * 1.1.4 User can validate himself/herself by visiting the link in the mail he/she received after signing up.
* 1.2 Profile
  * 1.2.1 User can upload an image for his/her profile image.
  * 1.2.2 User can specify description, birth date, and hobbies for his/her profile details.
  * 1.2.3 User can see number of followers and followee in his/her profile page
* 1.3 Following
  * 1.3.1 User can follow another user.
  * 1.3.2 User can unfollow another user who is already being followed by the user.
  * 1.3.3 Other users can display user's profile page.
* 1.4 Post
  * 1.4.1 User have a page called Timeline where he/she can see the posts that belongs to the users he/she is already following.
  * 1.4.2 User can create a **text post** with a title, image and description.
  * 1.4.3 User can create a **image post** with only an image.
  * 1.4.4 User can comment on a text post and image post.
  * 1.4.5 User can filter posts with respect to its user.
  
### 2. Backend

* 2.1 Security
  * 2.1.1 Backend can deny any possible Cross Site Scripting (XSS) variants.
  * 2.1.2 Backend can deny any unauthorized access into the application.
  * 2.1.3 Backend can deny any possible SQL Query Injection variants if a SQL database will be used in the application.
  * 2.1.4 Backend can store the hashed versions of users' passwords and as plain text.
* 2.2 Performance
  * Backend can handle more than 1000 concurrent requests at any time.
