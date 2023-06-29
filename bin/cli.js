#!/usr/bin/env node


const { program } = require("commander")
const figlet = require("figlet");
const mdLinks = require("../src/mdLinks");
const c = require('ansi-colors');
const showResults = require("./options.js")



console.log(c.magenta(figlet.textSync("MD-LINKS",{
    font: "ANSI Shadow",
    horizontalLayout: "default",
    verticalLayout: "default",
    whitespaceBreak: true,
}
)))

program
  .name(c.cyan("md-links"))
  .usage(c.cyan("<path-to-file> [options]"))
  .description(c.blueBright("CLI to read Markdown files, verify links, and report statistics"))
  .version("0.1.0")


program
  .argument("<path-to-file>")
  .option("--v,--validate", "Validate the links in a file or directory", false)
  .option("--s,--stats", "Display statistics about the links")
  .action((pathToFile, options) => {

    mdLinks(pathToFile, options).then((result) => {
      
      if (!Array.isArray(result)) {
        return "Not links in file"
      } else {
        const getStatistics = showResults(result)
        if (options && options.stats === true && options.validate === true) {
          
          console.table({
            Total:  getStatistics.total,
            Unique: getStatistics.unique,
            Broken: getStatistics.broken,
          })

         
        } else if (options && options.stats === true) {
          console.table({
            Total:  getStatistics.total,
            Unique: getStatistics.unique,
          })

        } else {

          result.forEach((link) => {
            if (options && options.validate === true) {
              console.log(` 
          file: ${c.magenta(link.file)} 
          href: ${c.cyan(link.href)}
          Ok:   ${c.green(link.ok)} 
          status:${c.yellow(link.statusCode)}  
          text: ${c.italic(link.text.substr(0, 50))}

          *************************************************************************************************************
          `)
            } else if (options && options.validate === false) {
              console.log(` 
          file: ${c.magenta(link.file)} 
          href: ${c.cyan(link.href)} 
          text: ${c.italic(link.text.substr(0, 50))}

          *************************************************************************************************************
          `)
            }
          })
        }
      }
    })
      .catch((error) => {
        console.log((error))
      })
  })

program.parse(process.argv)
