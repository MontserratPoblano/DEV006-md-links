const { pathIsAbsolute,
  pathIsFile, pathIsDirectory,
  readFileMd,
  readDirectory,
  getLinksInFile } = require(".");

const ruta2 = process.argv[2]

function mdlinks(ruta2) {
  const pathAbsolute = pathIsAbsolute(ruta2);
  return pathIsDirectory(pathAbsolute)
    .then((isDirectory) => {
      if (isDirectory) {
        return readDirectory();
      }
      return pathIsFile(pathAbsolute)
        .then((isFile) => {
          if (isFile) {
          return readFileMd(pathAbsolute)
          .then((fileHtml)=>{
            return getLinksInFile(fileHtml,pathAbsolute)
          })
          }
        })
    });
}



mdlinks(ruta2)
  .then((links) => {
    console.log(links)
  })
  .catch((error) => {
    console.log(error)
  })
