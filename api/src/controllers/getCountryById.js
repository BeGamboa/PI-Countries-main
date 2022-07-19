const { Country, Activity, country_activity } = require("../db");
const { Op } = require("sequelize");

const getCountryById = async (id) => {
    try{
        const counDb = await Country.findOne({
            where: {
                id:{
                    [Op.iLike]: id
                }
            },
            include: { model: Activity }
        })
        if(counDb){
            let ctryDb = {
                id: counDb.id,
                name: counDb.name,
                image: counDb.image,
                continent: counDb.continent,
                capital: counDb.capital,
                subregion: counDb.subregion,
                area: counDb.area,
                population: counDb.population,
                activities: counDb.activities
            }
            return ctryDb;
        }else return "Could not find that country ID."
    }catch(error){
        console.log(error);
        return error;
    }
};

module.exports = {
    getCountryById,
}