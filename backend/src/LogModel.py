from marshmallow import fields, Schema
import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class LogModel(db.Model):
    __tablename__ = "logs"

    id = db.Column(db.Integer, primary_key=True)
    temperature_ob = db.Column(db.Float)
    temperature_ab = db.Column(db.Float)
    created_at = db.Column(db.DateTime)
    modified_at = db.Column(db.DateTime)

    # class constructor
    def __init__(self, temperature_ob, temperature_ab):
        """
        Class constructor
        """
        self.temperature_ob = temperature_ob
        self.temperature_ab = temperature_ab
        self.created_at = datetime.datetime.now()
        self.modified_at = datetime.datetime.now()

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all_logs():
        return LogModel.query.order_by(LogModel.id.asc()).all()

    @staticmethod
    def get_logs(num):
        return LogModel.query.order_by(LogModel.id.desc()).limit(num)

    @staticmethod
    def get_total_log():
        return LogModel.query.count()

class LogSchema(Schema):
    id = fields.Int(dump_only=True)
    temperature_ob = fields.Str(required=True)
    temperature_ab = fields.Str(required=True)
    created_at = fields.DateTime(dump_only=True)
    modified_at = fields.DateTime(dump_only=True)
