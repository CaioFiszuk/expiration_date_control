import { api } from '../utils/api';
import { useEffect, useState } from 'react';
import { FaTrashCan, FaPen } from "react-icons/fa6";
import DateDisplay from './DateDisplay';
import { calculateDays } from '../utils/calculate';
import Popup from './Popup';

function App() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const sortProducts = (products) => {
    return products.sort((a, b) => new Date(a.expirationDate) - new Date(b.expirationDate));
  };

  const openMainModal = () => {
    setOpenModal(true);
  };

  const closeMainModal = () => {
    setOpenModal(false);
  };

  const openDeleteModal = (product) => {
    setSelectedProduct(product);
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }


  const handleCreateProduct = async (data) => {
    try {

      await api.createProduct(data.title, data.quantity, data.expirationDate);
      setProducts(prevProducts => sortProducts([
        ...prevProducts,
        { title: data.title, quantity: data.quantity, expirationDate: data.expirationDate }
      ]));

    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;

     try{
        await api.deleteProduct(selectedProduct._id);
        setProducts(products.filter((v) => v._id !== selectedProduct._id));
        closeDeleteModal();
        setSelectedProduct(null);
     }catch(error){
      console.error(error);
     }
  }

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
        setProducts(sortProducts(data.data));
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
            products.map((product) => {
              const remainingDays = calculateDays(product.expirationDate);
              let color = '';
            
              if (remainingDays <= 7) {
                color = 'red-cell'; 
              } else if (remainingDays <= 15) {
                color = 'orange-cell'; 
              }
            
              return (
                <tr key={product._id}>
                  <td className='table__cell'>{product.title}</td>
                  <td className='table__cell'>{product.quantity}</td>
                  <td className={`table__cell ${color}`}>
                    <DateDisplay dataISO={product.expirationDate} />
                  </td>
                  <td className='table__cell'><FaPen /></td>
                  <td className='table__cell pointer'><FaTrashCan onClick={() => openDeleteModal(product)}/></td>
                </tr>
              );
            })
          ) : (
            <tr><td colSpan="5">Nada foi encontrado</td></tr>
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

      <Popup
        isOpen={deleteModal}
        onClose={closeDeleteModal}
      >
         <h3 className='form__title'>Tem certeza?</h3>
         <div className='form__button-box'>
           <button className='form__button form__button-success' onClick={handleDeleteProduct}>Sim</button>
           <button className='form__button form__button-danger' onClick={closeDeleteModal}>Não</button>
         </div>
      </Popup>
    </div>
  );
}

export default App;
