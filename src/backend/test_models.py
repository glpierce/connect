import unittest
from models import User, Friend

class TestModels(unittest.TestCase):
    def test_user(self):
        user = User(name="gp", email="g@p.com")

        self.assertEqual(user.name, "gp")
        self.assertEqual(user.email, "g@p.com")
        self.assertEqual(user.friends, [])

    def test_friend(self):
        user = User(name="mtl")
        friend = Friend(name="susie brubaker cole", user=user)

        self.assertEqual(friend.name, "susie brubaker cole")
        self.assertEqual(friend.user, user)
        self.assertEqual(user.friends, [friend])

if __name__ == "__main__":
    unittest.main()