const fs = require("fs");
const path = require("path");
const { Select, Input } = require("enquirer");
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
    message: "Pick a client under which you want to create the site",
    choices,
  });
}

function inputSite() {
  return new Input({
    name: "siteName",
    message: "What is your site name?",
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

    // Get site name
    const siteName = await inputSite().run();

    // Validate site name
    if (!siteName.trim()) {
      console.log(
        chalk.red(
          `Given input is not a valid directory name. Please provide a valid directory name.`
        )
      );
      process.exit();
    }

    return {
      clientName,
      siteName: siteName.trim(),
    };
  } catch (error) {
    console.log(error);
  }
}

getUserInputs().then(({ clientName, siteName }) => {
  // Validate site name string as a directory name
  const invalidDirectoryNameCharsRegex = /(\\|\/|:|\*|\?|"|<|>|\|)/g;
  siteName = siteName.replace(invalidDirectoryNameCharsRegex, "");

  // Create the final site path
  const sitePath = path.resolve(
    __dirname,
    `../clients/${clientName}/${siteName}`
  );

  // Create site directory if it's not exist already
  if (!fs.existsSync(sitePath)) {
    fs.mkdirSync(sitePath);
    console.log(chalk.green("Site created successfully!"));
  } else {
    console.log(chalk.red("Exited as the site already exist!"));
  }
});
