const { DATABASE_SCHEMA } = require('../config');
const { getApiData } = require('./getData');

// save the data to DB

const saveApiDataToDB = async (db) => {
  // throw an error if no db is provided
  if (!db) {
    throw new Error('Database is missing.');
    return;
  }
  
  try {
    const apiData = await getApiData();
    // destroy the data in the table before save new records. The safe way is to use some criteria to not destroy undesirable data.
    await db[DATABASE_SCHEMA].api_data.destroy({});
    const result = await db[DATABASE_SCHEMA].api_data.insert({
      api_name: apiData.source[0].name,
      doc_id: apiData.source[0].annotations.table_id,
      doc_name: apiData.source[0].annotations.dataset_name,
      doc_record: apiData
    });
    return JSON.stringify(result, null, 2);
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = {
  saveApiDataToDB
};