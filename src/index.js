const fs = require("fs")
const path = require("path")
const markdownIt = require('markdown-it');
const md = new markdownIt({
    html: true
});
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const axios = require("axios");


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
                return;

            } else {
                if (stats.isFile() && path.extname(pathAbsolute) === ".md") {
                    resolve(true)
                }
                else {
                    reject("Path is not a Markdownfile or does not exist")

                }
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

const getLinksInDirectory = (arrayOfFiles) => {
    const getLinksPromises = arrayOfFiles.map((file) => {
        return readFileMd(file)
            .then((result) => {
                const getLinks = getLinksInFile(result)
                const getLinksWithFile = getLinks.map((link) => {
                    return {
                        link: link,
                        file: file,
                    }
                })
                return getLinksWithFile
            })
    })
    return Promise.all(getLinksPromises)
        .then((result) => {

            const links = result.flat()
            if (links.length === 0) {
                throw new Error("Not links found in directory")
            }

            return links
        })

}



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

const validateIsFalseDirectory = (arrayLinksDirectory) => {

    const promises = arrayLinksDirectory.map((elemento) => {
        const elementoFile = elemento.file

        return validateIsFalse([elemento.link], elementoFile)
    })
    return Promise.all(promises.flat())
}



const validateIsTrueDirectory = (arrayLinksDirectory) => {

    const promisesD = arrayLinksDirectory.map((elemento) => {
        const elementoFile = elemento.file

        return validateIsTrue([elemento.link], elementoFile)
    })
    return Promise.all(promisesD.flat())
        .then((result) => {
            return result.flatMap((array) => array)
        })
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
    getLinksInDirectory,
    validateIsFalseDirectory,
    validateIsTrueDirectory,

}

