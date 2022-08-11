const fs = require("fs");
const fse = require("fs-extra");
const path = require("path");
const { Input } = require("enquirer");
const chalk = require("chalk");

function inputClient() {
  return new Input({
    name: "clientName",
    message: "What is your client name?",
  });
}

async function getUserInputs() {
  try {
    const clientName = await inputClient().run();

    // Validate client name
    if (!clientName.trim()) {
      console.log(
        chalk.red(
          `Given input is not a valid directory name. Please provide a valid directory name.`
        )
      );
      process.exit();
    }

    return {
      clientName: clientName.trim(),
    };
  } catch (error) {
    console.log(error);
  }
}

getUserInputs().then(({ clientName }) => {
  // Validate project name string as a directory name
  const invalidDirectoryNameCharsRegex = /(\\|\/|:|\*|\?|"|<|>|\|)/g;
  clientName = clientName.replace(invalidDirectoryNameCharsRegex, "");

  // Create the final client path
  const clientPath = path.resolve(__dirname, `../clients/${clientName}`);

  // Create client directory if it's not exist already
  if (!fs.existsSync(clientPath)) {
    fse
      .ensureDir(clientPath)
      .then(() => {
        console.log(chalk.green("Client created successfully!"));
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    console.log(chalk.red("Exited as the client already exist!"));
  }
});
