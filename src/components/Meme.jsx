import React from 'react';

const Meme = ({template,onClick}) => {
    return(
        <img 
        key={template.id} 
        src={template.url} 
        alt={template.name}
        style={{width:200}}
        onClick={onClick}
    />
    )
}


export default Meme;