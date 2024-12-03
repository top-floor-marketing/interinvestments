const numFormatter = (num) => {
    if (num > 999 && num < 1000000) {
      // Convertir a K para números entre 1000 y 1 millón
      return {
        number: parseFloat((num / 1000).toFixed(1)), // Asegurar un decimal
        tag: 'K'
      };
    } else if (num >= 1000000) {
      // Convertir a M para números mayores o iguales a 1 millón
      return {
        number: parseFloat((num / 1000000).toFixed(1)), // Asegurar un decimal
        tag: 'M'
      };
    }
    return {
      number: num,
      tag: ''
    };
  };
  
  export default numFormatter;