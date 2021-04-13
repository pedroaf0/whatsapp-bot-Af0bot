module.exports.security = (client) =>{
    console.log('security mode on')
    client.onAddedToGroup(chatEvent => {
        console.log(chatEvent)
        //client.leaveGroup('00000000-000000@g.us');
      });
      client.onMessage(async(message) => {
          console.log(message.body.length)
          if (message.body.length > 200){
            await client.deleteMessage(message.from, [message.id.toString()])

            client.sendText(message.from, 'mensagens muito longas são apagadas automaticamente por questoes de segurança')
          }
      });
      client.onIncomingCall(async (call) => {
        console.log(call);
        client.sendText(call.peerJid, "Sorry, I still can't answer calls");
      });
      
      
}