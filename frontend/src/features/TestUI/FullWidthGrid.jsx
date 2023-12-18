import * as React from 'react';
import styled from './index.module.scss';



export default function FullWidthGrid() {
  return (
    <div className={styled.wrapper}>
      <div className={styled.box}>
        <div className={styled.nested}>a</div>
        <div className={styled.nested}>b</div>
        <div className={styled.nested}>c</div>
      </div>
      <div className={styled.box}>Two</div>
      <div className={styled.box}>Three</div>
      <div className={styled.box}>Four</div>
      <div className={styled.box}>Five</div>
    </div>

  );
}