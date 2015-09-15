var yields = require('..')
var assert = require('assert')

describe('yields', function () {
  it('should iterate over fns', function() {
    var it = yields(function() {
      return 1
    }).yields(function() {
      return 2
    }).yields(function() {
      return 3
    })()

    var ret
    var arr = []
    while (!(ret = it.next()).done) {
      arr.push(ret.value)
    }

    assert.deepEqual(arr, [1, 2, 3])

  })

  it('should handle error in error handler', function (done) {
    var it = yields(function() {
      throw 1
    }, function(err) {
      assert(err)
      done()
    })()

    it.next()

  })

  it('should handle async error', function (done) {
    var it = yields(function () {
      return 1
    }, function (err) {
      assert(err)
    })()

    var res = it.next()
    setTimeout(function() {
      it.throw(res)
      done()
    })
  })

  it('should iterate over fns', function () {
    var it = yields(function() {
      return 1
    }).yields(function() {
      return 2
    }).yields(function() {
      return 3
    })()

    var res = it.next()
    assert.throws(function() {
      it.throw(1)
    })

  })

  it('should catch error thrown earlier in chain', function () {
    var caught = false
    var it = yields(function() {
      throw 1
    }).yields(function() {
      return 2
    }).yields(function() {
      return 3
    }, function (err) {
      assert(err)
      caught = true
    })()

    it.next()
    assert(it.next().done)
    assert(caught)
  })

  it('should catch async error thrown earlier in chain', function (done) {
    var it = yields(function() {
      return 1
    }).yields(function() {
      return 2
    }).yields(function() {
      return 3
    }, function (err) {
      assert(err)
    })()

    var res = it.next()
    setTimeout(function() {
      it.throw(res)
      assert(it.next().done)
      done()
    })
  })

})
