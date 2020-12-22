const Employee = require("./Employee")

module.exports = class Intern extends Employee {

    constructor(name, id, email, school) {
        super(name, id, email)
        this.school = school
        this.role = "Intern"
    }

    getSchool() {
        return this.school
    }
}