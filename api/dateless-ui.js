import {
   DATELESS_TEMPLATE,
   plateToTemplate,
   PREFIX_TEMPLATE,
   REGISTRATION_PATTERN_MAP
} from "../src/lib/helpers.core.js";

export const getDateless = (plate = 'ASH') => {

   console.log('getDateless', plate);

   // return [{
   //    searchString: plate
   // }];

   const templates = REGISTRATION_PATTERN_MAP[DATELESS_TEMPLATE].map(template => template.replace(/\s/gi, ''));

   const testPlate = plateToTemplate(plate);
   const getNumber = plate.match(/[0-9]{1,4}/gi);
   const containsNumber = !!getNumber;

   console.log('testPlate', { templates, testPlate, containsNumber, getNumber });

   const indexes = templates.reduce((matches, template) => {
      //TODO DD55DDD and DD55DD for 2 search AB returns 4 indexes
      const index = template.indexOf(testPlate);
      if (index >= 0) {
         const matched = template.substr(index, plate.length);
         const existsAlready = matches.find(match => match.matched === matched && match.index === index);
         if (!existsAlready && matched) matches.push({index, template, matched});
      }
      return matches;
   }, []);

   console.log('indexes', indexes);

   const searches = indexes.reduce((searches, { template, index, matched}) => {
      searches.push({
         searchString: plate
      });
      return searches;
   }, [])

   return searches;

}
