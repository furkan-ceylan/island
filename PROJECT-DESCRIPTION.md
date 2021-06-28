
# Island - Another Social Platform

In this project, you are expected to design and implement a social platform application running on web browsers. First of all, let's begin with the components in the project.

## Components

### 1. Backend

Backend component is responsible for management of application state. By application state, we mean the current users in the application, their abilities, performed actions etc.

### 2. Frontend
Frontend component is where user interacts with the application, hence, it is User Interface(UI). 

### 3. User
User component is the main actuator who causes actions to be taken by other components.

## Requirements
In this section, expected features in the project and their functialities are described.

### 1. User
* 1.1 Authentication
  * 1.1.1 User shall be able to sign up for application with an email and password.
  * 1.1.2 User shall be able to sign into application with email and password specified at sign up.
  * 1.1.3 User shall be able to reset the his/her own password associated with the email.
  * 1.1.4 User shall validate himself/herself by visiting the link in the mail he/she received after signing up.
* 1.2 Profile
  * 1.2.1 User shall be able to upload an image for his/her profile image.
  * 1.2.2 User shall be able to specify description, birth date, and hobbies for his/her profile details.
  * 1.2.3 User shall be able to see number of followers and followee in his/her profile page
* 1.3 Following
  * 1.3.1 User shall be able to follow another user.
  * 1.3.2 User shall be able to unfollow another user who is already being followed by the user.
  * 1.3.3 Other users shall be able to display user's profile page.
* 1.4 Post
  * 1.4.1 User shall have a page called Posts where he/she can see the posts that belongs to the users he/she is already following.
  * 1.4.2 User shall be able to create a **text post** with a title, image and description.
  * 1.4.3 User shall be able to create a **image post** with only an image.
  * 1.4.4 User shall be able to comment on a text post and image post.
  * 1.4.5 User shall be able to filter posts with respect to its user.

### 2. Backend

* 2.1 Security
  * 2.1.1 Backend shall deny any possible Cross Site Scripting (XSS) variants.
  * 2.1.2 Backend shall deny any unauthorized access into the application.
  * 2.1.3 Backend shall deny any possible SQL Query Injection variants if a SQL database will be used in the application.
  * 2.1.4 Backend shall store the hashed versions of users' passwords and as plain text.
* 2.2 Performance
  * Backend shall be able to handle more than 1000 concurrent requests at any time.

### 3. Frontend
* 3.1 Compatibility
  * Frontend shall be able to run on mostly used web browsers: Firefox, Safari, Opera and Chrome.

## Environments

Backend should be living in a public server accessible by its IP address. Frontend should be living in our web browsers.

## Tools and Software Stack

You are free to use any tools and software stacks, but we recommend you to use these technologies:

1. Backend: Node.js 
2. Frontend: Vue.js v3+ for JS Framework, Tailwind CSS for CSS Framework

## Development Cycle

In this section, we will explain how you should develop the project. First of all, you are expected develop Frontend component. In the Frontend component development, you should be focusing on adding functionality into the component and implementing the tests. You should mock the behaviour of Backend component at the point that Frontend and Backend should communicate. Hence, you do not have to implement Frontend and Backend at the same time.


If you do not use any css framework in the Frontend component, then you are expected to build a basic CSS Framework yourself which should include basic building blocks like grid system, card, form etc.