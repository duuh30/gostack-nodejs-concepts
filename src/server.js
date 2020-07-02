const app = require("./app");
const chalk = require('chalk');

app.listen(3333, () => {
    console.log(chalk.blue('🚀 Server is running 🚀'));
});
