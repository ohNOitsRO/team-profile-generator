// imports Employee constructor 
const Employee = require("./Employee");

// Manager constructor extends Employee constructor 
class Manager extends Employee {
    constructor (name, id, email, officeNumber) {
        super (name, id, email); 
        this.officeNumber = officeNumber; 
    }

    // returns employee role as "Manager" 
    getRole () {
        return "Manager";
    }
}


module.exports = Manager; 
