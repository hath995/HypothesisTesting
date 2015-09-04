
var MinHeap = require('../minheap_too_simple.js');
var jsc = require('jsverify');
var arrayNum = jsc.array(jsc.number());
describe("Minheap", function() {
  it("should build a heap", function() {
    jsc.assert(jsc.forall(arrayNum, function(xs) {
      var newheap = new MinHeap(xs);
      var length = xs.length;
      return newheap.items.reduce(function(isvalid, elem, index, items) {
        var left = 2*(index+1);
        var right = 2*(index+1)+1; 
        isvalid = isvalid && (left > length || elem <= items[left-1]);
        isvalid = isvalid && (right > length || elem <= items[right-1]);
        return isvalid;
      }, true)
    }));
  });

  it("should pull items off in ascending order", function() {
    jsc.assert(jsc.forall(arrayNum, function(xs) {
      var copy = xs.slice();
      copy.sort(function(a,b) {return a-b});
      var newheap = new MinHeap(xs);
      return copy.reduce(function(isvalid, elem, index, items) {
        return isvalid && elem === newheap.top();
      }, true);
    }));
  });


  it("should insert items into the heap and maintain the heap property", function() {
    jsc.assert(jsc.forall(arrayNum, function(xs) {
      var newheap = new MinHeap();
      var ideal_length = 0;
      isvalid = true;
      for(var x of xs) {
        newheap.insert(x);
        ideal_length++;
        length = newheap.items.length;
        isvalid = length === ideal_length && isvalid;
        isvalid = newheap.items.reduce(function(isvalid, elem, index, items) {
          var left = 2*(index+1);
          var right = 2*(index+1)+1; 
          isvalid = isvalid && (left > length || elem <= items[left-1]);
          isvalid = isvalid && (right > length || elem <= items[right-1]);
          return isvalid;
        }, isvalid);
      }
      return isvalid;
    }));
  });
});
