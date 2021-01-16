import fetch from 'node-fetch';
import qs from "qs";
import {API_OPTS, API_PATH} from "../src/api/api.conf.js";

export const prefix__ash = async (search) => {

   let resp = {
      SearchResults: []
   };

   if (!search) return Promise.resolve({ a:0, search, results: resp.SearchResults });

   const {P, N, L1, L2, L3} = search;

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
