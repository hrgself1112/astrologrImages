const fs = require('fs');
const axios = require('axios');
const path = require('path');



// Read the JSON file containing image data
const jsonDataPath = "./data.json"; // Replace with the path to your JSON file
const outputFolder = 'astrologer'; // Specify the folder where you want to save the downloaded images
const outputFolder2x = '2x'; // Specify the folder where you want to save the downloaded images

// Create the output folder if it doesn't exist
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
    fs.mkdirSync(outputFolder2x);
}





fs.readFile(jsonDataPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }

    try {
        const imageArray = JSON.parse(data);

        // Iterate through the JSON data
        imageArray.forEach((item) => {
            const { imageName, imageUrl, id, imageUrl2x } = item;

            // changing name for image url normal 
            let name = imageName.split(" ")
            let filteredArray = name.filter(item => !/(acharya|astrologer|acharyaa|\(.*\))/.test(item.toLowerCase()));

            let output = filteredArray.map(item => item[0].toLowerCase()).join('');

            // Getting the extension name of image 
            let EveryExt = path.extname(imageUrl);


            const outputFilePath = path.join(outputFolder, output + "-" + id + EveryExt);
            const outputFilePath2x = path.join(outputFolder2x, output + "-" + id + EveryExt);


            // Download the image and save it
            axios({
                method: 'get',
                url: "https://www.astrocamp.com/" + imageUrl,
                responseType: 'stream',
                
            }).
            then((response) => {
                const writer = fs.createWriteStream(outputFilePath);
                response.data.pipe(writer);
                writer.on('finish', () => {
                    // console.log(`Downloaded ${id}`);
                });
                writer.on('error', (err) => {
                    console.error(`Error downloading ${id}:`);
                });
            }).catch((err) => {
                console.error(`Error downloading ${id}:`);
            });
            
            
            
            // Download the image 2x and save it
            axios({
                method: 'get',
                url: "https://www.astrocamp.com/" + imageUrl2x,
                responseType: 'stream',
            
            }).
            then((response) => {
                const writer2x = fs.createWriteStream(outputFilePath2x);
                response.data.pipe(writer2x);
                writer2x.on('finish', () => {
                    // console.log(`Downloaded ${id}`);
                });
                writer2x.on('error', (err) => {
                    console.error(`Error downloading ${id}:`);
                });
            }).catch((err) => {
                console.error(`Error downloading ${id}:`);
            });


            
        });
    }
     catch (error) {
        console.error('Error parsing JSON data:', error);
    }


    
}
);



