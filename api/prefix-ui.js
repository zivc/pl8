import {plateToTemplate, PREFIX_TEMPLATE, REGISTRATION_PATTERN_MAP} from "../src/lib/helpers.core.js";

export const getPrefix = (plate = 'V10') => {

   console.log('getPrefix', plate);
   const templates = REGISTRATION_PATTERN_MAP[PREFIX_TEMPLATE].map(template => template.replace(/\s/gi, ''));

   const testPlate = plateToTemplate(plate);
   const containsNumber = !!plate.match(/[0-9]{1,3}/gi);

   console.log('testPlate', testPlate, containsNumber);

   const indexes = templates.reduce((matches, template) => {
      //TODO DD55DDD and DD55DD for 2 search AB returns 4 indexes
      const index = template.indexOf(testPlate);
      if (index >= 0) {
         const matched = template.substr(index,plate.length);
         const existsAlready = matches.find(match => match.matched === matched && match.index === index);
         if (!existsAlready && matched) matches.push({ index, template, matched });
      }
      return matches;
   }, []);


   console.log('indexes', indexes);

   const searches = indexes.reduce((searches, {template, index, matched}) => {
      let P,N,L1,L2,L3;

      const isNumber = !isNaN(plate);

      // is number only
      if (containsNumber && isNumber) {
         searches.push({ P, N: plate, L1, L2, L3 });
         return searches;
      }

      // is first letter only
      if (plate.length === 1) {
         searches.push({ P: plate, N, L1, L2, L3 });
         searches.push({ P, N, L1: plate, L2, L3 });
         searches.push({ P, N, L1, L2: plate, L3 });
         searches.push({ P, N, L1, L2, L3: plate });
         return searches;
      }

      N = plate.match(/[0-9]{1,3}/gi) || undefined;
      if (N) N = N[0];

      if (N) {
         let [P, second] = plate.split(N);
         if (P === '') P = undefined;
         [L1, L2, L3] = second.split('');
         searches.push({P,N,L1,L2,L3});
         return searches;
      }

      // 2 char or more
      if (plate.length === 2) {
         [L1, L2, L3] = plate.split('');
         searches.push({P, N, L1, L2, L3});
         [L2, L3, L1] = plate.split('');
         searches.push({P, N, L1, L2, L3});
         return searches;
      }

      if (plate.length === 3) {
         [L1, L2, L3] = plate.split('');
         searches.push({P, N, L1, L2, L3});
         return searches;
      }

      return searches;
   }, [])

   return searches;
}

// console.log(getPrefix('A'));
// console.log(getPrefix('1'));
// console.log(getPrefix('V1'));
// console.log(getPrefix('V10'));
// console.log(getPrefix('1A'));
// console.log(getPrefix('AB'));
// console.log(getPrefix('ABC'));
