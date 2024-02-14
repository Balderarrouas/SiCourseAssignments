const express = require('express');
const fs = require('fs');
const xml2js = require('xml2js');
const csv = require('csv-parser');
const yaml = require('js-yaml');

const app = express();

const csvPath = "C:/Users/Balder/source/repos/SiCourseAssignments/me.csv";
const jsonPath = "C:/Users/Balder/source/repos/SiCourseAssignments/me.json";
const xmlPath = "C:/Users/Balder/source/repos/SiCourseAssignments/me.xml";
const yamlPath = "C:/Users/Balder/source/repos/SiCourseAssignments/me.yaml";

// Endpoint for serving XML data
app.get('/xml', (req, res) => {
    fs.readFile(xmlPath, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading XML file');
        return;
      }
      xml2js.parseString(data, (parseErr, result) => {
        if (parseErr) {
          res.status(500).send('Error parsing XML');
          return;
        }
        res.json(result);
      });
    });
  });

  // Endpoint for serving JSON data
app.get('/json', (req, res) => {
    fs.readFile(jsonPath, 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      try {
        const jsonData = JSON.parse(data);
        res.json(jsonData);
      } catch (parseError) {
        res.status(500).json({ error: parseError.message });
      }
    });
  });

  // Endpoint for serving CSV data
app.get('/csv', (req, res) => {
    const results = [];
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => res.json(results))
      .on('error', (err) => res.status(500).json({ error: err.message }));
  });

  // Endpoint for serving YAML data
app.get('/yaml', (req, res) => {
    try {
      const yamlData = yaml.load(fs.readFileSync(yamlPath, 'utf8'));
      res.json(yamlData);
    } catch (parseError) {
      res.status(500).json({ error: parseError.message });
    }
  });



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});