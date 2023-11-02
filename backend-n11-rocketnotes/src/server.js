require("express-async-errors");
require("dotenv/config");

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");

const cors = require("cors");
const express = require("express");
const routes = require("./routes");
const { UPLOADS_FOLDER } = require("./configs/upload");

migrationsRun();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/files", express.static(UPLOADS_FOLDER));

app.use(routes);

app.use((error, request, response, next) => {
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: "error",
      error: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    status: "error",
    error: "Internal Server Error",
  });
});

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
