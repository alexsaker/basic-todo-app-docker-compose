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
const password = process.env.DB_PASSWORD || 'password';
const dbUser = process.env.DB_USER || 'root';

const setupDb = (db) => {
  db.query('create database todo_app;')
    .then(() => db.query('use todo_app;'))
    .then(() =>
      db.query(
        'create table todos (description varchar(255), id int primary key auto_increment);'
      )
    )
    .catch(console.log);
};

mysql
  .createConnection({
    host: isProd ? 'mysql-server' : 'localhost', // for container use 'mysql' otherwise use 'localhost'
    user: dbUser,
    password,
  })
  .then((_connection) => {
    connection = _connection;
    setupDb(connection);
    app.listen(PORT, () => console.log('Server is running on', PORT));
  });
