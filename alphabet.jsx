import React, { useState } from 'react';

function Alphabet( {onTaskHero} ){

    const [ letterInfos ] = useState(["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]);

    return (
        <div className="sorting">
            <ul>
                {
                    letterInfos.map( (lcol) => {
                        return <li className={lcol !== "A" ? "ltr" : "ltr gun"} data-letter={lcol} onClick = { () => onTaskHero(lcol) } >{lcol}</li>
                    })
                }
            </ul>                   
        </div>
    );
}

export default Alphabet;
