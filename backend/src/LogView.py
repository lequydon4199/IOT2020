from flask import request, g, Blueprint, json, Response
from .LogModel import LogModel, LogSchema
from flask_cors import CORS, cross_origin

log_api = Blueprint("log_api", __name__)
# CORS(log_api)
log_schema = LogSchema()


@log_api.route("/", methods=["GET"])
def index():
    limit = request.args.get("limit")
    if limit:
        logs = LogModel.get_logs(limit)
    else:
        logs = LogModel.get_all_logs()
    ser_logs = log_schema.dump(logs, many=True)
    ser_logs.reverse()
    response = {
      "total": LogModel.get_total_log(),
      "rows": ser_logs
    }
    return custom_response(response, 200)


@log_api.route("", methods=["POST"])
def create():
    temperature_ob = request.get_json()["temperature_object"]
    temperature_ab = request.get_json()["temperature_ambient"]
    if temperature_ob * 1 < 1037 and temperature_ab * 1 < 1037:
        log = LogModel(temperature_ob * 1, temperature_ab * 1)
        log.save()
        pass
    else:
        pass
    return custom_response("ok", 200)


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json", response=json.dumps(res), status=status_code
    )