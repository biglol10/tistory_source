const { Command } = require("commander");
const fs = require("fs-extra");
const download = require("download-github-repo");
const prompts = require("prompts");
const chalk = require("chalk");
const path = require("path");
const execa = require("execa");
const packageJson = require("../package.json");

const modePrompt = {
  type: "toggle",
  name: "mode",
  message: "Would you like to copy template or git pull?",
  initial: false,
  active: "Template copy",
  inactive: "Git pull",
};

let projectName;
const rootDirectory = path.join(__dirname, "..");

const program = new Command();

function isUsingYarn() {
  return (process.env.npm_config_user_agent || "").indexOf("yarn") === 0;
}

function copyTemplate(templateFolderName, targetFolderName) {
  const templatePath = path.resolve(rootDirectory, templateFolderName);
  fs.copySync(templatePath, targetFolderName);
  console.log(chalk.green("template copy finished"));
  process.exit(0);
}

function gitRepositoryPull(isYarn) {
  const currentNodeWorkingDirectory = process.cwd();
  const projectPath = path.resolve(currentNodeWorkingDirectory, projectName);

  download("biglol10/NodeJsCrash", projectPath, async (err) => {
    if (err) {
      console.log(chalk.red("Failed to download repository"));
      process.exit(1);
    }
    console.log(chalk.green("Project pulled successfully"));

    const command = isYarn ? "yarn" : "npm";
    const args = ["install"];

    try {
      await execa(command, args, {
        cwd: projectPath,
        stdio: "inherit",
      });

      console.log(chalk.green("Dependency install finished"));
      process.exit(0);
    } catch (err) {
      console.log(chalk.red("Dependency install failed"));
      console.log(err);
      process.exit(1);
    }
  });
}

async function init() {
  program
    .version(packageJson.version)
    .description("script sample (tistory)")
    .arguments("<project-directory-folder>")
    .usage(`${chalk.yellow("<project-directory-folder>")} [options]`)
    .option("--author", "The author of the project")
    .option("--info", "Print project info")
    .option(
      "--template <path-to-template>",
      "specify the type of the project (e.g typescript)"
    )
    .option(
      "--templateFolder <folder-of-template>",
      "specify the folder name of the template"
    )
    .action((name) => {
      projectName = name;
    })
    .on("--help", () => {
      console.log(
        chalk.yellow(
          "Description about help can be added directly using on('--help')"
        )
      );
      console.log(chalk.yellow("The project is about Microfrontend"));
    });

  program.parse(process.argv);

  if (program.author) {
    console.log(chalk.green("Author: biglol"));
    console.log(chalk.green("Tistory"));
    process.exit(0);
  }

  if (program.info) {
    console.log(chalk.green("Sample cli project"));
    console.log(chalk.green("Tistory"));
    process.exit(0);
  }

  if (typeof projectName === "undefined") {
    console.log(chalk.red("Enter projectName"));
    console.log(
      chalk.red("npx create-react-app-for-tistoryblog {projectName}")
    );
    process.exit(1);
  }

  const isYarn = isUsingYarn();

  const { mode } = await prompts(modePrompt);

  // copy template
  if (mode) {
    let craTemplateName = "cra-template";
    if (program.template) {
      craTemplateName += `-${program.template}`;
    }
    copyTemplate(craTemplateName, program.templateFolder ?? projectName);
  } else {
    gitRepositoryPull();
  }
}

module.exports = init;
