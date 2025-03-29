function DateDisplay({ dataISO }) {
    if (!dataISO) return <span>Data inválida</span>;

    const date = new Date(dataISO);
    
    if (isNaN(date.getTime())) {
        return <span>Data inválida</span>;
    }

    const formattedDate = date.toLocaleDateString("pt-BR", {
        timeZone: "UTC",
    });

    return <span>{formattedDate}</span>;
}

export default DateDisplay;
