import {useState} from 'react';
import style from '../components/search/search.module.scss';

export const useInput = (props) => {
   const [value, setValue] = useState('');
   const input = <input value={value} onChange={e => setValue(e.target.value)} {...props} />;
   return [value, input];
}

export const renderPossiblePlates = (plates = []) => {
   return plates.map(({plate, matches = null}) => {
      return <div className={style.smallPlate} key={plate} matches={matches}>{plate}</div>
   })
};
