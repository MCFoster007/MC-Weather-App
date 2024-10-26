import inquirer from 'inquirer';
import fs from 'fs';

// TODO: Create an array of questions for user input
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is your project called?",
    },
    {
        type: "input",
        name: "description",
        message: "What is the description?",
    },
    {
        type: "input",
        name: "table of contents",
        message: "What is the Table of Contents?",
    },
    {
        type: "input",
        name: "installation",
        message: "What coding language did you install?",
    },
    {
        type: "input",
        name: "usage",
        message: "Where can i find your video of the walkthrough?",
    },
    {
        type: "input",
        name: "credits",
        message: "Who do you give credit(s) too?",
    },
    {
        type: "input",
        name: "license",
        message: "What license do you have?",
    },
    {
        type: "input",
        name: "badges",
        message: "What badges do you have?",
    },
    {
        type: "input",
        name: "features",
        message: "What features do you have?",
    },
    {
        type: "input",
        name: "how to contribute",
        message: "Do you allow contribution to your README.md?",
    },
    {
        type: "input",
        name: "testing",
        message: "How do you test this?",
    },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) =>
        err ? console.log(err) : console.log('Success! README file created!')
    );
}

// TODO: Create a function to initialize app
function init() {
    inquirer
        .prompt(questions)
        .then((answers) => {
            const readmeContent = `
 # ${answers.title}

 ## Description
 ${answers.description}

 ## Table of Contents
 ${answers.tableofcontents}

  ## Installation
  ${answers.installation}

 ## Usage
 ${answers.usage}

 ## Credits
 ${answers.credits}


  ## License
  ${answers.license}

 ## Badges
 ${answers.badges}

 ## Features
 ${answers.features}

  ## How to Contribute
  ${answers.howtocontribute}

 ## Testing
 ${answers.testing}


            `;
            writeToFile('README.md', readmeContent);
        });
}

// Function call to initialize app
init();
