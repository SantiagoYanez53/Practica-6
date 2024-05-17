
//necesitamos
// un archivo para guardar los datos (.json)
//un comando para las funciones
//usar los process.argv en el cual usaremos el indice 3 y 2
//y usar los fs para leer los archivos

const fs = require ("fs")
const koFile = "ko.json"
const comando = process.argv[2]

// lineas donde se crea el archivo

function init () {
    const archivo = fs.existsSync(koFile)

    //pero si no esta el archivo
    if (!archivo){
        fs.writeFileSync(koFile, JSON.stringify({alumno: []}))
    }
}

//funcion para oobtener los datos

function alumnosLista () {
    //aqui se lee el archivo
    const content = fs.readFileSync(koFile, "utf8")
    return JSON.parse(content).alumno
}
function actualizar(alumno) {
    const nvAlumno = { alumno: alumno }
    const nvAlumnoString = JSON.stringify(nvAlumno)
    fs.writeFileSync(koFile, nvAlumnoString)

 }

//funcion para añadir alumno

function añadir (nombre) {
    const alumno = alumnosLista()
    alumno.push (nombre)
    actualizar(alumno)
}

//funcion para eliminar

function delate (nombreIndex) {
    const alumno = alumnosLista()
    alumno.splice (nombreIndex, 1)
    actualizar(alumno)
}

//funcion para poder ver la lista

function ls () {
    const alumno = alumnosLista()
    //si no hay nada en la lista
    if (!alumno.length){
        console.error("No hay nada")
        process.exit()
    }
    for (let idx = 0; idx < alumno.length; idx++) {
    const nombre = alumno[idx];
    console.log(idx, "-", nombre);
}
}

//Funcion para resetear la lista

function reset() {
    actualizar([])
}

function main() {
    const command = process.argv[2];
    const arg = process.argv[3]
    init()

    if (command === "ls"){
        ls ()
    } else if ( command === "añadir") {
        if (!arg) {
            console.error("no se pudo agregar")
            process.exist(1)
        }

        añadir(arg); 
        ls()
        console.log ("Se añadio nuevo alumno")
    } else if (command === "delate"){
        if (!arg) {
        console.error("No se encuentra en la lista")
        process.exist(1)
    }
    const idx = parseInt(arg)
    if (isNaN(idx)) {
        console.error ("Numero de la lusta no esta")
        process.exist(1)
    } 

    const alumno = alumnosLista ()

    if (idx < 0 || idx > alumno.length) {
        console.error ("Numero invalido")
        process.exist(1)
    }

    delate (idx)
    ls()
    console.log("Alumno Eliminado") 
} else if (command === "reset") {
    reset ()
    console.log("Se reinicio la lista")
} else {
    console.error("Invalid" , command)
    process.exit()
}
}

main()