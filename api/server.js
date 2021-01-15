import express from 'express';
import cors from 'cors';
import {getPrefix} from "./prefix-ui.js";
import {PREFIX_TEMPLATE} from "../src/lib/helpers.core.js";
import {prefix__ash} from "./prefix-__ash.js";
import {prefix_a5h___} from "./prefix-a5h___.js";

const app = express();

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true}))

app.all(`/${PREFIX_TEMPLATE}`, async (req, res) => {

   const plates = (req.param('plates') || '').split(',');

   if (!plates.every(plate => plate.length >= 4)) return res.status(400).send('Too short');

   const searches = plates.map(plate => getPrefix(plate)[0]);

   const REQS = searches.map(search => {

      if (search.N === undefined) return prefix__ash(search);

      return prefix_a5h___(search);

   });

   Promise.all(REQS)
      .then(results => {
         console.log(results.length);
         res.send(results)
      });

});

// app.post(`/x${PREFIX_TEMPLATE}`, async ({ body: plates  = []}, res) => {
//
//    const searches = plates.map(getPrefix);
//
//    const queries = searches.map(([search]) => {
//
//       console.log('@@SEARCH', search);
//
//       const { P, N } = search;
//       const str = Object.keys(search).reduce((str,key) => {
//          if (P === undefined || N === undefined) return str;
//          if (search[key] !== undefined) str.push(`${key} = '${search[key]}'`)
//          return str;
//       }, []).join(' and ');
//
//       if (N === undefined) return;
//
//       return [str, `${N}*:0`];
//    }).filter(query => {
//       console.log('QUERY', query);
//       return !!query && (query && query[0] !== '');
//    });
//
//    const REQS = queries.map(([query,filter]) => new Promise(async (resolve,reject) => {
//
//       console.log('@@ QUERY', query);
//
//       const body = {
//          x: `select top 10 *,0 as QueryOrder  from tbPre where ${query}`,
//          filters: `${filter}`,
//          "Table": "tbPre",
//          "SearchCode": "2PStart01",
//          "SupplierOrder": "undefined",
//          "IncludeAllSellersPlates": "1",
//          "IncludeAllDealersPlates": "1",
//          "pageSize": "50",
//          "MaxResults": "50000"
//       };
//
//       const rawResponse = await fetch("https://www.plates4less.co.uk/scripts/supersearch/GetSearchResults42.asp", {
//          "headers": {
//             "accept": "text/plain",
//             "accept-language": "en-US,en;q=0.9",
//             "cache-control": "no-cache",
//             "content-type": "application/x-www-form-urlencoded",
//             "pragma": "no-cache",
//             "sec-fetch-dest": "empty",
//             "sec-fetch-mode": "cors",
//             "sec-fetch-site": "same-origin",
//             "x-requested-with": "XMLHttpRequest",
//             "cookie": "_ga=GA1.3.1662382390.1602520723; plates4less-_zldp=MsrBQVMKNMpvhubte2l4fD%2FKkvRHUHjQNybooFW9xgeJcs%2B%2Fd2heBrfGSy1tcAMcLIm6uYDqJjk%3D; _gid=GA1.3.815251159.1610397718; ASPSESSIONIDAWRQCADB=BDBALLECFEKEIKFBPOEDNAKF; _gat=1"
//          },
//          "referrer": "https://www.plates4less.co.uk/",
//          "referrerPolicy": "strict-origin-when-cross-origin",
//          "body": qs.stringify(body, { format : 'RFC1738' }),
//          "method": "POST",
//          "mode": "cors"
//       });
//
//       const text = await rawResponse.text();
//
//       let resp = {
//          SearchResults:[]
//       };
//
//       try {
//          resp = JSON.parse(text);
//       } catch (e) {
//          // console.log('Unable to parse it what');
//          // console.log(text);
//          // console.log(body.x);
//          // console.log(body.filters);
//          // console.log('-----');
//          // console.log(queries);
//       }
//
//       resolve(resp.SearchResults);
//
//    }));
//
//    Promise.all(REQS)
//       .then(results => {
//          //console.log(results);
//          res.send(results);
//       });
//
// })

