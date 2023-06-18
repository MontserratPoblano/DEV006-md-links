const fs = require("fs")
const path = require("path")
const markdownIt = require('markdown-it');
const md = new markdownIt({
    html:true
});
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const ruta = process.argv[2]


const pathIsAbsolute = (ruta) => {
    if (path.isAbsolute(ruta)) {
        return ruta
    } else {
        const transformAbsolute = path.resolve(ruta)
        return transformAbsolute
    }
}

const pathIsFile = (pathAbsolute) => {
    return new Promise((resolve, reject) => {
        fs.stat(pathAbsolute, (error, stats) => {
            if (error) {
                reject("Error occurred while checking if it is a file:" + error)
                return
            } if (stats.isFile() && path.extname(pathAbsolute) === ".md") {
                resolve(stats.isFile())
            }
            else {
                reject("Path is not a Markdownfile or does not exist")
                return
            }
        })
    })
}


const pathIsDirectory = (pathAbsolute) => {
    return new Promise((resolve, reject) => {
        fs.stat(pathAbsolute, (error, stats) => {
            if (error) {
                reject("Error occurred while checking if it is a directory:" + error)
                return;
            }
            resolve(stats.isDirectory())
        })
    })
}



const readFileMd = (pathAbsolute) => {
    return new Promise((resolve, reject) => {
        fs.readFile(pathAbsolute, "utf-8", (error, file) => {
            if (error) {
                reject(error)
            } else {
                const html = md.render(file)
                resolve(html)
            }
        })
    })
}

const readDirectory=()=>{
    return "aun no creo la funcion leer directorio"
}


const getLinksInFile=(fileHtml,pathAbsolute)=>{
    let linksInfo=[]
     const dom=new JSDOM(fileHtml)
    const links=dom.window.document.querySelectorAll("a")
    const linkstoArray = Array.from(links);
    return linkstoArray.map((link)=>{
        linksInfo.push({
            href:link.href,
            text:link.textContent,
            file:pathAbsolute
        })
        return  linksInfo
    })
   
}



module.exports = {
    pathIsAbsolute,
    pathIsFile,
    pathIsDirectory,
    readFileMd,
    readDirectory,
    getLinksInFile
}

