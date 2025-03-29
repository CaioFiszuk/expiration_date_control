import { api } from '../utils/api';
import { useEffect, useState } from 'react';
import { FaTrashCan, FaPen } from "react-icons/fa6";
import DateDisplay from './DateDisplay';

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
    <div className='page'>
      <table className='table'>
        <caption className='table__caption'>Lista de produtos</caption>
        <thead>
          <tr>
            <th className='table__cell'>Nome do produto</th>
            <th className='table__cell'>Quantidade</th>
            <th className='table__cell'>Data de validade</th>
            <th className='table__cell'> </th>
            <th className='table__cell'> </th>
          </tr>
        </thead>
        <tbody>
        {products.length > 0 ? (

          products.map((product) => (
            <tr key={product._id}>
              <td className='table__cell'>{product.title}</td>
              <td className='table__cell'>{product.quantity}</td>
              <td className='table__cell'>{<DateDisplay dataISO={product.expirationDate}/>}</td>
              <td className='table__cell'><FaPen /></td>
              <td className='table__cell'><FaTrashCan /></td>
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
