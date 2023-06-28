// const { mdLinks}=require("./mdLinks")
const { program } = require("commander")
const figlet = require("figlet");
const mdLinks = require("./mdLinks");
const c = require('ansi-colors');
const{linksUnique,linksBroken}=require("./utils")

// console.log(figlet.textSync("MD-LINKS"));
program
  .name("md-links")
  .description("CLI to read Markdown files, verify links, and report statistics")
  .version("0.0.1")

program
  .argument("<path-to-file>")
  .option("--validate", "Validate the links in a file or directory",false)
  .option("--stats", "Display statistics about the links")
  .action((pathToFile, options) => {

    mdLinks(pathToFile, options).then((result) => {
        const broken=linksBroken(result)
        const unique=linksUnique(result);
        const total=result.length;

      if(options && options.stats===true && options.validate===true ){
        console.log(` 
          Total: ${c.magenta(total)} 
          Unique: ${c.cyan(unique)} 
          Broken: ${c.redBright(broken)} 
          `)
      }else if(options && options.stats===true ){
        console.log(` 
          Total: ${c.magenta(total)} 
          Unique: ${c.cyan(unique)} 
          `)
      } else {
     
        result.forEach((link) => {
          if (options && options.validate===true) {
          console.log(` 
          ${c.magenta(link.file)} 
          ${c.cyan(link.href)}
          ${c.green(link.ok)} 
          ${c.yellow(link.statusCode)}  
          ${c.italic(link.text)}
          `)
          } else if(options && options.validate===false){
          console.log(` 
          ${c.magenta(link.file)} 
          ${c.cyan(link.href)} 
          ${c.italic(link.text)}
          `)
          }
        })
      }
       
    })
  })

program.parse(process.argv)
