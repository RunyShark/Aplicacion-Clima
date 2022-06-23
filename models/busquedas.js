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
}

module.exports = Busquedas;
