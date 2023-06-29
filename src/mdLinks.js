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
  return new Promise((resolve,reject)=>{
  pathIsDirectory(pathAbsolute)
    .then((isDirectory) => {
      if (isDirectory) {
        return Promise.resolve(getAllFiles(pathAbsolute))
          .then((result) => getLinksInDirectory(result))
          .then((arrayLinksDirectory) => {
            if (!validate) {
              return validateIsFalseDirectory(arrayLinksDirectory)
            } else if (validate) {
              return validateIsTrueDirectory(arrayLinksDirectory)
            } else {
              throw new Error("Invalidate value for options enter false or true")
            }
          })
      }else{
      return pathIsFile(pathAbsolute)
        .then((isFile) => {
          if (isFile) {
            return readFileMd(pathAbsolute)
              .then((fileHtml) => getLinksInFile(fileHtml))
              .then((arrayLinks) => {
                if (!validate) {
                  return validateIsFalse(arrayLinks, pathAbsolute)
                } else if (validate) {
                  return validateIsTrue(arrayLinks, pathAbsolute)
                } else {
                  throw new Error("Invalid value for options enter false or true")
                }
              })
          }else{
            throw new Error("The specified path does not exist or is neither a file nor a directory")
          }
        })
      }
    })
    .then((result)=>resolve((result)))
    .catch((error) => reject((error)))
})
}



module.exports = mdLinks

