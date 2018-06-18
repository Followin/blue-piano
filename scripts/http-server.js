const fs = require('fs');
const path = require('path');
const hapi = require('hapi');
const {promisify} = require('util');

const server = hapi.Server({
  host: '0.0.0.0',
  port: 8080,
});


async function start() {
  await server.register(require('inert'));

  server.route({
    method: 'GET',
    path: '/{filename*}',
    handler: async (request, h) => {
      const filename = request.params.filename;
      const brFilename = filename + '.br';
      const gzFilename = filename + '.gz';

      console.log('requested: ', request.path);

      if (!/\..*$/.test(filename)) {
        console.log('returning index');
        return h.file(resolve('index.html'));
      }

      if (acceptsEncoding(request.headers, 'br') && await exists(brFilename)) {
        console.log('serving brotli\'ed file instead', brFilename);
        return h.file(resolve(brFilename))
          .header('content-encoding', 'br')
          .header('content-type', 'application/javascript');
      }

      if (acceptsEncoding(request.headers, 'gzip') && await exists(gzFilename)) {
        console.log('serving gzip\'ed file instead', gzFilename);

        return h.file(resolve(gzFilename))
          .header('content-encoding', 'gzip')
          .header('content-type', 'application/javascript');
      }

      if (await exists(filename)) {
        console.log('serving original file', filename);
        return h.file(resolve(filename));
      } else {
        console.error('file not found ', filename);
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

function acceptsEncoding(headers, encoding) {
  return headers['accept-encoding'].split(',').map(x => x.trim()).includes(encoding);
}

async function exists(path) {
  try {
    return await promisify(fs.stat)(resolve(path));
  } catch {
    return false;
  }
}

function resolve(filePath) {
  return path.resolve(__dirname, '../dist/', filePath);
}
