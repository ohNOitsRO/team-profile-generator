// using Manager constructor 
const Manager = require('../lib/Manager');

// creating manager object  
test('creates an Manager object', () => {
    const manager = new Manager('Maximus', 24, 'dasupermax@gmail.com', 88);
    
    expect(manager.officeNumber).toEqual(expect.any(Number));
});

// gets role from getRole()
test('gets role of employee', () => {
    const manager = new Manager('Maximus', 24, 'dasupermax@gmail.com');

    expect(manager.getRole()).toEqual("Manager");
}); 