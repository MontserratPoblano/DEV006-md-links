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
} = require(".");

const ruta2 = process.argv[2]
const options ={validate:process.argv[3]}

function mdlinks(ruta2,options) {
  const pathAbsolute = pathIsAbsolute(ruta2);
  return pathIsDirectory(pathAbsolute)
    .then((isDirectory) => {
      if (isDirectory) {
         return Promise.resolve(getAllFiles(pathAbsolute))
        .then((result)=>{
          return getLinksInDirectory(result)
        })
        .then((arrayLinksDirectory)=>{
          if(options.validate==="false"){
            return validateIsFalseDirectory(arrayLinksDirectory)
          }if(options.validate==="true"){
            return validateIsTrueDirectory(arrayLinksDirectory)
          }
        })
        
      }
      return pathIsFile(pathAbsolute)
        .then((isFile) => {
          if (isFile) {
          return readFileMd(pathAbsolute)
          .then((fileHtml)=>{
            return getLinksInFile(fileHtml)
          }).then((arrayLinks)=>{
            if(options.validate==="false"){
             return validateIsFalse(arrayLinks,pathAbsolute)
            }if(options.validate==="true"){
            return validateIsTrue(arrayLinks,pathAbsolute)
            .then((responsePage)=>{
              return responsePage
            })
            }
          })
          }
        })
      
    });
}



mdlinks(ruta2,options)
  .then((links) => {
    console.log(links)
  })
  .catch((error) => {
    console.log(error)
  })
