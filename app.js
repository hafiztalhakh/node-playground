const http = require('http');

const server = http.createServer((req, res) => {
  //   console.log(req);
  console.log('Hello World');
  process.exit();
});

// server.listen(8080)
server.listen(8080, () => {
  console.log('Server is Running');
});
