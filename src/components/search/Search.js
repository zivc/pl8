import {useEffect, useState} from 'react';
import style from './search.module.scss';
import {renderPossiblePlates, useInput} from "../../lib/helpers";
import SearchIcon from '@material-ui/icons/Search';
import SearchResults from "./SearchResults";
import {getPrefixes} from "../../api/api";
import {
   CURRENT_TEMPLATE,
   DATELESS_TEMPLATE,
   getAllPossiblePlates,
   NORTHERN_IRELAND_TEMPLATE,
   PREFIX_TEMPLATE,
   SUFFIX_TEMPLATE
} from "../../lib/helpers.core";

const Search = () => {

   const [plate, plateInput] = useInput({type: 'text', className: style.input});
   const [possiblePlates, setPossiblePlates] = useState([]);
   const [fetchedPlates, setFetchedPlates] = useState({
      [PREFIX_TEMPLATE]: [],
      [CURRENT_TEMPLATE]: [],
      [SUFFIX_TEMPLATE]: [],
      [DATELESS_TEMPLATE]: [],
      [NORTHERN_IRELAND_TEMPLATE]: []
   });

   const doSearch = () => {
      setPossiblePlates(plate.length ? getAllPossiblePlates(plate) : []);
   };

   useEffect(() => {
      console.log(possiblePlates);

      const sections = possiblePlates.reduce((plates, {plate, matches}) => {

         [
            PREFIX_TEMPLATE,
            CURRENT_TEMPLATE,
            SUFFIX_TEMPLATE,
            DATELESS_TEMPLATE,
            NORTHERN_IRELAND_TEMPLATE
         ].forEach(template => {
            if (matches.indexOf(template) !== -1) plates[template].push(plate);
         });

         return plates;
      }, {
         [PREFIX_TEMPLATE]: [],
         [CURRENT_TEMPLATE]: [],
         [SUFFIX_TEMPLATE]: [],
         [DATELESS_TEMPLATE]: [],
         [NORTHERN_IRELAND_TEMPLATE]: []
      });

      Object.keys(sections).map(async (key) => {
         if (key === PREFIX_TEMPLATE) {
            console.log('Request', key, sections[key]);
            const P = await getPrefixes(sections[key])
            console.log(P);
            setFetchedPlates({
               ...fetchedPlates,
               [PREFIX_TEMPLATE]: P || []
            });
         }
      });

   }, [possiblePlates]);

   return <>
      <div className={style.container}>
         <div className={style.plate}>
            {plateInput}
         </div>
         <SearchIcon className={style.search} onClick={doSearch} disabled={plate.length <= 2}/>
      </div>
      <SearchResults possiblePlates={renderPossiblePlates(possiblePlates)}/>
      <hr/>
      <div>
         {fetchedPlates[PREFIX_TEMPLATE].map(({Plate: plate}) => <div className={style.smallPlate}
                                                                      key={plate}>{plate}</div>)}
      </div>
   </>;
};

export default Search;
