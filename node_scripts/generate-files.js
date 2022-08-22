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
  console.log(chalk.red("Exiting as the files are generated already!"));
  process.exit();
}

try {
  // Copy all the files from variation template to project directory
  fse.copySync(path.resolve(__dirname, "../variation-template"), projectPath);
  console.log(
    chalk.blue(
      `Project files generated successfully. Now run ${chalk.inverse(
        "npm run dev"
      )} to start the local development.`
    )
  );
} catch (error) {
  console.log(
    chalk.red(
      "Error on trying to copy variation template to project directory."
    ),
    error
  );
}
