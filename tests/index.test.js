const littlerequester = require("./../src/index");


describe('Test littlerequester', () => {

    describe('Test HTTP & HTTPS string', () => {

        test("should support http requests", async () => {
            const { data } = await littlerequester("http://example.com")
            expect(!!/this domain/gi.test(data)).toBe(true)
        }, 10000)

        test("should support https requests", async () => {
            const { data } = await littlerequester("https://github.com")
            expect(!!/GitHub/gi.test(data)).toBe(true)
        }, 10000)
    })

    describe('Test HTTP & HTTPS object', () => {

        test("should support http requests", async () => {
            const { data } = await littlerequester({url: "http://example.com", type: "raw"})
            expect(!!/this domain/gi.test(data)).toBe(true)
        }, 10000)

        test("should support https requests", async () => {
            const { data } = await littlerequester({url: "https://github.com", type: "raw"})
            expect(!!/GitHub/gi.test(data)).toBe(true)
        }, 10000)
    })

})
