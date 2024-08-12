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

const sumInLine = async (db) => {
  if (!db) {
    throw new Error('Database is missing.');
  };

  const result = await db.query(`
      SELECT SUM((data_element->>'Population')::int) AS total_population
      FROM ${DATABASE_SCHEMA}.api_data,
      LATERAL jsonb_array_elements(doc_record->'data') AS data_element
      WHERE (data_element->>'Year')::text IN ('2018', '2019', '2020')
    `);

  const { total_population } = result[0];

  return total_population;    
}

module.exports = { sumInMemory, sumInLine };