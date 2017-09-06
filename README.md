## Readable
![screen shot 2017-09-05 at 10 26 42 pm](https://user-images.githubusercontent.com/12979345/30095755-69ed0bd4-9289-11e7-960f-aa4c68eee2a6.png)
Readable is a content and comment web app. Users will be able to post content to predefined categories, comment on their posts and other users' posts, and vote on posts and comments. Users will also be able to edit and delete posts and comments.

This app will talk to a backend server using documented API endpoints to manage storing, reading, updating, and deleting data from the application.

## Features
1. Post content to predefined categories
2. Comment on their posts and other users' posts
3. Vote on posts and comments
4. Edit and delete posts/comments

## Setup and Run
### Grab start the backend server

```shell
cd ~/
git clone https://github.com/udacity/reactnd-project-readable-starter.git
cd reactnd-project-readable-starter
npm install
node server.js
```

### Install and deploy client side

```shell
cd ~/
git clone https://github.com/frankolson/readable.git
cd readable
npm install
npm start
```

- Directory structure of the redux web app is by  `capability`

``` 
   src/
   - Components
      - component1.js
      - component2.js
      - component3.js
   - Actions
      - action1.js
      - action2.js
   - Reducers
      - reducer1.js
   - Util
   - Store
```

## Miscellaneous
  - ESlint rules are implemented
  - Prettier as code formatter
  - *This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).*

## Contributing
This is an assignment for Udacity React ND, pull requests are welcome

## Licences
Do not copy this project if you are a student of udacity in this class. And you can feel free to use it for any other usage.
