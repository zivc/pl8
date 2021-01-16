import express from 'express';
import cors from 'cors';
import {getPrefix} from "./prefix-ui.js";
import {
   CURRENT_TEMPLATE,
   DATELESS_TEMPLATE, NORTHERN_IRELAND_TEMPLATE,
   PREFIX_TEMPLATE,
   SEARCH_MINIMUM_LENGTH,
   SUFFIX_TEMPLATE
} from "../src/lib/helpers.core.js";
import {prefix__ash} from "./prefix-__ash.js";
import {getCurrent} from "./current-ui.js";
import {current____ash} from "./current-____ash.js";
import {getDateless} from "./dateless-ui.js";
import {dateless__ash} from "./dateless-___ash.js";
import {getSuffix} from "./suffix-ui.js";
import {suffix___ash} from "./suffix-___ash.js";
import {getNorthernIreland} from "./northernireland-ui.js";
import {northernireland___ash} from "./northernireland-___ash.js";

const app = express();

app.use(cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({extended: true}))

const getPlates = (req) => ((req.query.plates || req.body.plates) || '').split(',');

app.all(`/${NORTHERN_IRELAND_TEMPLATE}`, async (req, res) => {

   const plates = getPlates(req);

   const allLarger = plates.every(plate => plate.length >= SEARCH_MINIMUM_LENGTH);
   if (!allLarger) {
      return res.status(400).send('Too short');
   }

   const searches = plates.map(plate => getNorthernIreland(plate)[0]);

   const REQS = searches.map(search => {
      console.log('SEARCH IRELAND', search);
      return northernireland___ash(search);

      // if (search.N === undefined) {
      //    return prefix__ash(search);
      // }
      //
      // return prefix_a5h___(search);

   });

   Promise.all(REQS)
      .then(results => {
         console.log(results.length);
         console.log('Outgoing results', results.length);
         console.log('Outgoing sum', results.reduce((sum, result) => {
            return sum += result.results.length;
         }, 0))
         res.send(results)
      });

});

app.all(`/${SUFFIX_TEMPLATE}`, async (req, res) => {

   const plates = getPlates(req);

   const allLarger = plates.every(plate => plate.length >= SEARCH_MINIMUM_LENGTH);
   if (!allLarger) {
      return res.status(400).send('Too short');
   }

   const searches = plates.map(plate => getSuffix(plate)[0]);

   const REQS = searches.map(search => {
      console.log('SEARCH SUFFIX', search);
      return suffix___ash(search);

      // if (search.N === undefined) {
      //    return prefix__ash(search);
      // }
      //
      // return prefix_a5h___(search);

   });

   Promise.all(REQS)
      .then(results => {
         console.log(results.length);
         console.log('Outgoing results', results.length);
         console.log('Outgoing sum', results.reduce((sum, result) => {
            return sum += result.results.length;
         }, 0))
         res.send(results)
      });

});

app.all(`/${DATELESS_TEMPLATE}`, async (req, res) => {

   const plates = getPlates(req);

   const allLarger = plates.every(plate => plate.length >= SEARCH_MINIMUM_LENGTH);
   if (!allLarger) {
      return res.status(400).send('Too short');
   }

   const searches = plates.map(plate => getDateless(plate)[0]);

   const REQS = searches.map(search => {
      console.log('SEARCH DATELESS', search);
      return dateless__ash(search);

      // if (search.N === undefined) {
      //    return prefix__ash(search);
      // }
      //
      // return prefix_a5h___(search);

   });

   Promise.all(REQS)
      .then(results => {
         console.log(results.length);
         console.log('Outgoing results', results.length);
         console.log('Outgoing sum', results.reduce((sum, result) => {
            return sum += result.results.length;
         }, 0))
         res.send(results)
      });

});

app.all(`/${PREFIX_TEMPLATE}`, async (req, res) => {

   const plates = getPlates(req);

   const allLarger = plates.every(plate => plate.length >= SEARCH_MINIMUM_LENGTH);
   if (!allLarger) {
      return res.status(400).send('Too short');
   }

   console.log('Incoming plates', plates);

   const searches = plates.map(plate => getPrefix(plate)[0]);

   const REQS = searches.map(search => {
      console.log('SEARCH PREFIX', search);
      return prefix__ash(search);

      // if (search.N === undefined) {
      //    return prefix__ash(search);
      // }
      //
      // return prefix_a5h___(search);

   });

   Promise.all(REQS)
      .then(results => {
         console.log(results.length);
         console.log('Outgoing results', results.length);
         console.log('Outgoing sum', results.reduce((sum, result) => {
            return sum += result.results.length;
         }, 0))
         res.send(results)
      });

});

app.all(`/${CURRENT_TEMPLATE}`, async (req, res) => {

   const plates = getPlates(req);

   const allLarger = plates.every(plate => plate.length >= SEARCH_MINIMUM_LENGTH);
   if (!allLarger) {
      return res.status(400).send('Too short');
   }

   console.log('Incoming plates', plates);

   const searches = plates.map(plate => getCurrent(plate))[0];

   const REQS = searches.map(search => {
      console.log('SEARCH CURRENT', search);
      return current____ash(search);
   })

   Promise.all(REQS)
      .then(results => {
         console.log(results.length);
         console.log('Outgoing results', results.length);
         console.log('Outgoing sum', results.reduce((sum, result) => {
            return sum += result.results.length;
         }, 0))
         res.send(results)
      });

});

app.listen(3001);
