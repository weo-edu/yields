/**
 * Modules
 */

var slice = require('sliced')

/**
 * Vars
 */

/**
 * Expose yields
 */

module.exports = yields


/**
 * yields
 */

 function yields(fn, fail) {
   var arr = [[fn, fail]]

   function it() {
     var args = slice(arguments)
     var idx = 0
     return {
       next: next,
       throw: throwFn
     }

     function next(res) {
       if (!res && idx === 0) {
         res = args
       } else {
         res = [res]
       }
       return exec(0, res)
     }

     function throwFn(err) {
       var fail;
       idx--
       while (!(fail = arr[idx][1]) && idx < arr.length) {
         idx++
       }
       if (fail) {
         return exec(1, [err])
       } else {
         throw err
       }
     }

     function exec(type, args) {
       if (idx < arr.length) {
         var ret
         var fn = arr[idx++][type]
         try {
           ret = fn.apply(null, args)
         } catch(e) {
           return throwFn(e)
         }
         return {value: ret, done: false}
       } else {
         return {done: true}
       }
     }
   }

   it.yields = function (fn, fail) {
     arr.push([fn, fail])
     return it
   }

   return it
 }
