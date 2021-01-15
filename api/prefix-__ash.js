import fetch from 'node-fetch';
import qs from "qs";

export const prefix__ash = async (search) => {

   const { P, N, L1, L2, L3} = search;

   let resp = {
      SearchResults: []
   };

   return new Promise(async (resolve, reject) => {

      let prefix1 = (P || 'ANY').toUpperCase()
      let numbers = N || 'ANY';
      let letter1 = (L1 || 'ANY').toUpperCase();
      let letter2 = (L2 || 'ANY').toUpperCase();
      let letter3 = (L3 || 'ANY').toUpperCase();

      console.log({prefix1, numbers, letter1, letter2, letter3});

      const body = {
         style: 'p',
         prefix1,
         numbers,
         letter1,
         letter2,
         letter3,
         orderBy: 'plate',
         maximumPrice: 'undefined',
         pageSize: 20,
         MaxResults: '[object Object]50000'
      };

      const rawResponse = await fetch("https://www.plates4less.co.uk/scripts/supersearch/GetSearchResults42.asp", {
         "headers": {
            "accept": "text/plain",
            "accept-language": "en-US,en;q=0.9",
            "cache-control": "no-cache",
            "content-type": "application/x-www-form-urlencoded",
            "pragma": "no-cache",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "x-requested-with": "XMLHttpRequest",
            "cookie": "_ga=GA1.3.1662382390.1602520723; plates4less-_zldp=MsrBQVMKNMpvhubte2l4fD%2FKkvRHUHjQNybooFW9xgeJcs%2B%2Fd2heBrfGSy1tcAMcLIm6uYDqJjk%3D; _gid=GA1.3.428340864.1610722314; ASPSESSIONIDCUCBTDTA=KIKANIKACJCJJFHJHFDOKJLK; _gat=1"
         },
         "referrer": "https://www.plates4less.co.uk/",
         "referrerPolicy": "strict-origin-when-cross-origin",
         "method": "POST",
         "mode": "cors",
         "body": qs.stringify(body, {format: 'RFC1738'}),
      });

      const text = await rawResponse.text();

      try {
         resp = JSON.parse(text);
      } catch (e) {
         console.log('Unable to parse it what');
         console.log(text);
      }

      resolve({ search, results: resp.SearchResults });

   });

}
