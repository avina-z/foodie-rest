const { createClient } = require('@supabase/supabase');
const supabaseUrl = process.env.SIPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

async function _writeToDatabase(jsonData) {
  try {
    const { data: records, error } = jsonData;

    if (error) {
      throw new Error(`Error reading JSON data: ${error}`);
    }

    for (const record of records) {
      const { idmeserointerno, operacion, ...data } = record;

      // Define the table name where you want to perform the operation
      const tableName = 'meseros_test_foodie';

      switch (operacion) {
        case 'D':
          // Delete the record from the Supabase database using the ID
          const { data, error } = await supabase
            .from(tableName)
            .delete()
            .eq('idmeserointerno', idmeserointerno);

          if (error) {
            throw new Error(`Error deleting record: ${error}`);
          }

          console.log(`Record deleted successfully: ${JSON.stringify(data)}`);
          break;

        case 'I':
          // Insert the data into the Supabase database
          const { data: insertData, error: insertError } = await supabase
            .from(tableName)
            .insert({ ...data, idmeserointerno });

          if (insertError) {
            throw new Error(`Error inserting record: ${insertError}`);
          }

          console.log(`Record inserted successfully: ${JSON.stringify(insertData)}`);
          break;

        case 'U':
          // Update the record in the Supabase database using the ID
          const { data: updateData, error: updateError } = await supabase
            .from(tableName)
            .update(data)
            .eq('idmeserointerno', idmeserointerno);

          if (updateError) {
            throw new Error(`Error updating record: ${updateError}`);
          }

          console.log(`Record updated successfully: ${JSON.stringify(updateData)}`);
          break;

        default:
          console.warn(`Unknown operation: ${operacion}`);
          break;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

module.exports = { _writeToDatabase };

