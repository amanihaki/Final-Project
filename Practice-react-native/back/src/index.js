import app from "./app";
import sqlite from "sqlite";
import SQL from "sql-template-strings";
const http = require("http").Server(app);
import path from "path";
const io = require("socket.io")(http);
const jwt = require("jsonwebtoken");
const multer = require("multer");
var moment = require("moment");
/// Multer
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
    const query = SQL`SELECT username ,password,users_id FROM Users
     WHERE username = ${username} AND password = ${password}`;
    const rows = await db.get(query);
    const user = rows;
    if (!user) {
      res.json({
        success: false,
        message: "Please check you login"
      });
    } else {
      const users_id = user.users_id;
      console.log(">>>>users_id", user.users_id);
      const token = jwt.sign({ users_id }, "RANDOM_TOKEN_SECRET", {
        expiresIn: "24h"
      });
      res.json({
        success: true,
        user: user,
        token: token
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

    try {
      const cate = await db.all(sql);
      res.json({
        success: true,
        results: cate
      });
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
    const { title, text, users_id, cate_id } = req.body;
    console.log(">>", req.body);
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
        const second_query = `INSERT INTO Post (title,text,images_id,users_id,cate_id) VALUES ('${title}','${text}','${query1.stmt.lastID}','${users_id}','${cate_id}') `;
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
          second_query: query2.stmt.lastID
        });
      }
    } catch (err) {
      console.log("===err===>", err);
    }

    next();
  });

  /**
   *
   * Posts Selected
   */

  app.get("/posts/:cate_id/:user_id", async (req, res) => {
    const sql = `SELECT Cateogries.* ,Images.* , Post.*, Users.username,Users.avatar from Users 
  INNER JOIN Post ON Users.users_id = Post.users_id 
  INNER JOIN Cateogries ON Cateogries.cate_id = Post.cate_id 
  INNER JOIN Images ON Images.images_id = Post.images_id 
  WHERE Cateogries.cate_id = ?`;

    try {
      const post = await db.all(sql, [req.params.cate_id]);
      const posts = post.map(async p => {
        const stmt = `Select * from Likes where post_id=${p.post_id}`;
        const likes = await db.all(stmt);
        let userLiked = 0;
        likes.map(like => {
          if (like.users_id == req.params.user_id) userLiked = like.statuss;
        });
        p.likes = [...likes];
        p.userLiked = userLiked;
        return p;
      });
      if (posts) {
        const postss = post.map(async c => {
          const stmt = `SELECT Comments.*, Users.username, Users.avatar , t.counter 
        FROM Users INNER JOIN Comments 
        ON Comments.users_id = Users.users_id 
        CROSS JOIN (SELECT COUNT(*) counter  FROM Comments WHERE post_id = ${c.post_id})  t
        WHERE Comments.post_id = ${c.post_id}`;
          const Comments = await db.all(stmt);
          c.Comments = [...Comments];
          return c;
        });
        console.log(">>>>", await Promise.all(postss));
        res.json({
          success: true,
          results: await Promise.all(postss)
        });
      } else {
        console.log("ERRRRRRRORRR in postssssss");
      }
    } catch (e) {
      res.status("404").json({
        success: false,
        message: e.message
      });
      console.log("errrrrorr", e.message);
    }
  });

  /****
   * DELETING_POST
   */

  app.post("/deletePost", upload.none(), async (req, res, next) => {
    const { post_id, cate_id, users_id, images_id } = req.body;
    if (!post_id || !cate_id || !users_id || !images_id) {
      res.json({
        success: false,
        message: "There is an error in Insert "
      });
    }
    const query = `SELECT users_id,post_id FROM Post WHERE  users_id = ${users_id} AND Post_id=${post_id} `;
    try {
      const user_id = await db.get(query);
      if (user_id) {
        const deletePost = `DELETE FROM Post WHERE post_id =${post_id} AND  cate_id =${cate_id}  And users_id= ${users_id} And images_id = ${images_id}`;
        const deleted = await db.run(deletePost);
        console.log("The post deleted successfully", deleted);
        if (deleted) {
          const deleteimage = `DELETE FROM images WHERE  images_id = ${images_id}`;
          const deleted2 = await db.run(deleteimage);
          console.log("The image deleted successfully", deleted2);
        } else {
          console.log("No image to delete");
        }
      } else {
        console.log("Nothing Deleted ");
      }
    } catch (err) {
      console.log("===err===>", err);
    }

    next();
  });

  /**
   *
   * Authentication for Edit and deleting
   */

  app.get("/authentication/:post_id/:users_id", async (req, res) => {
    const { post_id, users_id } = req.params;
    const sql = `SELECT Images.* , Post.*, Users.username,Users.avatar from Users 
    INNER JOIN Post ON Users.users_id = Post.users_id 
    INNER JOIN Images ON Images.images_id = Post.images_id 
    WHERE Post.post_id =${post_id} AND Post.users_id=${users_id} `;
    const selectToUpdate = await db.get(sql);
    try {
      if (!selectToUpdate) {
        res.json({
          success: false,
          results: null
        });
      } else {
        res.json({
          success: true,
          results: selectToUpdate
        });
      }
    } catch (e) {
      res.status("404").json({
        success: false,
        message: e.message
      });
    }
  });

  /**
   *
   * Users
   */

  app.get("/users/:users_id", async (req, res) => {
    const { users_id } = req.params;
    const sql = `SELECT  Users.username,Users.avatar,Users.users_id from Users Where Users.users_id =${users_id} `;

    try {
      const user = await db.get(sql);
      if (!user) {
        res.json({
          success: false,
          results: user
        });
      } else {
        res.json({
          success: true,
          results: user
        });
      }
    } catch (e) {
      res.status("404").json({
        success: false,
        message: e.message
      });
      console.log("errrrrorr", e.message);
    }
  });

  /***
   *
   * LikeAndDislike
   */

  app.post("/LikeAndDislike", upload.none(), async (req, res, next) => {
    const { status, users_id, post_id } = req.body;
    console.log("here", status, users_id, post_id);
    if (!status || !users_id || !post_id) {
      res.json({
        success: false,
        message: "There is an error in Insert "
      });
    }
    const query = `SELECT statuss , users_id, post_id FROM Likes WHERE  users_id = ${users_id} AND post_id = ${post_id} `;
    try {
      const check1 = await db.get(query);
      if (check1) {
        if (check1.statuss == status) {
          const query3 = `DELETE FROM Likes WHERE statuss = ${status} AND users_id = ${users_id} AND post_id = ${post_id} `;
          const check3 = await db.run(query3);
          console.log("DELET Successfully");
        } else if (check1.statuss != status) {
          const query4 = `UPDATE Likes SET statuss= ${status} WHERE  users_id = ${users_id} AND post_id = ${post_id} `;
          const check4 = await db.run(query4);
          console.log("UPDATE DONE");
        }
      } else {
        const query2 = `INSERT INTO Likes (statuss , users_id , post_id) VALUES (${status},${users_id},${post_id}) `;
        const check2 = await db.run(query2);
        console.log("INSERT DONE");
      }
    } catch (err) {
      console.log("===err===>", err);
    }

    next();
  });

  /***
   *
   * Comments
   */

  app.post("/comments", upload.none(), async (req, res, next) => {
    const { comments, users_id, post_id } = req.body;

    if (!comments || !users_id || !post_id) {
      res.json({
        success: false,
        message: "There is an error in Insert "
      });
    }
    let date = new Date();
    const dateFormat = moment(date).format();
    const query = `INSERT INTO Comments (comment ,date_comment,users_id,post_id) VALUES ('${comments}','${dateFormat}','${users_id}','${post_id}') `;
    try {
      console.log(query);
      const Comment = await db.run(query);
      console.log(Comment.stmt.lastID);
      if (Comment.length === 0) {
        res.json({
          success: false,
          message: "Please check you comment"
        });
      } else {
        res.json({
          success: true,
          Comment: Comment.stmt.lastID
        });
      }
    } catch (err) {
      console.log("===err===>", err);
    }

    next();
  });

  /***
   *
   *EditPost
   */

  app.post(
    "/Editpost",
    upload.single("post_images"),
    async (req, res, next) => {
      // let columns = Object.keys(req.body);
      // let rows = Object.values(req.body);
      // let stmt = 'UPDATE Post Set';
      // columns.map((column,index)=>{
      //   stmt+= `${column} = ${rows} `
      // })
      // try{}catch(err){}
      const { images_id, post_id, users_id, text, title } = req.body;
      const post_images = req.file && req.file.filename;
      console.log("images", post_images);
      try {
        if (post_images && !text && !title) {
          const sql4 = `UPDATE Images SET  images_name= "${post_images}" WHERE images_id= ${images_id}`;
          const check4 = await db.run(sql4);
          console.log("Update Image done succssfully", check4);
        } else if (post_images && text && !title) {
          const sql5 = `UPDATE Images SET  images_name= "${post_images}" WHERE images_id= ${images_id}`;
          const check4 = await db.run(sql5);
          if (check4) {
            const sql6 = `UPDATE Post SET  text= "${text}" WHERE post_id= ${post_id}`;
            const check3 = await db.run(sql6);
          }
          console.log("Update Image And Text done succssfully");
        } else if (title && text && !post_images) {
          const sql11 = `UPDATE Post SET  title= "${title}" AND text= "${text}" WHERE post_id = ${post_id}`;
          const check11 = await db.run(sql11);
          console.log("Update Text And Title done succssfully", check11);
        } else if (title && !post_images && !text) {
          const sql2 = `UPDATE Post SET  title= "${title}" WHERE post_id= ${post_id}`;
          const check2 = await db.run(sql2);
          console.log("Update Title done succssfully", check2);
        } else if (text && !post_images && !title) {
          const sql3 = `UPDATE Post SET  text= "${text}" WHERE post_id= ${post_id} `;
          const check3 = await db.run(sql3);
          console.log("Update Title done succssfully", check3);
        } else if (post_images && title && !text) {
          const sql7 = `UPDATE Images SET  images_name= "${post_images}" WHERE images_id= ${images_id}`;
          const check7 = await db.run(sql7);
          if (check7) {
            const sql8 = `UPDATE Post SET  title= "${title}" WHERE post_id= ${post_id}`;
            const check3 = await db.run(sql8);
          }
          console.log("Update Image And Title done succssfully");
        } else {
          const sql9 = `UPDATE Images SET  images_name= "${post_images}" WHERE images_id= ${images_id}`;
          const check9 = await db.run(sql9);
          if (check9) {
            const sql10 = `UPDATE Post SET  title= "${title}" AND text="${text}" WHERE post_id= ${post_id}`;
            const check3 = await db.run(sql10);
          }
          console.log("Update Image,Title And Text done succssfully");
        }
      } catch (err) {
        console.log("===err===>", err);
      }

      next();
    }
  );

  http.listen(8080, () => console.log("server listening on port 8080"));

  io.on("connect", socket => {
    console.log("a user connected");

    socket.emit("data", () => {
      console.log("from backend");
    });
    socket.on("join", ({ amani }, callback) => {
      console.log("connected", amani);
    });

    socket.on("send", ({ text, date, users, idUserto }) => {
      const query = `INSERT INTO Messages (message , date, from_user , to_user) VALUES ('${text}','${date}'
     , ${users} , ${idUserto} ) `;
      const runSqlite = db.run(query);
      if (runSqlite) {
        console.log("******Correct*********");
      } else {
        console.log("ERROR");
      }
    });
  });

  const fetchMessages = async () => {
    const queryMessages = "SELECT * FROM Messages";
    const selectMessages = await db.all(queryMessages);
    return selectMessages;
  };
  const selectMessages = await fetchMessages();
  console.log("*****Messages*****", selectMessages);
 
  /// Sending Messages to frontend
  setInterval(() => {
    io.emit("selectM", { data: selectMessages});
  }, 1000);
};

start();
