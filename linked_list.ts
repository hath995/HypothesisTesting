///<reference path='./typings/node/node.d.ts'/>
//Typescript is a superset of javascript which has a type system
//sudo npm install -g typescript
//sudo npm install -d tsd
//to compile/convert to javascript do
//tsd install
//tsc linked_list.ts //This will output linked_list.js
"use strict";
class LLNode<A> {
  value: A;
  next: LLNode<A>;
  constructor(value: A, next: LLNode<A>) {
    this.value = value;
    this.next =  next || null;
  }

}
class LinkedList<A> {
  head: LLNode<A>;
  //This constructor takes an array of things
  //and builds a linked list by appending each
  //element in the array as the new head of the list
  constructor(values: A | A[]) {
    this.head = null;
    if(values)
        if(values instanceof Array) {
          for(let i = 0; i < values.length; i++) {
           this.add(values[i]); 
          }
        }else{
          this.add(<A> values);
        }
  }

  //method adds an element to the front of the list
  add(value: A) {
    this.head = new LLNode<A>(value, this.head);
  }

  //reverses the list in place
  /*
   * set up three pointers, current, next and prev
   * set next to null
   * set the current to the head
   * iterate through the list until reaching the second to last element
   * in each iteration:
   *    set the next pointer to the current pointer's head
   *    set the current's next to previously processed node
   *    set the previous to the current node
   *    set the current to saved next pointer
   * after reaching the second to last element
   * point the last element to the second to last
   * and set the last as the new head
   * */
  reverse() {
    let current = this.head;
    let next;
    let prev = null;
    // a-> b -> c-> null
    if(current)
        while(current.next !== null) {
          next = current.next;
          current.next = prev;
          prev = current;
          current = next;
        }
        current.next = prev;
        this.head = current
    return this.head;
  }

/*
 * set up two pointers to the head
 * step/loop through the list
 * one pointer advances 2 times per step (current)
 * the other pointer advances once per step (lag)
 * if the leading pointer points to null exit the loop
 * otherwise if the leading pointer and other point are equal
 * then they have lapped
 * go around the loop one more time but add each node to a Set
 * once we reach the next place the pointers are equal exit a loop
 * walk from the the head to the first node in the set
 * return that node
 * */
  detectLoop() {
    let current = this.head;
    let lag = this.head;

    while(current != null) {
      lag = lag.next;
      current = current.next; 
      current = current ? current.next : null;

      if(lag == current) {
        //loop detected
        let nodeset = new Set();
        do {
          nodeset.add(current);
          nodeset.add(lag);
          lag = lag.next;
          current = current.next;
          current = current.next;
        } while(current !== lag) 
        current = this.head; 
        while(!nodeset.has(current)) {
          current = current.next;
        }
        return current;
      }
    }
    
  }
};

module.exports = {
  LinkedList: LinkedList,
  LLNode: LLNode
};
