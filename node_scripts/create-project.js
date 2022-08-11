const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const { Select, Input } = require("enquirer");
const chalk = require("chalk");

function getDirectories(source) {
  if (!fs.existsSync(source)) {
    console.log(chalk.red(`No such directory ${chalk.underline(source)}`));
    process.exit();
  }

  return fs
    .readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

function selectClient(choices) {
  return new Select({
    name: "clients",
    message: "Pick a client",
    choices,
  });
}

function selectSite(choices) {
  return new Select({
    name: "sites",
    message: "Pick a site",
    choices,
  });
}

function inputProject() {
  return new Input({
    name: "projectName",
    message: "What is your project name?",
  });
}

async function getUserInputs() {
  try {
    // Get clients directory lists
    const clients = getDirectories(path.resolve(__dirname, "../clients"));

    // If no clients directory found, exit.
    if (!clients.length) {
      console.log(chalk.red("No clients found. Please create a client first."));
      process.exit();
    }

    // Get client name
    const clientName = await selectClient(clients).run();

    // Get sites directory lists
    const sites = getDirectories(
      path.resolve(__dirname, `../clients/${clientName}`)
    );

    // If no sites directory found, exit.
    if (!sites.length) {
      console.log(
        chalk.red(
          "No sites found under this client. Please create a site first."
        )
      );
      process.exit();
    }

    // Get site name
    const siteName = await selectSite(sites).run();

    // Get project name
    const projectName = await inputProject().run();

    // Validate project name
    if (!projectName.trim()) {
      console.log(
        chalk.red(
          `${projectName} is not a valid project name. Please provide a valid project name.`
        )
      );
      process.exit();
    }

    return {
      clientName,
      siteName,
      projectName: projectName.trim(),
    };
  } catch (error) {
    console.log(error);
  }
}

getUserInputs().then(({ clientName, siteName, projectName }) => {
  // Validate project name string as a directory name
  const invalidDirectoryNameCharsRegex = /(\\|\/|:|\*|\?|"|<|>|\|)/g;
  projectName = projectName.replace(invalidDirectoryNameCharsRegex, "");

  // Create the final project path
  const projectPath = path.resolve(
    __dirname,
    `../clients/${clientName}/${siteName}/${projectName}`
  );

  // Exit process if project path exists
  if (fs.existsSync(projectPath)) {
    console.log(chalk.red("Exited as the project already exist!"));
    process.exit();
  } else {
    try {
      // Create the project directory if it is not exist already
      fse.copySync(
        path.resolve(__dirname, "../variation-template"),
        projectPath
      );

      // Update `_project-path.txt`
      fs.writeFileSync(
        path.resolve(__dirname, "../_project-path.txt"),
        projectPath
      );
      console.log(chalk.blue("Project created successfully!"));
    } catch (err) {
      console.error(err);
    }
  }
});
