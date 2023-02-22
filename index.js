// Import Requirements
const fs = require('fs'); 
const inquirer = require('inquirer');
const createHTML = require('./src/createHTML');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

const teamData = []; 

// Function of Manager prompts
const addManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Who is the manager of this team?', 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } 
                else {
                    console.log ("Please enter the managers name!");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the managers ID.",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("Please enter the manager's ID!")
                    return false; 
                } 
                else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the managers email.",
            validate: email => {
                valid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
                if (valid) {
                    return true;
                } 
                else {
                    console.log ('Please enter the managers email!')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the manager's office number",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ('Please enter the managers office number!')
                    return false; 
                } 
                else {
                    return true;
                }
            }
        }
    ])
    .then(managerInput => {
        const  {name, id, email, officeNumber} = managerInput; 
        const manager = new Manager (name, id, email, officeNumber);

        teamData.push(manager);
    })
};

// Function of Employee prompts
const addEmployee = () => {
    console.log(`
    =================
    Adding employees to the team
    =================
    `);

    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: "Please choose your employees role",
            choices: ['Engineer', 'Intern']
        },
        {
            type: 'input',
            name: 'name',
            message: "What's the name of the employee?", 
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } 
                else {
                    console.log ("Please enter an employees name!");
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the employees ID.",
            validate: nameInput => {
                if  (isNaN(nameInput)) {
                    console.log ("Please enter the employees ID!")
                    return false; 
                } 
                else {
                    return true;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employees email.",
            validate: email => {
                valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (valid) {
                    return true;
                } 
                else {
                    console.log ('Please enter the employees email!')
                    return false; 
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: "Please enter the employees github username.",
            when: (input) => input.role === "Engineer",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } 
                else {
                    console.log ("Please enter the employees github username!")
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: "Please enter the interns school",
            when: (input) => input.role === "Intern",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } 
                else {
                    console.log ("Please enter the interns school!")
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add more team members?',
            default: false
        }
    ])
    .then(employeeData => {
        let {name, id, email, role, github, school, confirmAddEmployee} = employeeData;
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

        } 
        else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

        }

        teamData.push(employee); 

        if (confirmAddEmployee) {
            return addEmployee(teamData);

        } 
        else {
            return teamData;

        }
    })

};

// Function to create HTML page
const writeFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        if (err) {
            console.log(err);
            return;
        } 
        else {
            console.log("Your team profile has been successfully created!")
        }
    })
}; 

addManager()
  .then(addEmployee)
  .then(teamData => {
    return createHTML(teamData);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  })
  .catch(err => {
 console.log(err);
  });