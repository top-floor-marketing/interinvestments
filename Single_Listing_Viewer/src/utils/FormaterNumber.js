const numFormatter = (num) => {
    if (num >= 1000000) {
        // Si el número es mayor o igual a un millón
        const formattedNum = (num / 1000000).toFixed(2); // Mantener dos decimales
        return {
            number: parseFloat(formattedNum), // Convertir a número flotante para omitir ceros finales
            tag: 'M'
        }
    } else if (num >= 1000 && num < 1000000) {
        // Si el número está entre 1,000 y 1 millón
        const formattedNum = (num / 1000).toFixed(2); // Mantener dos decimales
        return {
            number: parseFloat(formattedNum), // Convertir a número flotante para omitir ceros finales
            tag: 'K'
        }
    } else {
        // Si el número es menor a 1,000
        return {
            number: num,
            tag: ""
        }
    }
}

export default numFormatter