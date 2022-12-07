from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from __init__ import db


class User(db.Model):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String)
    password_digest = Column(String)

    # define a one-to-many relationship with the UserFriend model
    friends = relationship("Friend", back_populates="user")


class Friend(db.Model):
    __tablename__ = 'friends'

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
            self.user_id, self.friend_id
        )
