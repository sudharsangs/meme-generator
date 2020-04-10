import React from 'react';
import styles from './Meme.module.css'

const Meme = ({template,onClick}) => {
    return(
        <img 
        key={template.id} 
        src={template.url} 
        alt={template.name}
        onClick={onClick}
        className={styles.meme}
    />
    )
}


export default Meme;