![](https://res.cloudinary.com/dpwoods/image/upload/v1586638762/img_assets/imseeking-video-to-gif.gif)

## Overview

ImSeekingGeeks is an online dating platform only available in the US that lets you the meet the most amazing singles. ImSeekingGeeks was the result of my graduate Software Engineering Project Management class. I developed the concept and the application from start to finish. It uses Nuxt.js/Vue.js on the front-end and Node.js/Express.js on the back-end with a MongoDB database.

To view the application on Heroku, go to: [https://www.imseekinggeeks.com/](https://www.imseekinggeeks.com/)



## Docker

docker build -t im-seeking-geeks .      
 
docker run -it -p 3000:3000 im-seeking-geeks

## Run Tests

npm run test

```
------------------------------|---------|----------|---------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------
File                          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
------------------------------|---------|----------|---------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------
All files                     |   23.35 |     8.02 |    24.7 |   25.03 | 
 config                       |     100 |      100 |     100 |     100 | 
  default.js                  |     100 |      100 |     100 |     100 | 
 controllers                  |   15.68 |      4.6 |   19.44 |   17.11 | 
  AuthenticationContoller.js  |   10.71 |        0 |       0 |   10.71 | 20-25,29-34,38-118,123-147,151-161,165-201,206-216
  ProfileController.js        |   16.66 |        5 |   24.13 |   18.57 | 23-43,79-141,159-173,177-188,193-260,265-290,294-323,328-425,429-433,437-510,514-615,619-624,643-663,667-673,678-694,700-716,728,733-736,744,749,758,763
 models                       |   29.41 |       20 |   21.87 |   30.07 | 
  Message.js                  |   38.46 |      100 |       0 |   38.46 | 61-64,68-71
  User.js                     |   28.45 |       20 |   23.33 |   29.16 | 43,194-198,209-222,226-243,247-255,259-263,267-268,272-297,301-310,323,341-356,367,374-375,379-395,399-414,418-421,425
 routes                       |     100 |      100 |     100 |     100 | 
  index.js                    |     100 |      100 |     100 |     100 | 
 server_middleware            |   36.36 |     37.5 |      50 |   36.36 | 
  isAuthenticated.js          |   70.58 |       75 |     100 |   70.58 | 19-20,24-26
  isPasswordRestTokenValid.js |       0 |        0 |       0 |       0 | 5-28
 services                     |   19.56 |      100 |   30.76 |   19.56 | 
  userService.js              |   19.56 |      100 |   30.76 |   19.56 | 5-57,65,72-80,87,94-108
 utils                        |     100 |      100 |     100 |     100 | 
  server.js                   |     100 |      100 |     100 |     100 | 
------------------------------|---------|----------|---------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------
Test Suites: 1 passed, 1 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        3.247 s, estimated 4 s
Ran all test suites.
```

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
