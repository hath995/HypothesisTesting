

class LLNode(object):
    def __init__(self, value, next=None):
        self.value = value
        self.next = next


class LinkedList(object):
    def __init__(self, values=None):
        self.head = None
        if values:
            if hasattr(values, '__iter__'):
                for value in values:
                    self.add(value)
            else:
                self.add(value)

    def __iter__(self):
        current = self.head
        while current != None:
            yield current.value
            current = current.next

    def add(self, value):
        self.head = LLNode(value, self.head)

    def size(self):
        current = self.head
        size = 0
        while current != None:
            size += 1
            current = current.next
        return size


    def reverse(self):
        current = self.head
        next = None
        prev = None
        if current:
            while current.next != None:
                next = current.next
                current.next = prev;
                prev = current;
                current = next;
            current.next = prev
            self.head = current
        return self.head
