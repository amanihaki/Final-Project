import app from "./app";
import sqlite from "sqlite";
import SQL from "sql-template-strings";
import path from "path";
const bodyParser = require("body-parser");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: path.join(__dirname, "../public/images"),
  filename: (req, file, cb) => {
    const { fieldname, originalname } = file;
    const date = Date.now();

    const filename = `${fieldname}-${date}-${originalname}`;
    cb(null, filename);
  }
});

var upload = multer({ storage: storage });

app.get("/", (req, res) => res.send("ok"));

const start = async () => {
  const db = await sqlite.open("./db.sqlite");

  /**
   * Login
   */
 
  app.post("/login", async (req, res, next) => {
    const { username, password } = req.body;
    if (!username || !password) {
      res.json({
        success: false,
        message: "there is noo login"
      });
    }
    const query = SQL`SELECT username ,password,users_id FROM Users WHERE username = ${username} AND password = ${password}`;
    const student = await db.all(query);
    if (student.length === 0) {
      res.json({
        success: false,
        message: "Please check you login"
      });
    } else {
      res.json({
        success: true,
        user: student,
      
      });
    }
  });

  /**
   * Signup
   */

  app.post("/signup", upload.single("avatar"), async (req, res, next) => {
    const { username, password, email } = req.body;
    const image = req.file && req.file.filename;
    console.log(req.body);
    if (!username || !password || !email || !image) {
      res.json({
        success: false,
        message: "Complete your Sign up "
      });
    }
    const query = `INSERT INTO Users (username ,password,email,avatar) VALUES ('${username}','${password}','${email}','${image}') `;
    try {
      console.log(query);
      const student = await db.run(query);
      console.log(student.stmt.lastID);
      if (student.length === 0) {
        res.json({
          success: false,
          message: "Please check you sign up"
        });
      } else {
        res.json({
          success: true,
          user: student.stmt.lastID
        });
      }
    } catch (err) {
      console.log("===err===>", err);
    }

    next();
  });

  /**
   *
   * GEt categories
   */
  app.get("/cetegories", async (req, res) => {
    const sql = "SELECT * FROM Cateogries";
    console.log(sql);
    try {
      const cate = await db.all(sql);
      res.json({
        success: true,
        results: cate
      });
      console.log(">>>>>>>", cate);
    } catch (e) {
      res.status("404").json({
        success: false,
        message: e.message
      });
    }
  });

  /***
   * POST
   */

  app.post("/post", upload.single("post_images"), async (req, res, next) => {
    const { title, text } = req.body;
    const image = req.file && req.file.filename;
    console.log(req.body);
    if (!title || !text || !image) {
      res.json({
        success: false,
        message: "Complete your Post "
      });
    }

    try {
      const first_query = `INSERT INTO Images (images_name) VALUES ('${image}') `;
      console.log(first_query);
      const query1 = await db.run(first_query);
      console.log(query1.stmt.lastID);
      if (query1.length === 0) {
        res.json({
          success: false,
          message: "Please check your images"
        });
      } else {
        const second_query = `INSERT INTO Post (title,text,images_id,users_id) VALUES 
        ('${title}','${text}',${query1.stmt.lastID}',) `;
        console.log(second_query);
        const query2 = await db.run(second_query);
        if (query2.length === 0) {
          res.json({
            success: false,
            message: "Please check your post"
          });
        }
             
        res.json({
          success: true,
          first_query: query1.stmt.lastID,
          second_query: query2.stmt.lastID,
         
        });
      }
    } catch (err) {
      console.log("===err===>", err);
    }

    next();
  });

  app.listen(8080, () => console.log("server listening on port 8080"));
};
/**
 * 
 * Post_fashion
 */
// app.get("/fashion", async (req, res) => {
//   const sql = `SELECT Cateogries.* ,Images.* , Post.*, Users.username,Users.avatar from Users 
//   INNER JOIN Post ON Users.users_id = Post.users_id 
//   INNER JOIN Cateogries ON Cateogries.cate_id = Post.cate_id 
//   INNER JOIN Images ON Images.images_id = Post.images_id `;
//   console.log(sql);
//   try {
//     const post= await db.all(sql);
//     res.json({
//       success: true,
//       results: post
//     });
//     console.log(">>>>>>>", cate);
//   } catch (e) {
//     res.status("404").json({
//       success: false,
//       message: e.message
//     });
//   }
// });





start();
