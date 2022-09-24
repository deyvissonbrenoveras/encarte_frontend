import React from 'react';

import useStyles from './styles';

function CardsCategory(props) {
    const styles = useStyles();
    // console.log('essa porra',Icon);
    // console.log('essa porra',label);
    return (
        <div className={styles.container + ' ' + (props.active ? styles.active : styles.normal)}>
            <div className={styles.containerIcon}>
                { props.Icon }
            </div>

            <label>{props.label}</label>
        </div>
    )
}

export default CardsCategory;