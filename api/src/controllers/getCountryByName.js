const { Country, Activity, country_activity } = require("../db");
const { Op } = require("sequelize");


const getCountryByName = async(name) => {
    try{
        const searchCountries = await Country.findAll({
            where: {
                name: {
                    [Op.iLike]: '%'+name+'%'
                }
            },
            include: { model: Activity }
        });
        if(searchCountries){
            let countryDb = await searchCountries.map(el => el)
            return countryDb;
        } else return "Country name not found."
    }catch(error){
        console.log(error);
        return error;
    }
}

module.exports = {
    getCountryByName,
}