const venom = require('venom-bot');
require('dotenv').config();

const puppeteer = require('puppeteer')
const { security } = require('./src/security.js')
const { books } = require('./src/books.js')
const { fig } = require('./src/fig.js')
const { red } = require('./src/red.js')
const { search } = require('./src/search.js')

const { doe, help } = require('./src/long_message.js')
const await_ =  (s)=> new Promise((re,err)=>{
  console.log(s)
  setTimeout(()=>{console.log("done"); re();}, s);
});


async function a(){
  
venom
  .create(
    'dev',    
    
    (base64Qrimg, asciiQR, attempts, urlCode) => {
    console.log('urlCode (data-ref): ', urlCode);
  },
  (statusSession, session) => {
    console.log('Status Session: ', statusSession); 
    console.log('Session name: ', session);
  },{puppeteerOptions: {args: [
    '--no-sandbox',
    '--disable-setuid-sandbox'
  ]
}}
)
  .then((client) => {start(client)})
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {
  var time = [];
  client.setProfilePic('profile/wake up.jpg');
  client.setProfileStatus('To ligado 😎');
  time[0] = setTimeout(()=>{client.setProfilePic('profile/tired.jpg');}, 20*60*1000);
  time[1] = setTimeout(()=>{client.setProfileStatus('To desligando 🙂');}, 20*60*1000);
  time[2] = setTimeout(()=>{client.setProfilePic('profile/sleeping.jpg');}, 29*60*1000);
  time[3] = setTimeout(()=>{client.setProfileStatus('😴 eu acordo às 6:00 AM');}, 29*60*1000);

  client.onMessage((message) => new Promise(async(re,err)=>{
    //anti trava zap
    if (message.type == 'oversized' || message.body.length > 500 ){  
      await client.blockContact(message.from);
      await client.deleteMessage(message.from, [message.id.toString()])
      await client.clearChatMessages([message.chatId]);
      await client.deleteChat([message.chatId]);
      re()
    }
    books(client, message, re())
    fig(client, message, re())
    red(client, message, re())
    search(client, message, re())

    if (message.body.includes("/doe")|| message.body.includes("/Doe")|| message.body.includes("doe")|| message.body.includes("Doe")|| message.body.includes("Doar") ) {
      client.startTyping(message.from);
      console.log(message.id.toString())
        await client.reply(
          message.from,
          doe,
          message.id.toString()
        );
      }
    if (message.body.includes("help")|| message.body.includes("Help") || message.body.includes("/help") || message.body.includes("/Help")) {
      client.startTyping(message.from);
      console.log(message.id.toString())
        await client.reply(
          message.from,
          help,
          message.id.toString()
        );  
    }
    
  }
    
   
  ));
  const http = require("http");

var express = require('express');
var app = express();
const server = http.createServer(app);
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', function(req, res) {
  client.setProfilePic('profile/wake up.jpg');
  client.setProfileStatus('To ligado 😎');
for (let index = 0; index < time.length; index++) {
  clearTimeout(time[index])
}

  time[0] = setTimeout(()=>{client.setProfilePic('profile/tired.jpg');}, 20*60*1000);
  time[1] = setTimeout(()=>{client.setProfileStatus('To desligando 🙂');}, 20*60*1000);
  time[2] = setTimeout(()=>{client.setProfilePic('profile/sleeping.jpg');}, 29*60*1000);
  time[3] = setTimeout(()=>{client.setProfileStatus('😴 ligue-me no link acima ⬆️');}, 29*60*1000);
  res.send('O bot de zap está rodando agora ;)');
});
server.listen(process.env.PORT || 3000)
}
}a()

