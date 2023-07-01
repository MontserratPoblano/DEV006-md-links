const { pathIsDirectory, pathIsFile } = require("../src/index");
const mdLinks = require("../src/mdLinks");

// const fs=require("fs")
// const path=require("path")
jest.mock("fs");
jest.mock("path")




describe("function mdLinks", () => {

    it('Should return an object array', () => {
        const ruta = "./prueba2.md"
        const result = mdLinks(ruta)

        expect(result).resolves.toEqual([

            {
                href: 'https://es.wikipedia.org/wiki/Markdown',
                text: 'Markdown',
                file: 'C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\prueba2.md',
            },
            {
                href: 'https://nodejs.org/',
                text: 'Node.js',
                file: 'C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\prueba2.md',
            }
        ])
    });     
});





describe("function mdLinks if add a value to option", () => {

    it('Should return an object array with statusCode', () => {
        const ruta = "./prueba2.md"
        const options = { validate: true }
        const result = mdLinks(ruta, options)
        jest.mock("axios", () => {
            get: jest.fn().mockResolvedValue({
                status: 200
            })
        })
        expect(result).resolves.toEqual([

            {
                href: 'https://es.wikipedia.org/wiki/Markdown',
                text: 'Markdown',
                file: 'C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\prueba2.md',
                statusCode: 200,
                ok: "OK"

            },
            {
                href: 'https://nodejs.org/',
                text: 'Node.js',
                file: 'C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\prueba2.md',
                statusCode: 200,
                ok: "OK"
            }
        ])
    });
})
