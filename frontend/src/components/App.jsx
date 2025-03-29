import { api } from '../utils/api';
import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getProducts()
      .then((data) => {
        console.log("Produtos recebidos:", data);
        setProducts(data.data);
      })
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <table>
        <thead>
          <tr>
            <th>Nome do produto</th>
            <th>Quantidade</th>
            <th>Data de validade</th>
          </tr>
        </thead>
        <tbody>
        {products.length > 0 ? (

          products.map((product) => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td>{product.quantity}</td>
              <td>{product.expirationDate}</td>
            </tr>
          ))

        ) : (
          <tr colspan='3'>Nada foi encontrado</tr>
        )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
