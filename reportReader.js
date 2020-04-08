const fs = require("fs");
const path = "./LighthouseOutput/";
// const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;

//this values should be migrated to the config
const scoreThreshold = [
  { performance: 0.7 },
  { accessibility: 0.8 },
  { bestPractices: 0.8 },
  { seo: 0.8 },
  { pwa: 0 }
];

const checkScores = argument => {
  scoreThreshold.forEach(item => {
    const key = Object.keys(item)[0];
    if (item[key] > argument[key]) {
      console.debug(`\n ***************** Lighthouse tests ran but the code failed to achieve the minimum score in: 
      \n ***************** ${key}: ${argument[key]}. The expected score for ${key} was ${item[key]}
      \n ***************** To reach the score run the script npm run performance:show 
      \n ***************** Then follow the instructions displayed in the browser to improve ${key} and run the script again
      \n ***************** And only commit the code again once the score ${item[key]} is reached \n\n
      \n ################# Otherwise in case the project's ${key} minimum score should change 
      \n ################# Change the value of the key ${key} of the object scoreThreshold in reportReader.js \n\n`);
      return process.exit(1);
    }
  });
};

const FileParser = fileName => {
  const file = require(`${path}${fileName}`);
  const performance = file.categories.performance.score;
  const accessibility = file.categories.accessibility.score;
  const bestPractices = file.categories["best-practices"].score;
  const seo = file.categories.seo.score;
  const pwa = file.categories.pwa.score;
  const date = fileName.match(/\d+-\d+-\d+/g)[0];
  const commit = fileName.match(/(?<=\+\d{2}\.)(.\w*)/gm)[0];
  checkScores({ performance, accessibility, bestPractices, seo, pwa });
  return {
    performance,
    accessibility,
    bestPractices,
    seo,
    date,
    pwa,
    commit
  };
};

const csvStringifier = createCsvStringifier({
  header: [
    { id: "date", title: "Date" },
    { id: "commit", title: "Commit" },
    { id: "performance", title: "Performance" },
    { id: "accessibility", title: "Accessibility" },
    { id: "bestPractices", title: "Best Practices" },
    { id: "seo", title: "SEO" },
    { id: "pwa", title: "PWA" }
  ]
});

const appendToFile = data => {
  const stringified = csvStringifier.stringifyRecords(data);
  fs.appendFile("./LighthouseReports.csv", stringified, "utf8", function(err) {
    if (err) {
      console.log(
        "----------------- Some error occured - file either not saved or corrupted file saved. -----------------"
      );
    } else {
      console.log(
        "----------------- LighthouseReports.csv was succesfully updated with the latest scores! -----------------"
      );
    }
  });
};

fs.readdir(path, (err, files) => {
  if (err) throw err;
  if (files) {
    const jsonFiles = files.filter(f => f.match(/json/g));
    const assesments = [];
    jsonFiles.forEach(j => assesments.push(FileParser(j)));
    // writeToFile(assesments);
    appendToFile(assesments);
  }
});

//Use this to create a new file if it's ever deleted

// const csvWriter = createCsvWriter({
//   path: "LighthouseReports.csv",
//   header: [
//     { id: "date", title: "Date" },
//     { id: "commit", title: "Commit" },
//     { id: "performance", title: "Performance" },
//     { id: "accessibility", title: "Accessibility" },
//     { id: "bestPractices", title: "Best Practices" },
//     { id: "seo", title: "SEO" },
//     { id: "pwa", title: "PWA" }
//   ]
// });

// const writeToFile = data => {
//   csvWriter
//     .writeRecords(data)
//     .then(() => console.log("The CSV file was written successfully"));
// };
