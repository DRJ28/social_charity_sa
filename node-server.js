const express = require("express");
const app = express();
require("dotenv").config();
const { UploadToS3, GetFileObject } = require("./server/Utils/s3");

const multer = require("multer");
const storage = require("multer").memoryStorage();
const upload = multer({ storage });

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

console.log(process.env.NODE_ENV);

app.use(express.static(__dirname + "/client/build"));

app.use("/user", require("./server/routes/userRoute"));

app.get("/getUserDetails", (req, res) => {
  res.send({
    name: "Dheeraj",
    role: "Admin",
  });
});

app.post("/uploadFile", upload.single("file"), (req, res) => {
  const { file } = req;
  console.log(file);
  const { error, key } = UploadToS3(file);
  if (error) {
    res.status(500).send({ error });
  } else {
    res.send({ msg: key });
  }
});
app.get("/getFile", async (req, res) => {
  console.log("gettinf file");
  const fileLink = await GetFileObject("IMG_20180324_182154.jpg");
  console.log(fileLink);
  res.send({ file: fileLink });
});

app.listen(8080, () => {
  console.log("server server is listening on port 8080");
});
