const venom = require('venom-bot');
require('dotenv').config();
const fs = require('fs');
const mime = require('mime-types');
const Jimp = require("jimp")
const puppeteer = require('puppeteer')


const { redid, redpesquisa } = require('./src/red.js')
const { google_ } = require('./src/search.js')
const await_ =  (s)=> new Promise((re,err)=>{
  console.log(s)
  setTimeout(()=>{console.log("done"); re();}, s);
});


async function a(){
  
venom
  .create(
    'sessionName',    
    
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
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  var time = [];
  client.setProfilePic('profile/wake up.jpg');
  client.setProfileStatus('To ligado 😎');
  time[0] = setTimeout(()=>{client.setProfilePic('profile/tired.jpg');}, 20*60*1000);
  time[1] = setTimeout(()=>{client.setProfileStatus('To desligando 🙂');}, 20*60*1000);
  time[2] = setTimeout(()=>{client.setProfilePic('profile/sleeping.jpg');}, 29*60*1000);
  time[3] = setTimeout(()=>{client.setProfileStatus('😴 ligue-me no link acima ⬆️');}, 29*60*1000);

  client.onMessage(async(message) => {
   // console.log(message)
    if (message.body.includes("/Redid") || message.body.includes("/redid")) {
      client.startTyping(message.from);

  const { data } = await redid(message.body.split(' ')[1]);
  var desc;
  if(data.descricao){
  desc = '\n\nDescrição: '+data.descricao;
  }else{
  desc = '';
  }
    await  client
        .sendText(message.from, 
`Tema: *${data.titulo}*

Modelo: *${data.genero.nome}*${desc}

Id: ${data.id}; link: pedroaf0.cf/bot/#/Redid%20${data.id}`
          )
        .then((result) => {
         // console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
        client.startTyping(message.from);

        await client
              .sendImage(
                message.from,
                data.endImagem,
                data.titulo,
              )
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
              });

    }
 
    if (message.body.includes("/Redtema") || message.body.includes("/redtema")) {
      client.startTyping(message.from);

  const { data } = await redid(Math.round(Math.random()*100));
  var desc;
  if(data.descricao){
  desc = '\n\nDescrição: '+data.descricao;
  }else{
  desc = '';
  }
    await  client
        .sendText(message.from, 
`Tema: *${data.titulo}*

Modelo: *${data.genero.nome}*${desc}

Id: ${data.id}; link: pedroaf0.cf/bot/#/Redid%20${data.id}`
          )
        .then((result) => {
         // console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
        client.startTyping(message.from);

        await client
              .sendImage(
                message.from,
                data.endImagem,
                data.titulo,
              )
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
              });

    }
 
  if (message.body.includes("/redpesquisa")) {
      client.startTyping(message.from);

      const { data } = await redpesquisa(message.body.split('/redpesquisa').join(''));
      var _message = `*Resultado da pesquisa:* ${message.body.split('/redpesquisa ').join('')}`;
      for (let index = 0; index < data.length; index++) {
        _message += `\n\nTema: *${data[index].titulo}*\nId: ${data[index].id}; link: pedroaf0.cf/bot/#/Redid%20${data[index].id}`
      }
        console.log(_message)

      client
        .sendText(message.from, _message)
        .then((result) => {
         // console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
    if (message.body.includes("/procure")) {
      client.startTyping(message.from);

      const  data  = await google_(message.body.split('/procure ').join(''));
      var _message = `*Resultado da pesquisa:* ${message.body.split('/procure ').join('')}\n_Use_ \`\`\`/pdf <link>\`\`\` _para obter uma pagina_`;
      for (let index = 0; index < data.data.items.length; index++) {
        if(data.data.items[index].link.length < 151)  _message += `\n\n*${data.data.items[index].title}*\nlink: ${data.data.items[index].link}`
      }
        console.log(_message)

      client
        .sendText(message.from, _message)
        .then((result) => {
         // console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
 
    if (message.body === 'Joga a moeda') {
     // await client.stopTyping(message.from);

      var v ='';
      if (Math.random()*100 > 500 ) {
        v = "Cara"
      }else{
        v = "Coroa"
      }
    console.log(message.id.toString())
      await client.reply(
        message.from,
        `Moeda no ar... E o resultado é *${v}*`,
        message.id.toString()
      );

    }
    if (message.body.includes("/pdf")) {
      await client.reply(
        message.from,
        `⏳ Gerando PDF...

função em faze de testes, pode não funcionar`,
        message.id.toString()
      )
      await client.startTyping(message.from);
      const browser = await puppeteer.launch({args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });
      const page = await browser.newPage();
      await page.goto("https://outline.com/"+message.body.split('/pdf ').join(''));
      await await_(1500);
      try {
        await page.evaluate(`document.querySelector("body > outline-app > outline-article > outline-toolbar > div").style = "display: none;"`);
        await page.evaluate(`for(var i=0;i<document.getElementsByClassName('google-auto-placed').length;i++){document.getElementsByClassName('google-auto-placed')[i].style = "display: none;";}`);
  
      } catch (error) {
        
      }
      await page.pdf({ path: 'hn.pdf', format: 'a4' });
      await client
      .sendFile(
        message.from,
        'hn.pdf',
        message.body.split('/pdf ').join(''),
        message.body.split('/pdf ').join('')
      )
      .then((result) => {
        console.log('Result: ', result); //return object success
      })
      .catch((erro) => {
        console.error('Error when sending: ', erro); //return object error
      });
      await browser.close();
      fs.unlinkSync('hn.pdf');
      }
    if (message.body === 'Ping'|| message.body === 'ping' ) {
      client.startTyping(message.from);
      console.log(message.id.toString())
        await client.reply(
          message.from,
          `Pong!`,
          message.id.toString()
        );
      }
    if (message.body.includes("/doe")|| message.body.includes("/Doe")|| message.body.includes("doe")|| message.body.includes("Doe")|| message.body.includes("Doar") ) {
      client.startTyping(message.from);
      console.log(message.id.toString())
        await client.reply(
          message.from,
`*Obrigado pelo interesse*

Se você acredita que a tecnologia pode mudar a educação e o mundo
faça uma doação em: https://picpay.me/pedroaf0
_Coloque na descrição que você está doando para o bot_

O dinheiro arrecadado será usado para colocar o bot em um servidor contínuo. Dessa forma ele ficará sempre online, ajudando assim quem que só tem o whatsapp ilimitado nos dados móveis

Info. técnica:
Precisamos de US $ 7 (Atualmente R$40,00 pode baixar(eu espero)) por mês para que o bot fique sempre disponivel
https://www.heroku.com/pricing
`,
          message.id.toString()
        );
      }
    if (message.body.includes("help")|| message.body.includes("Help") || message.body.includes("/help") || message.body.includes("/Help")) {
      client.startTyping(message.from);
      console.log(message.id.toString())
        await client.reply(
          message.from,
`💡 *Mapa completo das funções* 📌

*Diversas:*

\`\`\`/fig\`\`\`
_Tranforma images em figurinhas_
Uso: enviar o comando junto na imagem na legenda dela


*Educação:*
\`\`\`/procure <palavras chaves>\`\`\`
_Faz uma pesquisa_
Ex: /procure como fazer uma redação

\`\`\`/pdf <link>\`\`\`
_Disponibiliza o pdf de uma pagina apartir de um link_
Ex: /pdf blog.imaginie.com.br/como-fazer-uma-redacao-passo-a-passo/

\`\`\`/Redtema\`\`\`
_Sorteia um tema de redação e envia a imagem da proposta_

\`\`\`/Redpesquisa <palavras chaves>\`\`\`
_Procura temas a partir do termo pesquisado_
Ex: /Redpesquisa 2020

\`\`\`/Redid <id>\`\`\`
_Para obter a proposta de um tema pesquisado_
Ex: /Redid 80

\`\`\`/doe\`\`\`
*Ajude esse bot para que ele ajude mais pessoas!*
_Faça uma doação e permita que ele fique sempre online!_`,
          message.id.toString()
        );
      }
    if (message.body.includes("/ban") ) {
     // client.startTyping(message.from);
    console.log( await client.getGroupAdmins(message.chatId))
    const adms = await client.getGroupAdmins(message.chatId)
    var elee = false;
    for (let index = 0; index < adms.length; index++) {
      if(message.author  === adms[index]._serialized){
        elee = true;
        if ('17045473206@c.us' === message.mentionedJidList[0]){
          await client.reply(
                message.from,
                `Opa amigão, não vou me banir não`,
                message.id.toString()
              )
             }else{
             try {
               await client.removeParticipant(message.chatId, message.mentionedJidList[0]);
               await client.reply(
                message.from,
                `Banido`,
                message.id.toString()
              );
             } catch (error) {
               
             
             await client.reply(
              message.from,
              `Opa amigão, parece que eu não sou adm`,
              message.id.toString()
            );
             }
             }        
      }
    }
    if(!elee){
      await client.reply(
        message.from,
        `Opa amigão, parece que vc não é adm`,
        message.id.toString()
      )
    }


    }
    if (message.caption){
    if (message.caption.includes("/fig") ) {

      await client.reply(
        message.from,
        `Pera ai`,
        message.id.toString()
      );

       try {
        const buffer = await client.decryptFile(message);
        const fileName = `figurinha.${mime.extension(message.mimetype)}`;
        await fs.writeFile(fileName, buffer, (err) => {});
        Jimp.read(`figurinha.${mime.extension(message.mimetype)}`, async function (err, image) {
          if (err) {
            console.log(err)
          } else {
            image
              .resize(256, 256) // resize
              .quality(50)
              .write("figurinha.jpg") 
          }
        });
        await await_(2000)
        await client
    .sendImageAsSticker(message.from, 'figurinha.jpg')
    .then((result) => {
      console.log('Result: ', result); //return object success
    })  .catch((erro) => {
      console.error('Error when sending: ', erro); //return object error
    });
    fs.unlinkSync('figurinha.jpg');
       } catch (error) {
          await client.reply(
            message.from,
            `Não deu, tente cortar a imagem menor`,
            message.id.toString()
          );
       }

      
    }
    
  }
    
   
  });
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

