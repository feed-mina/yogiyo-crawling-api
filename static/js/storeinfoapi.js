const newParam = window.location.search;
const newhref = window.location.href;
console.log(newhref);
const url = new URL(newhref);
const urlParams = url.searchParams;
const id = urlParams.get('id');
const menuid = urlParams.get('menuid');

const yogiyoUrl = `http://52.53.244.181:80/1122?id=${id}`
fetch('storeinfo.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response.json();
  })
  .then(json => initialize(json))
  .catch(err => console.error(`Fetch problem: ${err.message}`));

// sets up the app logic, declares required variables, contains all the other functions
function initialize(products) {
  // grab the UI elements that we need to manipulate
  const category = document.querySelector('#category');
  const searchTerm = document.querySelector('#searchTerm');
  const searchBtn = document.querySelector('button');
  const storeinfo = document.querySelector('storeinfo');
  const div = document.querySelector('div');
  console.log(products);
  console.log(products[0].delivery_fee_to_display.basic)
  // keep a record of what the last category and search term entered were

  let finalGroup;

  finalGroup = products;
  updateDisplay();

  finalGroup = [];

  // when the search button is clicked, invoke selectCategory() to start
  // searchBtn.addEventListener('click', selectCategory);

  function selectCategory(e) {
    // Use preventDefault() to stop the form submitting — that would ruin
    // the experience
    e.preventDefault();

    finalGroup = [];



  }

  function updateDisplay() {
    // remove the previous contents of the <storeinfo> element
    while (storeinfo.firstChild) {
      storeinfo.removeChild(storeinfo.firstChild);
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

  // Display a product inside the <storeinfo> element
  function showProduct(blob, product) {

    const productID = window.localStorage.getItem('productid');
    console.log(productID);
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



    keywordPara.classList.add('keywords');
    // give the <section> a classname equal to the product "type" property so it will display the correct icon
    section.setAttribute('class', product.categories[0]);
    para.setAttribute('class', 'min_price');
    para1.setAttribute('class', 'reviewcount');
    para2.setAttribute('class', 'reviewavg');

    imagebox.setAttribute('class', 'imagebox');
    boxwrap.setAttribute('class', 'boxwrap');

    hrefwrap_store.setAttribute('class', 'hrefwrap_store');
    hrefwrap_store.setAttribute('href', 'http://127.0.0.1:5000/2.html');

    // Give the <h2> textContent equal to the product "name" property, but with the first character
    // replaced with the uppercase version of the first character
    heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());
    para.textContent = `최소금액 ${product.min_order_amount}원`;
    para1.textContent = `리뷰 ${product.review_count}개`;
    para2.textContent = `★ ${product.review_avg}`;
    // Give the <p> textContent equal to the product "price" property, with a $ sign in front
    // toFixed(2) is used to fix the price at 2 decimal places, so for example 1.40 is displayed
    // as 1.40, not 1.4.


    // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
    image.src = objectURL;
    image.alt = product.name;

    // append the elements to the DOM as appropriate, to add the product to the UI
    storeinfo.appendChild(hrefwrap_store)
    hrefwrap_store.appendChild(boxwrap);
    boxwrap.appendChild(imagebox);

    storeinfo.appendChild(section);

    section.appendChild(heading);
    section.appendChild(para);
    section.appendChild(para2);
    section.appendChild(para1);



  }
}
