const { pathIsAbsolute, pathIsFile, pathIsDirectory, readFileMd, getAllFiles, getLinksInFile, validateIsFalse } = require("../src/index")



describe("pathIsAbsolute function", () => {
    const pathRelative = ".\\Modulo_prueba\\archivo1.md"
    const pathAbsolute = "C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\Modulo_prueba\\archivo1.md"
    it("should return a path absolute if parameter is a relative path", () => {
        const absolute1 = pathIsAbsolute(pathRelative)
        expect(absolute1).toBe(pathAbsolute)
    })
    it("should return a path if parameter is a absolute path", () => {
        const absolute2 = pathIsAbsolute(pathAbsolute)
        expect(absolute2).toBe(pathAbsolute)
    })
})

describe("pathIsFile function", () => {

    it("should return true if path is a file and has .md extension", () => {
        const pathAbsolute = "C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\test\\Modulo_prueba\\test.md"
        return expect(pathIsFile(pathAbsolute)).resolves.toBe(true);
    })

    it("shoud return an error if path is a file but not has .md extension", () => {
        const pathAbsoluteWithoutMd = "C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\test\\Modulo_prueba\\test.png"
        // console.log(pathIsFile(pathAbsoluteWithoutMd));
        return pathIsFile(pathAbsoluteWithoutMd).catch((error) => {
            // console.log(data);
            expect(error).toContain("Path is not a Markdownfile or does not exist")
        })
    })

    it("shoud return an error if path is not a file or not exist", () => {

        const pathNotFile = "C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\notexist.md"
        // console.log(pathIsFile(pathAbsoluteWithoutMd));
        return pathIsFile(pathNotFile).catch((error) => {
            // console.log(data);
            expect(error).toContain("Error occurred while checking if it is a file:")
        })
    })

})


describe("pathIsDirectory function", () => {
    const pathAbsolute = "C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\test"
    it("should return true if path is a directory and has .md extension", () => {
        expect(pathIsDirectory(pathAbsolute)).resolves.toBe(true);
    })

    it("should return false if path is not a directory", () => {
        const pathAbsolute = "C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\test\\test.md"
        return pathIsDirectory(pathAbsolute).catch((error) => {
            expect(error).toContain("Error occurred while checking if it is a directory");
        })


    })
})

describe("readFile function", () => {
    it("should return a html file", () => {
        const pathAbsolute = "C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\test\\Modulo_prueba\\test.md"
        return expect(readFileMd(pathAbsolute)).resolves.toContain('<p>herramienta usando <a href="https://nodejs.org/">Node.js</a></p>')
    })
    it("should return a error if path not exist", () => {
        const pathAbsolute = "C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\src\\hola.md"
        return readFileMd(pathAbsolute).catch((error) => {
            expect(error).toBe(error);
        })
    })
})

describe("getAllFiles function", () => {
    it("should return an array of files with .md extension from directories", () => {
        const outPut =
            [
                'C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\test\\Modulo_prueba\\archivo1.md',
                'C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\test\\Modulo_prueba\\carpetaprueba\\carpeta2\\archivo2.md',
                'C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\test\\Modulo_prueba\\test.md'
            ]
        const pathAbsolute = "C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\test\\Modulo_prueba"
        const prueba = getAllFiles(pathAbsolute)
        expect(prueba).toEqual(outPut)

    })
})

describe("getLinksInFile function", () => {
    it("Should return an array with valid links", () => {
        const fileHtml = `
        <html>
        <body>
            <a href="http://example.com">Enlace válido</a>
        </body>
        </html>
        `
        const outPut = [
            '<a href="http://example.com">Enlace válido</a>'
        ];

        return expect(getLinksInFile(fileHtml).map(element => element.outerHTML)).toEqual(outPut);

    })
})

describe("validateIsFalse function", () => {
    it("Should return an array of objects with href,text and path ", () => {
        const newArrayUrl = [
            {
                href: "http://example.com",
                text: "Enlace válido",
            },
            {
                href: "http://example2.com",
                text: "Enlace válido Nuevo",
            },
        ];

        const pathAbsolute = "C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\notexist.md"

        const outPut = [{

            href: "http://example.com",
            text: "Enlace válido",
            file: "C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\notexist.md"
        },
        {

            href: "http://example2.com",
            text: "Enlace válido Nuevo",
            file: "C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\notexist.md"
        },
        ]
        const result = validateIsFalse(newArrayUrl, pathAbsolute)
        expect(result).toEqual(outPut)

    })
})

