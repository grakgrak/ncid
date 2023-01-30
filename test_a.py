import pytest

@pytest.fixture
def param_one():
    return 3



def test_first():
    assert(2==2)

def test_second(param_one):
    assert(param_one==2)