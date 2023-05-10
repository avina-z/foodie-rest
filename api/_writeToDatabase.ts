const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey);

export async function processRecords(jsonString) {
  try {
//    const { data: records, error } = jsonString;
//    if (error) {
//      throw new Error(`Error reading JSON data: ${error}`);
 //   }
    for (const record of jsonString) {
      const { idmeserointerno, operacion, ...data } = record;
      const cdcData = data;
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

          console.log(`Record deleted successfully: ${JSON.stringify(cdcData)}`);
          break;

        case 'I':
          // Insert the data into the Supabase database
          const { data: insertData, error: insertError } = await supabase
            .from(tableName)
            .insert({ ...cdcData, idmeserointerno, operacion});

            console.log("JSON.insertData");
            console.log(cdcData);
          if (insertError) {
            console.log(insertError);
            throw new Error(`Error inserting record: ${insertError}`);
          }

          console.log(`Record inserted successfully: ${JSON.stringify(cdcData)}`);
          break;

        case 'U':
          // Update the record in the Supabase database using the ID
          const { data: updateData, error: updateError } = await supabase
            .from(tableName)
            .update(...cdcData, operacion)
            .eq('idmeserointerno', idmeserointerno);

          if (updateError) {
            throw new Error(`Error updating record: ${updateError}`);
          }

          console.log(`Record updated successfully: ${JSON.stringify(cdcData)}`);
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



