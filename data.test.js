const { TestScheduler } = require("jest");
const data = require('./data.js')
const fs = require('fs')
const path = require('path')

const testPath = path.join(__dirname, 'test.json')

test('tester works', () => {
  expect(true).toBe(true)
})

test('loadJson can load a file', (done) => {
  fs.writeFileSync(testPath, '{ "prop": "cool" }')

  const expected = { prop: "cool" }

  data.internals.loadJson(testPath, (err, actual) => {
    expect(actual).toEqual(expected)
    fs.unlinkSync(testPath)
    done()
  })

})

test('saveJson can save a file', (done) => {
  data.internals.saveJson(testPath, { wolfStatus: "jacked" }, (err) => {
    expect(err).toBeFalsy()

    const dataObj = fs.readFileSync(testPath)
    const actual = JSON.parse(dataObj)

    expect(actual.wolfStatus).toEqual('jacked')
    expect(typeof actual).toBe('object')

    fs.unlinkSync(testPath)
    done()
  })
})