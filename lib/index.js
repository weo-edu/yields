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

 function yields() {
   var arr = slice(arguments)

   function it() {
     var args = slice(arguments)
     var idx = 0
     return {
       next: function (res) {
         if (!res && idx === 0) {
           res = args
         } else {
           res = [res]
         }
         return idx < arr.length
           ? {value: arr[idx++].apply(null, res), done: false}
           : {done: true}
       },
       throw: function (err) {}
     }
   }

   it.yield = function (fn) {
     arr.push(fn)
     return it
   }

   return it
 }
