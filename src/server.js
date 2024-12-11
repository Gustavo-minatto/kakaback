require("express-async-errors");
require("dotenv/config");

const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();
const corsOptions = {
  origin: 'https://testeadvocacia.netlify.app', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(routes);

app.use((error, request, response, next) => {
  if (error) {
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    });
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));
