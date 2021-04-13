require('dotenv').config();
const fs = require('fs');

const { google } = require('googleapis');
const { APIKEY, CX } = process.env

const google_ = (query_) => new Promise(async(re,err)=>{

  const options = {
    q: query_,
    auth: APIKEY,
    cx: CX,
    safe: 'high',
    hl: 'pt-BR'
  };
  const customsearch = google.customsearch('v1');
  const result = await customsearch.cse.list(options);
  const firstResult = result.data.items[0];
  const searchData = firstResult.snippet;
  const link = firstResult.link;
  console.log(result)
  re(result)

})

module.exports.search = (client, message, rere) => new Promise(async(re,err)=>{
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
        re(rere)
    }
    if (message.body.includes("/pdf")) {
      await client.reply(
        message.from,
        `⏳ Gerando PDF...`,
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
        re(rere)
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
      re(rere)
      }
})