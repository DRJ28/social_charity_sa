const express = require("express");
const app = express();
require("dotenv").config({ path: "./../.env" });
const { UploadToS3, GetFileObject } = require("./server/Utils/s3");
const { connectionTest, queryUserList } = require("./server/Utils/dbConnect");

const multer = require("multer");
const storage = require("multer").memoryStorage();
const upload = multer({ storage });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

console.log(process.env.NODE_ENV);

app.use(express.static(__dirname + "/client/build"));

app.use("/user", require("./server/routes/userRoute"));
app.use("/admin", require("./server/routes/adminRoute"));
app.use("/teacher", require("./server/routes/teacherRoute"));
app.use("/student", require("./server/routes/studentRoute"));

app.post("/uploadFile", upload.single("file"), async (req, res) => {
  const { file } = req;
  const { error, key } = await UploadToS3(file);
  debugger;
  if (error) {
    res.status(500).send({ error });
  } else {
    res.send({ msg: key });
  }
});
app.post("/getFile", async (req, res) => {
  console.log("gettinf file");
  const fileLink = await GetFileObject(req.body.link);
  console.log(fileLink);
  res.send({ file: fileLink });
});

app.get("/getUser", async (req, res) => {
  const result = await queryUserList();
  res.send({ data: result });
});

app.listen(8080, () => {
  console.log("using bucket");
  connectionTest();
  console.log(process.env.AWS_BUCKET);
  console.log("server server is listening on port 8000");
});
