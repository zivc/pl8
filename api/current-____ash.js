import fetch from 'node-fetch';
import qs from "qs";
import {API_OPTS, API_PATH} from "../src/api/api.conf.js";

export const current____ash = async (search) => {

   const {prefix1, prefix2, numbers, letter1, letter2, letter3} = search;

   let resp = {
      SearchResults: []
   };

   return new Promise(async (resolve) => {

      console.log({prefix1, prefix2, numbers, letter1, letter2, letter3});

      const body = {
         style: 'c',
         prefix1,
         prefix2,
         numbers,
         letter1,
         letter2,
         letter3,
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
