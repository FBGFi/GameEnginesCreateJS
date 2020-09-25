import React from "react";

import "./Ui.css"

const Ui = (props) => {
    return(
        <div className='Ui'> 
            <div className='health-bar'>
                <div className="fill" style={{width: `calc(100% * ${props.width})`}}></div>
            </div>
        </div>
    )
}

export default Ui