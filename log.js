const emoji = require('node-emoji')
const chalk = require('chalk');
require("console-stamp")(console, {
  pattern: 'HH:MM:ss:l',
  label: false,
  colors: {
    stamp: "cyan"
  }
});


module.exports = function log(text, type, task) {

  switch (type) {
    case "warning":
      console.log(chalk.blueBright(`[Task ${task}]`) + chalk.yellow(` [WARN] ${text}`));
      break;
    case "error":
      console.log(chalk.blueBright(`[Task ${task}]`) + chalk.redBright(` [ERROR] ${text}`));
      break;
    case "info":
      console.log(chalk.blueBright(`[Task ${task}]`) + chalk.cyanBright(` [INFO] ${text}`))
      break;
    case "success":
      console.log(chalk.blueBright(`[Task ${task}]`) + chalk.greenBright(` [SUCCESS] ${text}`));
      break;
    case "emoji":
      console.log(chalk.blueBright(`[Task ${task}]`) + chalk.magentaBright(emoji.emojify(` [EMOJI :upside_down_face: ] ${text}`)));
      break;
    case "task_log":
      console.log(chalk.blueBright(`[Task ${task}]`) + (` [LOG] ${text}`));
      break;
    default:
      console.log(chalk.blueBright(`[Task ${task}]`) + (` [LOG] ${text}`));
  }
}
