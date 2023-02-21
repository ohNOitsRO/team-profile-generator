// Engineer constructor 
const Engineer = require('../lib/Engineer');

// creates the Engineer object  
test('creates an Engineer object', () => {
    const engineer = new Engineer('Maximus', 24, 'dasupermax@gmail.com', 'dasupermax');
    
    expect(engineer.github).toEqual(expect.any(String));
});

// checks for Engineer github name
test('gets engineer github name', () => {
    const engineer = new Engineer('Maximus', 24, 'dasupermax@gmail.com', 'dasupermax');

    expect(engineer.getGithub()).toEqual(expect.stringContaining(engineer.github.toString()));
});

// checks for Engineer role 
test('gets role of employee', () => {
    const engineer = new Engineer('Maximus', 24, 'dasupermax@gmail.com', 'dasupermax');

    expect(engineer.getRole()).toEqual("Engineer");
});