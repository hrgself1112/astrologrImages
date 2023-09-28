const fs = require('fs');

// Read the large JSON file
const largeData = require('./AllImages.json'); // Replace with your file path

// Determine the number of parts (e.g., 10 parts)
const numberOfParts = 15;

// Calculate the size of each chunk
const chunkSize = Math.ceil(largeData.length / numberOfParts);

// Split the large data into parts and write them to separate files
for (let i = 0; i < numberOfParts; i++) {
  const start = i * chunkSize;
  const end = (i + 1) * chunkSize;
  const partData = largeData.slice(start, end);

  // Write the part data to a new JSON file
  const partFilePath = `Images${i}.json`;
  fs.writeFileSync(partFilePath, JSON.stringify(partData, null, 2));
  console.log(`Part ${i} written to ${partFilePath}`);
}
