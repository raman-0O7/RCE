
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path')
const Redis = require('ioredis');

const code = process.env.CODE;
const USER_ID = process.env.USER_ID;

const publisher = new Redis('');

function publishLogs(log) {
  publisher.publish(`logs:${USER_ID}`, JSON.stringify(log))
}

async function runCode() {
  fs.writeFileSync(path.join(__dirname, 'code.js'), code);
  publishLogs('starting');
  const p = exec(`node code.js`);
  publishLogs('exec done')
  p.stdout.on('data', function (data) {
    console.log('LOGS: ' + data.toString());
    publishLogs(data.toString());
  });
  p.stdout.on('error', function (data) {
    console.log('ERROR: ' + data.toString());
    publishLogs('ERROR: ' + data.toString());
  });

  p.on('close', function () {
    publishLogs('DONE: Execution Completed');
  })
}

runCode();