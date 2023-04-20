import './style.css';
import { files } from './files';
import { WebContainer } from '@webcontainer/api';
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css';

let webcontainerInstance;
let terminal

document.querySelector('#app').innerHTML = `  
  <div class="editor">
    <textarea>Write text here…</textarea>
  </div>
  <div class="preview">
    <iframe src="loading.html"></iframe>
  </div>
  <div class="terminal"></div>
`

const iframeEl = document.querySelector('iframe');
const textareaEl = document.querySelector('textarea');
const terminalEl = document.querySelector('.terminal');

window.addEventListener('load', async () => {
  handleTextarea()
  attachTerminal()
  await bootMountWebcontainer();
  await logMountedFiles();
  const exitCode = await installDependencies(terminal);
  console.log('exit code after installation is', exitCode)
  if (exitCode !== 0) {
    throw new Error('Installation failed', installProcess.exit);
  };
  startDevServer(terminal);
});

function handleTextarea() {
  textareaEl.value = files['index.js'].file.contents;

  textareaEl.addEventListener('input', (e) => {
    writeIndexJS(e.currentTarget.value);
  });
}

async function bootMountWebcontainer() {
  console.time('boot and mount webcontainer')
  webcontainerInstance = await WebContainer.boot();
  await webcontainerInstance.mount(files);
  console.timeEnd('boot and mount webcontainer')
}

async function logMountedFiles() {
  console.time('read files')
  const packageJSON = await webcontainerInstance.fs.readFile('package.json', 'utf-8');
  const indexJS = await webcontainerInstance.fs.readFile('index.js', 'utf-8');
  console.timeEnd('read files')
}

async function installDependencies(terminal) {
  console.time('install dependencies')
  const installProcess = await webcontainerInstance.spawn('npm', ['install']);
  console.timeEnd('install dependencies')

  installProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        terminal.write(data);
      }
    })
  );

  return installProcess.exit
}

async function startDevServer() {
  console.time('start express server')
  const serverProcess = await webcontainerInstance.spawn('npm', ['run', 'start']);
  console.log('express server starting…')

  serverProcess.output.pipeTo(
    new WritableStream({
      write(data) {
        terminal.write(data)
      },
    })
  );

  webcontainerInstance.on('server-ready', (port, url) => {
    iframeEl.src = url;
  });
  console.timeEnd('start express server')
}

async function writeIndexJS(content) {
  console.time('write to index.js')
  await webcontainerInstance.fs.writeFile('/index.js', content);
  console.timeEnd('write to index.js')
};

function attachTerminal() {
  terminal = new Terminal({
    convertEol: true,
  });
  terminal.open(terminalEl);
}
