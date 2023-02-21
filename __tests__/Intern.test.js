// Intern constructor 
const Intern = require('../lib/Intern');

// creates the Intern object  
test('creates an Intern object', () => {
    const intern = new Intern('Maximus', 24, 'dasupermax@gmail.com', 'UM');
    
    expect(intern.school) .toEqual(expect.any(String));
});

// checks for Intern school
test('gets intern school', () => {
    const intern = new Intern('Maximus', 24, 'dasupermax@gmail.com', 'UM');
    
    expect(intern.getSchool()).toEqual(expect.stringContaining(intern.school.toString()));
});

// checks for Intern role
test('gets role of employee', () => {
    const intern = new Intern('Maximus', 24, 'dasupermax@gmail.com', 'UM');

    expect(intern.getRole()).toEqual("Intern");
}); 
