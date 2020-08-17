const request = require("request-promise");
const fetch = require("node-fetch")
const cheerio = require("cheerio");
const fs = require("fs");
const urlvn = "https://ncov.moh.gov.vn";
const urlw = "https://www.worldometers.info/coronavirus";
const urln = "https://vnanet.vn/vi/tin-tuc/suc-khoe-7/"
const _under = require("underscore");
const https = require('https');
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
const options = {
  method: 'POST',
  agent: httpsAgent,
}

let country = "Vietnam";
async function getVNData() {
  return await fetch(urlvn,options)
      .then(res => res.text())
      .then(body => {
    const $ = cheerio.load(body);    
    let now = new Date();
    let time = now.toLocaleTimeString();
    let vncases = $('span.font24').eq(0).text()
    let vndeaths = $('span.font24').eq(3).text()
    let vnrecovering = $('span.font24').eq(1).text()
    let vnrecovered = $('span.font24').eq(2).text()

    let vn = {
      "time" : time,
       "vietnam": {
        "cases": vncases,  
        "deaths": vndeaths,
        "recovering": vnrecovering,
        "recovered": vnrecovered
       }
      }
      return vn;
    });
  }
async function getWData() {
  return await fetch(urlw,options)
      .then(res => res.text())
      .then(body => {
        const $ = cheerio.load(body);
        let wcases = $('div.maincounter-number').eq(0).children().text();
        let wdeaths = $('div.maincounter-number').eq(1).children().text();
        let wrecovering = $('div.number-table-main').eq(0).text();
        let wrecovered = $('div.maincounter-number').eq(2).children().text();
        let world = {
        "world": {
          "cases": wcases.replace(/,/g,""),  
          "deaths": wdeaths.replace(/,/g,""),
          "recovering": wrecovering.replace(/,/g,""),
          "recovered": wrecovered.replace(/,/g,"")
        }
       }
    return world;
  })
}  
async function getNews() {
  return await fetch(urln,options)
      .then(res => res.text())
      .then(body => {
         const $ = cheerio.load(body);
         let newsdata = $("div.grp-panel > a").eq(0).text();
         let news = {
          "news": newsdata
        }
        return news;
      });
    }
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

module.exports = async function () {
  let vndata = await getVNData();
  let wdata = await getWData();
  let newsdata = await getNews();
  let cdata = await _under.extend(vndata, wdata, newsdata)
  //console.log(cdata);
  //fs.writeFile("/var/www/html/moh-data.json", JSON.stringify(cdata), () => {console.log("Da write file thanh cong.")})
  return cdata;
  }