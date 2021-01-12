import {useEffect, useState} from 'react';
import style from './search.module.scss';
import {useInput, renderPossiblePlates, getAllPossiblePlates} from "../../lib/helpers";
import SearchIcon from '@material-ui/icons/Search';
import SearchResults from "./SearchResults";
import {getPrefix} from "../../api/api";

const Search = () => {

   const [plate, plateInput] = useInput({type: 'text', className: style.input });
   const [possiblePlates, setPossiblePlates] = useState([]);

   const doSearch = () => {
      setPossiblePlates(plate.length ? getAllPossiblePlates(plate) : []);
   };

   useEffect(() => {
      console.log(possiblePlates);
   }, [possiblePlates]);

   return <>
      <div className={style.container}>
         <div className={style.plate}>
            {plateInput}
         </div>
         <SearchIcon className={style.search} onClick={doSearch}/>
      </div>
      <SearchResults possiblePlates={renderPossiblePlates(possiblePlates)} />
      <div>
         <h1>Prefix</h1>
      </div>
   </>;
}

export default Search;
