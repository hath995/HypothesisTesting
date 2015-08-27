from hypothesis import given
import hypothesis.strategies as st
from samplepy.myfuncs import minheap


@given(st.lists(st.integers()))
def test_heap_buildheap(xs):
    newheap = minheap(xs)
    for k,v in enumerate(newheap.items):
        left = 2*(k+1)
        right = 2*(k+1)+1
        assert newheap.items[k] < newheap.items[left-1]
        assert newheap.items[k] < newheap.items[right-1]
