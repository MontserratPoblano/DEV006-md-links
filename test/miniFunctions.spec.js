const { pathIsAbsolute,pathIsFile, pathIsDirectory} = require("../src/index")



describe("pathIsAbsolute function",()=>{
    const pathRelative=".\\test\\archivo1.md"
    const pathAbsolute="C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\test\\archivo1.md"
    it("should return a path absolute if parameter is a relative path",()=>{
     const absolute1=pathIsAbsolute(pathRelative)
    expect(absolute1).toBe(pathAbsolute)
    })
    it("should return a path if parameter is a absolute path",()=>{
        const absolute2=pathIsAbsolute(pathAbsolute)
        expect(absolute2).toBe(pathAbsolute)
    })
})
describe("pathIsFile function",()=>{
    const pathAbsolute="C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\test\\archivo1.md"
    it("should return true if path is a file and has .md extension",()=>{
        const isFile=pathIsFile(pathAbsolute)
        expect(isFile).toBeTruthy();
    })
})

describe("pathIsDirectory function",()=>{
    const pathAbsolute="C:\\Users\\Laboratoria\\Desktop\\proyecto4\\DEV006-md-links\\test"
    it("should return true if path is a directory and has .md extension",()=>{
        const isDirectory=pathIsDirectory(pathAbsolute)
        expect(isDirectory).resolves.toBe(true);
    })

    it("should return false if path is not a directory and has .md extension",()=>{
        const isDirectory=pathIsDirectory(pathAbsolute)
        expect(isDirectory).resolves.toBe(false);
    })
})
