const XLSX = require('xlsx');
const workbook = XLSX.readFile('abarrotes.xlsx');
const worksheet = workbook.Sheets['Hoja1'];

const data = XLSX.utils.sheet_to_json(worksheet, {header:1})

// 1)
function exMay(valor1){
  const existenciaMayor = data.filter(row => row[4] > valor1);
  return existenciaMayor
}

// 2)
function exMen(valor2){
  const existenciaMenor = data.filter(row => row[4] < valor2);
  return existenciaMenor
}

// 3)
function clasification(clas, valor3){
  const clasificacionPrecio = data
   .filter(row => row[2] > valor3)
   .filter(row => row[3] == clas);
  return clasificacionPrecio
}

// 4)
function precioMayMen(valor4, valor5){
  const precioMayorMenor = data.filter(row => row[2] > valor4 && row[2] < valor5);
  return precioMayorMenor
}

// 5)
function group(){
  const numeroClasificacion = data.reduce((result, row) => {
   const clasificacion = row[3];
   result[clasificacion] = (result[clasificacion] || 0) +1;
   return result;
  }, {});
  return numeroClasificacion
}

// 1) Número de productos con existencia mayor a 20.
const valor1 = 20;
const resultado1 = exMay(valor1);
console.log('1) Número de productos con existencia mayor a 20.')
console.log(resultado1);
console.log('Número de productos con existencia mayor a ' + valor1 + ': ' + resultado1.length)

// 2) Número de productos con existencia menos a 15.
const valor2 = 15;
const resultado2 = exMay(valor2);
console.log('2) Número de productos con existencia menos a 15.')
console.log(resultado2);
console.log('Número de productos con existencia menor a ' + valor2 + ': ' + resultado2.length)

// 3) Lista de productos con la misma clasificación y precio mayor 15.50
const valor3 = 15.50;
const clas = 'abarrotes';
const resultado3 = clasification(clas,valor3);
console.log('3) Lista de productos con la misma clasificación y precio mayor 15.50')
console.log(resultado3);

// 4) Lista de productos con precio mayor a 20.30 y menor a 45.00
const valor4 = 20.30;
const valor5 = 45;
const resultado4 = precioMayMen(valor4, valor5);
console.log('4) Lista de productos con precio mayor a 20.30 y menor a 45.00')
console.log(resultado4);

// 5) Número de productos agrupados por su clasificación
const result = group();
console.log('5) Número de productos agrupados por su clasificación')
console.log(result);
