// 1. Import required modules
const http = require("http");
const fs = require("fs");
const path = require("path");

// 2. Create the server
const server = http.createServer((req, res) => {
  // Get the URL from the request (e.g., '/', '/about', '/styles.css')
  let url = req.url;

  // Set a default file path
  let filePath = path.join(__dirname, "index.html"); // Default to home page
  let contentType = "text/html";

  // --- This is the ROUTING logic ---
  // If the root URL '/' is requested, serve index.html
  if (url === "/") {
    filePath = path.join(__dirname, "index.html");
  }
  // If '/about' is requested, serve about.html
  else if (url === "/about") {
    filePath = path.join(__dirname, "about.html");
  }
  // If '/styles.css' is requested, serve the CSS file
  else if (url === "/contact-me") {
    filePath = path.join(__dirname, "contact-me.html");
  }
  // If the file doesn't exist, handle it as a 404
  else {
    filePath = path.join(__dirname, "404.html"); // Optional: create a 404.html page
  }

  // 3. Read the file and send the response
  fs.readFile(filePath, (err, content) => {
    if (err) {
      // If file is not found, send a 404 response
      if (err.code === "ENOENT") {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>404: Page Not Found</h1>");
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

// 4. Start listening for requests
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
