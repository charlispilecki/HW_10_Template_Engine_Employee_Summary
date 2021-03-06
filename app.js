const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

console.log("Please build your team")

let employees = []

getManagerInfo()

function getManagerInfo() {
    inquirer.prompt([
        {
            name: "name",
            message: "What is your manager's name?"
        },
        {
            name: "id",
            message: "What is your manager's id?"
        },
        {
            name: "email",
            message: "What is your manager's email?"
        },
        {
            name: "officeNumber",
            message: "What is your manager's office number?"
        }
        ])
        .then(answers => {
            let manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
            employees.push(manager)
            promptForTeamMember()
        })
}

function promptForTeamMember() {
    inquirer.prompt([
        {
            name: "teamMember",
            type: "list",
            message: "Which type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't want to add anymore team members"
            ]
        }
        ])
        .then(answers => {
            console.log(answers.teamMember)
            if (answers.teamMember === 'Engineer') {
                getEngineerInfo()
            } else if (answers.teamMember === 'Intern') {
                getInternInfo()
            } else {
                console.log('Creating HTML file')
                let html = render(employees)
                if (!fs.existsSync(OUTPUT_DIR)) {
                    fs.mkdirSync(OUTPUT_DIR)
                }
                fs.writeFileSync(outputPath, html)
            }
        })
}

function getEngineerInfo() {
    inquirer.prompt([
        {
            name: "name",
            message: "What is your engineer's name?"
        },
        {
            name: "id",
            message: "What is your engineer's id?"
        },
        {
            name: "email",
            message: "What is your engineer's email?"
        },
        {
            name: "github",
            message: "What is your engineer's github username?"
        }
        ])
        .then(answers => {
            let engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
            employees.push(engineer)
            promptForTeamMember()
        })
}

function getInternInfo() {
    inquirer.prompt([
        {
            name: "name",
            message: "What is your intern's name?"
        },
        {
            name: "id",
            message: "What is your intern's id?"
        },
        {
            name: "email",
            message: "What is your intern's email?"
        },
        {
            name: "school",
            message: "What is your intern's school?"
        }
        ])
        .then(answers => {
            let intern = new Intern(answers.name, answers.id, answers.email, answers.school)
            employees.push(intern)
            promptForTeamMember()
        })

}