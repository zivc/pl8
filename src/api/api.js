import axios from 'axios';
import {PREFIX_TEMPLATE} from "../lib/helpers.core";

export const getPrefixes = async (plates = []) => {

   if (!plates.length) return;

   const res = await axios.post(`//${window.location.hostname}:3001/${PREFIX_TEMPLATE}`, {plates: plates.toString()});

   const map = {};

   console.log('res', res);

   res.data.forEach(plate => {
      map[plate.Plate] = plate;
   });

   return Object.values(map);

}
