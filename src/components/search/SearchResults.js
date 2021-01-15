import style from "./search.module.scss";

const SearchResults = ({ possiblePlates = [] }) => {
   if (!possiblePlates) return null;
   const plateCount = possiblePlates.length;

   const text = !plateCount
      ? 'Type a phrase above to begin'
      : `Trying the following ${plateCount} permutation${plateCount && 's'}`;

   return <>
      <div className={style.smallPlates}>
         <p>{text}</p>
         {possiblePlates}
      </div>
   </>
}

export default SearchResults;
