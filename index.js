const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  let url = req.url;

  let filePath = path.join(__dirname, "index.html");
  let contentType = "text/html";

  if (url === "/") {
    filePath = path.join(__dirname, "index.html");
  } else if (url === "/about") {
    filePath = path.join(__dirname, "about.html");
  } else if (url === "/contact-me") {
    filePath = path.join(__dirname, "contact-me.html");
  } else {
    filePath = path.join(__dirname, "404.html");
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If file is not found, send a 404 response
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end(content, "utf8");
      } else {
        // For any other server error, send a 500 response
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // If file is found, send a 200 (OK) response
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf8");
    }
  });
});

// Start listening for requests
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
