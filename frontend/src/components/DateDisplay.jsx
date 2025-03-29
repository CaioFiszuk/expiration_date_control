function DateDisplay({ dataISO }) {
    const date = new Date(dataISO).toLocaleDateString("pt-BR");

   return (
    <td>{date}</td>
   ); 
}

export default DateDisplay;