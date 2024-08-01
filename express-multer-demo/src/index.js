const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    try {
      fs.mkdirSync(path.join(process.cwd(), "uploads"));
    } catch (e) {}
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    console.log("filename:", file);
    const uniqueSuffix =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      "-" +
      file.originalname;
    console.log("uniqueSuffix:", uniqueSuffix);
    file.originalname = Buffer.from(file.originalname, "latin1").toString(
      "utf8"
    );
    cb(null, file.fieldname + "-" + file.originalname);
  },
});

const app = express();
app.use(express.static("public"));
app.use(cors());

// const upload = multer({ dest: "uploads/" });
const upload = multer({ storage: storage });
app.post("/aaa", upload.single("aaa"), function (req, res, next) {
  console.log("req.title:", req.file);
  console.log("req.body:", req.body);
  res.json("ok");
});

app.post("/bbb", upload.array("bbb", 2), function (req, res) {
  console.log("req.files:", req.files);
  console.log("req.body:", req.body);
});
app.post(
  "/ccc",
  upload.fields([
    {
      name: "aaa",
      maxCount: 3,
    },
    {
      name: "bbb",
      maxCount: 2,
    },
  ]),
  function (req, res, next) {
    console.log("req.files:", req.files);
    console.log("req.body", req.body);
  }
);
app.listen(3002, () => {
  console.log(`server is listening 3002 ${"http://localhost:3002/"}`);
});
