# Express.js Meme API

## Objectives

- Practice different kinds of HTTP methods
- Test requests with Postman

## Overview

Looking at your ```app.js``` you will find:
1. Initial setup for your server.
2. A variable called ```memes``` that we will use to apply our REST operations on.

NOTE: Please don't make any changes to the ```memes``` variable.

## Instructions

### Part 0: GET `/memes`

When you call the endpoint `/memes` return all the memes as JSON

### Part 1: POST `/memes`

Sending a POST method to the endpoint `/memes`
Use the `req.body` for the information you need to add a new meme

If no id provided:
- Respond with status `400` and a JSON message saying 'meme not created please provide an id'
Else:
- Push the new meme to the array
- Respond with status `201` and send the newly created meme

### Part 2: GET `/memes/:id`

If the id does not exist:
- Respond with status `422` and a JSON message saying `meme not found`
Else:
- Respond with status `200` and send the meme with the matching id

### Part 3: PUT `/memes/:id`

If the id does not exist:
- Respond with status `422` and a JSON message saying `meme not found`
Else:
- Use the `req.param` to change the item with the matching id
- Respond with status `200` and send the newly changed meme

### Part 4: DELETE `/memes/:id`

If the id does not exist:
- Respond with status `422` and JSON message saying `meme not found`
Else:
- Use the `req.param` to filter out the item with matching id
- Respond with status `200` and send the newly filtered array

### Part 5: GET `/memes/filter`

In this request we will use a query, using this query value we will filter our list of memes, in this example we will be passing a genre as a query, depending on this genre we will filter the memes that we have and return the filtered array with a status of `200`.


## Submission
1. Run `npm install` on the terminal to install the packages required to run submission tests.
2. Run `npm test` to verify your code before submission.
3. To submit your code run:
```bash
git add.
git commit -m "solve the lab"
git push origin main
```

## References
- [Query strings and params](https://stackabuse.com/get-query-strings-and-parameters-in-express-js/)
- [Using HTTP methods for RESTful services](https://www.restapitutorial.com/lessons/httpmethods.html)