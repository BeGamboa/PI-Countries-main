import React from 'react';
import styles from './Card.module.css';

export default function Card (country) {

    return (
        <div className = {styles.card}>
                <img className={styles.countryImage} src={country.image} alt={country.name} />

            <div className={styles.countryName}>
                <h4>{country.name}</h4>
            </div>
            <div className={styles.countryContinent}>
                <h5>{country.continent}</h5>
            </div>
        </div>
    );
};

