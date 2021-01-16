import {useEffect, useState} from 'react';
import style from './search.module.scss';
import {renderPossiblePlates, useInput} from "../../lib/helpers";
import SearchIcon from '@material-ui/icons/Search';
import HourglassEmptySharpIcon from '@material-ui/icons/HourglassEmptySharp';
import SearchResults from "./SearchResults";
import {getCurrents, getDatelesss, getNorthernIrelands, getPrefixes, getSuffixes} from "../../api/api";
import {
   CURRENT_TEMPLATE, DATELESS_TEMPLATE,
   getAllPossiblePlates, NORTHERN_IRELAND_TEMPLATE,
   PREFIX_TEMPLATE,
   REGISTRATION_TEMPLATE_KEYS, SUFFIX_TEMPLATE
} from "../../lib/helpers.core";
import PricedPlate from "./PricedPlate";


const defaultState = () => []; /*REGISTRATION_TEMPLATE_KEYS.reduce((state, key) => {
   if (!state[key]) state[key] = [];
   return state;
}, {});*/

const Search = () => {

   const [plate, plateInput] = useInput({type: 'text', className: style.input});
   const [possiblePlates, setPossiblePlates] = useState([]);
   const [fetchedPlates, setFetchedPlates] = useState(defaultState());
   const [isLoading, setIsLoading] = useState(false);

   const doSearch = () => {
      setIsLoading(true);
      setFetchedPlates(defaultState());
      setPossiblePlates(plate.length ? getAllPossiblePlates(plate) : []);
   };

   const renderResults = () => {
      //return REGISTRATION_TEMPLATE_KEYS.map(key => fetchedPlates[key].map(plateObj => <PricedPlate { ...plateObj } />));
      return fetchedPlates.map(plateObj => <PricedPlate key={plateObj.Plate} {...plateObj} />)
   }

   useEffect(() => {
      if (!possiblePlates.length) return;

      const temporaryState = [];

      // Turn templates into object of empty arrays
      const templateMap = REGISTRATION_TEMPLATE_KEYS.reduce((templateMap, templateKey) => {
         templateMap[templateKey] = [];
         return templateMap;
      }, {});

      // Split plates by matched template, prefix, suffix etc
      possiblePlates.reduce((endPointMap, {plate, matches}) => {
         matches.forEach(matchedTemplate => endPointMap[matchedTemplate].push(plate))
         return endPointMap;
      }, templateMap);

      const REQS = REGISTRATION_TEMPLATE_KEYS.map(async (templateKey) => {

         const plates = templateMap[templateKey];

         let results = [];

         if (templateKey === PREFIX_TEMPLATE) results = await getPrefixes(plates);
         if (templateKey === CURRENT_TEMPLATE) results = await getCurrents(plates);
         if (templateKey === DATELESS_TEMPLATE) results = await getDatelesss(plates);
         if (templateKey === SUFFIX_TEMPLATE) results = await getSuffixes(plates);
         if (templateKey === NORTHERN_IRELAND_TEMPLATE) results = await getNorthernIrelands(plates);


         temporaryState.push(...results);
         setFetchedPlates(temporaryState);
         return results;
      });

      Promise.all(REQS)
         .then(() => {
            setFetchedPlates(temporaryState);
            setIsLoading(false)
         });

   }, [possiblePlates]);

   return <>
      <div className={style.container}>
         <div className={style.plate}>
            {plateInput}
         </div>
         {!isLoading && <SearchIcon className={style.search} onClick={doSearch} disabled={isLoading}/>}
         {isLoading && <HourglassEmptySharpIcon className={style.search} disabled={true}/>}
      </div>
      <SearchResults possiblePlates={renderPossiblePlates(possiblePlates)}/>
      <hr/>
      <div>
         <h1>{fetchedPlates.length}</h1>
         {renderResults()}
      </div>
   </>;
};

export default Search;
