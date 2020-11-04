const request = require("request-promise");
const fetch = require("node-fetch")
const cheerio = require("cheerio");
const fs = require("fs");
const url = "https://www.foxnews.com/elections/2020/general-results";
const _under = require("underscore");
const https = require('https');
const { get } = require("request-promise");
const cron = require('node-cron')
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
const options = {
  method: 'GET',
  agent: httpsAgent,
  headers: {
    "Content-Length": 0
  }
}


function sleep(ms) {
  return new Promise((resolve) => {
  setTimeout(resolve, ms);
 });
 }
// debug async function lol() {
module.exports= async function() {
  let now = new Date();
  let time = now.toLocaleTimeString();
  let data = await Promise.all([
    fetch(url, options).then((res) => res.text())
  ])

    const $ = cheerio.load(data[0]);
    
    //VOTES//
    let bidenElect = $('div.party-label>div.info>div.count').eq(0).text()
    let trumpElect = $('div.party-label>div.info>div.count').eq(1).text()
    let bidenVotes =$('div.bar-wrap.has-label-upper.has-label-lower>div.bar-label.is-lower>div.label.label-left>div.popular-vote.dem>span.count').text()
    let bidenPercent =$('div.bar-wrap.has-label-upper.has-label-lower>div.bar-label.is-lower>div.label.label-left>div.popular-vote.dem>span.percent').text()
    let trumpVotes =$('div.bar-wrap.has-label-upper.has-label-lower>div.bar-label.is-lower>div.label.label-right>div.popular-vote.rep>span.count').text()
    let trumpPercent =$('div.bar-wrap.has-label-upper.has-label-lower>div.bar-label.is-lower>div.label.label-right>div.popular-vote.rep>span.percent').text()

    let election = {
      "time" : time,
       "info": {
        "bidenElect": bidenElect,  
        "trumpElect": trumpElect,
        "bidenVotes": bidenVotes,
        "bidenPercent": bidenPercent,
        "trumpVotes": trumpVotes,
        "trumpPercent": trumpPercent,
       }
      }
      
  return election;
  
    }
// debug lol();