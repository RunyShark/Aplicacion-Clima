const fs = require("fs");
const axios = require("axios");

class Busquedas {
  historial = [];

  dbPath = "./db/database.json";
  constructor() {
    this.leerDB();
  }
  get getParamsMabox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
        params: this.getParamsMabox,
      });
      const resp = (await instance.get()).data.features.map((e) => {
        return {
          id: e.id,
          ciudad: e.place_name,
          lat: e.center[0],
          lng: e.center[1],
        };
      });
      return resp;
    } catch (error) {
      console.log(error.message);
      return [];
    }
  }
  async temperatura(y, x) {
    console.log(y, x);
    const { data } = await axios(
      `https://api.openweathermap.org/data/2.5/weather?lat=${y}&lon=${x}&appid=${process.env.OPENWETHER_KEY}`
    );
    return data;
  }
  agregarHistorial(lugar = "") {
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }
    this.historial = this.historial.splice(0, 5);

    this.historial.unshift(lugar.toLocaleLowerCase());

    // Grabar en DB
    this.guardarDB();
  }

  guardarDB() {
    const payload = {
      historial: this.historial,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  leerDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);

    this.historial = data.historial;
  }
}

module.exports = Busquedas;
