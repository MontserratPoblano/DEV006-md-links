const { pathIsAbsolute,
  pathIsFile, pathIsDirectory,
  readFileMd,
  getAllFiles,
  getLinksInFile,
  validateIsFalse,
  validateIsTrue,
  getLinksInDirectory,
  validateIsFalseDirectory,
  validateIsTrueDirectory,
} = require("./index.js");




const mdLinks=(ruta,options)=> {
  const pathAbsolute = pathIsAbsolute(ruta);
  const validate=options && options.validate
  return pathIsDirectory(pathAbsolute)
    .then((isDirectory) => {
      if (isDirectory) {
        return Promise.resolve(getAllFiles(pathAbsolute))
          .then((result) => {
            return getLinksInDirectory(result)
          })
          .then((arrayLinksDirectory) => {
            if (!validate) {
              return validateIsFalseDirectory(arrayLinksDirectory)
            } else if (validate) {
              return validateIsTrueDirectory(arrayLinksDirectory)
            } else {
              throw new Error("Invalidate value for options enter false or true")
            }
          })
      }
      return pathIsFile(pathAbsolute)
        .then((isFile) => {
          if (isFile) {
            return readFileMd(pathAbsolute)
              .then((fileHtml) => {
                return getLinksInFile(fileHtml)
              }).then((arrayLinks) => {
                if (!validate) {
                  return validateIsFalse(arrayLinks, pathAbsolute)
                } else if (validate) {
                  return validateIsTrue(arrayLinks, pathAbsolute)
                    .then((responsePage) => {
                      return responsePage
                    })
                } else {
                  throw new Error("Invalid value for options enter false or true")
                }
              })
          }
        })

    })
    .catch((error) => {
      return error
    })
}



module.exports = mdLinks

