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

test('getNextId appropriately returns the next available id', () => {
  const actual = data.internals.getNextId([ { id: 1 }, { id: 2 }, { id: 3 }, { id: 5 }])
  const expected = 6

  expect(actual).toBe(expected)

})

test('can edit user', (done) => {
  fs.writeFileSync(testPath, JSON.stringify({
    users : [
      {
        id: 1,
        name: 'anna',
        birthday: 'very cool day',
      }
    ]
  }))

  data.editUser(testPath, 1, { birthday: 'yesterday' }, (err) => {
    const allData = JSON.parse(fs.readFileSync(testPath))
    
    expect(allData.users.length).toBe(1)
    expect(allData.users[0].birthday).toBe('yesterday')
    done()
    
  })

})
