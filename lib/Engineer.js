// imports Employee constructor 
const Employee = require("./Employee");

// Engineer constructor extends Employee constructor 
class Engineer extends Employee {
    constructor (name, id, email, github) {
        super (name, id, email);
        this.github = github; 
    }

    // returns gitHub name from user input 
    getGithub () {
        return this.github;
    }

    // returns employee role as "Engineer"
    getRole () {
        return "Engineer";
    }
}


module.exports = Engineer; 