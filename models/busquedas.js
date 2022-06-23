const axios = require("axios");

class Busquedas {
  historia = ["Tegucigalpa", "Madrid", "San José"];
  constructor(historia) {
    //? TODO: Leer DB si existe
    this.historia = historia;
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
      const resp = await instance.get();
      console.log(resp);
    } catch (error) {
      console.log(error.message);
    }

    return [];
  }
}

module.exports = Busquedas;
