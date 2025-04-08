from flask import Flask, jsonify, make_response, flash, request, redirect, render_template, url_for
from Get_yogiyo import *
from flask_cors import CORS
import json

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)


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


if __name__ == '__main__':

    app.run(host="0.0.0.0", debug=True, port=5000)
