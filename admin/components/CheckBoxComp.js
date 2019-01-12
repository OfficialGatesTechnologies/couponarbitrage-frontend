
import React from 'react'
const CheckBoxComp = (props) => (
   
        <label class="checkbox">
            <input key={props.id} onClick={props.handleCheckChieldElement}  type="checkbox" checked={props.isChecked} value={props.value} /> {props.text}      
          </label>
  
)

export default CheckBoxComp;

