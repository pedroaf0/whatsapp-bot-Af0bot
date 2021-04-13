const request = require("request");



const redpesquisa = (query_) => new Promise((re,err)=>{
    var options = {
        method: 'GET',
        url: 'https://services.redacaonota1000.com.br/api/v2/temas',
        qs: {ativo: 'true', size: '24', sort: 'datInclusao,desc', texto: query_,},
        headers: {
          host: 'services.redacaonota1000.com.br',
          connection: 'keep-alive',
          pragma: 'no-cache',
          'cache-control': 'no-cache',
          'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not\"A\\Brand";v="99"',
          accept: 'application/json, text/plain, */*',
          authorization: 'RED1000 eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI0ZjBmNDQ1Yi1jYmZiLTQ3ZDctOTMzZS1kOTVjY2I0NGM0YjUiLCJub21lIjoiUGVkcm8iLCJhcGVsaWRvIjoicGVkcm8iLCJwZXJmaWwiOiJBTFVOT19CMkMiLCJpYXQiOjE2MTcxOTU3MTUsImV4cCI6MTYyMjM3OTcxNX0.ffWfukbBIz77k9LD6OUJo9CL3osaujh-er1CeetowisbkTXUapEqN7WFvI1ROvOKdBiZmMkoPzc0nrg3BGIR7DVtU7Jkgt2c8QTIVe4Txfw3TFz3Jfh6ePDKorPomyw6FQujDI0-Lwv072SEQhHNtruo5KnCTaoRMHh5KWJZ8ZNLGm6a97KMHKsD80v_pasREbDu7tBvkN7SkLwMwJedA8TVqAQgbB303-yp0zBBoe3K-oBG8XYmRRdvP4HyS_27C8cLoa7uhgJaFoNpmcexIf2stSI44KD4iIK-QfJyExG4nGjc_sZX7RybqsWWbbEztGNnO1wUENKQY0jP6lUJiQ',
          'sec-ch-ua-mobile': '?1',
          'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Mobile Safari/537.36',
          origin: 'https://portal.redacaonota1000.com.br',
          'sec-fetch-site': 'same-site',
          'sec-fetch-mode': 'cors',
          'sec-fetch-dest': 'empty',
          referer: 'https://portal.redacaonota1000.com.br/',
          'accept-encoding': 'gzip, deflate, br',
          'accept-language': 'en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7'
        }
      };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(JSON.parse(body))
        re(JSON.parse(body));
      });
      
});

const redid = (id) => new Promise((re,err)=>{

    var options = {
      method: 'GET',
      url: `https://services.redacaonota1000.com.br/api/v2/temas/${id}`,
      headers: {
        host: 'services.redacaonota1000.com.br',
        connection: 'keep-alive',
        pragma: 'no-cache',
        'cache-control': 'no-cache',
        'sec-ch-ua': '"Google Chrome";v="89", "Chromium";v="89", ";Not\"A\\Brand";v="99"',
        accept: 'application/json, text/plain, */*',
        authorization: 'RED1000 eyJhbGciOiJSUzUxMiJ9.eyJzdWIiOiI0ZjBmNDQ1Yi1jYmZiLTQ3ZDctOTMzZS1kOTVjY2I0NGM0YjUiLCJub21lIjoiUGVkcm8iLCJhcGVsaWRvIjoicGVkcm8iLCJwZXJmaWwiOiJBTFVOT19CMkMiLCJpYXQiOjE2MTcyODM3NjQsImV4cCI6MTYyMjQ2Nzc2NH0.eXO10B7KNRyLMg5wT8_lKnGMghl5Oo6ERRR25u8jdoOLeFa7X_gF0moEYXLU791OOmihhZUlHXLOoLIvGIbsW0TIaMJTJch-vqYtGXD-zAUxx5B92pHOqTBi6KRrgvR0W6IbxHAmHoCSYidDjHxbt2NEy8seK7xrrYYVmmpzk4tpV2tew0HhRNP9_VD3TpXUkGGyjkfUrATrNgLme3jcuTtg52960wvNOpO7wcRoSAUl-9QcLuzR36sTztpPyUBKFkiPRfr6GLMG24BcMW3aN8mFC3JppU9rIqvRvuGvncojIXpQB5gMtgm0fs_C5YPSlMnVVNEJumJPHF95vbhvxg',
        'sec-ch-ua-mobile': '?1',
        'user-agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Mobile Safari/537.36',
        origin: 'https://portal.redacaonota1000.com.br',
        'sec-fetch-site': 'same-site',
        'sec-fetch-mode': 'cors',
        'sec-fetch-dest': 'empty',
        referer: 'https://portal.redacaonota1000.com.br/',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7'
      }
    };
    
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    console.log(JSON.parse(body))
      re(JSON.parse(body));
    });
    
      
});

module.exports.red = (client, message, rere) => new Promise(async(re,err)=>{
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
              console.error('Error when sending: ', erro);
              client.sendText(message.from, 'não foi possível enviar a imagem')
              //return object error
            });
re(rere)
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
        console.error('Error when sending: ', erro);
         //return object error
         client.sendText(message.from, 'não foi possível enviar a imagem')
      });

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
re(rere)
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
      re(rere)
  }
})