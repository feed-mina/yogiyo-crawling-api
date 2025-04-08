import requests
# import json
from datetime import datetime
import urllib.parse  # 한글 인코딩을 위해 추가


def get_Yogiyo(category, lat, lng):
    header = {"x-apikey": 'iphoneap',
              "x-apisecret": 'fe5183cc3dea12bd0ce299cf110a75a2'}

    url = f"https://www.yogiyo.co.kr/api/v1/restaurants-geo/?category={category}&items=60&lat={lat}&lng={lng}&order=rank&page=0&search="
    response = requests.get(url, headers=header)
    Get_json = response.json()
    return Get_json


def get_Menu(id):
    header = {"x-apikey": 'iphoneap',
              "x-apisecret": 'fe5183cc3dea12bd0ce299cf110a75a2'}

    url = f"https://www.yogiyo.co.kr/api/v1/restaurants/{id}/menu/?add_photo_menu=android&add_one_dish_menu=true&order_serving_type=delivery"
    response = requests.get(url, headers=header)
    Get_json = response.json()
    return Get_json


def get_Review(id):
    header = {"x-apikey": 'iphoneap',
              "x-apisecret": 'fe5183cc3dea12bd0ce299cf110a75a2'}

    # url = f"https://www.yogiyo.co.kr/api/v1/reviews/{id}/?count=10&only_photo_review=false&page=1&sort=time"
    url = f"https://www.yogiyo.co.kr/api/v1/reviews/{id}/?count=100&only_photo_review=false&page=1&sort=time"
    response = requests.get(url, headers=header)
    Get_json = response.json()
    return Get_json


def Search_Category(Search, page, lat, lng):
    header = {"x-apikey": 'iphoneap',
              "x-apisecret": 'fe5183cc3dea12bd0ce299cf110a75a2'}

    encoded_query = urllib.parse.quote(Search)  # 한글 검색어 인코딩 필수!
    url = f"https://www.yogiyo.co.kr/api/v1/restaurants-geo/?items=60&lat={lat}&lng={lng}&order=rank&page={page}&search={encoded_query}"
    # 예전 API(v1)는 더 이상 사용 불가. deprecated 처리됨.

    response = requests.get(url, headers=header)
    print("응답 상태코드:", response.status_code)
    print("응답 본문:", response.text[:200])  # 너무 길면 일부만 출력
    # response = requests.get(url, headers=header)
    # Get_json = response.json()
    # return Get_json
    if response.status_code == 200:
        try:
            return response.json()
        except Exception as e:
            return {"error": "JSON 파싱 실패", "message": str(e)}
    else:
        return {"error": "요기요 요청 실패", "status_code": response.status_code}

if __name__ == "__main__":

    #  print(get_Yogiyo('1인분주문', 36.969655961906, 127.244958777736))
    # print(get_Menu(468686))
    # print(get_Review(468686))
    print(Search_Category("치킨", 0, "36.969655961906", "127.244958777736"))
