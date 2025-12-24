import { useState, useEffect } from "react";
import Validator from './Validator';

function Form({formTitle, handleSubmitForm, initialData}) {
  const [title, setTitle] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [expirationDate, setExpirationDate] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
              setErrorMessage(e.target.validationMessage);
              setIsValid(e.target.checkValidity());
             }}
             required
             minLength={5}
             maxLength={50}
          />
            {!isValid && <Validator message={errorMessage} />}

          <input 
             type="number" 
             name="quantity" 
             placeholder='Quantidade' 
             className='form__input'
             value={quantity}
             onChange={(e)=>{
              setQuantity(e.target.value);
              setErrorMessage(e.target.validationMessage);
              setIsValid(e.target.checkValidity());
             }}
             required
             max={10000}
             min={0}
          />
            {!isValid && <Validator message={errorMessage} />}

          <input 
            type="date" 
            name="expiration-date" 
            className='form__input'
            value={expirationDate}
            onChange={(e)=>{
              setExpirationDate(e.target.value);
              setErrorMessage(e.target.validationMessage);
              setIsValid(e.target.checkValidity());
            }}
            required
          />
            {!isValid && <Validator message={errorMessage} />}

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