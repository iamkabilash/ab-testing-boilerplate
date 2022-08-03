const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

// Project path
const projectPath = String.raw`${fs.readFileSync(
  path.resolve(__dirname, "../_project-path.txt"),
  "utf8"
)}`;

// Project src path
let projectSrcPath = path.resolve(
  path.resolve(projectPath).split(path.sep).join("/"),
  "code/src"
);

// Exit process if project src path exists
if (fs.existsSync(projectSrcPath)) {
  console.log(chalk.red("Exited as the files are in place already!"));
  process.exit(1);
}

// Copy all the files from variation template to project directory
try {
  fse.copySync(path.resolve(__dirname, "../variation-template"), projectPath);
  console.log(chalk.blue("Copied files successfully!"));
} catch (err) {
  console.error(err);
}
