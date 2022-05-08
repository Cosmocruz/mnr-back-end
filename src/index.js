require("dotenv").config();
require("./database/dbLogging");
const db = require("./database/connections.js");
const express = require("express");
const { json } = require("express/lib/response");
const app = express();
// app.use(express()json())
app.use(express.json());

const handleStudentInsert = (body) => {
  return new Promise((resolve, reject) => {
    let name = body.name;
    let classs = body.class;
    let rollNo = body.rollNo;
    let section = body.section;
    db.query(
      "INSERT INTO `students` (name,class,rollNo,section) VALUES (?,?,?,?) ",
      [name, classs, rollNo, section],
      (err, result, field) => {
        if (err) {
          resolve({
            error: true,
            errorMessage: err,
            data: result,
          });
        }
        resolve({
          error: false,
          errorMessage: null,
          data: result,
        });
      }
    );
  });
};

const handleGetStudentById = (id) => {
  return new Promise((resolve,reject) => {
    let x = parseInt(id);
    if (isNaN(x)) {
      reject(
        resolve({
          error: true,
          errorMessage:"Id is not a valid Key",
          data: result,
        })
      );
    }
    db.query("SELECT * FROM students WHERE ID = ? ", [x], (err, data) => {
      if (err) {
        resolve({
          error: true,
          errorMessage:err,
          data: result,
        })
      }
      if (data.length < 1) {
        resolve({
          error: false,
          errorMessage: "Not Found",
          data: result,
        });
      } else {
        // res.send(data[0]);
        resolve({
          error: false,
          errorMessage: "",
          data,
        });s
      }
    });
    return;
  });
};

app.get("/api/v1/student", (req, res) => {
  db.query("SELECT * FROM students", (err, data) => {
    if (err) {
      console.log("Something went wrong", err);
      return;
    }
    res.send(data);
  });
});

app.get("/api/v1/student/:id", (req, res) => {
  let x = parseInt(req.params.id);
  if (isNaN(x)) {
    res.send({
      error: "wrong id Proviede",
    });
    return;
  }
  db.query("SELECT * FROM students WHERE ID = ? ", [x], (err, data) => {
    if (err) {
      console.log("Something went wrong", err);
      res.send({
        err,
      });
      return;
    }
    if (data.length < 1) {
      res.send({
        error: "not foung",
      });
    } else {
      res.send(data[0]);
    }
  });
  return;
});

app.post("/api/v1/student/", async (req, res) => {
  const body = req.body;
  let confrimation = await handleStudentInsert(body);
  console.log("the valu in confirmationis : ", confrimation);
  // let name = body.name;
  // let classs = body.class;
  // let rollNo = body.rollNo;
  // let section = body.section;
  // db.query(
  //   "INSERT INTO `students` (name,class,rollNo,section) VALUES (?,?,?,?) ",
  //   [name, classs, rollNo, section],
  //   (err, result , field) => {
  //     if (err) {
  //       console.log("some thing went wrong and can't help", err);
  //       res.status(500).send({ message: "some thing went wrong here" });
  //       return;
  //     }
  //     res.status(201).send(result);
  //     return;
  //   }
  // );
  res.send({ hello: "billa che chuk byakel" });
});

app.all("*", (req, res) => {
  res.send({
    error: "not found 4o4",
  });
});

// connection.end();
app.listen(3500, () => {
  console.log("the App  is running on port 8080  ");
});
