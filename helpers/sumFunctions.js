const { DATABASE_SCHEMA } = require('../config');

const sumInMemory = (doc_record) => {
  // sum the total population between the year 2018 and 2020 using a HOF.
  if (!doc_record) {
    throw new Error('Nothing to sum because data is missing.');
  };  
  
  const { data } = doc_record;

  let totalSum = 0;

  data.forEach(dataEl => {    
    if (dataEl.Year >= 2018 && dataEl.Year <= 2020) {
      totalSum += dataEl.Population;
    }
  });

  return totalSum;
};

const sumUsingView = async (db) => {
  // sum the total population between the year 2018 and 2020 using a Postgres View
  if (!db) {
    throw new Error('Database is missing.');
  };

  const result = await db.query(`
    SELECT * FROM ${DATABASE_SCHEMA}.vw_total_population
  `);

  const { total_population } = result[0];

  return total_population;    
}

module.exports = { sumInMemory, sumUsingView };