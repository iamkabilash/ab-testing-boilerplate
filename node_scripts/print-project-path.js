const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// Project path
const projectPath = String.raw`${fs.readFileSync(
  path.resolve(__dirname, "../_project-path.txt"),
  "utf8"
)}`;

console.log(chalk.blue(projectPath));
