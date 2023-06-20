const fs = require("fs")
const path = require("path")
const markdownIt = require('markdown-it');
const md = new markdownIt({
    html: true
});
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios");

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

const getAllFiles = (pathAbsolute, arrayOfFiles) => {

    const files = fs.readdirSync(pathAbsolute)
    arrayOfFiles = arrayOfFiles || []
    files.forEach((file) => {
        const fileAbsolute = path.join(pathAbsolute, file)
        if (fs.statSync(fileAbsolute).isDirectory()) {
            arrayOfFiles = getAllFiles(fileAbsolute, arrayOfFiles)

        } else if (path.extname(fileAbsolute) === ".md") {
            arrayOfFiles.push(fileAbsolute)
        }
    })
   
    return arrayOfFiles
}

// const getLinksInDirectory = (arrayOfFiles) => {
//     const getLinksPromises = arrayOfFiles.forEach((file) => {
//         return readFileMd(file)
//             .then((result) => {
//                  return getLinksInFile(result)
//             })

//     })


//     return Promise.all(getLinksPromises)

// }

const getLinksInFile = (fileHtml) => {

    const dom = new JSDOM(fileHtml)
    const links = dom.window.document.querySelectorAll("a")
    const linkstoArray = Array.from(links);
    const newArrayUrl = linkstoArray.filter((url) => {
        const href = url.href
        return href.startsWith("http://") || href.startsWith("https://")
    })
    return newArrayUrl

}

const validateIsFalse = (newArrayUrl, pathAbsolute) => {

    return newArrayUrl.map((link) => {
        return {

            href: link.href,
            text: link.textContent,
            file: pathAbsolute
        }
    })

}




const validateIsTrue = (newArrayUrl, pathAbsolute) => {
    const newPromiseArrayUrl = newArrayUrl.map((link) => {
        return axios.get(link.href)
            .then((response) => {
                return {
                    href: link.href,
                    text: link.textContent,
                    file: pathAbsolute,
                    statusCode: response.status,
                    ok: response.statusText
                }
            })
            .catch((error) => {
                return {
                    href: link.href,
                    text: link.textContent,
                    file: pathAbsolute,
                    statusCode: error.response ? error.response.status : null,
                    ok: error.response ? error.response.statusText : "Fail"
                }
            })
    });

    return Promise.all(newPromiseArrayUrl)

}











module.exports = {
    pathIsAbsolute,
    pathIsFile,
    pathIsDirectory,
    readFileMd,
    getAllFiles,
    getLinksInFile,
    validateIsFalse,
    validateIsTrue,

}

