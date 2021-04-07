require('dotenv').config();

const { google } = require('googleapis');
const { APIKEY, CX } = process.env

module.exports.google_ = (query_) => new Promise(async(re,err)=>{

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