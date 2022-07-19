import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getDetails, clearPage } from '../../redux/actions';
import styles from './Details.module.css';

class Details extends React.Component {

    componentDidMount(){
        const id=this.props.match.params.id;
        this.props.getDetails(id);
    }

    componentWillUnmount(){
        this.props.clearPage();
    }

    render(){
        return(
            <div className={styles.background}>
            <div className={styles.country}>
            { 
                this.props.countryDetails ? (
                    <div className={styles.card}>
                        <h1>{this.props.countryDetails.name}</h1>
                        <img className={styles.img} src={this.props.countryDetails.image} alt={this.props.countryDetails.name} />
                        <p className={styles.labels}>cca3 (ID): {this.props.countryDetails.id + ' '}</p>
                        <p className={styles.labels}>CONTINENT: {this.props.countryDetails.continent + ' '}</p>
                        <div className={styles.description}>
                            <p>Capital: {this.props.countryDetails.capital + ' '}</p>
                            <p>Subregion: {this.props.countryDetails.subregion + ' '}</p>
                            <p>Area: {this.props.countryDetails.area + ' '} km²</p>
                            <p>Population: {this.props.countryDetails.population + ' '} inhab.</p>
                            <h4>Tourist Activities:</h4>
                                {this.props.countryDetails.activities ? 
                                this.props.countryDetails.activities.map((a) => {
                                    return (
                                        <div className={styles.activities}>
                                        <p>Name: {a.name}</p>
                                        <p>Difficulty: {a.difficulty}</p>
                                        <p>Duration: {a.duration} hours</p>
                                        <p>Seasons: {a.season.map((s) => {
                                            return (
                                                <span>{s}</span>
                                            )
                                        })}
                                        </p>
                                        </div>
                                    )
                                }) : <span>Activity not found</span>
                                }
                            </div>                    
                        </div>) : (<div>Country not found...</div>)
                    }
                    <Link to="/countries">
                        <button className={styles.but}>Return</button>
                    </Link>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        countryDetails: state.countryDetails,
    }
};

export default connect (mapStateToProps, {getDetails, clearPage})(Details);