const { createServer } = require('http');
const { default: handler } = require('serve-handler');

const server = createServer((request, response) => {
  return handler(request, response, {
    public: './'
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
