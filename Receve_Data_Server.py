#from Get_yogiyo import *
from flask import Flask, jsonify, make_response, flash, request, redirect, render_template, url_for

from flask_cors import CORS
import json

from Get_yogiyo_v2 import (
    get_authorization_code,
    get_access_token,
    check_geo_available,
    get_user_info,
    get_restaurants,
    get_menu,
    get_review,
    Search_Category,
    get_Yogiyo
)

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)


code = get_authorization_code()
ACCESS_TOKEN = get_access_token(code) if code else None # 실행 시 자동으로 토큰 발급

@app.route('/12')
def hello_world():
    cal = request.args.get("cal", "468686")
    latitude = request.args.get("latitude", "468686")
    longitude = request.args.get("longitude", "468686")

    data = get_Yogiyo('cal', latitude, longitude)
    result = json.dumps(data, ensure_ascii=False)
    # res = make_response(result)
    return result


@app.route('/5000')
def hello_world2():
    id = request.args.get("id", "468686")
    data = get_Menu(id)
    result = json.dumps(data, ensure_ascii=False)
    return result


@app.route('/1122')
def hello_world3():
    id = request.args.get("id", "468686")
    data = get_Review(id)
    result = json.dumps(data, ensure_ascii=False)
    return result


@app.route('/Search')
def hello_world4():

    Search = request.args.get("Search", "피자")
    page = request.args.get("page", "0")
    lat = request.args.get("lat", "36.969655961906")
    lng = request.args.get("lng", "127.244958777736")
    data = Search_Category(Search, page, lat, lng)
    # result = json.dumps(data, ensure_ascii=False)
    # return result

    result = get_restaurants(lat, lng, page=0, access_token=ACCESS_TOKEN)
    return jsonify(result)


if __name__ == '__main__':

    app.run(host="0.0.0.0", debug=True, port=80)
