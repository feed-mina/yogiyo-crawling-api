import requests
# import json
from datetime import datetime
import urllib.parse  # 한글 인코딩을 위해 추가



# 공통 헤더 설정
BASE_HEADERS = {
    "x-apikey": "iphoneap",
    "x-apisecret": "fe5183cc3dea12bd0ce299cf110a75a2",
    "accept": "application/json",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
}


def get_access_token():
    headers = {
        "x-apikey": "iphoneap",
        "x-apisecret": "fe5183cc3dea12bd0ce299cf110a75a2",
        "accept": "application/json"
    }


# 1.  토큰 발급 → 인증 URL 획득
def get_authorization_code():
    url = "https://memberyo.yogiyo.co.kr/v1/customers"
    response = requests.post(url, headers=BASE_HEADERS)
    if response.status_code == 200:
        return response.json().get("authorization_url").split("code=")[-1]
    print("[오류] 고객 생성 실패:", response.status_code, response.text)
    return None

# 2. 토큰 교환 인증 URL로 access_token 발급
def get_access_token(code):
    url = f"https://authyo.yogiyo.co.kr/api/v1/auth/authorize?code={code}"
    response = requests.get(url, headers=BASE_HEADERS)
    if response.status_code == 200:
        return response.json().get("access_token")
    print("[오류] 토큰 발급 실패:", response.status_code, response.text)
    return None


# 3. 좌표 기반 배달 가능 여부
def check_geo_available(access_token, lat, lng):
    headers = BASE_HEADERS.copy()
    headers["Authorization"] = f"Bearer {access_token}"
    url = f"https://www.yogiyo.co.kr/api/v1/geo-restaurants-available/?lat={lat}&lng={lng}"
    return requests.get(url, headers=headers).json()

# 4. 로그인된 사용자 정보
def get_user_info(access_token):
    headers = BASE_HEADERS.copy()
    headers["Authorization"] = f"Bearer {access_token}"
    url = "https://frontyo.yogiyo.co.kr/v1/aggregation/user_info"
    return requests.get(url, headers=headers).json()

# 5. 좌표 기반 가게 목록

def get_restaurants(lat, lng, page=0):
    url = (
        f"https://www.yogiyo.co.kr/api/v1/restaurants"
        f"?items=60&lat={lat}&lng={lng}&order=rank&page={page}&serving_type=delivery"
    )
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"[오류] 상태코드: {response.status_code}")
        print(response.text)
        return None

# 6. 특정 식당 상세정보
def get_restaurant_info(restaurant_id, lat, lng):
    url = f"https://www.yogiyo.co.kr/api/v1/restaurants/{restaurant_id}?lat={lat}&lng={lng}&serving_type=delivery"
    response = requests.get(url, headers=HEADERS)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"[오류] 상태코드: {response.status_code}")
        return None


# 7. 음식점 메뉴 정보 조회
def get_menu(restaurant_id, access_token):
    headers = BASE_HEADERS.copy()
    headers["Authorization"] = f"Bearer {access_token}"
    url = (
        f"https://www.yogiyo.co.kr/api/v1/restaurants/{restaurant_id}/menu/"
        "?add_photo_menu=android&add_one_dish_menu=true&order_serving_type=delivery&serving_type=vd"
    )
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        return response.json()
    print("[오류] 메뉴 조회 실패:", response.status_code, response.text)
    return None

# def get_Menu(id):
#     header = {"x-apikey": 'iphoneap',
#               "x-apisecret": 'fe5183cc3dea12bd0ce299cf110a75a2'}
#
#     url = f"https://www.yogiyo.co.kr/api/v1/restaurants/{id}/menu/?add_photo_menu=android&add_one_dish_menu=true&order_serving_type=delivery"
#     response = requests.get(url, headers=header)
#     Get_json = response.json()
#     return Get_json

# 8. 리뷰 요청
def get_review(restaurant_id):
    url = f"https://www.yogiyo.co.kr/api/v1/reviews/{restaurant_id}/?only_photo_reviews=false&sort=rate"
    return requests.get(url, headers=BASE_HEADERS).json()

# def get_Review(id):
#     header = {"x-apikey": 'iphoneap',
#               "x-apisecret": 'fe5183cc3dea12bd0ce299cf110a75a2'}
#
#     url = f"https://www.yogiyo.co.kr/api/v1/reviews/{id}/?count=100&only_photo_review=false&page=1&sort=time"
#     response = requests.get(url, headers=header)
#     Get_json = response.json()
#     return Get_json

# 9.
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

# 10.
def get_Yogiyo(category, lat, lng):
    header = {"x-apikey": 'iphoneap',
              "x-apisecret": 'fe5183cc3dea12bd0ce299cf110a75a2'}

    url = f"https://www.yogiyo.co.kr/api/v1/restaurants-geo/?category={category}&items=60&lat={lat}&lng={lng}&order=rank&page=0&search="
    response = requests.get(url, headers=header)
    Get_json = response.json()
    return Get_json

if __name__ == "__main__":

    code = get_authorization_code()
    if code:
        token = get_access_token(code)
        if token:
            menu = get_menu(1102997, token)
                print(menu)
    #  print(get_Yogiyo('1인분주문', 36.969655961906, 127.244958777736))
    # print(get_Menu(468686))
    # print(get_Review(468686))
            print(Search_Category("치킨", 0, "36.969655961906", "127.244958777736"))
