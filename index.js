const { inquirerMenu, pausa } = require("./helpers/inquirer");

const main = async () => {
  let opt = "";

  do {
    opt = await inquirerMenu();
    console.log(opt);

    if (opt !== 3) await pausa();
  } while (opt !== 3);
};

main();
