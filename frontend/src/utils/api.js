import axios from 'axios';

class Api {
    constructor(options) {
        this._baseURL = options.baseUrl;
        this._headers = options.headers;
    }

    getProducts() {
        return axios.get(`${this._baseURL}/products`, { headers: this._headers })
        .then((res) => {
            return res.data;
          })
          .catch((error) => {
            return Promise.reject(`Error: ${error.response ? error.response.status : error.message}`);
          });
    }

    createProduct(title, quantity, expirationDate) {
      if (!title || !quantity || !expirationDate) {
        return Promise.reject("Todos os campos são obrigatórios.");
      }

       return axios.post(`${this._baseURL}/products`, {title, quantity, expirationDate}, { headers: this._headers })
       .then((res) => {
        return res.data;
      })
          .catch((error) => {

      const errorMessage = error.response 
        ? `Error: ${error.response.status} - ${error.response.data.message || error.message}` 
        : `Network error: ${error.message}`;
      return Promise.reject(errorMessage);
    });
    }

    async deleteProduct (id) {
      try {
        const res = await axios.delete(`${this._baseURL}/products/${id}`);
        return res.data;
      } catch (error) {
        throw new Error(`Error: ${error.response ? error.response.status : error.message}`);
      }
    }
}

const api = new Api({
    baseUrl: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export { api };