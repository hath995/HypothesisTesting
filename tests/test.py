if __name__ == '__main__':
        import sys

import unittest
from samplepy.myfuncs import adder

class addergenTestCase(unittest.TestCase):

    def test_basic_add(self):
        fiver  = adder.addergen(5)
        self.assertEqual(fiver(5), 10)

if __name__ == '__main__':
        unittest.main()
