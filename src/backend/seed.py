# seed.py

from app import db
from models import User

def seed():
    # Create a new user
    user = User(first_name='admin', email='admin@example.com')
    # Add the user to the database session
    db.session.add(user)
    # Commit the changes to the database
    db.session.commit()

