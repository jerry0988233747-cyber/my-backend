const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 連接 MongoDB
mongoose.connect("mongodb://localhost:27017/mytodos")
  .then(() => console.log("MongoDB 連接成功！"))
  .catch((err) => console.log("連接失敗：", err));

// 建立資料格式
const taskSchema = new mongoose.Schema({
  text: String,
  done: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

// 取得所有待辦事項
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// 新增待辦事項
app.post("/tasks", async (req, res) => {
  const task = new Task({
    text: req.body.text,
    done: false,
  });
  await task.save();
  res.json(task);
});

// 刪除待辦事項
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "刪除成功" });
});

app.listen(3000, () => {
  console.log("伺服器啟動，port 3000");
});