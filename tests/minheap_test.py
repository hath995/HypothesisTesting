from hypothesis import given
import hypothesis.strategies as st
from samplepy.myfuncs import minheap


@given(st.lists(st.integers()))
def test_heap_buildheap(xs):
    newheap = minheap.Heap(xs)
    length = len(xs)
    for k,v in enumerate(newheap.items):
        left = 2*(k+1)
        right = 2*(k+1)+1
        assert left > length or newheap.items[k] <= newheap.items[left-1]
        assert right > length or newheap.items[k] <= newheap.items[right-1]

@given(st.lists(st.integers()))
def test_heap_top(xs):
    copy = xs[:]
    copy.sort()
    newheap = minheap.Heap(xs)
    for value in copy:
        assert value == newheap.top()

@given(st.lists(st.integers()))
def test_heap_insert(xs):
    newheap = minheap.Heap()
    ideal_length = 0
    for value in xs:
        newheap.insert(value)
        ideal_length += 1
        length = len(newheap.items)
        assert length == ideal_length
        # for k,v in enumerate(newheap.items):
        #     left = 2*(k+1)
        #     right = 2*(k+1)+1
        #     assert left > length or newheap.items[k] <= newheap.items[left-1]
        #     assert right > length or newheap.items[k] <= newheap.items[right-1]
