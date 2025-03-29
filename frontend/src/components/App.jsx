import { api } from '../utils/api';
import { useEffect, useState } from 'react';
import { FaTrashCan, FaPen } from "react-icons/fa6";
import DateDisplay from './DateDisplay';
import Popup from './Popup';

function App() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const openMainModal = () => {
    setOpenModal(true);
  };

  const closeMainModal = () => {
    setOpenModal(false);
  }

  const handleCreateProduct = async (data) => {
    try {
      await api.createProduct(data.title, data.quantity, data.expirationDate);
      setProducts(prevProducts => [
        ...prevProducts,
        { title: data.title, quantity: data.quantity, expirationDate: data.expirationDate }
      ]);
    } catch (error) {
      console.error(error);
    }
  };  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const productData = {
      title: data.get('title'),
      quantity: data.get('quantity'),
      expirationDate: data.get('expiration-date'),
    };
    await handleCreateProduct(productData);
    closeMainModal();
  };
  

  useEffect(() => {
    api.getProducts()
      .then((data) => {
        //console.log("Produtos recebidos:", data);
        setProducts(data.data);
      })
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  return (
    <div className='page'>

      <button 
        type='button' 
        className='create-button'
        onClick={openMainModal}
      >
        Registrar Novo
      </button>
      
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
          <tr>Nada foi encontrado</tr>
        )}
        </tbody>
      </table>

      <Popup
        isOpen={openModal}
        onClose={closeMainModal}
      >
         <form className='form' onSubmit={handleSubmit}>
          <legend className='form__title'>Registrar Produto</legend>
          <input type="text" name="title" placeholder='Título' className='form__input'/>
          <input type="number" name="quantity" placeholder='Quantidade' className='form__input'/>
          <input type="date" name="expiration-date" className='form__input'/>

           <button 
             type='submit' 
             className='form__button'
            >
              Registrar
            </button>
         </form>
      </Popup>
    </div>
  );
}

export default App;
