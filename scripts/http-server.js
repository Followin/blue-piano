const fs = require('fs');
const path = require('path');
const hapi = require('hapi');
const {promisify} = require('util');

const server = hapi.Server({
  host: '127.0.0.1',
  port: 8080,
});


async function start() {
  await server.register(require('inert'));

  server.route({
    method: 'GET',
    path: '/{filename*}',
    handler: async (request, h) => {
      const filename = request.params.filename;

      if (/\..*$/.test(filename) && await exists('../dist/' + filename)) {
        return h.file(resolve('../dist/' + filename));
      } else {
        return h.file(resolve('../dist/' + 'index.html'));
      }
    }
  });

  try {
    await server.start();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }

  console.log('Server is running at: ', server.info.uri);
}

start();

async function exists(path) {
   return await promisify(fs.stat)(resolve(path));
}

function resolve(filePath) {
  return path.resolve(__dirname, filePath);
}
