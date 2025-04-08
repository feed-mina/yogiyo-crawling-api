## Fastfood 2 (Yogiyo API Clone)

### 📌 프로젝트 개요
요기요의 비공식 API를 활용한 음식점, 메뉴, 리뷰 정보를 자동 수집하는 Flask 서버 프로젝트입니다.

### 🧭 실행 흐름

1. 토큰 발급 → `/v1/customers`, `/auth/authorize`
2. 사용자 정보 확인 → `/v1/aggregation/user_info`
3. 배달 가능 여부 → `/api/v1/geo-restaurants-available`
4. 음식점 목록 → `/api/v2/restaurants`
5. 메뉴 및 리뷰 정보 조회 → `/menu`, `/reviews`


### 🌐 API 테스트 (Postman)
→ [컬렉션 다운로드 링크]()

### 🗂️ 주요 기능
- Python + Flask
- Postman API 테스트 컬렉션
- 비공식 Yogiyo API
- HTML + JS 

### 📂 파일 구조
- `Receve_Data.py` : HTML 페이지 렌더링용
- `Receve_Data_Server.py` : API 응답용 (가게 목록, 메뉴 등)
- `Get_yogiyo_v2.py` : 요청 함수 모음
-
## ✨ 프로젝트 실행 흐름
1️⃣	비회원 로그인 세션 생성	get_authorization_code()
2️⃣	토큰 발급	get_access_token(code)
3️⃣	좌표 기반 배달 가능 확인	check_geo_available(token, lat, lng)
4️⃣	로그인된 유저 정보 확인	get_user_info(token)
5️⃣	가게 리스트 받아오기	get_restaurants(token, lat, lng)
6️⃣	첫 번째 가게의 메뉴 가져오기	get_menu(id, token)
7️⃣	첫 번째 가게의 리뷰 가져오기	get_review(id)

## 가상환경 사용 방법

```bash
# 1. 가상환경 생성
python -m venv venv

# 2. 가상환경 실행
source venv/bin/activate  # (Windows: venv\Scripts\activate)

# 3. 필요 패키지 설치
pip install -r requirements.txt
````

```python
# 1. 인증 코드 발급
code = get_authorization_code()

# 2. access_token 획득
access_token = get_access_token(code)

# 3. 배달 가능 여부
geo = check_geo_available(access_token, lat, lng)

# 4. 사용자 정보 조회
user_info = get_user_info(access_token)

# 5. 주변 가게 조회
stores = get_restaurants(lat, lng, page=0)

# 6. 첫 번째 가게의 메뉴와 리뷰
if stores["restaurants"]:
    restaurant_id = stores["restaurants"][0]["id"]
    menu = get_menu(restaurant_id, access_token)
    review = get_review(restaurant_id)
 ```

fastfood_2-master

├── Get_yogiyo_v2.py      
-  핵심 크롤링 함수 모음 (자동 로그인, 데이터 수집 등)

├── Receve_Data_Server_renewal.py  
- 리팩토링 하고 있는 API 서버 (실제 데이터 처리 API), 웹 템플릿 렌더링용 Flask 서버

├── Receve_Data_Server.py 
- API 서버 (실제 데이터 처리 API)(ver2022)

├── Receve_Data.py         
 - 웹 템플릿 렌더링용 Flask 서버(ver2022)

├── config.py             
 - 설정 파일 (현재 사용 안 함)(ver2022)

├── connection.py         
 - DB 연결 용도 (현재 사용 안 함)(ver2022)

└── templates/            
 📄 HTML 파일들



### 🔧 사용 팁
- Postman에서 Import > File로 이 JSON 파일을 불러와 주세요.
- access_token, restaurant_id, lat, lng 변수는 Postman 환경 변수로 자동 인식됩니다.
- 토큰이 필요한 요청에는 공통 헤더(Authorization, x-apikey, x-apisecret)가 들어가도록 되어 있어요.