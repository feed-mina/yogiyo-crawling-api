
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
    elt.innerHTML = "Geolocation 오류 " + e.code + ": " + e.message;
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

    console.log(msg);     // 모든 위치 정보를 출력한다.
    const latitude = pos.coords.latitude;
    const longitude = pos = pos.coords.longitude;
    console.log(latitude);
    console.log(longitude);
    const newParam = window.location.search;
    const newhref = window.location.href;
    console.log(newhref);
    const url = new URL(newhref);
    const urlParams = url.searchParams;
    const cal = urlParams.get('cal');

    console.log(cal);



    async function fetchapi() {
      const yogiyoUrl = `https://www.yogiyo.co.kr/api/v1/restaurants-geo/?category=${cal}&items=60&lat=${latitude}&lng=${longitude}&order=rank&page=0&search=`
      let response = await fetch(yogiyoUrl, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'x-apikey': 'iphoneap',
          "x-apisecret": 'fe5183cc3dea12bd0ce299cf110a75a2'
        }
      })
      //response 끝

      let json = await response.json();
      let products = json.restaurants

      console.log(products)

      return products;
    };
    fetchapi().then(json => initialize(json));
    fetchapi()
      .catch(err => console.error(`Fetch problem: ${err.message}`));

  }
}

// 나의 위치정보를 출력할 객체 구하기
var elt = document.getElementById("myLocationInfo");
// 나의 위치정보 출력하기
whereami(elt);


// sets up the app logic, declares required variables, contains all the other functions
function initialize(stores) {

  // grab the UI elements that we need to manipulate
  const category = document.querySelector('#category');
  const searchTerm = document.querySelector('#searchTerm');
  const searchBtn = document.querySelector('button');
  const main = document.querySelector('main');
  const div = document.querySelector('div');

  const data = stores[0].restaurants
  console.log(data)
  console.log(stores)
  // keep a record of what the last category and search term entered were
  let lastCategory = category.value;
  // no search has been made yet
  let lastSearch = '';

  // these contain the results of filtering by category, and search term
  // finalGroup will contain the stores that need to be displayed after
  // the searching has been done. Each will be an array containing objects.
  // Each object will represent a store
  let categoryGroup;
  let finalGroup;

  // To start with, set finalGroup to equal the entire stores database
  // then run updateDisplay(), so ALL stores are displayed initially.
  finalGroup = data;
  updateDisplay();

  // Set both to equal an empty array, in time for searches to be run
  categoryGroup = [];
  finalGroup = [];

  // when the search button is clicked, invoke selectCategory() to start
  // a search running to select the category of data we want to display
  searchBtn.addEventListener('click', selectCategory);

  function selectCategory(e) {
    // Use preventDefault() to stop the form submitting — that would ruin
    // the experience
    e.preventDefault();

    // Set these back to empty arrays, to clear out the previous search
    categoryGroup = [];
    finalGroup = [];

    // if the category and search term are the same as they were the last time a
    // search was run, the results will be the same, so there is no point running
    // it again — just return out of the function

  }



  // start the process of updating the display with the new set of stores
  function updateDisplay() {
    // remove the previous contents of the <main> element
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    // if no stores match the search term, display a "No results to display" message

    for (const store of finalGroup) {
      fetchBlob(store);
    }

  }

  // fetchBlob uses fetch to retrieve the image for that store, and then sends the
  // resulting image display URL and store object on to showProduct() to finally
  // display it
  function fetchBlob(store) {
    // construct the URL path to the image file from the store.image property
    const url = `/`;
    // Use fetch to fetch the image, and convert the resulting response to a blob
    // Again, if any errors occur we report them in the console.
    fetch(url)

      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        return response.blob();
      })
      .then(store_primarykey => showProduct(store))
      .catch(err => console.error(`Fetch problem: ${err.message}`));
  }

  // Display a store inside the <main> element
  function showProduct(store) {
    console.log(store)
    console.log(store.id)
    console.log(store.name)
    const store_primarykey = store.id;
    console.log(store_primarykey);
    // Convert the blob to an object URL — this is basically an temporary internal URL
    // that points to an object stored inside the browser

    //    const store_primaryURL = URL.createObjectURL( store_primarykey);
    const store_primaryURL = document.createElement('a');

    const section = document.createElement('section');
    const heading = document.createElement('h2');
    const para = document.createElement('p');
    const image = document.createElement('img');
    const para1 = document.createElement('p');
    const para2 = document.createElement('p');
    const para3 = document.createElement('p');
    const para4 = document.createElement('p');
    const para5 = document.createElement('p');
    const para6 = document.createElement('p');

    const keywordPara = document.createElement('p');
    const br = document.createElement('br');

    const boxwrap = document.createElement('div');
    const imagebox = document.createElement('div');
    const textbox = document.createElement('div');
    const line1 = document.createElement('div');
    const line2 = document.createElement('div');
    const line3 = document.createElement('div');
    const line4 = document.createElement('div');

    keywordPara.classList.add('keywords');
    // give the <section> a classname equal to the store "type" property so it will display the correct icon
    section.setAttribute('class', store.categories[0]);
    section.setAttribute('id', store.id);

    heading.setAttribute('class', 'storetitle')
    para.setAttribute('class', 'min_price');
    para1.setAttribute('class', 'reviewcount');
    para2.setAttribute('class', 'reviewavg');
    textbox.setAttribute('class', 'textbox');
    imagebox.setAttribute('class', 'imagebox');
    boxwrap.setAttribute('class', 'boxwrap');
    store_primaryURL.setAttribute('class', ' store_primaryURL');
    store_primaryURL.setAttribute('href', 'http://127.0.0.1:5000/4');

    para3.setAttribute('class', 'deliveryfee');
    para4.setAttribute('class', 'deliverytime');
    para5.setAttribute('class', 'distance');

    line1.setAttribute('class', 'line1');
    line2.setAttribute('class', 'line2');
    line3.setAttribute('class', 'line3');
    line4.setAttribute('class', 'line4');
    // Give the <h2> textContent equal to the store "name" property, but with the first character
    // replaced with the uppercase version of the first character
    heading.textContent = store.name.replace(store.name.charAt(0), store.name.charAt(0).toUpperCase());
    para.textContent = `최소금액 ${store.min_order_amount}원`;
    para1.textContent = `리뷰 ${store.review_count}개`;
    para2.textContent = `★ ${store.review_avg}`;
    para3.textContent = `배달비 ${store.adjusted_delivery_fee}원`;
    para4.textContent = store.estimated_delivery_time;
    para5.textContent = `${store.distance.toFixed(2)}km`;
    // Give the <p> textContent equal to the store "price" property, with a $ sign in front
    // toFixed(2) is used to fix the price at 2 decimal places, so for example 1.40 is displayed
    // as 1.40, not 1.4.



    // append the elements to the DOM as appropriate, to add the store to the UI

    main.appendChild(store_primaryURL);
    store_primaryURL.appendChild(section);
    section.appendChild(boxwrap);
    boxwrap.appendChild(imagebox);
    boxwrap.appendChild(textbox);
    textbox.appendChild(line1);
    textbox.appendChild(line2);
    textbox.appendChild(line3);
    textbox.appendChild(line4);
    line1.appendChild(heading);
    line2.appendChild(para2);
    line2.appendChild(para1);
    line2.appendChild(para5);
    line3.appendChild(para4);
    line3.appendChild(para);
    line4.appendChild(para3);

  }
}
