from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

import datetime
from . import db


# the place where all of our models schemas reside


class User(db.Model):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(100), nullable=False)
    last_name = Column(String(100), nullable=False)
    email = Column(String)
    password_digest = Column(String)

    # define a one-to-many relationship with the UserFriend model
    friends = relationship("Friend", back_populates="user")


class Friend(db.Model):
    __tablename__ = "friends"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey("users.id"))

    # define a many-to-one relationship with the User model
    user = relationship("User", back_populates="friends")

    # add new fields
    name = Column(String(100), nullable=False)
    birthdate = Column(DateTime)
    last_messaged = Column(DateTime)
    frequency = Column(Integer)

    def __repr__(self):
        return "<UserFriend user_id={} friend_id={}>".format(
            self.user_id, self.id
        )

    def past_due(self):
        if self.frequency is None:
            return False
        if self.last_messaged is None:
            return True
        current_time = datetime.now()
        delta = current_time - self.last_messaged
        return delta.days > self.frequency

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "birthdate": self.birthdate.strftime("%Y-%m-%d") if self.birthdate is not None else '',
            "frequency": self.frequency,
            "last_messaged": self.last_messaged.strftime("%Y-%m-%d") if self.last_messaged is not None else '',
            "past_due": self.past_due()
        }
