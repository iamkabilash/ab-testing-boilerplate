const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const { Select, Input } = require("enquirer");
const chalk = require("chalk");

function getDirectories(source) {
  if (!fs.existsSync(source)) {
    console.log(chalk.red(`No such directory ${chalk.underline(source)}`));
    return;
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

function selectProject(choices) {
  return new Select({
    name: "projects",
    message: "Pick a project",
    choices,
  });
}

function inputClient() {
  return new Input({
    name: "clientName",
    message: "Enter the client name:",
  });
}

function inputSite() {
  return new Input({
    name: "siteName",
    message: "Enter the site name:",
  });
}

function inputProject() {
  return new Input({
    name: "projectName",
    message: "Enter the project name:",
  });
}

function updateProjectPath(projectPath) {
  try {
    fs.writeFileSync(
      path.resolve(__dirname, "../_project-path.txt"),
      projectPath
    );
  } catch (error) {
    console.log(
      chalk.red("Error on trying to update the project path."),
      error
    );
  }
}

function createProjectDirectoryWithVariationTemplate(projectPath) {
  try {
    fse.copySync(path.resolve(__dirname, "../variation-template"), projectPath);
  } catch (error) {
    console.log(
      chalk.red(
        "Error on trying to create new project directory with variation template."
      ),
      error
    );
  }
}

function validateInput(input) {
  if (!input.trim()) {
    console.log(
      chalk.red(`Exiting as the given input is not a valid directory name.`)
    );
    process.exit();
  }
}

async function getUserInputs() {
  let clientName, siteName, projectName;
  try {
    // Get clients directory lists
    const clients = [
      "Create a new client",
      ...getDirectories(path.resolve(__dirname, "../clients")),
    ];

    // Get client name
    clientName = await selectClient(clients).run();

    // Create a new client
    if (clientName === "Create a new client") {
      // Get client name
      clientName = await inputClient().run();

      // Validate client name
      validateInput(clientName);

      // Get site name
      siteName = await inputSite().run();

      // Validate site name
      validateInput(siteName);

      // Get project name
      projectName = await inputProject().run();

      // Validate project name
      validateInput(projectName);

      return {
        clientName: clientName.trim(),
        siteName: siteName.trim(),
        projectName: projectName.trim(),
      };
    }

    // Get sites directory lists
    const sites = [
      "Create a new site",
      ...getDirectories(path.resolve(__dirname, `../clients/${clientName}`)),
    ];

    // Get site name
    siteName = await selectSite(sites).run();

    // Create a new site
    if (siteName === "Create a new site") {
      // Get site name
      siteName = await inputSite().run();

      // Validate site name
      validateInput(siteName);

      // Get project name
      projectName = await inputProject().run();

      // Validate project name
      validateInput(projectName);

      return {
        clientName: clientName.trim(),
        siteName: siteName.trim(),
        projectName: projectName.trim(),
      };
    }

    // Get projects directory lists
    const projects = [
      "Create a new project",
      ...getDirectories(
        path.resolve(__dirname, `../clients/${clientName}/${siteName}`)
      ),
    ];

    // Get project name
    projectName = await selectProject(projects).run();

    if (projectName === "Create a new project") {
      // Get project name
      projectName = await inputProject().run();

      // Validate project name
      validateInput(projectName);
    }

    return {
      clientName: clientName.trim(),
      siteName: siteName.trim(),
      projectName: projectName.trim(),
    };
  } catch (error) {
    console.log(chalk.red("Error on trying to get some user inputs."), error);
  }
}

getUserInputs().then(({ clientName, siteName, projectName } = {}) => {
  // Return if no input found
  if (!clientName || !siteName || !projectName) return;

  // Invalid directory name characters regex
  const invalidDirectoryNameCharsRegex = /(\\|\/|:|\*|\?|"|<|>|\|)/g;

  // Validate inputs as a valid directory name
  clientName = clientName.replace(invalidDirectoryNameCharsRegex, "");
  siteName = siteName.replace(invalidDirectoryNameCharsRegex, "");
  projectName = projectName.replace(invalidDirectoryNameCharsRegex, "");

  // Create the final project path
  const projectPath = path.resolve(
    __dirname,
    `../clients/${clientName}/${siteName}/${projectName}`
  );

  if (!fs.existsSync(projectPath)) {
    // Create the project directory with variation template if it is not exist already
    createProjectDirectoryWithVariationTemplate(projectPath);

    // Update `_project-path.txt`
    updateProjectPath(projectPath);
    console.log(
      chalk.blue(
        `Project created successfully. Now run ${chalk.inverse(
          "npm run dev"
        )} to start the local development.`
      )
    );
  } else {
    // Update `_project-path.txt`
    updateProjectPath(projectPath);
    console.log(
      chalk.blue(
        `Project selected successfully. Now run ${chalk.inverse(
          "npm run dev"
        )} to start the local development.`
      )
    );
  }
});
