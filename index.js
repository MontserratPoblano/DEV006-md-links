const fs = require("fs")
const path = require("path")
const markdownIt = require('markdown-it');
const md = new markdownIt();


const ruta = process.argv[2]

//funcion 1 Implementar ingreso de ruta
const pathIsAbsolute = (ruta) => {
    if (path.isAbsolute(ruta)) {
        return ruta
    } else {
        const transformAbsolute = path.resolve(ruta)
        return transformAbsolute
    }
}

// const pathAbsolute = pathIsAbsolute()
//funcion 2 Verificar si es un archivo 
const pathIsFile = (pathAbsolute) => {
    return new Promise((resolve, reject) => {
        fs.stat(pathAbsolute, (error, stats) => {
            if (error) {
                reject("Error occurred while checking if it is a file:" + error)
            } else if (stats.isFile() && path.extname(pathAbsolute) === ".md") {
                resolve(pathAbsolute)
            }
            else {
                reject("Path is not a Markdownfile or does not exist")
            }
        })
    })
}
