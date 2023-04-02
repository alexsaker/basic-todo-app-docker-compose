const express = require('express');
const mysql = require('mysql2/promise');

const cors = require('cors');

const app = express();

let connection = {
  query: (cmd) => new Promise.resolve(['something']),
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get('/todos', (req, res) => {
  connection.query('select * from todos').then(([cols]) => res.json(cols));
});

app.post('/add', (req, res) => {
  const { description } = req.body;

  connection
    .query(`insert into todos (description) values ('${description}')`)
    .then(() => {
      res.json({ todo: { description } });
    });
});

app.get('/test', (req, res) => {
  res.end('this is working');
});

app.get('/', (req, res) => {
  res.end('app is running');
});

const PORT = 3001;
const isProd = process.env.NODE_ENV === 'production';
const password = process.env.PASSWORD || 'password';

mysql
  .createConnection({
    host: isProd ? 'mysql-server' : 'localhost', // for container use 'mysql' otherwise use 'localhost'
    user: 'root',
    database: 'todo_app',
    password,
  })
  .then((_connection) => {
    connection = _connection;
    app.listen(PORT, () => console.log('Server is running on', PORT));
  });

// app.listen(PORT, () => console.log('App is listening on => ', PORT));
