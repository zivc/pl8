import qs from "qs";
import {plateToTemplate, PREFIX_TEMPLATE, REGISTRATION_PATTERN_MAP} from "../lib/helpers";

export const getPrefix = (plate) => {

   const body = {
      "filters": "",
      "Table": "tbPre",
      "SearchCode": "3PStartt01",
      "SupplierOrder": "undefined",
      "IncludeAllSellersPlates": "1",
      "IncludeAllDealersPlates": "1",
      "pageSize": "20",
      "MaxResults": "50000"
   };

   console.log('-----------------------');
   console.log('getPrefix', plate);
   const templates = REGISTRATION_PATTERN_MAP[PREFIX_TEMPLATE].map(template => template.replace(/\s/gi, ''));

   const testPlate = plateToTemplate(plate);

   const indexes = templates.reduce((matches, template) => {
      const index = template.indexOf(testPlate);
      if (index >= 0) matches.push({ index, template });
      return matches;
   }, []);

   console.log(indexes);

   const searches = indexes.map(({index, template}) => {
      console.log(index, template);
      const search = plate.split('').reduce((chars,char, indx) => {
         chars.push(`L${index + indx + 1}='${char.toUpperCase()}'`);
         return chars;
      }, []);
      return { index, template, search };
   });

   searches.forEach(async ({search}) => {

      const payload = {
         ...body,
         x: `select top 50 *,0 as QueryOrder from tbNew where ${search.join(' AND ')} Order By Price,plate`,
      };

      const rawResponse = await fetch('http://localhost:3001/prefix', {
         method: 'POST',
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(payload)
      });
      const content = await rawResponse.json();

      console.log(content);

      // const req = {
      //    // ...body,
      //    x: `select top 50 *,0 as QueryOrder from tbNew where ${search.join(' AND ')} Order By Price,plate`,
      // };
      //
      // console.log(req.x);
      //
      // console.log(JSON.stringify(req));
      //
      // const f = await fetch('http://localhost:3001/prefix', {
      //    method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //    mode: 'no-cors', // no-cors, *cors, same-origin
      //    headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //    },
      //    body: JSON.stringify(req)
      // })
      //
      // console.log(await f.json());

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
      //       "x-requested-with": "XMLHttpRequest"
      //    },
      //    "referrer": "https://www.plates4less.co.uk/",
      //    "referrerPolicy": "strict-origin-when-cross-origin",
      //    "body": req,
      //    "method": "POST",
      //    "credentials": "include"
      // }).then(res => console.log(res.json()));

   });

   return null;

   // console.log(qs.parse("x=select%20top%2050%20*%2C0%20as%20QueryOrder%20from%20tbNew%20where%20L1%20%3D%27A%27%20and%20L2%20%3D%27S%27%20and%20L3%20%3D%27H%27%20Order%20By%20Price%2Cplate&filters=&Table=tbNew&SearchCode=3NE02&SupplierOrder=undefined&IncludeAllSellersPlates=1&IncludeAllDealersPlates=1&pageSize=20&MaxResults=50000"));

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
   //       "x-requested-with": "XMLHttpRequest"
   //    },
   //    "referrer": "https://www.plates4less.co.uk/",
   //    "referrerPolicy": "strict-origin-when-cross-origin",
   //    "body": "x=select+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27s%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27s%27+and+L2+%3D%27s%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27s%27+and+L2+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27x%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27o%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27s%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27x%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27o%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27s%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27x%27+and+L2+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27o%27+and+L2+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27s%27+and+L2+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27&filters=100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0&Table=tbPre&SearchCode=4PStartt01&SupplierOrder=undefined&IncludeAllSellersPlates=1&IncludeAllDealersPlates=1&pageSize=20&MaxResults=50000",
   //    "method": "POST",
   //    "mode": "cors",
   //    "credentials": "include"
   // });

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
   //       "x-requested-with": "XMLHttpRequest"
   //    },
   //    "referrer": "https://www.plates4less.co.uk/",
   //    "referrerPolicy": "strict-origin-when-cross-origin",
   //    "body": "x=select%20top%2050%20*%2C0%20as%20QueryOrder%20from%20tbNew%20where%20L1%20%3D%27A%27%20and%20L2%20%3D%27S%27%20and%20L3%20%3D%27H%27%20Order%20By%20Price%2Cplate&filters=&Table=tbNew&SearchCode=3NE02&SupplierOrder=undefined&IncludeAllSellersPlates=1&IncludeAllDealersPlates=1&pageSize=20&MaxResults=50000",
   //    "method": "POST",
   //    "mode": "cors",
   //    "credentials": "include"
   // });
}
