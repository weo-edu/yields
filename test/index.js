import yields from '../src'
import test from 'tape'
import yio from 'yio'

test('should iterate over fns', (t) => {
  let it = yields(() => 1).yields(() => 2).yields(() => 3)()

  var ret
  var arr = []
  while (!(ret = it.next()).done) {
    arr.push(ret.value)
  }

  t.deepEqual(arr, [1, 2, 3])
  t.end()
})

test('should iterate over fns and generators', (t) => {
  let g = yields(() => [11, 12, 13])
    .yields(function * () {
      yield 21
      yield 22
    })
    .yields(() => 3)

  let l = []
  function log(v) {
    l.push(v)
  }

  yio(log, g).then(() => {
    t.deepEqual(l, [11, 12, 13, 21, 22, 3])
    t.end()
  })

})

test('should handle error in error handler', (t) => {
  let it = yields(() => {
    throw 1
  }, (err) => {
    t.ok(err)
    t.end()
  })()

  it.next()

})

test('should handle async error', (t) => {
  let it = yields(() => 1, (err) => {
    t.ok(err)
  })()

  let res = it.next()
  setTimeout(function() {
    it.throw(res)
    t.end()
  })
})

test('should iterate over fns and throws', (t) => {
  let it = yields(() => 1).yields(() => 2).yields(() => 3)()

  let res = it.next()
  t.throws(() => {
    it.throw(1)
  })
  t.end()

})

test('should catch error thrown earlier in chain', (t) => {
  let caught = false
  let it = yields(() => {
    throw 1
  }).yields(() => 2).yields(() => 3, (err) => {
    t.ok(err)
    caught = true
  })()

  it.next()
  t.ok(it.next().done)
  t.ok(caught)
  t.end()
})

test('should catch async error thrown earlier in chain', (t) => {
  let it = yields(() => 1).yields(() => 2).yields(() => 3, (err) => {
    t.ok(err)
  })()

  let res = it.next()
  setTimeout(() => {
    it.throw(res)
    t.ok(it.next().done)
    t.end()
  })
})