//
// const body = {
//    "x": [
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '1' and L1 ='V' and L2 ='V' and L3 ='V'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '1' and L1 ='x' and L2 ='x' and L3 ='x'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '1' and L1 ='o' and L2 ='o' and L3 ='o'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '1'",
//
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '11' and L1 ='V' and L2 ='V' and L3 ='V'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '11' and L1 ='x' and L2 ='x' and L3 ='x'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '11' and L1 ='o' and L2 ='o' and L3 ='o'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '11'",
//
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '111' and L1 ='V' and L2 ='V' and L3 ='V'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '111' and L1 ='x' and L2 ='x' and L3 ='x'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '111' and L1 ='o' and L2 ='o' and L3 ='o'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '111'",
//
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '11?' and L1 ='V' and L2 ='V' and L3 ='V'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '11?' and L1 ='x' and L2 ='x' and L3 ='x'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '11?' and L1 ='o' and L2 ='o' and L3 ='o'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '11?'",
//
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '1?' and L1 ='V' and L2 ='V' and L3 ='V'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '1?' and L1 ='x' and L2 ='x' and L3 ='x'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '1?' and L1 ='o' and L2 ='o' and L3 ='o'",
//       "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '1?'"
//    ].join('SQLSEP'),
//    "filters": [
//       "1:0",
//       "1:0",
//       "1:0",
//       "1:0",
//
//       "11:0",
//       "11:0",
//       "11:0",
//       "11:0",
//
//       "111:0",
//       "111:0",
//       "111:0",
//       "111:0",
//
//       "11*:0",
//       "11*:0",
//       "11*:0",
//       "11*:0",
//
//       "1*:0",
//       "1*:0",
//       "1*:0",
//       "1*:0"
//
//    ].join('SQLSEP'),
//    "Table": "tbPre",
//    "SearchCode": "2PStart01",
//    "SupplierOrder": "undefined",
//    "IncludeAllSellersPlates": "1",
//    "IncludeAllDealersPlates": "1",
//    "pageSize": "1",
//    "MaxResults": "50000"
// };


// res.send(plates);

// const body = {
//    "x": "select top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '1' and L1 ='V' and L2 ='V' and L3 ='V'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '1' and L1 ='x' and L2 ='x' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '1' and L1 ='o' and L2 ='o' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '1'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '11' and L1 ='V' and L2 ='V' and L3 ='V'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '11' and L1 ='x' and L2 ='x' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '11' and L1 ='o' and L2 ='o' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '11'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '111' and L1 ='V' and L2 ='V' and L3 ='V'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '111' and L1 ='x' and L2 ='x' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '111' and L1 ='o' and L2 ='o' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N = '111'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '11?' and L1 ='V' and L2 ='V' and L3 ='V'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '11?' and L1 ='x' and L2 ='x' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '11?' and L1 ='o' and L2 ='o' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '11?'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '1?' and L1 ='V' and L2 ='V' and L3 ='V'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '1?' and L1 ='x' and L2 ='x' and L3 ='x'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '1?' and L1 ='o' and L2 ='o' and L3 ='o'SQLSEPselect top 10 *,0 as QueryOrder  from tbPre where P ='V' and N  like  '1?'",
//    "filters": "1:0SQLSEP1:0SQLSEP1:0SQLSEP1:0SQLSEP11:0SQLSEP11:0SQLSEP11:0SQLSEP11:0SQLSEP111:0SQLSEP111:0SQLSEP111:0SQLSEP111:0SQLSEP11*:0SQLSEP11*:0SQLSEP11*:0SQLSEP11*:0SQLSEP1*:0SQLSEP1*:0SQLSEP1*:0SQLSEP1*:0",
//    "Table": "tbPre",
//    "SearchCode": "2PStart01",
//    "SupplierOrder": "undefined",
//    "IncludeAllSellersPlates": "1",
//    "IncludeAllDealersPlates": "1",
//    "pageSize": "20",
//    "MaxResults": "50000"
// };
//
// const rawResponse = await fetch("https://www.plates4less.co.uk/scripts/supersearch/GetSearchResults42.asp", {
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
//       "cookie": "_ga=GA1.3.1662382390.1602520723; plates4less-_zldp=MsrBQVMKNMpvhubte2l4fD%2FKkvRHUHjQNybooFW9xgeJcs%2B%2Fd2heBrfGSy1tcAMcLIm6uYDqJjk%3D; _gid=GA1.3.815251159.1610397718; ASPSESSIONIDAWRQCADB=BDBALLECFEKEIKFBPOEDNAKF; _gat=1"
//    },
//    "referrer": "https://www.plates4less.co.uk/",
//    "referrerPolicy": "strict-origin-when-cross-origin",
//    "body": qs.stringify(body, { format : 'RFC1738' }),
//    "method": "POST",
//    "mode": "cors"
// });
//
// console.log(rawResponse);
//
// const text = await rawResponse.text();
//
// console.log(text);
//
// let resp = '{}';
//
// try {
//    resp = JSON.parse(text);
// } catch (e) {
//
// }
//
// res.send(resp);


app.listen(3001);


// PREFIX STYLE SEARCH V*???

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
//       "cookie": "_ga=GA1.3.1662382390.1602520723; plates4less-_zldp=MsrBQVMKNMpvhubte2l4fD%2FKkvRHUHjQNybooFW9xgeJcs%2B%2Fd2heBrfGSy1tcAMcLIm6uYDqJjk%3D; _gid=GA1.3.815251159.1610397718; ASPSESSIONIDAWRQCADB=BDBALLECFEKEIKFBPOEDNAKF; _gat=1"
//    },
//    "referrer": "https://www.plates4less.co.uk/",
//    "referrerPolicy": "strict-origin-when-cross-origin",
//    "body": "x=select+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%271%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%271%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%271%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%271%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2711%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2711%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2711%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2711%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27111%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27111%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27111%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27111%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2711%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2711%3F%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2711%3F%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2711%3F%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%271%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%271%3F%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%271%3F%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%271%3F%27&filters=1%3A0SQLSEP1%3A0SQLSEP1%3A0SQLSEP1%3A0SQLSEP11%3A0SQLSEP11%3A0SQLSEP11%3A0SQLSEP11%3A0SQLSEP111%3A0SQLSEP111%3A0SQLSEP111%3A0SQLSEP111%3A0SQLSEP11%2A%3A0SQLSEP11%2A%3A0SQLSEP11%2A%3A0SQLSEP11%2A%3A0SQLSEP1%2A%3A0SQLSEP1%2A%3A0SQLSEP1%2A%3A0SQLSEP1%2A%3A0&Table=tbPre&SearchCode=2PStart01&SupplierOrder=undefined&IncludeAllSellersPlates=1&IncludeAllDealersPlates=1&pageSize=20&MaxResults=50000",
//    "method": "POST",
//    "mode": "cors"
// });


