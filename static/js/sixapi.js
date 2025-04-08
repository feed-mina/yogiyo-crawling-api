function sixapi() {
    const menuitem = window.sessionStorage.getItem('menu');

    const foodname = window.sessionStorage.getItem('foodname');
    const menuitem1 = window.sessionStorage.getItem('menu1');
    const menuitem2 = window.sessionStorage.getItem('menu2');

    const checkboxname = window.sessionStorage.getItem('checkboxname');

 
  
    const radioname = window.sessionStorage.getItem('radioname');
     
    const menutotalitem2 = window.sessionStorage.getItem('menu2');
    const menuprice2 = window.sessionStorage.getItem('price2');
    console.log(radioname);
 
    console.log(foodname);
     
    console.log(menuitem1);
    console.log(checkboxname)
    console.log(menuitem2)
    console.log(menutotalitem2)
    console.log(menuprice2)

    console.log(menuitem);
    console.log(menuitem1);

     
    console.log(menuitem);
    const foodprice = window.sessionStorage.getItem('foodprice');
    console.log(foodprice);

    console.log(foodname);
    const storetitle = document.querySelector('storetitle');


    const option = document.querySelector('option');
    const foodpricetotal = document.querySelector('foodpricetotal');
    const showoption = document.createElement('div');
    const showfoodname = document.createElement('div');
    const showprice = document.createElement('div');
    const basketline1 = document.createElement('div');
    const basketline2 = document.createElement('div');
    const basketline3 = document.createElement('div');
    const basketline4 = document.createElement('div');
    const baskettext1 = document.createElement('p');
    const baskettext1_2 = document.createElement('p');
    const baskettext2 = document.createElement('p');
    const baskettext2_2 = document.createElement('p');
    const baskettext3 = document.createElement('p');
    const baskettext3_2 = document.createElement('p');
    const baskettext4 = document.createElement('p');
    const baskettext4_2 = document.createElement('p');



    baskettext1.textContent = `전체금액`
    baskettext2.textContent = `배달비용`
    baskettext3.textContent = `서비스비용`
    baskettext4.textContent = `포인트사용`
    baskettext1_2.textContent = ` ${foodprice} 원`
    const deliveeryfee = window.sessionStorage.getItem('deliveryfee')

    baskettext2_2.textContent = `${deliveeryfee}`
    baskettext3_2.textContent = `-0P`
    baskettext4_2.textContent = `0P`

    basketline1.setAttribute('class', 'basketline1');
    basketline2.setAttribute('class', 'basketline2')
    basketline3.setAttribute('class', 'basketline3')
    basketline4.setAttribute('class', 'basketline4')
    storetitle.setAttribute('class', 'storetitle');
    showoption.setAttribute('class', 'showoption');
    showoption.style.textAlign = 'center';
    showoption.style.fontSize = '30px';
    option.style.fontSize = '30px';
    foodpricetotal.setAttribute('class', 'foodpricetotal');

    showfoodname.textContent = `menu : ${foodname}`

    const onemenu_title = document.getElementsByClassName('onemenu_title')

    // foodpricetotal.textContent = ` TOTAL ${foodprice} 원`
    const basket = document.querySelector('basket');
    const divfoodimg =document.createElement('img');
    showfoodname.textContent = `${foodname}`
    const num = window.sessionStorage.getItem('num');
    console.log(num)
    const group = window.sessionStorage.getItem('group');
    ///
    const photoimg = 'foodimghrefsrc' + num;
    console.log(photoimg);
    const foodimgsrc = window.sessionStorage.getItem(photoimg);
    console.log(foodimgsrc);
    divfoodimg.setAttribute('src',foodimgsrc);
    divfoodimg.setAttribute('class','divfoodimg');
    if (group == 1) {
        divfoodimg.setAttribute('src', foodimgsrc);
    }

    const topimg = 'foodimghref2src' + num;
    console.log(topimg);
    const foodimgsrc2 = window.sessionStorage.getItem(topimg);

    console.log(foodimgsrc2);
    if (group == 2) {
        divfoodimg.setAttribute('src', foodimgsrc2);
    }
    //

    const Oneimg = 'foodimghref3src' + num;
    console.log(Oneimg);
    const foodimgsrc3 = window.sessionStorage.getItem(Oneimg);

    console.log(foodimgsrc3);
    if (group == 3) {
        divfoodimg.setAttribute('src', foodimgsrc3);
    }
    //

    const otherimg = 'foodimghref4src' + num;
    console.log(otherimg);
    const foodimgsrc4 = window.sessionStorage.getItem(otherimg);

    console.log(foodimgsrc4);
    if (group == 4) {
        divfoodimg.setAttribute('src', foodimgsrc4);
    }
    baskettext3.setAttribute('class','baskettext3');

    console.log(foodimgsrc)
    foodpricetotal.appendChild(showprice);
    option.appendChild(showoption);
    basket.appendChild(divfoodimg);
    basket.appendChild(basketline1);
    basket.appendChild(basketline2);
    basket.appendChild(basketline3);
    basket.appendChild(basketline4);
  
    basketline1.appendChild(baskettext1);
    basketline1.appendChild(baskettext1_2);
    basketline2.appendChild(baskettext2);
    basketline2.appendChild(baskettext2_2);
    basketline3.appendChild(baskettext3);
    basketline3.appendChild(baskettext3_2);
    basketline4.appendChild(baskettext4);
    basketline4.appendChild(baskettext4_2);
    storetitle.appendChild(showfoodname);

}





sixapi();