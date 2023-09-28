const fs = require('fs');
const path = require('path');

// Read the JSON file containing image data
const jsonDataPath = "./AllImages.json"; // Replace with the path to your JSON file
const outputFolder = 'jsor'; // Specify the folder where you want to save the downloaded images

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

fs.readFile(jsonDataPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        const imageArray = JSON.parse(data);

        // Create a new array with the desired output structure
        const outputArray = imageArray.map((item) => {
            const { imageName, id } = item;

            // changing name for image url normal 
            let name = imageName.split(" ")
            let filteredArray = name.filter(item => !/(acharya|astrologer|acharyaa|\(.*\))/.test(item.toLowerCase()));

            let output = filteredArray.map(item => item[0].toLowerCase()).join('');

            // Getting the extension name of image 
            let EveryExt = path.extname(item.imageUrl);

            return {
                imageName: `${output}-${id}${EveryExt}`,
                id: id
            };
        });

        const outputFilePath = path.join(outputFolder, 'output.json');
        fs.writeFileSync(outputFilePath, JSON.stringify(outputArray, null, 2));

        // If you want to save the outputArray as a JSON file, you can do it here.
        // Example:
        // fs.writeFileSync('output.json', JSON.stringify(outputArray, null, 2));

    } catch (error) {
        console.error('Error parsing JSON:', error);
    }
});
