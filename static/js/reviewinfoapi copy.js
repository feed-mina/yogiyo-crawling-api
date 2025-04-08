const newParam = window.location.search;
const newhref = window.location.href;
//console.log(newhref);
const url = new URL(newhref);
const urlParams = url.searchParams;
const id = urlParams.get('id');
async function fetchreview(id) {


  // const yogiyoUrl = `http://52.53.244.181:80/1122?id=${id}`
  const yogiyoUrl = `http://127.0.0.1:80/1122?id=${id}`
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

 console.log(json);

  return json;
};
fetchreview(id).then(json => initialize(json));
fetchreview(id)
  .catch(err => console.error(`Fetch problem: ${err.message}`));
 
function initialize(json) {
 
  const category = document.querySelector('#category');
  const searchTerm = document.querySelector('#searchTerm');
  const searchBtn = document.querySelector('button');
  const main = document.querySelector('main');
  const div = document.querySelector('div');
  const reviewinfo = document.querySelector(' reviewinfo');
 

  let finalGroup;

  finalGroup = json;
  updateDisplay();

  finalGroup = [];

 
  function selectCategory(e) {
 
    e.preventDefault();

    finalGroup = [];



  }
  function updateDisplay() {
 
    while (reviewinfo.firstChild) {
      reviewinfo.removeChild(reviewinfo.firstChild);
    }


    for (const json of finalGroup) {
      fetchBlob(json);
    }
  }


 
  function fetchBlob(json) {
 
    showProduct(json);
  }

  // Display a json inside the <main> element
  function showProduct(json) {

 //console.log(json);
 
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    const para = document.createElement('p');
    const reviewimage = document.createElement('img');
    const review1 = document.createElement('p');
    const review2 = document.createElement('p');
    const review3 = document.createElement('p');
    const review4 = document.createElement('p');
    const br = document.createElement('br');

    const boxwrap = document.createElement('div');
    const reviewdiv1 = document.createElement('div');
    const reviewdiv2 = document.createElement('div');
    const reviewdiv3 = document.createElement('div');

    const menuphoto = document.createElement('img');
        //console.log(json);
    const Lode_json = window.sessionStorage.getItem("tt1");
    const parse_Lode_json = JSON.parse(Lode_json);
       //console.log(parse_Lode_json.items);
    
    console.log(parse_Lode_json)
    console.log(parse_Lode_json.length)
    menuphoto.setAttribute('src',menuphotosrc)
    menuphoto.setAttribute('id',parse_Lode_json[i].items[v].id)
    menuphoto.setAttribute('class','menuphoto')
    console.log(parse_Lode_json[i].items[v].id);
    console.log(menuphoto.src);
    if (json.review_images.length > 0) {
      for (let v = 0; v < json.review_images.length; v++) {
        let review_images = json.review_images[v].name;
        reviewdiv3.textContent = `${review_images}`;
      }
    
      for (let r = 0; r < json.review_images.length; r++) {
        let review_images = json.review_images[r].thumb;
        //console.log(review_images);
        reviewimage.setAttribute('src', review_images);
        reviewimage.setAttribute('class', 'reviewimage');
      }
    }
    
       
    const reviewdiv4 = document.createElement('div');
    const imagebox = document.createElement('div');
    const reviewdiv1_2 = document.createElement('div');
    reviewdiv1_2.setAttribute('class','reviewdiv1_2');
    heading.setAttribute('class','heading');
    reviewdiv1.setAttribute('class','reviewdiv1');
    reviewdiv2.setAttribute('class','reviewdiv2');
    reviewdiv3.setAttribute('class','reviewdiv3');
    reviewdiv4.setAttribute('class','reviewdiv4');
    imagebox.setAttribute('class','imagebox');


    //console.log(json.time);
    //console.log(json.nickname);
    //console.log(json.rating);
    //console.log(json.review_images);

    //console.log(json.comment);
    //console.log(json.review_images);
    //console.log(json.review_images.length);

    let time = json.time
    let nickname = json.nickname
    let rating = parseInt(json.rating)
    let comment = json.comment
    const rating_Text = "";
//console.log(json.menu_items[0].ingredients);

//console.log(json.menu_items[0].name);
    // for (let i = 1; i <= rating; i++) {
    //   rating_Text = rating_Text + "⭐";
    // }
    review1.textContent = `⭐ ${rating}.0  `
    review2.textContent = `${nickname}`
    review3.textContent = ` ${time}`
    reviewdiv4.textContent = `${comment}`

    //console.log(json.review_images);

    //console.log(json.review_images[0]);
    review1.setAttribute('class','review1');
    review2.setAttribute('class','nickname');
    review3.setAttribute('class','time');
    boxwrap.setAttribute('class','boxwrap');
    reviewinfo.appendChild(section);
    reviewdiv4.setAttribute('class','comment');
    section.appendChild(heading);

    section.appendChild(reviewdiv1);
    reviewdiv1.appendChild(review1);
    reviewdiv1.appendChild(reviewdiv1_2);
    reviewdiv1_2.appendChild(review2);
    reviewdiv1_2.appendChild(review3);
    section.appendChild(reviewdiv2);
    section.appendChild(imagebox);
    imagebox.appendChild(reviewimage);
    section.appendChild(reviewdiv3);
reviewdiv3.appendChild(menuphoto);
    section.appendChild(reviewdiv4);
    section.appendChild(boxwrap);


  }
}



function Find_Id_Photo(parse_Lode_json, id){

  for(let i = 0; i<parse_Lode_json.length; i++ ){
    //console.log(parse_Lode_json[i])
    console.log(parse_Lode_json[i].items)
    //  console.log(parse_Lode_json[i].items.id)
    //console.log(parse_Lode_json[i].items.length)
      for(let v = 0; v<parse_Lode_json[i].items.length; v++){
      //  console.log(parse_Lode_json[i].items[v].id)
      //  console.log(parse_Lode_json[i].items[v].original_image)
        if(parse_Lode_json[i].items[v].id ==  id){
          const menuphotosrc = parse_Lode_json[i].items[v].original_image
          //menuphoto.src =  `${menuphotosrc}`
          return menuphotosrc;
        }
  // menuphoto.setAttribute('src',``)
  }
  }

  return;

}