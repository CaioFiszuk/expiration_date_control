function DateDisplay({ dataISO }) {
    const date = new Date(dataISO).toLocaleDateString("pt-BR");

   return (
    <span>{date}</span>
   ); 
}

export default DateDisplay;