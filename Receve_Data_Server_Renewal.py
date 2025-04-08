from flask import Flask, jsonify, make_response, flash, request, redirect, render_template, url_for
from flask_cors import CORS
import json

# 필요한 함수만 가져오기
from Get_yogiyo_v2 import (
    get_authorization_code,
    get_access_token,
    check_geo_available,
    get_user_info,
    get_restaurants,
    get_restaurant_info,
    get_menu,
    get_review,
    Search_Category,
    get_Yogiyo
)

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

#  실행 시 토큰 자동 발급
code = get_authorization_code()
ACCESS_TOKEN = get_access_token(code) if code else None

# HTML 라우팅 부분
@app.route('/')
def mainpage():
    return render_template('One.html')

@app.route('/2')
def page2():
    return render_template('Two.html')

@app.route('/10')
def Listpage():
    return render_template('Topcategory.html')

@app.route('/3')
def page3():
    return render_template('Three.html')

@app.route('/20')
def manu():
    return render_template('menuslider.html')

@app.route('/4')
def page4():
    return render_template('Four.html')

@app.route('/5')
def page5():
    return render_template('Five.html')

@app.route('/6')
def page6():
    return render_template('six.html')

# 🔹 데이터 API 라우팅 부분
@app.route('/restaurants')
def restaurants():
    lat = request.args.get("lat", "37.5665")
    lng = request.args.get("lng", "126.9780")
    data = get_restaurants(lat, lng, access_token=ACCESS_TOKEN)
    return jsonify(data)

@app.route('/menu')
def menu():
    restaurant_id = request.args.get("id", "1102997")
    data = get_menu(restaurant_id, ACCESS_TOKEN)
    return jsonify(data)

@app.route('/review')
def review():
    restaurant_id = request.args.get("id", "1102997")
    data = get_review(restaurant_id)
    return jsonify(data)

@app.route('/search')
def search():
    search = request.args.get("search", "피자")
    page = request.args.get("page", 0)
    lat = request.args.get("lat", "37.5665")
    lng = request.args.get("lng", "126.9780")
    data = Search_Category(search, page, lat, lng)
    return jsonify(data)

@app.route('/available')
def geo_available():
    lat = request.args.get("lat", "37.5665")
    lng = request.args.get("lng", "126.9780")
    data = check_geo_available(ACCESS_TOKEN, lat, lng)
    return jsonify(data)

@app.route('/userinfo')
def userinfo():
    data = get_user_info(ACCESS_TOKEN)
    return jsonify(data)

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True, port=5000)
