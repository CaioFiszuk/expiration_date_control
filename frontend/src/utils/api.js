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
        return res.data.data;
      })
          .catch((error) => {

      const errorMessage = error.response 
        ? `Error: ${error.response.status} - ${error.response.data.message || error.message}` 
        : `Network error: ${error.message}`;
      return Promise.reject(errorMessage);
    });
    }
     
    deleteProduct(id) {
      try {
        const res = axios.delete(`${this._baseURL}/products/${id}`);
        return res.data;
      } catch (error) {
        throw new Error(`Error: ${error.response ? error.response.status : error.message}`);
      }
    }

    updateProduct(id, { title, quantity, expirationDate }) {
      if (!id) {
        return Promise.reject("O ID é obrigatório.");
      }

      const updatedFields = {};

       if (title !== undefined) updatedFields.title = title;
       if (quantity !== undefined) updatedFields.quantity = quantity;
       if (expirationDate !== undefined) updatedFields.expirationDate = expirationDate;
    
      return axios.patch(`${this._baseURL}/products/${id}`, updatedFields, { headers: this._headers })
        .then((res) => res.data)
        .catch((error) => {
          const errorMessage = error.response 
            ? `Error: ${error.response.status} - ${error.response.data.message || error.message}` 
            : `Network error: ${error.message}`;
          return Promise.reject(errorMessage);
        });
    }
}

const api = new Api({
    baseUrl: "http://localhost:3000",
    headers: {
      "Content-Type": "application/json",
    },
  });
  
  export { api };