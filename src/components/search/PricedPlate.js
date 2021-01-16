import React from 'react';
import style from "./search.module.scss";

const PricedPlate = ({ Plate, PriceIncFees }) => {

   return <React.Fragment key={Plate}>
      <div className={style.smallPlate}>{Plate}</div>
      <div>&pound;{PriceIncFees}</div>
   </React.Fragment>;
}

export default PricedPlate;
