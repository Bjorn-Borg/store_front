const fs = require("fs");
const path = "./LighthouseOutput/";
const filePath = "./LighthouseOutput/";
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const createCsvStringifier = require("csv-writer").createObjectCsvStringifier;

const FileParser = fileName => {
  const file = require(`${filePath}${fileName}`);
  const performance = file.categories.performance.score;
  const accessibility = file.categories.accessibility.score;
  const bestPractices = file.categories["best-practices"].score;
  const seo = file.categories.seo.score;
  const pwa = file.categories.pwa.score;
  const date = fileName.match(/\d+-\d+-\d+/g)[0];
  const commit = fileName.match(/(?<=\+\d{2}\.)(.\w*)/gm)[0];
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
        "Some error occured - file either not saved or corrupted file saved."
      );
    } else {
      console.log("It's saved!");
    }
  });
};

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
