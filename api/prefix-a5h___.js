import fetch from 'node-fetch';
import qs from "qs";

export const prefix_a5h___ = async (search) => {

   const { P, N, L1, L2, L3} = search;

   let resp = {
      SearchResults:[]
   };

   return new Promise(async (resolve) => {

      const query = Object.keys(search).reduce((str,key) => {
         if (P === undefined || N === undefined) return str;
         if (search[key] !== undefined) str.push(`${key} = '${search[key]}'`)
         return str;
      }, []).join(' and ');

      const filter = `${N}*:0`;

      if (query.length === 0) return Promise.resolve(resp.SearchResults);

      const body = {
         "Table": "tbPre",
         "SearchCode": "2PStart01",
         "SupplierOrder": "undefined",
         "IncludeAllSellersPlates": "1",
         "IncludeAllDealersPlates": "1",
         "pageSize": "50",
         "MaxResults": "50000",
         x: `select top 10 *,0 as QueryOrder  from tbPre where ${query}`,
         filters: `${filter}`,
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
            "cookie": "_ga=GA1.3.1662382390.1602520723; plates4less-_zldp=MsrBQVMKNMpvhubte2l4fD%2FKkvRHUHjQNybooFW9xgeJcs%2B%2Fd2heBrfGSy1tcAMcLIm6uYDqJjk%3D; _gid=GA1.3.815251159.1610397718; ASPSESSIONIDAWRQCADB=BDBALLECFEKEIKFBPOEDNAKF; _gat=1"
         },
         "referrer": "https://www.plates4less.co.uk/",
         "referrerPolicy": "strict-origin-when-cross-origin",
         "body": qs.stringify(body, { format : 'RFC1738' }),
         "method": "POST",
         "mode": "cors"
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
