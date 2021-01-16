import fetch from 'node-fetch';
import qs from "qs";
import {API_OPTS, API_PATH} from "../src/api/api.conf.js";

export const northernireland___ash = async (search) => {

   let resp = {
      SearchResults: []
   };

   if (!search) return Promise.resolve({ a:0, search, results: resp.SearchResults });

   const { searchString } = search;

   return new Promise(async (resolve, reject) => {

      const body = {
         style: 'i',
         searchString,
         prefix1: '',
         orderBy: 'plate',
         maximumPrice: 'undefined',
         pageSize: 200,
         MaxResults: '20000'
      };

      const rawResponse = await fetch(API_PATH, {
         ...API_OPTS,
         "body": qs.stringify(body, {format: 'RFC1738'}),
      });

      const text = await rawResponse.text();

      try {
         resp = JSON.parse(text);
      } catch (e) {
         console.log('Unable to parse it what', search);
      }

      resolve({a: resp.SearchResults.length, search, results: resp.SearchResults});

   });

}

// fetch("https://www.plates4less.co.uk/scripts/supersearch/GetSearchResults42.asp", {
//    "headers": {
//       "accept": "text/plain",
//       "accept-language": "en-US,en;q=0.9",
//       "cache-control": "no-cache",
//       "content-type": "application/x-www-form-urlencoded",
//       "pragma": "no-cache",
//       "sec-fetch-dest": "empty",
//       "sec-fetch-mode": "cors",
//       "sec-fetch-site": "same-origin",
//       "x-requested-with": "XMLHttpRequest",
//       "cookie": "_ga=GA1.3.1662382390.1602520723; plates4less-_zldp=MsrBQVMKNMpvhubte2l4fD%2FKkvRHUHjQNybooFW9xgeJcs%2B%2Fd2heBrfGSy1tcAMcLIm6uYDqJjk%3D; _gid=GA1.3.428340864.1610722314; _gat=1; ASPSESSIONIDCUCBTDTA=DFGENIKAGPOCKOPJPOIPPNKF"
//    },
//    "referrer": "https://www.plates4less.co.uk/",
//    "referrerPolicy": "strict-origin-when-cross-origin",
//    "body": "style=d&searchString=AS&prefix1=&prefix2=&prefix3=&numbers=&letter1=&letter2=&letter3=&maximumPrice=undefined&orderBy=plate&pageSize=20&MaxResults=20000",
//    "method": "POST",
//    "mode": "cors"
// });
