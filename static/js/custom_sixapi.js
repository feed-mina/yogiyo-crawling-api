function sixapi(){
 
    const totalprice = window.sessionStorage.getItem('spantotalsum');
    const foodname = window.sessionStorage.getItem('foodname');
    const radioname = window.sessionStorage.getItem('radioname');
    const checkboxname = window.sessionStorage.getItem('checkboxname');
    const radiototal = window.sessionStorage.getItem('radiototal');
    const checkboxtotal = window.sessionStorage.getItem('checkboxtotal');
    const foodprice = window.sessionStorage.getItem('price');
    const number = window.sessionStorage.getItem('number');
     const count = window.sessionStorage.getItem('count');
    const deliveeryfee = window.sessionStorage.getItem('deliveryfee2');
    console.log(count);
    console.log(checkboxtotal);
     console.log(radiototal);
    console.log(totalprice);
    console.log(foodprice);
 console.log(deliveeryfee);
 console.log(foodname)
 console.log(checkboxname)
 console.log(radioname)
 const parse_deliveryfee = parseInt(deliveeryfee);
 console.log(parse_deliveryfee)
     const parse_total = parseInt(totalprice);
     const parse_count = parseInt(count);
    console.log(parseInt(count))

    const option = document.querySelector('option');
    const foodpricetotal = document.querySelector('foodpricetotal');
    const showoption = document.createElement('div');
    const showfoodname = document.createElement('div');
    const showprice = document.createElement('div');
    const showcount = document.createElement('p');
    console.log(parse_total * parse_count +parse_deliveryfee+3000);
  
    option.setAttribute('class','option');
    
    showfoodname.setAttribute('class','showfoodname');
 
    showoption.setAttribute('class','showoption');
     const basketimagwrap = document.createElement('div');
    const basketline1 = document.createElement('div');
    const basketline2 = document.createElement('div');
    const basketline3 = document.createElement('div');
    const basketline4 = document.createElement('div');

    const basketline5 = document.createElement('div');
    const basketline6 = document.createElement('div');
    const basketline7 = document.createElement('div');
    const basketline8 = document.createElement('div');
    const basketline9 = document.createElement('div');
    const basketline10 = document.createElement('div');


    const baskettext1 = document.createElement('p');
    const baskettext1_2 = document.createElement('p');
    const baskettext2 = document.createElement('p');
    const baskettext2_2 = document.createElement('p');
    const baskettext3 = document.createElement('p');
    const baskettext3_2 = document.createElement('p');
    const baskettext4 = document.createElement('p');
    const baskettext4_2 = document.createElement('p');


    const baskettext5 = document.createElement('p');
    const baskettext5_2 = document.createElement('p');
    const baskettext6 = document.createElement('p');
    const baskettext6_2 = document.createElement('p');
    const baskettext7 = document.createElement('p');
    const baskettext7_2 = document.createElement('p');
    const baskettext8 = document.createElement('p');
    const baskettext8_2 = document.createElement('p');
    const baskettext9 = document.createElement('p');
    const baskettext9_2 = document.createElement('p');
    const baskettext10 = document.createElement('p');
    const baskettext10_2 = document.createElement('p');

 
    showcount.setAttribute('class','showcount');
    showcount.textContent = ` X ${count}`
    baskettext1.textContent = `메뉴금액`
    baskettext2.textContent = `${radioname}`
    baskettext3.textContent = `${checkboxname}`
    baskettext1_2.textContent = `₩ ${foodprice} `
    baskettext2_2.textContent =  `₩${radiototal}`
    baskettext3_2.textContent = `₩${checkboxtotal}`
    baskettext4.textContent = `₩${parse_total * parse_count}`
    baskettext4_2.textContent = ``

     baskettext5.textContent = `총메뉴금액`
     baskettext6.textContent = `배달비용`
     baskettext7.textContent = `서비스비용`
     baskettext8.textContent = `포인트사용`
     baskettext9.textContent = `총결제사용`

     baskettext5_2.textContent = `₩${parse_total * parse_count}`
     baskettext6_2.textContent = ` ₩${deliveeryfee}`
     baskettext7_2.textContent = `₩ 3,000`
     baskettext8_2.textContent = `-0P`
     baskettext9_2.textContent = `₩${parse_total * parse_count + 3000 + parse_deliveryfee}`

if(deliveeryfee == '무료'){
    console.log(parse_total * parse_count)
    let parse_deliveryfee = 0
}
const buytotalprice = parse_total * parse_count +parse_deliveryfee+3000

baskettext10.textContent = '총결제금액'
baskettext10_2.textContent = `${buytotalprice}원`
basketimagwrap.setAttribute('class','basketimagwrap');
    basketline1.setAttribute('class', 'basketline1');
    basketline2.setAttribute('class', 'basketline2')
    basketline3.setAttribute('class', 'basketline3')
    basketline4.setAttribute('class', 'basketline4')
    basketline5.setAttribute('class', 'basketline5');
    basketline6.setAttribute('class', 'basketline6')
    basketline7.setAttribute('class', 'basketline7')
    basketline8.setAttribute('class', 'basketline8')
    basketline9.setAttribute('class', 'basketline9')
    basketline10.setAttribute('class','basketline10');
    
    showoption.setAttribute('class', 'showoption');
    foodpricetotal.setAttribute('class','foodpricetotal');
 
 

    const onemenu_title = document.getElementsByClassName('onemenu_title')

    // foodpricetotal.textContent = ` TOTAL ${foodprice} 원`
    const basket = document.querySelector('basket');
    const divfoodimg =document.createElement('img');
    showfoodname.textContent = `${foodname}`

    baskettext2.setAttribute('class','baskettext2');

    baskettext3.setAttribute('class','baskettext3');

 
   const Load_storagefoodimg = window.sessionStorage.getItem('storagefoodimg');
console.log(Load_storagefoodimg);
divfoodimg.setAttribute('class','divfoodimg');

divfoodimg.setAttribute('src',Load_storagefoodimg);
    foodpricetotal.appendChild(showprice);
    option.appendChild(showoption);
    basket.appendChild(basketimagwrap);
    basketimagwrap.appendChild(divfoodimg);
    basket.appendChild(showfoodname);
    showfoodname.appendChild(showcount)
    basket.appendChild(basketline1);
    if(checkboxtotal != 0){
        basket.appendChild(basketline3);
    }
     if(checkboxtotal == null){
        baskettext3.textContent = ``
        baskettext3_2.textContent = ``
    }
    if(radiototal != 0){
        basket.appendChild(basketline2);
    }   if(radiototal == null){
        baskettext2.textContent = ``
        baskettext2_2.textContent = ``
    }

    if (buytotalprice !=NaN){
        baskettext4.textContent = `₩${foodprice * parse_count +parse_deliveryfee+3000
         }`
        baskettext5_2.textContent = ``
        baskettext9_2.textContent = ``
     
        baskettext10_2.textContent = `₩${foodprice * parse_count +parse_deliveryfee+3000
        }`

    }
    basket.appendChild(basketline4);
    basket.appendChild(basketline5);
    basket.appendChild(basketline6);
    basket.appendChild(basketline7);
    basket.appendChild(basketline8);
    basket.appendChild(basketline9);
    basket.appendChild(basketline10);
    
    basketline1.appendChild(baskettext1);
    basketline1.appendChild(baskettext1_2);
    basketline2.appendChild(baskettext2);
    basketline2.appendChild(baskettext2_2);
    basketline3.appendChild(baskettext3);
    basketline3.appendChild(baskettext3_2);
    basketline4.appendChild(baskettext4);
    basketline4.appendChild(baskettext4_2);

    basketline5.appendChild(baskettext5);
    basketline5.appendChild(baskettext5_2);
    basketline6.appendChild(baskettext6);
    basketline6.appendChild(baskettext6_2);
    basketline7.appendChild(baskettext7);
    basketline7.appendChild(baskettext7_2);
    basketline8.appendChild(baskettext8);
    basketline8.appendChild(baskettext8_2);
    basketline10.appendChild(baskettext10);
    basketline10.appendChild(baskettext10_2);
}





sixapi();