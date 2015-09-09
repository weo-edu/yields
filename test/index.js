var yields = require('..')
var assert = require('assert')

describe('yields', function () {
  it('should iterate over fns', function() {
    var it = yields(function() {
      return 1
    }, function() {
      return 2
    }, function() {
      return 3
    })()

    var ret
    var arr = []
    while (!(ret = it.next()).done) {
      arr.push(ret.value)
    }

    assert.deepEqual(arr, [1, 2, 3])

  })
})
