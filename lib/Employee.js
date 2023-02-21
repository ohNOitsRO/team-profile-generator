// Employee constructor 
class Employee {
    constructor (name, id, email) {
        this.name = name;
        this.id = id;
        this.email = email 
    }

    // returns name from user input
    getName () {
        return this.name;
    }

    // returns ID from user input
    getId () {
        return this.id;
    }   

    // returns email from user input
    getEmail () {
        return this.email;
    }

    // returns Employee role
    getRole () {
        return 'Employee'; 
    }
};


module.exports = Employee; 