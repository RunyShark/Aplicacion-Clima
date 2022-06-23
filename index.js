require("dotenv").config();
const {
  inquirerMenu,
  pausa,
  leerInput,
  listarLugares,
} = require("./helpers/inquirer");
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
        const busquedas = await leerInput("Ciudad: ".yellow);

        //Buscar
        const lugares = await climaBusqueda.ciudad(busquedas);

        //Selecion
        const id = await listarLugares(lugares);
        const lugarSeleccionado = lugares.find((lugar) => lugar.id === id);

        const { ciudad, lat, lng } = lugarSeleccionado;

        //Clima
        const tiempo = await climaBusqueda.temperatura(lng, lat);
        const { main } = tiempo;

        //Mostrar resultados
        console.log();
        console.log("====================================".rainbow);
        console.log("Infirmacion de la ciudad".yellow);
        console.log("====================================".rainbow);
        console.log("Ciudad:".yellow, `${ciudad}`.blue);
        console.log("Lat:".green, `${lng}`.blue);
        console.log("lng:".green, `${lat}`.blue);
        console.log("Temperatura:".green, `${main.temp}`.blue);
        console.log("Mínima:".green, `${main.temp_min}`.blue);
        console.log("Máxima:".green, `${main.temp_max}`.blue);

        break;

      default:
        break;
    }

    if (opt !== 3) await pausa();
  } while (opt !== 3);
};

main();
