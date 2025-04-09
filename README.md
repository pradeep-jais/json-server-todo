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

## how to handle a "fake" backend API for your published project, moving away from your local `json-server`.

You've actually already implemented one of the most common solutions in your code!

```JS
// const API_URL = 'http://localhost:3000'; // This is for local development ONLY
const API_URL =
'https://my-json-server.typicode.com/pradeep-jais/json-server-api'; // This is one way for a published app
```

### Understanding the Problem: Localhost vs. Production

### Localhost (`json-server`)

- When you run `json-server --watch db.json`, it starts a web server on your computer (usually at [http://localhost:3000](http://localhost:3000)).
- Only you (or someone on your exact local network) can access this server.

### Production/Published App

- When you deploy your HTML, CSS, and JS files to a hosting service (like GitHub Pages, Netlify, Vercel, etc.), users access it from their computers over the internet.
- Their browsers **cannot** connect to your `localhost:3000`.
- They need a **publicly accessible URL** for the API.

---

## Solutions for a "Fake" Public API

### ✅ my-json-server (typicode.com) - _What you are using!_

**How it works:**

- This free service reads a `db.json` file (or a similar structure) directly from a public GitHub repository.
- It automatically creates REST API endpoints based on the keys in your JSON file.

**Your Setup:**

- You have: `https://my-json-server.typicode.com/pradeep-jais/json-server-api`
  - A GitHub repo named `json-server-api` under the username `pradeep-jais`.
  - Inside that repo, there's likely a `db.json` file.
  - The service reads this file and provides endpoints like `/todos`, `/todos/:id`, etc.

**Pros:**

- ✅ Free and extremely easy to set up (just need a public GitHub repo).
- ✅ Perfect for demos, prototypes, and simple examples.
- ✅ No server management needed.

**Cons:**

- ❌ **Read-only Persistence:** While `POST`, `PUT`, `PATCH`, `DELETE` requests appear to work, they **do not permanently** modify the `db.json` in GitHub.
- ❌ Data is public (reads from a public repo).
- ❌ Rate limits might apply.
- ❌ Limited features compared to a real backend or even a self-hosted `json-server`.

---

## Hosting `json-server` Yourself (e.g., Render, Glitch, Heroku)

**How it works:**

- Create a minimal Node.js app to run `json-server`, pointing it to your `db.json`.
- Deploy this Node.js app to a platform that supports Node.js.

**Pros:**

- ✅ Full functionality of `json-server`, including data persistence.
- ✅ More control than `my-json-server`.

**Cons:**

- ❌ Requires setting up a Node.js project and deploying it.
- ❌ Choose a hosting platform (Render has a free tier; Glitch is good for demos).
- ❌ Free tiers may sleep after inactivity.
- ❌ File-based persistence may not be reliable long-term unless configured correctly.

---

## Other Mock API Services (e.g., MockAPI.io, Beeceptor)

**How it works:**

- Platforms for creating mock APIs. Define your data structure and endpoints through a UI.

**Pros:**

- ✅ Often more features than `my-json-server`.
- ✅ User-friendly interface.

**Cons:**

- ❌ Stricter limitations on free tiers (e.g., requests, data size).
- ❌ Less control compared to hosting your own `json-server`.

---

## Backend-as-a-Service (BaaS): Firebase, Supabase

**How it works:**

- Real databases with easy APIs (REST or SDKs).
- Define data structure on their platform.

**Pros:**

- ✅ True data persistence.
- ✅ Scalable and reliable.
- ✅ Free tiers are generous.
- ✅ Can include auth and more.

**Cons:**

- ❌ More complex setup than `json-server`.
- ❌ API structure differs from `json-server`, requiring changes in frontend.
- ❌ Might be overkill for simple or temporary APIs.

---

## Conclusion for Your Project

You're currently using `my-json-server.typicode.com`, which is:

- ✅ **Great for demos/prototypes**
- ❌ **Not suitable for apps needing persistent data**

### If you want persistent data:

- **Option A (Closer to current setup):** Host `json-server` yourself (e.g., Render).
- **Option B (More robust):** Use a BaaS like **Supabase** or **Firebase**.

For now, your current `API_URL` pointing to `my-json-server.typicode.com` allows your app to function publicly, but **writes are not permanent**.
