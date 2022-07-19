const axios = require("axios");
const { Country, Activity, country_activity } = require("../db");

const getApiCountries = async () => {
   const apiInfo = await axios.get("https://restcountries.com/v3/all");
   const infoCountries = apiInfo.data.map(country => {
      return{
         id: country.cca3,
         name: country.name.official,
         image: country.flags[0],
         continent: country.continents[0],
         capital: country.capital ? country.capital[0] : "Capital not found.",
         subregion: country.subregion,
         area: country.area,
         population: country.population,
      }
   });
   return infoCountries;
}

const getAllCountries = async () => {
   const apiData = await getApiCountries();
   try{
      const alreadySaved = await Country.findAll();
      if(!alreadySaved.length) await Country.bulkCreate(apiData);
   }catch(error){
      return error;
   }
   try{
      const allCountries = await Country.findAll({
         order:[
            ['name', 'ASC']
         ],
         include: { model: Activity,
         attributes: ['name']
         },
      });
      return allCountries;
   }catch(error){
      return error;
   }  
};

module.exports = {
   getAllCountries,
   getApiCountries
}