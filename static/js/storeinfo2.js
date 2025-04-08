

const newParam = window.location.search;
const newhref = window.location.href;
//console.log(newhref);
const url = new URL(newhref);
const urlParams = url.searchParams;
const id = urlParams.get('id');
//console.log(id);


async function fetchapi() {
 

  const yogiyoUrl = `https://www.yogiyo.co.kr/api/v1/restaurants/${id}/`
  //console.log(yogiyoUrl);
  let response = await fetch(yogiyoUrl, {
    headers: {
      'accept': 'application/json',
      'accept-language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
      'content-type': 'application/x-www-form-urlencoded',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-apikey': 'iphoneap',
      'x-apisecret': 'fe5183cc3dea12bd0ce299cf110a75a2'
    }
  })
  //response 끝

  let json = await response.json();


  //console.log(json)

  return json;
};
fetchapi().then(json => initialize(json));
fetchapi()
  .catch(err => console.error(`Fetch problem: ${err.message}`));


// sets up the app logic, declares required variables, contains all the other functions
function initialize(json) {

  const storeinfo = document.querySelector('storeinfo');



  updateDisplay(json);

  showProduct(json);

  function updateDisplay() {
    // remove the previous contents of the <main> element
    while (storeinfo.firstChild) {
      storeinfo.removeChild(storeinfo.firstChild);
    }


  }

  // Display a json inside the <storeinfo> element
  function showProduct(json) {
    //console.log(json);
    //console.log(json.delivery_fee_to_display);
    //console.log(json.estimated_delivery_time);
    //console.log(json.name);
    //console.log(json);
  //  const load_deliveryfee = window.sessionStorage.getItem('deliveryfee');
    //console.log(load_deliveryfee);
    const load_deliveryfee = urlParams.get('deliveryfee')

    const para = document.createElement('p');
 
    const para1 = document.createElement('p');
    const para2 = document.createElement('p');
    const section = document.createElement('section');
    const para3 = document.createElement('p');
    const para4 = document.createElement('p');
    const para5 = document.createElement('p');
    const reviewdiv = document.createElement('div');
    const infodiv = document.createElement('div');
    const storediv = document.createElement('div');

    const reviewgobutton = document.createElement('a');
    const goreviewhref = 'http://127.0.0.1:5000/5?id=' + id;

    reviewgobutton.setAttribute('class', 'reviewgobutton');
    reviewgobutton.setAttribute('href', goreviewhref);
    const goreviewbutton = document.createElement('div');
    const goreview = document.querySelector('goreview');
    const goreivewspan = document.createElement('span');
    goreivewspan.setAttribute('class','goreviewspan');  
    goreivewspan.textContent = `리뷰  ${json.review_count}`
    reviewgobutton.setAttribute('class','reviewgobutton');
    goreviewbutton.setAttribute('class','goreviewbutton');

    if (load_deliveryfee != 0){
      
    para.textContent = ` 배달비 ₩${load_deliveryfee}`;

    }
    if(load_deliveryfee == 0){
      para.textContent = `배달비 FREE`;

    }
    const deliveryfee2 = window.sessionStorage.setItem('deliveryfee2', load_deliveryfee);

    para1.textContent = ` ${json.estimated_delivery_time}`;
    para2.textContent = `  ${json.name}`;
    para3.textContent = `⭐ ${json.review_avg}`;
    para4.textContent = ` ⏰${json.estimated_delivery_time}`;
    para5.textContent = `${json.review_count} > `;

    storeinfo.setAttribute('class', ' storeinfo');
    storediv.setAttribute('class', ' storediv');
    infodiv.setAttribute('class', ' infodiv');

    reviewdiv.setAttribute('class', 'reviewdiv');

    para2.setAttribute('class', 'para2');
    para.setAttribute('class', 'para');
    para3.setAttribute('class', 'para3');
    para4.setAttribute('class', 'para4');
    para5.setAttribute('class', 'para5');
    goreview.setAttribute('class','goreview');

    goreview.appendChild(reviewgobutton);
    reviewgobutton.appendChild(goreviewbutton);
    goreviewbutton.appendChild(goreivewspan);

    storeinfo.appendChild(storediv);
    storeinfo.appendChild(section);

    section.appendChild(reviewdiv);
    section.appendChild(infodiv);

    storediv.appendChild(para2);
    reviewdiv.appendChild(para3);
    reviewdiv.appendChild(para5);
    infodiv.appendChild(para);

    infodiv.appendChild(para4);

  }



}