
function whereami(elt) {
    // 이 객체를 getCurrentPosition() 메서드의 세번째 인자로 전달한다.
    var options = {
      // 가능한 경우, 높은 정확도의 위치(예를 들어, GPS 등) 를 읽어오려면 true로 설정
      // 그러나 이 기능은 배터리 지속 시간에 영향을 미친다. 
      enableHighAccuracy: false, // 대략적인 값이라도 상관 없음: 기본값
  
      // 위치 정보가 충분히 캐시되었으면, 이 프로퍼티를 설정하자, 
      // 위치 정보를 강제로 재확인하기 위해 사용하기도 하는 이 값의 기본 값은 0이다.
      maximumAge: 30000,     // 5분이 지나기 전까지는 수정되지 않아도 됨
  
      // 위치 정보를 받기 위해 얼마나 오랫동안 대기할 것인가?
      // 기본값은 Infinity이므로 getCurrentPosition()은 무한정 대기한다.
      timeout: 15000    // 15초 이상 기다리지 않는다.
    }
  
    if (navigator.geolocation) // geolocation 을 지원한다면 위치를 요청한다. 
      navigator.geolocation.getCurrentPosition(success, error, options);
    else
       console.log("이 브라우저에서는 Geolocation이 지원되지 않습니다.");
  
    // geolocation 요청이 실패하면 이 함수를 호출한다.
    function error(e) {
      // 오류 객체에는 수치 코드와 텍스트 메시지가 존재한다.
      // 코드 값은 다음과 같다.
      // 1: 사용자가 위치 정보를 공유 권한을 제공하지 않음.
      // 2: 브라우저가 위치를 가져올 수 없음.
      // 3: 타임아웃이 발생됨.
      //         elt.innerHTML = "Geolocation 오류 "+e.code +": " + e.message;\
     console.log(elt.innerHTML = "Geolocation 오류 " + e.code + ": " + e.message);
    }
  
  
    // geolocation 요청이 성공하면 이 함수가 호출된다.
    function success(pos) {
  
       console.log(pos); // [디버깅] Position 객체 내용 확인
  
      // 항상 가져올 수 있는 필드들이다. timestamp는 coords 객체 내부에 있지 않고, 
      // 외부에서 가져오는 필드라는 점에 주의하다. 
      var msg = "당신은 " +
        new Date(pos.timestamp).toLocaleString() + "에 " +
        " 위도 " + pos.coords.latitude +
        " 경도 " + pos.coords.longitude + "에서 " +
        " 약 " + pos.coords.accuracy + " 미터 떨어진 곳에 있습니다.";
  
      // 해당 기기가 고도 (altitude)를 반환하면, 해당 정보를 추가한다.
      if (pos.coords.altitude) {
        msg += " 당신은 해발 " + pos.coords.altitude + " ± " +
          pos.coords.altitudeAccuracy + " 미터에 있습니다.";
      }
  
      // 해당 기기가 속도와 북쪽 기준 각 (heading)을 반환한다면 역시 추가해준다.
      if (pos.coords.speed) {
        msg += " 당신은 " + pos.coords.heading + " 방향으로 " +
          "초속 " + pos.coords.speed + "(m/s)의 속도로 움직이고 있습니다.";
      }
  
      //console.log(msg);     // 모든 위치 정보를 출력한다.
      const latitude = pos.coords.latitude;
      const longitude = pos = pos.coords.longitude;
      //console.log(latitude);
      //console.log(longitude);
      const newParam = window.location.search;
      const newhref = window.location.href;
      //console.log(newhref);
      const url = new URL(newhref);
      const urlParams = url.searchParams;
      const cal = urlParams.get('cal');
  
      const try1 = window.localStorage.getItem("asas1");
      const try2 = window.sessionStorage.getItem("asas2");
      //console.log(try1);
      //console.log(try2);
  
  
      //console.log(cal);
  //Search, page, lat, lng
      async function  Search_Category(){
    //const yogiyoUrl = `http://127.0.0.1:80/Search`
      //  const yogiyoUrl = `https://www.yogiyo.co.kr/api/v1/restaurants-geo/search/?items=60&  lat=37.4669312&lng=126.943232&order=rank&page=0&search=김밥`
      const yogiyoUrl = 'http://127.0.0.1:80/Search?Search=60&page=0&lat=37.4669312&lng=126.943232'
      //const yogiyoUrl = `http://52.53.244.181:80/12?cal=${cal}&latitude=${latitude}&longitude=${longitude}`
        let response = await fetch(yogiyoUrl, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'origin': '*',
                'credential': 'true',
                'x-apikey': 'iphoneap',
                "x-apisecret": 'fe5183cc3dea12bd0ce299cf110a75a2',
    
            },
    
        })
        //response 끝
        
        let json = await response.json();
        let products = json.restaurants
  
        console.log(json)

        console.log(products)
     
        const item = document.createElement('div')
        item.setAttribute('class','item')
        
        const icon = document.createElement('div')
        icon.setAttribute('class','icon')
        
        const name = document.createElement('div')
        name.setAttribute('class','name')
        
     
for(let i = 0; i<products.length; i++){
    console.log(products[i].id)
    console.log(products[i].address)
    console.log(products[i].name)
 
      

        icon.textContent = `products[i].id`
        name.textContent = `products[i].name`
     

}

 

        return products;
        function filter(){

            var value, name, item, i;
    
            value = document.getElementById("value").value.toUpperCase();
            item = document.getElementsByClassName("item");
    
            for(i=0;i<item.length;i++){
              name = item[i].getElementsByClassName("name");
              if(name[0].innerHTML.toUpperCase().indexOf(value) > -1){
                item[i].style.display = "flex";
              }else{
                item[i].style.display = "none";
              }
            }
          }
          filter()
        // var value, name, item, i;

        // value = document.getElementById("value").value.toUpperCase();
        // item = document.getElementsByClassName("item");

        // for(i=0;i<item.length;i++){
        //   name = item[i].getElementsByClassName("name");
        //   if(name[0].innerHTML.toUpperCase().indexOf(value) > -1){
        //     item[i].style.display = "flex";
        //   }else{
        //     item[i].style.display = "none";
        //   }

  
    }
    Search_Category();
  }
          // }
          
          const search = document.getElementsByClassName('.searchtext')
          console.log(search)
          const container2 = document.createElement('div');
          container2.setAttribute('class','container2');
       //   search.appendChild(container2);
  
        };
    //    
       //   .catch(err => console.error(`Fetch problem: ${err.message}`));
  // 나의 위치정보를 출력할 객체 구하기
  var elt = document.getElementById("myLocationInfo");
  // 나의 위치정보 출력하기
  whereami(elt);
  