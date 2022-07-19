import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
    return(
        <div className={styles.background}>
            <div>
                <img src={Logo} className={styles.logo} alt="Di Globe" />
            </div>

            <h1 className={styles.title}>D'Globe</h1>

            <div className={styles.light}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <Link to={"/countries"}>
                    COUNTRIES
                </ Link>
            </div>
        </div>
    );
};

export default LandingPage;