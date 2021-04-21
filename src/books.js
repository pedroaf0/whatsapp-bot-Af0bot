var request = require("request");

module.exports.books = (client, message, rere) => new Promise(async(re,err)=>{
    if (message.body.includes("/busquelivro")) {

        var options = {
          method: 'GET',
          url: 'https://plmcbks.amanoteam.com/search/books',
          qs: {
            query_name: message.body.split('/busquelivro ').join(''),
            search_type: 'fast',
            page_number: '0',
            max_items: '15'
          }
        };
        
        request(options, function (error, response, body) {
          body = JSON.parse(body)
          console.log(body)
          if (!body.error){
          var _message = `*Resultado da pesquisa:* ${message.body.split('/busquelivro ').join('')}
_Use /baixarlivro <id> para baixar o livro_
\`\`\`Ex: /baixarlivro 15\`\`\``
          for (let index = 0; index < body.results.items.length; index++) {
              const element = body.results.items[index];
              if (element.type.id == 2 & element.documents[0].file_extension != 'markdown'){
              var editora = '', autor = '';
              if (element.author !== null){autor = `\n*Autor(a):* ${element.author.name}`;}else{autor = ''; editora = '\n'}
              if (element.publisher !== null){editora += `*Editora:* ${element.publisher.name}`;}else{editora = '';}
              _message += `

*Titulo:* ${element.title}${autor} ${editora}
*Tipo:* ${element.documents[0].file_extension} *Tamanho:* ${Math.round(element.documents[0].file_size/100000)/10} MB id: ${element.id}`
          }}
          client
        .sendText(message.from, _message)
        }else{
            client
        .sendText(message.from, `Não achei nada sobre: ${message.body.split('/busquelivro ').join('')}`)
        }
    });
        
        re(rere)
    }
    if (message.body.includes("/baixarlivro")){
      try {
              var options = {
        method: 'GET',
        url: `https://plmcbks.amanoteam.com/books/${message.body.split('/baixarlivro ').join('')}`
      };
      
      request(options, async function (error, response, body) {
        body = JSON.parse(body)
        console.log(body)
        console.log("baixar")
        const element = body;
        if (element.type.id == 2 & element.documents[0].file_extension != 'markdown'){
        var editora = '', autor = '', sera;
        if (element.author !== null){autor = `\n*Autor(a):* ${element.author.name}`;}else{autor = ''; editora = '\n'}
        if (element.publisher !== null){editora += `*Editora:* ${element.publisher.name}`;}else{editora = '';}
        if (Math.round(element.documents[0].file_size/1000000)==1){sera = 'será'}else{sera = 'serão'}
         var _message = `*Baixando livro:* ${element.title}${autor} ${editora}
*Tipo:* ${element.documents[0].file_extension} id: ${element.id}
*Tamanho:* ${Math.round(element.documents[0].file_size/1000000)} MB 
Se 4 MB são baixados e enviados em 7 mim
Em quanto tempo ${Math.round(element.documents[0].file_size/100000)/10} MB serão baixados?
Você saberá a resposta em breve 🙃`
        client.sendText(message.from, _message)
        await client
        .sendFile(
          message.from,
          `https://plmcbks.amanoteam.com/download/${element.documents[0].id}`,
          `${element.title}`,
          `${element.title}${autor} ${editora}`
        )
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
            client.sendText(message.from, `Não deu, tente baixar em outro formato`);
        })
      }else{
        client.sendText(message.from, `Não deu, tente baixar em outro formato`);
      }
    })
  } catch (error) {
    client.sendText(message.from, `Não deu, tente baixar em outro formato`);

  }
}
})