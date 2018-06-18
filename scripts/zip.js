const zlib = require('zlib');
const brotli = require('brotli');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelinePromise = promisify(pipeline);

const fs = require('fs');
const path = require('path');
const glob = require('glob');

(async function () {
  await glob("/**/*.+(js|css)", {
    root: path.resolve(__dirname, "../dist")
  }, async (er, files) => {
    for (let file of files) {
      await brotliFile(file);
    }
  });
})();

async function gzipFile(file) {
  await pipelinePromise(
    fs.createReadStream(file),
    zlib.createGzip(),
    fs.createWriteStream(file + ".gz")
  );
}

function brotliFile(file) {
  return new Promise((res, rej) => {
    const read = fs.readFileSync(file);
    const result = brotli.compress(read);

    const write = fs.createWriteStream(file + ".br");
    write.write(result);
    write.end();

    res();
  });
}
