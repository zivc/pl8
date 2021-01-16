import fetch from 'node-fetch';
import qs from "qs";
import {API_OPTS, API_PATH} from "../src/api/api.conf.js";

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

      console.log({ query, filter });

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

      const rawResponse = await fetch(API_PATH, {
         ...API_OPTS,
         "body": qs.stringify(body, { format : 'RFC1738' }),
      });

      const text = await rawResponse.text();

      try {
         resp = JSON.parse(text);
      } catch (e) {
         console.log('Unable to parse it what', search);
      }

      resolve({ a: resp.SearchResults.length, search, results: resp.SearchResults });

   });

}
