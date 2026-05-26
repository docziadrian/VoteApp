const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const polls = require("./routes/polls");
const options = require("./routes/options");
const votes = require("./routes/votes");

dotenv.config();

const app = express();

const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/polls", polls);
app.use("/options", options);
app.use("/votes", votes);

app.listen(PORT, () => {
  console.log(`Az app fut: ${HOST}:${PORT}`);
});
