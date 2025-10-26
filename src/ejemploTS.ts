//Variables
let nombre = 'pepe';
let nombre2: string = 'pepe2';
nombre2 = 5;


let x: any = 1;
x = "hola";

let aux: number | string = 100;
aux = "akjd";

function suma (a, b){//version JS
    return a+b;
}

function suma2(a: number, b: number): number{
    return a+b;
}

const sumaFlecha = (a:number, b:number): number => {
    return a+b;
}

function multiplicar(n1:number, base:number,  n2?:number): number{//? es un opcional
    return n1 * base;
}

multiplicar(1,2,3);
multiplicar(1,3);

let nombres = [];
nombres = ["alex", "antio", 3, true];

let cadenas: string[] = ["as", "asd", "asc"]
let opciones: (string | boolean | number)[] = [false, 2, 2, "Adsfd"]

function suma3(a: number, b: number): number[]{
    return [a+b];
}



//Objetos
interface Persona{
    nombre:string,
    edad: number,
    conocimientos: string[]
}

const persona1:Persona = {
    nombre: "Mireia",
    edad: 20,
    conocimientos: ['java', 'dart', 'JS', 'TS', 'python']
}
console.log(persona1.nombre);



export interface Heroe{
    nombre: string,
    edad:number,
    direccion:{
        calle:string,
        num: string,
        ciudad: string
    }
}

export interface Heroe2{
    nombre: string,
    edad:number,
    direccion:Direccion,
    calculo:() => number
}
interface Direccion{
     calle:string,
        num: string,
        ciudad: string
}

//main:
const heroe:Heroe2 = {
    nombre: 'Batman',
    edad: 50,
    direccion:{
        calle: '',
        num: '',
        ciudad: ''
    },
    calculo(){
        return this.edad*2;
    }
}

console.log(heroe.calculo());

//function miFuncion(a:number, h:Heroe)

interface Pasajero{
    nombre: string,
    hijos?: string[]//opcional
}

const p1: Pasajero = {
    nombre: 'JL'
}

const p2: Pasajero = {
    nombre: 'Carlos',
    hijos: ["Dani", "Manuel"]
}

//desestructurar objetos
interface ReproductorMusica{
    volumen: number,
    segundo: number,
    cancion: string,
    informacion: Info
}
interface Info{
    autor:string,
    disco: string,
    anio: number
}

const musica: ReproductorMusica = {
    volumen: 150,
    segundo: 300,
    cancion: 'song',
    informacion:{
        autor:'anto',
        disco:'cd',
        anio: 2025
    }
}

console.log(musica.informacion.autor);

const {informacion, volumen} = musica
console.log(informacion);
const {autor} = informacion;
console.log(autor);

//desestructurar arrays
const alumnos:string[] = ['PAblo', 'Alejandro', 'Jorge'];
const [aux1, aux2, aux3] = alumnos;

const [, , jorge] = alumnos;

//Genericos:
function devolverTipoDato<T>(param: T){
    return param
}

let soyCadena = devolverTipoDato("hola")
let soyNumero = devolverTipoDato(2)
let soyArrayNum = devolverTipoDato([1,2,3])
let soyExplicito = devolverTipoDato<number>(10)



//Desestructuracion Argumentos:
interface Producto{
    nombre: string,
    descripcion:string,
    precio:number
}
function calcularImpuestos(productos: Producto[]): [number, number] {
    let total = 0;
    productos.forEach((producto: Producto) => {
        total += producto.precio
    })

    productos.forEach(({precio}) => {
        total += precio
    })

    return [total, total*0.21]
}

const movil: Producto = {
    nombre: 'Iphone',
    descripcion: 'movil caro',
    precio: 1300
}
const pc: Producto = {
    nombre: 'MSI',
    descripcion: 'PC gamer',
    precio: 1700
}

const articulos = [movil, pc]
//