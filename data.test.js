const { TestScheduler } = require("jest");
const data = require('./data.js')
const fs = require('fs')
const path = require('path')

test('tester works', () => {
  expect(true).toBe(true)
})

test('loadJson can load a file', (done) => {

  const testPath = path.join(__dirname, 'test.json')

  fs.writeFileSync(testPath, '{ "prop": "cool" }')

  const expected = { prop: "cool" }

  data.loadJson(testPath, (err, actual) => {
    expect(actual).toEqual(expected)
    fs.unlinkSync(testPath)
    done()
  })

})