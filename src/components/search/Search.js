import {useState} from 'react';
import style from './search.module.scss';
import {useInput, renderPossiblePlates} from "../../lib/helpers";
import SearchIcon from '@material-ui/icons/Search';
import SearchResults from "./SearchResults";

const Search = () => {

   const [plate, plateInput] = useInput({type: 'text', className: style.input, value: 'ash'});
   const [possiblePlates, setPossiblePlates] = useState(renderPossiblePlates('ash'));

   const doSearch = () => {
      setPossiblePlates(plate.length ? renderPossiblePlates(plate) : []);
   };

   return <>
      <div className={style.container}>
         <div className={style.plate}>
            {plateInput}
         </div>
         <SearchIcon className={style.search} onClick={doSearch}/>
      </div>
      <SearchResults possiblePlates={possiblePlates} />
   </>;
}

export default Search;
