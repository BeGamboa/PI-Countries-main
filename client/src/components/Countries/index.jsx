import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../Card/index";
import { Link } from "react-router-dom";
import { getCountries, getActivities, orderByName, orderByPopulation, filterContinent, filterActivity } from "../../redux/actions/index";
import Pagination from "../Pagination/index";
import styles from "./Countries.module.css";

export default function Countries() {
    const dispatch = useDispatch();
    const allCountries = useSelector((state) => state.countries);
    const allActivities = useSelector( (state) => state.activities);
    const [order, setOrder] = useState('');
    const [filters, setFilters] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage] = useState(10);
   
    const indexOfLastCountry = currentPage === 1 ? 9 : currentPage * countriesPerPage;
    const indexOfFirstCountry = currentPage === 1 ? 0 : indexOfLastCountry - countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry);

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch])

    useEffect(() => { 
        dispatch(getActivities());
    }, [dispatch])


    function handleFilterContinent(e){
        e.preventDefault();
        dispatch(filterContinent(e.target.value)); 
        setCurrentPage(1);       
        setFilters(`${e.target.value} filter`);
    };

    function handleFilterActivity(e){
        e.preventDefault();
        dispatch(filterActivity(e.target.value));
        setCurrentPage(1);
        setFilters(`${e.target.value} filter`);
    };

    function handleNameOrder(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`${e.target.value} order`);
    };

    function handlePopulationOrder(e){
        e.preventDefault();
        dispatch(orderByPopulation(e.target.value));
        setCurrentPage(1);
        setOrder(`${e.target.value} order`);
    };
    
    return (
        <>
            <div className={styles.allSelects} key="filters">
                <select className={styles.selects} onChange={(e) => {handleNameOrder(e)}}>
                    <option key="orderName" value="orderName">Order by name...</option>
                    <option key="asc" value="ascending">A-Z</option>
                    <option key="desc" value="descending">Z-A</option>
                </select>
                <select className={styles.selects} onChange={(e) => {handlePopulationOrder(e)}}>
                    <option key="populationOrder" value="populationOrder">Order by population...</option>
                    <option key="increasing" value="increasing">Smaller to bigger population</option>
                    <option key="decreasing" value="decreasing">Bigger to smaller population</option>
                </select>
                <select className={styles.selects} onChange={(e) => {handleFilterContinent(e)}}>
                    <option key="continent" value="All">Filter by continent...</option>
                    <option key="Africa" value="Africa">Africa</option>
                    <option key="Antarctica" value="Antarctica">Antarctica</option>
                    <option key="Asia" value="Asia">Asia</option>
                    <option key="Europe" value="Europe">Europe</option>
                    <option key="North America" value="North America">North America</option>
                    <option key="Oceania" value="Oceania">Oceania</option>
                    <option key="South America" value="South America">South America</option>
                </select>
                <select className={styles.selects} onChange={(e) => {handleFilterActivity(e)}}>
                    <option key="activity" value="All">Filter by activity...</option>
                    { allActivities ? allActivities.map(activity => (
                        <option key={activity.name} value={activity.name}>{activity.name}</option>
                    )) : "No tourist activities saved."
                }
                </select>
            </div>

            <div className={styles.cardsContainer}>
                {currentCountries.length > 0 ? (
                        currentCountries.map( (country) => {
                        return (
                            <li className={styles.cards} key={country.id}>
                        <Link to={"/countries/"+country.id}>
                            <Card key={country.id} name={country.name} image={country.image} continent={country.continent} />
                        </Link>
                        </li>
                        )})
                    ) : (
                        <>
                        <div>
                            <h4>Country not found...</h4>   
                        </div>
                        </>
                    )}  
            </div>
            <div className={styles.pagination}>
            <Pagination
            countriesPerPage={countriesPerPage}
            setCurrentPage={setCurrentPage}
            allCountries={allCountries}
            />
            </div>
        </>
    )
}