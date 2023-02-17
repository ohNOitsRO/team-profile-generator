const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


const teamArray = [];

// questions for different teams members:

// Manager: 
const managerQuestions = [

    {
        type: 'input',
        name: 'managerName',
        message: 'Please enter the name of the manager of this team.'
    },

    {
        type: 'input',
        name: 'managerID',
        message: 'What is the managers ID number?'
    },

    {
        type: 'input',
        name: 'managerEmail',
        message: 'What is the managers email adress?'
    },

    {
        type: 'input',
        name: 'office',
        message: 'What is the managers office number?'
    },
]

//Engineer: 
const engineerQuestions = [

    {
        type: 'input',
        name: 'engiName',
        message: 'Please enter the name of the engineer.'
    },

    {
        type: 'input',
        name: 'engiID',
        message: 'What is this engineers ID number?'
    },

    {
        type: 'input',
        name: 'engiEmail',
        message: 'What is this engineers email address?'
    },

    {
        type: 'input',
        name: 'github',
        message: 'What is this engineers gitHub profile name?'
    },
]

//Intern:
const internQuestions = [

    {
        type: 'input',
        name: 'internName',
        message: 'Please enter the name of the intern.'
    },

    {
        type: 'input',
        name: 'internID',
        message: 'What is this interns ID number?',
    },

    {
        type: 'input',
        name: 'internEmail',
        message: 'What is this interns email address?'
    },

    {
        type: 'input',
        name: 'school',
        message: 'What school does this interen attend, if this intern is not currently attending a school enter "N/A" ',
    },
]

//this question will promt the user if they want to add another employee

const anotherOne = [
    {
        type: 'list',
        name: 'nextEmployee',
        message: 'Select the type of team member you would like to add next, if you are done select "Done" to generate your team ',
        choices: ['Engineer', 'Intern', 'Done']
    }
]
// end of questions 


//starting function - begins with manager because each team will always have a manager 
function init() {
        //starts with the manager function
        managerPromt();
}


//function that will promt the user to select the next type of employee they are adding 
function next() {
    inquirer.prompt(anotherOne).then((response) => {
        
        console.log(response);
        switch (response.nextEmployee) {
            case 'Engineer':
                engineerPromt();
                break;
            case 'Intern':
                internPromt();
                break;
            case 'Done':
                console.log('Creating your team!')
                makeTeam();
        }
    })
}
//function for the manager questions that will be called first when initiated
function managerPromt() {
    inquirer.prompt(managerQuestions).then((response) => {

        let name = response.managerName;
        let id = response.managerID;
        let email = response.managerEmail;
        let office = response.office;
        // creats an object for this manager 
        const manager = new Manager(name, id, email, office);
        //pushes the new manager object to the empty array to be used later 
        teamArray.push(manager);
        //this will call the next function which will promt the user to select the next type of employee they are adding 
        console.log(teamArray);

        next();
    })
}
//Function for Engineer promts
function engineerPromt() {
    inquirer.prompt(engineerQuestions).then((response) => {

        let name = response. engiName;
        let id = response.engiID;
        let email = response.engiEmail;
        let github = response.github;
        // creats an object for this manager 
        const engineer = new Engineer (name, id, email, github);

        teamArray.push(engineer);
        console.log(teamArray);
        //this will call the next function which will promt the user to select the next type of employee they are adding 
        next();
    })
}

//Function for Intern promts
function internPromt() {
    inquirer.prompt(internQuestions).then((response) => {

        let name = response. internName;
        let id = response.internID;
        let email = response.internEmail;
        let school = response.school;

        const intern = new Intern (name, id, email, school);

        teamArray.push(intern);
        console.log(teamArray);

        //this will call the next function which will promt the user to select the next type of employee they are adding 
        next();
    })
}

//function to make the file 
function makeTeam() {
fs.writeFile(outputPath, render(teamArray), function(err) {
if (err) { 
    return console.log(err)
}
})

}

//calls the initiating function 
init();