// const body = qs.stringify(req.body, { format : 'RFC1738' });
//
// console.log(body);
//
// const rawResponse = await fetch(API_PATH, { ...API_OPTS, body });
//
// console.log(rawResponse.status);
// console.log(req.get('content-type'), rawResponse.headers);
//
// let content = await rawResponse.text();
// if (req.get('content-type') === 'application/json') {
//    try {
//       content = JSON.parse(content);
//       console.log(content);
//    } catch (e) {
//       content = {error:true};
//    }
//    res.json(content);
// } else {
//    console.log('not json');
//    res.send({error:true});
// }
//
// // if (req.get('content-type') === 'application/json') {
// //    res.json(await rawResponse.json());
// // } else {
// //    res.json({error:true});
// // }
//
//
//
//
//


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
//       "cookie": "_ga=GA1.3.1662382390.1602520723; _gid=GA1.3.869106256.1609970552; plates4less-_zldp=MsrBQVMKNMpvhubte2l4fD%2FKkvRHUHjQNybooFW9xgeJcs%2B%2Fd2heBrfGSy1tcAMcLIm6uYDqJjk%3D; plates4less-_zldt=6d9e24bf-ad0b-49e9-a288-28286aac0f88-0; ASPSESSIONIDCWRRCCDA=MNLDCAFCJMMCKKPCNPNENFFB; ASPSESSIONIDAUTSADDA=FEOGPLBDNPAOPJDBIODPLMGA; _gat=1"
//    },
//    "referrer": "https://www.plates4less.co.uk/",
//    "referrerPolicy": "strict-origin-when-cross-origin",
//    "body": "x=select+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27s%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%2710%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27s%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27100%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27s%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N+%3D+%27110%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27s%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbPre+where+P+%3D%27V%27+and+N++like++%2710%3F%27&filters=10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0&Table=tbPre&SearchCode=3PStartt01&SupplierOrder=undefined&IncludeAllSellersPlates=1&IncludeAllDealersPlates=1&pageSize=20&MaxResults=50000",
//    "method": "POST",
//    "mode": "cors"
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
//       "x-requested-with": "XMLHttpRequest",
//       "cookie": "_ga=GA1.3.1662382390.1602520723; _gid=GA1.3.869106256.1609970552; plates4less-_zldp=MsrBQVMKNMpvhubte2l4fD%2FKkvRHUHjQNybooFW9xgeJcs%2B%2Fd2heBrfGSy1tcAMcLIm6uYDqJjk%3D; plates4less-_zldt=6d9e24bf-ad0b-49e9-a288-28286aac0f88-0; ASPSESSIONIDCWRRCCDA=MNLDCAFCJMMCKKPCNPNENFFB; ASPSESSIONIDAUTSADDA=FEOGPLBDNPAOPJDBIODPLMGA; _gat=1"
//    },
//    "referrer": "https://www.plates4less.co.uk/",
//    "referrerPolicy": "strict-origin-when-cross-origin",
//    "body": "x=select+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27x%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27o%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27s%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27V%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%2710%27+and+L1+%3D%27s%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%2710%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27x%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27o%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27s%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27V%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27100%27+and+L1+%3D%27s%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27100%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27x%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27o%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27s%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27V%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27110%27+and+L1+%3D%27s%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N+%3D+%27110%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27V%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27x%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27o%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27V%27+and+L3+%3D%27s%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27V%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27x%27+and+L2+%3D%27x%27+and+L3+%3D%27x%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27o%27+and+L2+%3D%27o%27+and+L3+%3D%27o%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N++like++%2710%3F%27+and+L1+%3D%27s%27+and+L2+%3D%27s%27+and+L3+%3D%27s%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+SQLSEPselect+top+10+%2A%2C0+as+QueryOrder++from+tbSellers+where+P1+%3D%27V%27+and+N++like++%2710%3F%27+and+type%3D%27Prefix%27+and+published%3D1+and+deleted%3D0+and+published%3D1+&filters=10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP10%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP100%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP110%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0SQLSEP10%2A%3A0&Table=tbSellers&SearchCode=3PStartt01&SupplierOrder=undefined&IncludeAllSellersPlates=1&IncludeAllDealersPlates=1&pageSize=20&MaxResults=50000",
//    "method": "POST",
//    "mode": "cors"
// });
