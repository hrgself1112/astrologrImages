const fs = require('fs');
const path = require('path');

// Read the JSON data from a file
const jsonDataPath = './jsor/output.json'; // Specify the path to your JSON file
const inputData = JSON.parse(fs.readFileSync(jsonDataPath, 'utf8'));

// Output SQL statements
const sqlStatements = inputData.map((item) => {
    const { imageName, id } = item;
    const imageFile = `/images/astrologer/${imageName}`;
    const imageFileLarge = `/images/astrologer/2x/${imageName}`;
    
    return `UPDATE tbl_profile SET imageFile = '${imageFile}', ImageFileLarge = '${imageFileLarge}' WHERE id = ${id};`;
});

// Join SQL statements into a single string
const sqlScript = sqlStatements.join('\n');

// Save the SQL script to a .sql file
const outputFilePath = './output.sql'; // Change the file path as needed
fs.writeFileSync(outputFilePath, sqlScript);

console.log('SQL script has been generated and saved to output.sql.');
