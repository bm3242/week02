const http = require("http");
const fs = require("fs").promises;

const requestListener = function(req, res) {
    console.log(req.url);

    if (req.url === "/") {
        fs.readFile(__dirname + "/page.html")
            .then(contents => {
                res.setHeader("Content-Type", "text/html; charset=UTF-8");
                res.writeHead(200);
                res.end(contents);
            })
            .catch(error => {
                res.writeHead(500);
                res.end("Error reading page.html: " + error.message);
            });
    } else if (req.url === "/data") {
        fs.readFile(__dirname + "/data.json")
            .then(contents => {
                res.setHeader("Content-Type", "application/json; charset=UTF-8");
                res.writeHead(200);
                res.end(contents);
            })
            .catch(error => {
                res.writeHead(500);
                res.end("Error reading data.json: " + error.message);
            });
    } else {
        res.writeHead(404);
        res.end("Not Found");
    }
};

const server = http.createServer(requestListener);

const host = "0.0.0.0";
const PORT = 8080;
server.listen(PORT, host, () => {
    console.log(`Server is running`);
});
