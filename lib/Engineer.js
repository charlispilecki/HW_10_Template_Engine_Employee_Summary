const Employee = require("./Employee")

module.exports = class Engineer extends Employee {

    constructor(name, id, email, github) {
        super(name, id, email)
        this.github = github
        this.role = "Engineer"
    }

    getGithub() {
        return this.github
    }
}