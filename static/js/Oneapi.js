
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
    //console.log(elt.innerHTML = "Geolocation 오류 " + e.code + ": " + e.message);
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

    async function fetchapi() {
      //const yogiyoUrl = `https://www.yogiyo.co.kr/api/v1/restaurants-geo/?category=${cal}&//items=60&lat=${latitude}&lng=${longitude}&order=rank&page=0&search=`
      const yogiyoUrl = `http://52.53.244.181:80/12?cal=${cal}&latitude=${latitude}&longitude=${longitude}`
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

      //console.log(products)

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
function initialize(products) {

  const oneheader = document.querySelector('oneheader');


  const searchBtn = document.querySelector('button');
  const main = document.querySelector('main');

  //console.log(products);
  // keep a record of what the last category and search term entered were

  let finalGroup;

  finalGroup = products;
  updateDisplay();

  finalGroup = [];

  // when the search button is clicked, invoke selectCategory() to start
  //  searchBtn.addEventListener('click', selectCategory);

  function selectCategory(e) {
    // Use preventDefault() to stop the form submitting — that would ruin
    // the experience
    e.preventDefault();

    finalGroup = [];

  }


  function updateDisplay() {
    // remove the previous contents of the <main> element
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }

    for (const product of finalGroup) {
      fetchBlob(product);
    }
  }


  // fetchBlob uses fetch to retrieve the image for that product, and then sends the
  // resulting image display URL and product object on to showProduct() to finally
  // display it
  function fetchBlob(product) {
    // construct the URL path to the image file from the product.image property
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
      .then(blob => showProduct(blob, product))
      .catch(err => console.error(`Fetch problem: ${err.message}`));
  }

  // Display a product inside the <main> element
  function showProduct(blob, product) {
    // Convert the blob to an object URL — this is basically an temporary internal URL
    // that points to an object stored inside the browser
    const objectURL = URL.createObjectURL(blob);
    // create <section>, <h2>, <p>, and <img> elements
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    const para = document.createElement('p');
    const image = document.createElement('img');
    const para1 = document.createElement('p');
    const para2 = document.createElement('p');
    const keywordPara = document.createElement('p');
    const br = document.createElement('br');
    const hrefwrap_store = document.createElement('a');
    const boxwrap = document.createElement('div');
    const imagebox = document.createElement('div');
    const thumbnailsrc = product.thumbnail_url;
    const hrefoneheaderwrap = document.createElement('a');
    const categorybox = document.createElement('div');
    const para_delivery = document.createElement('p');
    ////console.log(product.categories[0]);
    const thumbimage = document.createElement('img');
    const onepagediv1 = document.createElement('div');
    const onepagediv2 = document.createElement('div');
    thumbimage.setAttribute('src', thumbnailsrc);
    thumbimage.setAttribute('class', 'thumbnail')

    keywordPara.classList.add('keywords');
    // give the <section> a classname equal to the product "type" property so it will display the correct icon
    const parameter = product.categories[0];
    //console.log(parameter)

    categorybox.setAttribute('id', product.categories[0]);



    section.setAttribute('class', product.categories[0]);
    para.setAttribute('class', 'min_price');
    para1.setAttribute('class', 'reviewcount');
    para2.setAttribute('class', 'reviewavg');

    imagebox.setAttribute('class', 'imagebox');
    boxwrap.setAttribute('class', 'boxwrap');
    onepagediv1.setAttribute('class','onepagediv1');
    onepagediv2.setAttribute('class','onepagediv2');
    hrefwrap_store.setAttribute('class', 'hrefwrap_store');
    hrefwrap_store.setAttribute('class', 'hrefwrap_store');
    text = 'http://127.0.0.1:5000/3?id=' + decodeURI(product.id);
    hrefwrap_store.setAttribute('href', text);

    para_delivery.setAttribute('class', 'para_delivery');
    // Give the <h2> textContent equal to the product "name" property, but with the first character
    // replaced with the uppercase version of the first character
    para_delivery.textContent = `⏰⌚ ${product.estimated_delivery_time} `
    heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());
    para.textContent = `최소금액 ${product.min_order_amount}원`;
    para1.textContent = `리뷰 ${product.review_count}개`;
    para2.textContent = `★ ${product.review_avg}`;
    // Give the <p> textContent equal to the product "price" property, with a $ sign in front
    // toFixed(2) is used to fix the price at 2 decimal places, so for example 1.40 is displayed
    // as 1.40, not 1.4.

    heading.setAttribute('class','heading');
    // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
    image.src = objectURL;
    image.alt = product.name;

    // append the elements to the DOM as appropriate, to add the product to the UI
    main.appendChild(hrefwrap_store)
    hrefwrap_store.appendChild(boxwrap);
    boxwrap.appendChild(imagebox);
    imagebox.appendChild(thumbimage);
    main.appendChild(section);
    section.appendChild(onepagediv1);
    section.appendChild(heading);
    section.appendChild(onepagediv2);
 

  }


}