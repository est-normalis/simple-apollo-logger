import deepReplace from '../src/helpers/deepReplace'

describe("deepReplace function", () => {
    it("replaces nested keys of object", () => {
        const myObject = {
            otherObj: {
                something: "dd",
                someotherThing: 1,
                a: "23"
            }
        }

        deepReplace(myObject, "a", "1337")

        expect(myObject.otherObj.a).toEqual("1337")
    })
})