class Heap(object) 
    def __init__(self, stuff=[]):
        self.items = stuff
        self.buildheap()

    def minheapify(self, index):
        left = 2*index
        right = 2*index+1
        smallest = index
        if left <= len(self.items) and self.items[left-1] < self.items[smallest-1]:
            smallest = left

        if right <= len(self.items) and self.items[right-1] < self.items[smallest-1]:
            smallest = right

        if smallest != index:
            temp = self.items[smallest-1]
            self.items[smallest-1] = self.items[index-1]
            self.items[index-1] = temp
            self.minheapify(smallest)

    def buildheap(self):
        i = len(self.items)/2
        while i >= 1: 
            self.minheapify(i)
            i -= 1

    def top(self): 
        top = self.items[0]
        self.items[0] = self.items[len(self.items)-1]
        self.minheapify(1)
        self.items.pop()
        return top

    def insert(self, num): 
        self.items.append(num)
        current = len(self.items)
        parent = (current-1)/2
        while self.items[current - 1] < self.items[parent - 1]:
            temp = self.items[current - 1]
            self.items[current - 1] = self.items[parent - 1]
            self.items[parent - 1] = temp
            current = parent
            parent = (current-1)/2

    def parent(self, i):
        return i/2

    def decreaseKey(self, location, newkey):
        i = location
        self.items[i-1] = newkey
        while i > 1 and self.items[i-1] < self.items[self.parent(i)-1]:
            temp = self.items[self.parent(i)-1]
            self.items[self.parent(i)-1] = self.items[i-1]
            self.items[i-1] = temp
            i = self.parent(i)
