var LinkedList = require('../linked_list.js').LinkedList;
var jsc = require('jsverify');

var arrayNat = jsc.array(jsc.nat());
describe("LinkedList", function() {
  it("should construct a list of length n, given input of length n", function() {
    result = jsc.check(jsc.forall(arrayNat, function(xs) {
      var newlist = new LinkedList(xs);
      var is_constructed_list_valid = newlist.size() === xs.length;
      return is_constructed_list_valid;
    }))
  });

  it("should add items to the linked list", function() {
    jsc.assert(jsc.forall(arrayNat, function(xs) {
      var newlist = new LinkedList();
      var size = 0;
      var add_worked = true;
      xs.forEach(function(elem) {
        newlist.add(elem);
        size++;
        add_worked = newlist.head.value === elem && add_worked;
        add_worked = newlist.size() === size;
      });
      return add_worked;
    }));
  })

  it("should iterate over items in a list", function() {
    jsc.assert(jsc.forall(arrayNat, function(xs) {
      var newlist = new LinkedList(xs);
      xs.reverse();
      var iter_worked = true;
      var index = 0;
      for(var node of newlist.iter()) {
        iter_worked = node.value === xs[index++] && iter_worked;
      }
      return iter_worked;
    }));
  });

  it("should reverse the list", function() {
    jsc.assert(jsc.forall(arrayNat, function(xs) {
      var newlist = new LinkedList(xs);
      newlist.reverse();
      var reverse_worked = true;
      var index = 0;
      for(var node of newlist.iter()) {
        reverse_worked = node.value === xs[index++] && reverse_worked;
      }
      return reverse_worked;
    }));
  });
});
