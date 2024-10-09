import React from 'react';
import styles from './style.module.css';

const DotLoader = () => {
    return (
        <div className={`${styles.bouncingLoader}`}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default DotLoader;