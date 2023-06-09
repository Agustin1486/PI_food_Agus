const { Diets } = require("../db");
const axios = require("axios");
// const postDiet = require("../handlers/handlerPostDiet");
const { API_KEY, URL_SPOONACULAR } = process.env;

const getTypesDiets = async () => {
  const typesDiet = await axios.get(
  /*   `${URL_SPOONACULAR}/recipes/complexSearch?apiKey=${API_KEY}&number=100&addRecipeInformation=true` */
  `https://run.mocky.io/v3/84b3f19c-7642-4552-b69c-c53742badee5`
  );
  const dato = typesDiet.data.results;

  const die = dato.map((elem) => elem.diets);
  const eachDiets = [];
  for (let i = 0; i < die.length; i++) {
    for (let j = 0; j < die[i].length; j++) {
      eachDiets.push(die[i][j]);
    }
  }

  const dataArr = new Set(eachDiets);

  let result = [...dataArr];

  await postDiet(result);
  const allDiets = await Diets.findAll();
  return allDiets;
};

const postDiet = async (dataArr) => {
  /** agarra la info y lo sube a la tabla de la bd */
  await dataArr.map((elem) => {
    Diets.findOrCreate({
      where: {
        name: elem,
      },
    });
  });
};
module.exports = {
  getTypesDiets,
};
