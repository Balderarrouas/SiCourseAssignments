const fs = require('fs');
const xml2js = require("xml2js");
const yaml = require("js-yaml");
const csv = require('csv-parser');



const jsonPath = "C:/Users/Balder/source/repos/SiCourseAssignments/me.json";
const xmlPath = "C:/Users/Balder/source/repos/SiCourseAssignments/me.xml";
const yamlPath = "C:/Users/Balder/source/repos/SiCourseAssignments/me.yaml";
const csvPath = "C:/Users/Balder/source/repos/SiCourseAssignments/me.csv";




// Read the JSON file
fs.readFile(jsonPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
  
    try {
      // Parse JSON data
      const jsonData = JSON.parse(data);
      console.log('Parsed JSON data:', jsonData);
      
     
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
    }
  });


  // Read the XML file
fs.readFile(xmlPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }
  
    // Parse XML data
    xml2js.parseString(data, (parseErr, result) => {
      if (parseErr) {
        console.error('Error parsing XML:', parseErr);
        return;
      }
  
      // Process parsed XML data (result) here
      console.log('Parsed XML data:', result);
    });
  });


// Read the YAML file
fs.readFile(yamlPath, 'utf8', (err, data) => {
    if (err){
        console.error('Error reading file:', err);
        return;
    }

    try {
        // Parse YAML data
        const parsedYaml = yaml.load(data);
        console.log('Parsed YAML data:', parsedYaml);
    } catch (parseError) {
        console.error('Error parsing', parseError);
    }
});

const csvData = [];

fs.createReadStream(csvPath).pipe(csv()).on('data', (row) => {
    csvData.push(row);
}).on('end', () => {
    console.log('parsed csv:', csvData);
}).on('error', (error) => {
    // Handle any error that occurred during reading or parsing the CSV file
    console.error('Error:', error);
  });