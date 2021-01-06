import style from "./search.module.scss";

const SearchResults = ({ possiblePlates }) => {
   const plateCount = possiblePlates.length;

   const text = !plateCount
      ? 'Type a phrase above to begin'
      : `Searching for ${plateCount} possible plate${plateCount && 's'}`;

   return <>
      <div className={style.smallPlates}>
         <p>{text}</p>
         {possiblePlates}
      </div>
   </>
}

export default SearchResults;
