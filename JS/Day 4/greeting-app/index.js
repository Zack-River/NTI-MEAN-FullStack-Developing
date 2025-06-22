// main file

const fs = require(`fs`);
const chalk = require(`chalk`);
const figlet = require(`figlet`);
const getGreeting = require(`./greeting`);

const userName = "Zack River";

fs.writeFile('name.txt', userName, (err) => {
  if (err) {
    console.error("Error writing name to file:", err);
    return;
  }

  console.log(chalk.yellow("Name written to file."));

  fs.readFile('name.txt', 'utf8', (err, name) => {
    if (err) {
      console.error("Error reading name:", err);
      return;
    }

    const greetingMessage = getGreeting(name.trim() || "Guest");

    figlet(greetingMessage, (err, bigText) => {
      if (err) {
        console.error("Error using figlet:", err);
        return;
      }

      const styledText = chalk.green(bigText);
      console.log(styledText);

      fs.writeFile('output.txt', bigText, (err) => {
        if (err) {
          console.error("Error writing greeting:", err);
          return;
        }

        console.log(chalk.blue("Greeting saved to output.txt!"));
      });
    });
  });
});