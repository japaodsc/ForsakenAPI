const request = require("request-promise");
const fetch = require("node-fetch")
const cheerio = require("cheerio");
const fs = require("fs");
const urlvn = "https://ncov.moh.gov.vn";
const urlw = "https://www.worldometers.info/coronavirus";
const urln = "https://ncov.moh.gov.vn/vi/web/guest/tin-tuc"
const _under = require("underscore");
const https = require('https');
const { get } = require("request-promise");
const cron = require('node-cron')
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
const options = {
  method: 'POST',
  agent: httpsAgent,
}
let country = "Vietnam";


function sleep(ms) {
  return new Promise((resolve) => {
  setTimeout(resolve, ms);
 });
 }
//async function log(){
module.exports = async function() {
  let now = new Date();
  let time = now.toLocaleTimeString();
  let data = await Promise.all([
    fetch(urlvn, options).then((resmoh) => resmoh.text()),
    fetch(urln, options).then((resttx) => resttx.text())
  ])

    const $ = cheerio.load(data[0]);
    const $$ = cheerio.load(data[1]);
    //VIETNAM DATA//
    let vncases = $('span.font24').eq(0).text()
    let vndeaths = $('span.font24').eq(3).text()
    let vnrecovering = $('span.font24').eq(1).text()
    let vnrecovered = $('span.font24').eq(2).text()

    let vn = {
      "time" : time,
       "vietnam": {
        "cases": vncases.replace(/\./g,""),  
        "deaths": vndeaths.replace(/\./g,""),
        "recovering": vnrecovering.replace(/\./g,""),
        "recovered": vnrecovered.replace(/\./g,"")
       }

      }
    //WORLD DATA//
    let wcases = $('span.font24').eq(4).text()
    let wdeaths = $('span.font24').eq(7).text()
    let wrecovering = $('span.font24').eq(5).text()
    let wrecovered = $('span.font24').eq(6).text()
    let world = {
    "world": {
      "cases": wcases.replace(/\./g,""),  
      "deaths": wdeaths.replace(/\./g,""),
      "recovering": wrecovering.replace(/\./g,""),
      "recovered": wrecovered.replace(/\./g,"")
    }
   }
   //NEWS DATA//
   let newsdata = $$("div.portlet-body > div > a > h2.mt-3").text();
   let news = {
    "news": newsdata
  }
  let cdata = await _under.extend(vn, world, news)
  return cdata;
}
//log()

/*async function log(){
  let cdata = await getData();
  await fs.writeFile("./resources/cdata.json", JSON.stringify(cdata), () => {console.log("CDATA|| Đã ghi dữ liệu mới - " + cdata.time)})
}
 module.exports = function() {
   cron.schedule('1 * * * *', () => log())
  }
*/


/*async function getDataByCountry(){
  return await fetch(urlw, options)
   .then(rep => rep.text())
   .then(body => {
     const $ = cheerio.load(body);
     rows = $("table#main_table_countries_today tbody tr");
     rows.each((i, elem) => {
    const row = [];
      $(elem).children("td").each((i, elem) => {
        row.push($(elem).text().trim().replace(/,/g, ""))
      });
      if (country.indexOf(row[1]) > -1) {
        let confirmed = row[2];
        let deaths = row[4];
        let recovered = row[6];
        let recovering = row[7];
        console.log(confirmed);
       }
   })
})
}
getDataByCountry();*/
