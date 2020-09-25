import React from "react";

import "./Ui.css"

const Ui = (props) => {
    return(
        <div className='ui-box'> 
            <div className='health-bar-red hp' style={{width: props.width}}></div> 
            <div className='health-bar-black hp'></div>
            <div className='health-bar-text'></div> 
        </div>
    )
}

export default Ui