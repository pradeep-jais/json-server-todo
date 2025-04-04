# Simple TODO app to utilize json-server

## Setup

- npm install -g json-server@0.17.4
  - Install json server globally
- create db.json file in your project and add json data
- json-server --watch db.json
  - Run local server at port 3000 with api endpoints
- Use these endpoints to interact using CRUD operations like GET, PUT, PATCH, DELETE

## Concepts learned

- json-server
- CRUD operations
- Event Delegation
- DOM traversal
- Promise(then/catch)
- async await

## Challenge faced

I was getting infinite page reloads on performing DELETE operation to local json data.

I was using local json-server with a file db.json. I was calling deleteItem directly in the app.js just for verifying if my delete function is working or not. But I did't know the fact that deleting data will refresh the page(due to live server) and deleteItem will run again getting error that data is not there in the server because it was deleted already.

## Key Takeaways:

- **Avoid side effects on page load:** Never call functions that modify server data (like DELETE, POST, etc.) directly in your script’s top-level scope.
- **Use event-driven logic:** Tie data mutations to user actions (clicks, form submissions).
- **Handle errors gracefully:** Assume network or server issues might occur.
