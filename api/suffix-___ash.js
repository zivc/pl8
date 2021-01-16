import fetch from 'node-fetch';
import qs from "qs";
import {API_OPTS, API_PATH} from "../src/api/api.conf.js";

export const suffix___ash = async (search) => {

   let resp = {
      SearchResults: []
   };

   if (!search) return Promise.resolve({ a:0, search, results: resp.SearchResults });

   const { prefix1, prefix2, prefix3, numbers, letter1 } = search;

   return new Promise(async (resolve, reject) => {

      const body = {
         style: 's',
         prefix1,
         prefix2,
         prefix3,
         numbers,
         letter1,
         numberIsExact:1,
         orderBy: 'plate',
         maximumPrice: 'undefined',
         pageSize: 200,
         MaxResults: '[object Object]50000'
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
