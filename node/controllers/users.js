const connector = require('../connect');
const createUsersTable = (req, res) => {
  var sql =
    'create table users(username varchar(100) PRIMARY KEY UNIQUE,password varchar(100) not null,date_of_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP)';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
};

const getUsers = (req, res) => {
  var sql = 'select * from users';
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
};
const viewUser = (req, res) => {
  var sql = `select * from users where username=?`;
  connector.query(sql, [req.params.username], function (err, results) {
    res.json({ err, results });
  });
};
const postUsers = (req, res) => {
  const { username, password } = req.body;
  var sql = `insert into users (username,password) values (?,?)`;
  connector.query(sql, [username, password], function (err, results) {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        res.json({ status: 0, debug_data: 'username already exists' });
      } else {
        res.json(err);
      }
    } else {
      res.json({ status: 1, data: 'user created' });
    }
  });
};
const deleteUsers = (req, res) => {
  let sql = `delete from users where username=?`;
  connector.query(sql, [req.params.username], function (err, results) {
    res.json({ err, results });
  });
};
const deleteAllUsers = (req, res) => {
  let sql = `delete from users`;
  connector.query(sql, function (err, results) {
    res.json({ err, results });
  });
};
const updateUsers = (req, res) => {
  const { username, password } = req.body;
  var sql = `update users set username=?,password=? where username=?`;
  connector.query(
    sql,
    [username, password, req.params.username],
    function (err, results) {
      res.json({ err, results });
    }
  );
};
const checkLogin = (req, res) => {
  var sql = `select * from users where username=? and password=?`;
  connector.query(
    sql,
    [req.params.username, req.params.password],
    function (err, results) {
      if (err) {
        res.json(err);
      } else {
        if (results.length === 0) {
          req.session.isLoggedIn = 0;
          res.json({ status: 0, data: 'incorrect login details' });
        } else {
          req.session.username = req.params.username;
          req.session.isLoggedIn = 1;
          res.json({ status: 1, data: req.params.username });
        }
      }
    }
  );
};
const getLoggedUser = (req, res) => {
  if (req.session.isLoggedIn === 1) {
    let sql = `select * from users where username=?`;
    connector.query(sql, [req.session.username], function (err, results) {
      if (err) {
        res.json(err);
      } else {
        res.json({ status: 1, data: results });
      }
    });
  } else {
    res.json({ status: 0, debug_data: 'you are not logged in' });
  }
};
module.exports = {
  getUsers,
  postUsers,
  deleteUsers,
  deleteAllUsers,
  updateUsers,
  createUsersTable,
  viewUser,
  checkLogin,
  getLoggedUser,
};
