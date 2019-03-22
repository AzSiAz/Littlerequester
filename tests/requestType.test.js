const littlerequester = require("./../src");


describe('Test Request type', () => {

    describe('GET Method', () => {
        test('Should return JSON', async () => {
            const { data } = await littlerequester({url: "https://reqres.in/api/users/2", type: "json"})
            expect(typeof data).toBe("object")
            expect(data.data.id).toBe(2)
      }, 10000)

        test('Should return JSON (2 args)', async () => {
            const { data } = await littlerequester("https://reqres.in/api/users/2", "json")
            expect(typeof data).toBe("object")
            expect(data.data.id).toBe(2)
      }, 10000)

        test('Should return Raw Data', async () => {
            const { data } = await littlerequester({url: "http://monip.org", type: "raw"})
            expect(typeof data).toBe("string")
            expect(!!/IP/gi.test(data)).toBe(true)
        }, 10000)

        test('Should return Raw Data (2 args)', async () => {
            const { data } = await littlerequester("http://monip.org", "raw")
            expect(typeof data).toBe("string")
            expect(!!/IP/gi.test(data)).toBe(true)
        }, 10000)

        test("Should return littlerequest header", async () => {
            const { data } = await littlerequester({url: "http://headers.jsontest.com", type: "json", headers: {"User-Agent": 'testAgent', test: "test"}})
            expect(typeof data).toBe("object")
            expect(data["User-Agent"]).toBe("testAgent")
            expect(data['test']).toBe("test")
        }, 10000)

    })

    describe("POST Request", () => {

        test("Should make a post request", async () => {
            const { data } = await littlerequester({url: "https://reqres.in/api/users", type: "json", method: "POST", data: {"name": "morpheus", "job": "leader"}})
            expect(typeof data).toBe("object")
            expect(data.job).toBe("leader")
        }, 10000)

    })

    describe("PUT Request", () => {

        test("Should make a put request", async () => {
            const { data } = await littlerequester({url: "https://reqres.in/api/users/2", type: "json", method: "PUT", data: {"name": "morpheus", "job": "zion resident"}})
            expect(typeof data).toBe("object")
            expect(data.job).toBe("zion resident")
        }, 10000)

    })

    describe("PATCH Request", () => {

        test("Should make a patch request", async () => {
            const { data } = await littlerequester({url: "https://reqres.in/api/users/2", type: "json", method: "PATCH", data: {"name": "morpheus", "job": "zion"}})
            expect(typeof data).toBe("object")
            expect(data.job).toBe("zion")
        })

    })

    describe("DELETE Request", () => {

        test("Should make a delete request", async () => {
            const { res } = await littlerequester({url: "https://reqres.in/api/users/2", type: "raw", method: "DELETE"})
            expect(res.statusCode).toBe(204)
        }, 10000)

    })
})
