import { api } from '../utils/api';
import { useEffect, useState } from 'react';
import { FaTrashCan, FaPen } from "react-icons/fa6";
import DateDisplay from './DateDisplay';
import { calculateDays } from '../utils/calculate';
import Popup from './Popup';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function App() {
  const [products, setProducts] = useState([]);
  const [expiredProducts, setExpiredProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    title: '',
    quantity: '',
    expirationDate: ''
  });

  const sortProducts = (products) => {
  return products.sort((a, b) => {
    const dateA = new Date(a.expirationDate);
    const dateB = new Date(b.expirationDate);

    if (dateA.getTime() !== dateB.getTime()) {
      return dateA - dateB;
    }
    
    return a.title.localeCompare(b.title);
  });
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

  const openUpdateModal = (product) => {
     setSelectedProduct(product);
     setUpdateFormData({
      title: product.title,
      quantity: product.quantity,
      expirationDate: product.expirationDate
    });
     setUpdateModal(true);
  }

  const closeUpdateModal = () => {
    setUpdateModal(false);
  }


  const handleCreateProduct = async (data) => {
    try {

      const newProduct = await api.createProduct(data.title, data.quantity, data.expirationDate);

      const productWithData = {
       id: newProduct.id,
       ...data
      };
      setProducts(prevProducts => sortProducts([
        ...prevProducts,
        productWithData
      ]));
     

    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async () => {

    if (!selectedProduct) return;

     try{
        await api.deleteProduct(selectedProduct.id);
        setProducts((prev) => sortProducts(prev.filter((v) => v.id !== selectedProduct.id)));
        setSelectedProduct(null);
        closeDeleteModal();
     }catch(error){
      console.error(error);
     }
  }

  const handleUpdateFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!selectedProduct) return;
  
    try {

      const response = await api.updateProduct(selectedProduct.id, updateFormData);
      const updatedProduct = response;
            console.log(updatedProduct.expirationDate);
      setProducts((prevProducts) =>
        sortProducts(
          prevProducts.map((product) =>
            product.id === selectedProduct.id ? updatedProduct : product
          )
        )
      );
      closeUpdateModal();
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
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

  const exportPDF = (products, filename = "lista_de_produtos.pdf", title = "Lista de Produtos") => {
    if (!products || products.length === 0) {
      alert("Nenhum produto para exportar");
      return;
  }

  const doc = new jsPDF();

  doc.text(title, 14, 10);

  autoTable(doc, {
    startY: 20,
    head: [['Nome do Produto', 'Quantidade', 'Validade']],
    body: products.map(p => [
      p.title,
      p.quantity,
      new Date(p.expirationDate).toLocaleDateString('pt-BR')
    ])
  });

   doc.save(filename);
  };


  useEffect(() => {
    api.getProducts()
      .then((data) => {
        const sorted = sortProducts(data);
        setProducts(sorted);
        const today = new Date().toISOString().slice(0, 10);
        const expired = sorted.filter((p) => p.expirationDate < today);
        setExpiredProducts(expired);
      })
      .catch((error) => console.error("Erro ao buscar produtos:", error));
  }, []);

  return (
    <div className='page'>
      <nav className='navigation'>
        <button
          type='button'
          className='blue-button'
          onClick={openMainModal}
        >
          Registrar Novo
        </button>
      </nav>

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
                <tr key={product.id}>
                  <td className='table__cell'>{product.title}</td>
                  <td className='table__cell'>{product.quantity}</td>
                  <td className={`table__cell ${color}`}>
                    <DateDisplay dataISO={product.expirationDate} />
                  </td>
                  <td className='table__cell pointer'><FaPen onClick={() => openUpdateModal(product)}/></td>
                  <td className='table__cell pointer'><FaTrashCan onClick={() => openDeleteModal(product)}/></td>
                </tr>
              );
            })
          ) : (
            <tr><td colSpan="5">Não há itens no catálogo</td></tr>
          )}
        </tbody>
      </table>
       <button className='pdf-button' onClick={()=>exportPDF(products, "todos_os_produtos.pdf", "Todos os Produtos")}>Baixar PDF</button>
       <button className='pdf-button' onClick={() => exportPDF(expiredProducts, "produtos_vencidos.pdf", "Produtos Vencidos")}>Baixar PDF de Vencidos</button>
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

      <Popup
        isOpen={updateModal}
        onClose={closeUpdateModal}
      >
        <form className='form' onSubmit={handleUpdateProduct}>
          <legend className='form__title'>Atualizar Produto</legend>
          <input 
          
            type="text" 
            name="title" 
            placeholder='Título' 
            className='form__input'
            value={updateFormData.title}
            onChange={handleUpdateFormChange}
          />
          <input 
            type="number" 
            name="quantity" 
            placeholder='Quantidade' 
            className='form__input'
            value={updateFormData.quantity}
            onChange={handleUpdateFormChange}
          />
          <input 
            type="date" 
            name="expirationDate" 
            className='form__input'
            value={updateFormData.expirationDate.slice(0, 10)}
            onChange={handleUpdateFormChange}
          />

          <button 
            type='submit' 
            className='form__button'
          >
            Atualizar
          </button>
        </form>
      </Popup>
    </div>
  );
}

export default App;
