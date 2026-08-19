import http from "node:http";
import fs from "node:fs/promises";
import parseBody from "./helpers/parser.js";

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/top_favicon.svg") {
    const favicon = await fs.readFile("./public/top_favicon.svg");

    res.writeHead(200, {
      "Content-Type": "image/svg+xml",
    });

    res.end(favicon);
    return;
  }

  res.setHeader("Content-Type", "text/html");

  let path = "./pages/";
  switch (req.url) {
    case "/": {
      res.statusCode = 200;
      path += "index.html";
      break;
    }

    case "/about": {
      res.statusCode = 200;
      path += "about.html";
      break;
    }

    case "/contact-me": {
      res.statusCode = 200;
      path += "contact-me.html";
      break;
    }

    // POST
    case "/contact": {
      if (req.method === "POST") {
        const messageObj = await parseBody(req);

        console.log(messageObj.name);
        console.log(messageObj.email);
        console.log(messageObj.message);

        res.writeHead(303, {
          Location: "/",
        });

        res.end();
        return;
      } else {
        res.statusCode = 404;
        path += "404.html";
        break;
      }
    }

    default: {
      res.statusCode = 404;
      path += "404.html";
      break;
    }
  }

  const data = await fs.readFile(path);
  res.end(data);
});

server.listen(3000, "localhost", () => {
  console.log("Server is listening for requests on port 3000");
});
