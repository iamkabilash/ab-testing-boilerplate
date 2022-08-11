const fs = require("fs");
const path = require("path");
const { Select } = require("enquirer");
const chalk = require("chalk");

function getDirectories(source) {
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

    // Get projects directory lists
    const projects = getDirectories(
      path.resolve(__dirname, `../clients/${clientName}/${siteName}`)
    );

    // If no projects directory found, exit.
    if (!projects.length) {
      console.log(
        chalk.red(
          "No projects found under this site. Please create a project first."
        )
      );
      process.exit();
    }

    // Get project name
    const projectName = await selectProject(projects).run();

    return {
      clientName,
      siteName,
      projectName,
    };
  } catch (error) {
    console.log(error);
  }
}

getUserInputs().then(({ clientName, siteName, projectName }) => {
  // Create the final project path
  const projectPath = path.resolve(
    __dirname,
    `../clients/${clientName}/${siteName}/${projectName}`
  );

  try {
    // Update `_project-path.txt`
    fs.writeFileSync(
      path.resolve(__dirname, "../_project-path.txt"),
      projectPath
    );
    console.log(chalk.blue("Project path updated successfully!"));
  } catch (err) {
    console.error(err);
  }
});
