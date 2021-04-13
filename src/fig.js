const mime = require('mime-types');
const Jimp = require("jimp");
const fs = require('fs');

module.exports.fig = (client, message, rere) => new Promise(async(re,err)=>{
    
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
                .quality(60)
                .write("figurinha.jpg") 
            }
          });
          await await_(2000)
          await client
      .sendImageAsSticker(message.from, 'figurinha.jpg')
      .then((result) => {
          re(rere)
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
            re(rere)
         }
        
  
        }
    }
})