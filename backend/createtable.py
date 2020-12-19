from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import datetime

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://hieu:123456@127.0.0.1:5432/IOT_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class LogModel(db.Model):
    __tablename__ = 'logs'

    id = db.Column(db.Integer, primary_key=True)
    temperature_ob = db.Column(db.Float)
    temperature_ab = db.Column(db.Float)
    created_at = db.Column(db.DateTime)
    modified_at = db.Column(db.DateTime)

    # class constructor
    def __init__(self, data):
        """
        Class constructor
        """
        self.temperature_ob = data.get('temperature_ob')
        self.temperature_ab = data.get('temperature_ab')
        self.created_at = datetime.datetime.utcnow()
        self.modified_at = datetime.datetime.utcnow()

db.create_all()