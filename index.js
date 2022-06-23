require("dotenv").config();
const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

console.log(process.env);
const main = async () => {
  let opt = "";
  const climaBusqueda = new Busquedas();

  do {
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        //Mostrar msg
        const lugar = await leerInput("Ciudad: ".yellow);
        await climaBusqueda.ciudad(lugar);

        //Buscar

        //Selecion

        //Clima

        //Mostrar resultados
        console.log("\nInfirmacion de la ciudad\n".green);
        console.log("Ciudad:".yellow);
        console.log("Lat:".white);
        console.log("Lng:".white);
        console.log("Temperatura:".white);
        console.log("Mínima:".white);
        console.log("Máxima:".white);

        break;

      default:
        break;
    }

    if (opt !== 3) await pausa();
  } while (opt !== 3);
};

main();
