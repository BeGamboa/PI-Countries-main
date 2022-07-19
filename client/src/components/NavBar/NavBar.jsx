import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries } from "../../redux/actions/index";
import Logo from "../../assets/Logo.png";
import styles from "./NavBar.module.css"; 

export default function NavBar(){
    const allCountries = useSelector( (state) => state.countries );
    const dispatch = useDispatch();
    const [searchInput, setSearchInput] = useState("");

    function handleChange(e){
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getCountries(searchInput));
        setSearchInput("");
    }

    if(searchInput.length > 2) {
        allCountries.filter( country => {
            if(country.name.match(searchInput)) return country.name.match(searchInput)
            return (console.log("Country not found..."))
        });
    };

    function handleClick(e){
        e.preventDefault();
        dispatch(getCountries());
    };

  return (
      <header className={styles.navbar}>
          <div>
              <img id="logoDGlobe" src={Logo} className={styles.logo} alt="D'Globe" />
              <h2 className={styles.title}>D'Globe</h2>
            </div>
            <nav>
                <ul className={styles.list}>
                        <button onClick={(e) => {handleClick(e)}}>Show All Countries</button>
                        <Link to="/activity"><button>New Tourist Activity</button></Link>
                </ul>
                <form className={styles.formContainer} onSubmit={(e) => {handleSubmit(e)}}>
                    <div>
                        <label className={styles.label} htmlFor="country">
                            Country:{' '}
                        </label>
                        <input
                            type="text"
                            id="country"
                            autoComplete="off"
                            placeholder="search here..."
                            value={searchInput}
                            onChange={(e) => {handleChange(e)}}
                        />
                    </div>
                    <button className={styles.search} type="submit" onClick={(e) => {handleSubmit(e)}}>search</button>
                </form>
                  
              </nav>
      </header>
  )
    
};