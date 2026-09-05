import express from "express";
import parseBody from "./helpers/parser.js";

const app = express();

const PORT = process.env.PORT || 8080;

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact-me", (req, res) => {
  res.render("contact-me");
});

app.post("/contact", async (req, res) => {
  const messageObj = await parseBody(req);

  console.log(messageObj.name);
  console.log(messageObj.email);
  console.log(messageObj.message);

  res.redirect(303, "/");
});

app.use((req, res) => {
  res.status(404).render("404");
});

app.listen(PORT, (err) => {
  if (err) throw err;

  console.log(`Server is listening for requests on port ${PORT}`);
});
