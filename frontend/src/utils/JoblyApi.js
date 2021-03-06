import axios from 'axios'
// var axios = require('axios')

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

console.log(BASE_URL)

class JoblyApi {
  static async request(endpoint, paramsOrData = {}, verb = "get") {

    paramsOrData._token = localStorage.getItem('_token')

    console.debug("API Call:", endpoint, paramsOrData, verb);

    try {
      return (await axios({
        method: verb,
        url: `${BASE_URL}/${endpoint}`,
        [verb === "get" ? "params" : "data"]: paramsOrData
      })).data;
      // axios sends query string data via the "params" key,
      // and request body data via the "data" key,
      // so the key we need depends on the HTTP verb
    }

    catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }
}

// JoblyApi.request('login', { username: 'testuser', password: 'secret' }, 'post').then(console.log)
// JoblyApi.request('companies', {}, 'get').then(console.log)

export default JoblyApi