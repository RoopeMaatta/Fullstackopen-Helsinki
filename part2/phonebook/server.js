const express = require('express');
const jsonServer = require('json-server');
const cors = require('cors');

const app = express();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

// Enable CORS for all routes
// app.use(cors());

// Apply default middlewares (logger, static, cors and no-cache)
app.use(middlewares);

app.use((req, res, next) => {
  res.header('Content-Type', 'application/json');
  next();
});

// Use json-server router
app.use('/api', router);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});



// const jsonServer = require('json-server');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();
// const cors = require('cors');

// // Enable CORS for all routes
//  server.use(cors());


// // Enable CORS for only single origin
// // server.use(cors({
// //  origin: 'https://roopemaatta-humble-sniffle-7g7pqv564pwhrpp-3000.app.github.dev'
// // }));


// server.use(middlewares);

// server.use((req, res, next) => {
//   res.header('Content-Type', 'application/json');
//   next();
// });

// server.use(router);
// server.listen(3001, () => {
//   console.log('JSON Server is running on port 3001');
// });
