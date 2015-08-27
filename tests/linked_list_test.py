from hypothesis import given
import hypothesis.strategies as st
from samplepy.myfuncs import linked_list


@given(st.lists(st.integers()))
def test_linked_list_init(xs):
    newlist = linked_list.LinkedList(xs)
    assert newlist.size() == len(xs)

@given(st.lists(st.integers()))
def test_linked_list_add(xs):
    newlist = linked_list.LinkedList()
    size = 0
    for x in xs:
        newlist.add(x)
        size += 1
        assert newlist.head.value == x
        assert newlist.size() == size


@given(st.lists(st.integers()))
def test_linked_list_reverse(xs):
    newlist = linked_list.LinkedList(xs)
    newlist.reverse()
    newlist.reverse()
    for a,b in zip(reverse(xs), newlist):
        assert a == b
