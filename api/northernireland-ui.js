import {
   NORTHERN_IRELAND_TEMPLATE,
   plateToTemplate,
   PREFIX_TEMPLATE,
   REGISTRATION_PATTERN_MAP
} from "../src/lib/helpers.core.js";

export const getNorthernIreland = (plate = 'ASH') => {

   console.log('getNorthernIreland', plate);

   // return [{
   //    searchString: plate
   // }];

   const templates = REGISTRATION_PATTERN_MAP[NORTHERN_IRELAND_TEMPLATE].map(template => template.replace(/\s/gi, ''));

   const testPlate = plateToTemplate(plate);
   const getNumber = plate.match(/[0-9]{1,4}/gi);
   const containsNumber = !!getNumber;

   console.log('testPlate', { templates, testPlate, containsNumber, getNumber });

   const indexes = templates.reduce((matches, template) => {
      //TODO DD55DDD and DD55DD for 2 search AB returns 4 indexes
      const index = template.indexOf(testPlate);
      if (index >= 0) {
         const matched = template.substr(index, plate.length);
         const existsAlready = matches.find(match => match.matched === matched && match.index === index);
         if (!existsAlready && matched) matches.push({index, template, matched});
      }
      return matches;
   }, []);

   console.log('indexes', indexes);

   const searches = indexes.reduce((searches, { template, index, matched}) => {
      searches.push({
         searchString: plate
      });
      return searches;
   }, [])

   return searches;

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
//       "cookie": "_ga=GA1.3.1662382390.1602520723; plates4less-_zldp=MsrBQVMKNMpvhubte2l4fD%2FKkvRHUHjQNybooFW9xgeJcs%2B%2Fd2heBrfGSy1tcAMcLIm6uYDqJjk%3D; _gid=GA1.3.428340864.1610722314; ASPSESSIONIDCUCBTDTA=DFGENIKAGPOCKOPJPOIPPNKF; _gat=1"
//    },
//    "referrer": "https://www.plates4less.co.uk/",
//    "referrerPolicy": "strict-origin-when-cross-origin",
//    "body": "style=i&searchString=D12&prefix1=&orderBy=price&maximumPrice=undefined&pageSize=20&MaxResults=20000",
//    "method": "POST",
//    "mode": "cors"
// });
