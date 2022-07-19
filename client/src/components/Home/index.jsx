import React from "react";
import Countries from "../Countries/index";
import NavBar from "../NavBar/NavBar";
import styles from "./Home.module.css";

export default function Home () {
    return(
        <div className={styles.background}>
            <NavBar />
            <Countries />
        </div>
    );
};