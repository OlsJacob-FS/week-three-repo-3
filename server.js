require("dotenv").config("./.env");

if ((!process.env.API_KEY, !process.env.FIRSTNAME, !process.env.LASTNAME)) {
  throw new Error("Missing required environment variables");
}

const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;

const fs = require("fs");
let directory_name = "./";
let filenames = fs.readdirSync(directory_name);

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/html");

  let fileList = "<ul>";
  filenames.forEach((file) => {
    fileList += `<li>${file}</li>`;
  });
  fileList += "</ul>";

  res.end(`
    <html>
      <body>
      <h3>Welcome ${process.env.FIRSTNAME} ${process.env.LASTNAME}</h3>
        <h1>Directory Contents:</h1>
        ${fileList}
        <h1>Api key:</h1>
        <h2>${process.env.API_KEY}</h2>
      </body>
    </html>
  `);
});
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
