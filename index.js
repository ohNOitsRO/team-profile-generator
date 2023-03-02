// Import Requirements
const fs = require('fs'); 
const inquirer = require('inquirer');
const pageHTML = require('./src/createHTML');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern'); 

const teamProfile = [];

// Function of Manager prompts
const newManager = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Who is the manager of this team?'
           
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the managers ID."
           
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the managers email.",
    
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: "Please enter the manager's office number",
            
        }
    ])
    .then(managerInput => {
        const  {name, id, email, officeNumber} = managerInput; 
        const manager = new Manager (name, id, email, officeNumber);

        teamProfile.push(manager);
    })
};

// Function of Employee prompts
const newEmployee = () => {

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
            
        },
        {
            type: 'input',
            name: 'id',
            message: "Please enter the employees ID.",
            
        },
        {
            type: 'input',
            name: 'email',
            message: "Please enter the employees email.",
            
        },
        {
            type: 'input',
            name: 'github',
            message: "Please enter the employees github username.",
            when: (input) => input.role === "Engineer",
            
        },
        {
            type: 'input',
            name: 'school',
            message: "Please enter the interns school",
            when: (input) => input.role === "Intern",
            
        },
        {
            type: 'confirm',
            name: 'confirmAdd',
            message: 'Would you like to add more team members?',
            default: false
        }
    ])
    .then(employeeData => {
        let {name, id, email, role, github, school, confirmAdd} = employeeData;
        let employee; 

        if (role === "Engineer") {
            employee = new Engineer (name, id, email, github);

        } 
        else if (role === "Intern") {
            employee = new Intern (name, id, email, school);

        }

        teamProfile.push(employee); 

        if (confirmAdd) {
            return newEmployee(teamProfile);

        } 
        else {
            return teamProfile;

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

newManager()
  .then(newEmployee)
  .then(teamProfile => {
    return pageHTML(teamProfile);
  })
  .then(pageHTML => {
    return writeFile(pageHTML);
  });