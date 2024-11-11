const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Import routes
const apiRoutes = require("./routes/api");
app.use("/api/v1", apiRoutes);

app.listen(port, () => {
  console.log(`Server đang chạy ở cổng ${port}`);
  console.log(`Truy cập vào http://localhost:${port} để xem ứng dụng`);
});
