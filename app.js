import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import parseBody from "./helpers/parser.js";

const app = express();

const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "about.html"));
});

app.get("/contact-me", (req, res) => {
  res.sendFile(path.join(__dirname, "pages", "contact-me.html"));
});

app.post("/contact", async (req, res) => {
  const messageObj = await parseBody(req);

  console.log(messageObj.name);
  console.log(messageObj.email);
  console.log(messageObj.message);

  res.redirect(303, "/");
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "pages", "404.html"));
});

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`Server is listening for requests on port ${PORT}`);
});
