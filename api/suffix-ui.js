import {CURRENT_TEMPLATE, plateToTemplate, REGISTRATION_PATTERN_MAP, SUFFIX_TEMPLATE} from "../src/lib/helpers.core.js";

export const getSuffix = (plate = 'ASH') => {

   console.log('getSuffix', plate);
   const templates = REGISTRATION_PATTERN_MAP[SUFFIX_TEMPLATE].map(template => template.replace(/\s/gi, ''));

   const testPlate = plateToTemplate(plate);
   const getNumber = plate.match(/[0-9]{1,2}/gi);
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

   const maskToSearch = mask => ({
      prefix1: mask[0].toUpperCase(),
      prefix2: mask[1].toUpperCase(),
      prefix3: mask[2].toUpperCase(),
      numbers: mask[3].toUpperCase(),
      letter1: mask[4].toUpperCase()
   });

   const searches = indexes.reduce((searches, { template, index, matched }) => {

      const mask = [
         'ANY', // P1
         'ANY', // P2
         'ANY', // P3
         'ANY', // N
         'ANY', // L1
      ];

      if (containsNumber) {
         const plateNumber = getNumber[0];
         const [beforeNumber, afterNumber] = plate.split(plateNumber);

         mask[3] = plateNumber;

         beforeNumber.split('').reverse().forEach((letter, index) => {
            mask[2 - index] = letter;
         });
         afterNumber.split('').forEach((letter, index) => {
            mask[4 + index] = letter;
         });
         searches.push(maskToSearch(mask));
      } else if (plate.length === 3) {
         plate.split('').forEach((letter, index) => mask[index] = letter);
         searches.push(maskToSearch(mask));
      }

      return searches;

   }, []);

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
//    "body": "style=s&prefix1=ANY&prefix2=ANY&prefix3=A&numbers=1&letter1=A&numberIsExact=0&orderBy=plate&maximumPrice=undefined&pageSize=20&MaxResults=[object Object]50000",
//    "method": "POST",
//    "mode": "cors"
// });
