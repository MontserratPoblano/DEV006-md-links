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

