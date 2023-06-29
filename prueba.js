const mdLinks=require("./src/mdLinks.js")

const ruta = process.argv[2]

mdLinks(ruta,{validate:true})
  .then((links) => {
    console.log(links)
    return links.href
  })
  .catch((error) => {
    console.log(error)
    return error
  })
