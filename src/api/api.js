import axios from 'axios';
import {
   CURRENT_TEMPLATE,
   DATELESS_TEMPLATE,
   NORTHERN_IRELAND_TEMPLATE,
   PREFIX_TEMPLATE,
   SUFFIX_TEMPLATE
} from "../lib/helpers.core";

export const getPrefixes = async (plates = []) => {

   if (!plates.length) return;

   const res = await axios.post(`//${window.location.hostname}:3001/${PREFIX_TEMPLATE}`, {plates: plates.toString()});

   const map = {};

   res.data.forEach(subQuery => {
      subQuery.results.forEach(plate => {
         map[plate.Plate] = plate;
      })
   });

   return Object.values(map);

}

export const getCurrents = async (plates = []) => {

   if (!plates.length) return;

   const res = await axios.post(`//${window.location.hostname}:3001/${CURRENT_TEMPLATE}`, {plates: plates.toString()});

   const map = {};

   res.data.forEach(subQuery => {
      subQuery.results.forEach(plate => {
         map[plate.Plate] = plate;
      })
   });

   return Object.values(map);

}

export const getDatelesss = async (plates = []) => {

   if (!plates.length) return;

   const res = await axios.post(`//${window.location.hostname}:3001/${DATELESS_TEMPLATE}`, {plates: plates.toString()});

   const map = {};

   res.data.forEach(subQuery => {
      subQuery.results.forEach(plate => {
         map[plate.Plate] = plate;
      })
   });

   return Object.values(map);

}

export const getSuffixes = async (plates = []) => {

   if (!plates.length) return;

   const res = await axios.post(`//${window.location.hostname}:3001/${SUFFIX_TEMPLATE}`, {plates: plates.toString()});

   const map = {};

   res.data.forEach(subQuery => {
      subQuery.results.forEach(plate => {
         map[plate.Plate] = plate;
      })
   });

   return Object.values(map);

}

export const getNorthernIrelands = async (plates = []) => {

   if (!plates.length) return;

   const res = await axios.post(`//${window.location.hostname}:3001/${NORTHERN_IRELAND_TEMPLATE}`, {plates: plates.toString()});

   const map = {};

   res.data.forEach(subQuery => {
      subQuery.results.forEach(plate => {
         map[plate.Plate] = plate;
      })
   });

   return Object.values(map);

}
