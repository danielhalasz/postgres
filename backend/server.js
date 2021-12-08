const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.post('/user', async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const newUser = await pool.query(
      'INSERT INTO users (name) VALUES ($1) RETURNING *',
      [name]
    );
    console.log(newUser.rows[0]);
    res.json(newUser.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.get(`/user`, async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (error) {
    console.log(error);
  }
});

app.get(`/user/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    res.json(user.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.put(`/user/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updateUser = await pool.query(
      'UPDATE users SET name = $1 WHERE id = $2',
      [name, id]
    );
    res.json('User Updated');
  } catch (error) {
    console.log(error);
  }
});

app.delete(`/user/:id`, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await pool.query('DELETE FROM users WHERE id = $1', [
      id,
    ]);
    res.json('User Deleted');
  } catch (error) {
    console.log(error);
  }
});

//listen
app.listen(5000, () => {
  console.log('Example app listening on port 5000!');
});
