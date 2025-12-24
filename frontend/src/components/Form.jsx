import { useState, useEffect } from "react";

function Form({formTitle, handleSubmitForm, initialData}) {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [expirationDate, setExpirationDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleSubmitForm({title, quantity, expirationDate});
  };

    useEffect(() => {
      if (initialData) {
        setTitle(initialData.title || "");
        setQuantity(initialData.quantity || 0);
        setExpirationDate(initialData.expirationDate || null);
      }
    }, [initialData]);

  return (
    <form className='form' onSubmit={handleSubmit}>
          <legend className='form__title'>{formTitle}</legend>
          <input 
             type="text" 
             name="title" 
             placeholder='Título' 
             className='form__input'
             value={title}
             onChange={(e)=>{
              setTitle(e.target.value);
             }}
          />

          <input 
             type="number" 
             name="quantity" 
             placeholder='Quantidade' 
             className='form__input'
             value={quantity}
             onChange={(e)=>{
              setQuantity(e.target.value);
             }}
          />

          <input 
            type="date" 
            name="expiration-date" 
            className='form__input'
            value={expirationDate}
            onChange={(e)=>{
            setExpirationDate(e.target.value);
            }}
          />

          <button 
            type='submit' 
            className='form__button'
          >
            {formTitle}
          </button>
    </form>
  );
}

export default Form;