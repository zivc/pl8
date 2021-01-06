import {useState} from 'react';
// import { validate as plateValidate } from 'uk-numberplate-format';
import style from '../components/search/search.module.scss';

export const useInput = (props) => {
   const [value, setValue] = useState('' ?? props.value);
   const input = <input value={value} onChange={e => setValue(e.target.value)} {...props} />;
   return [value, input];
}

export function allPossibleCases(array, result, index) {
   if (!result) {
      result = [];
      index = 0;
      array = array.map(function (element) {
         return element.push ? element : [element];
      });
   }
   if (index < array.length) {
      array[index].forEach(function (element) {
         const a = array.slice(0);
         a.splice(index, 1, [element]);
         allPossibleCases(a, result, index + 1);
      });
   } else {
      result.push(array.flat());
   }
   return result;
}

export const permutationsOfLetter = (str) => str.toLowerCase().split('').map(char => {
   switch (char) {
      case 'a':
         return ['a', '4'];
      case 'b':
      case '8':
         return ['b', '13', '6', '8'];
      case 'c':
         return ['c', '6'];
      // d
      case 'e':
         return ['e', '3'];
      // f
      case 'g':
      case '6':
      case '9':
         return ['g', '6', '9'];
      case 'h':
         return ['h', '11'];
      case 'i':
      case '1':
         return ['i', '1'];
      // j
      // k
      case 'l':
         return ['l', '1', 'i'];
      // m
      // n
      case 'o':
      case '0':
         return ['o', '0'];
      // p
      // q
      case 'r':
         return ['r', '2', '12'];
      case 's':
      case '5':
         return ['s', '5'];
      case 't':
         return ['t', '7'];
      case 'u':
         return ['u', '11'];
      // v
      // w
      // x
      case 'y':
         return ['y', '7'];
      case 'z':
      case '2':
         return ['z', '2'];

      default:
         return [char];
   }
})

const validatePlate = (plate) => {

   let testPlate = plate.replace(/[A-Z]/gi, 'D')
      .replace(/[0-9]/gi, '5')
      .replace(/\s/gi, '');

   const prefix = [
      'D5 DDD',
      'D55 DDD',
      'D555 DDD'
   ];

   const current = [
      'DD55 DDD'
   ];

   const suffix = [
      'DDD 5D',
      'DDD 55D',
      'DDD 555D'
   ];

   const dateless = [
      '5 D',
      '5 DD',
      '5 DDD',
      '55 D',
      '55 DD',
      '55 DDD',
      '555 D',
      '555 DD',
      '555 DDD',
      '5555 D',
      '5555 DD'
   ];

   const ni = [
      'DD 5',
      'DD 55',
      'DD 555',
      'DD 5555',
      'DDD 5',
      'DDD 55',
      'DDD 555',
      'DDD 5555'
   ];

   return !![
      ...prefix,
      ...current,
      ...suffix,
      ...dateless,
      ...ni
   ].find(test => test.replace(/\s/gi, '').includes(testPlate));

}

export const renderPossiblePlates = (plate) => {
   if (!plate) return null;
   return allPossibleCases(permutationsOfLetter(plate)).reduce((plates, currentPlate) => {
      const str = currentPlate.join('');
      if (validatePlate(str)) plates.push(<div className={style.smallPlate} key={str}>{str}</div>);
      return plates;
   }, []);
};
