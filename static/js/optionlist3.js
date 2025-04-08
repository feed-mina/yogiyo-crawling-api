 
    const newParam = window.location.search;
    const newhref = window.location.href;
    console.log(newhref);
    const url = new URL(newhref);
    const urlParams = url.searchParams;
    const id = urlParams.get('id');
    const menuid = urlParams.get('menuid');
     
     
    
    async function fetchapi(menuid){
        const yogiyoUrl = `http://52.53.244.181:80/5000?id=${id}&menu=${menuid}`
        //   
      ""
    let response =  await fetch(yogiyoUrl,{
        headers : {
            'Access-Control-Allow-Origin' : '*',
            'origin': '*', 
            'credential': 'true' ,
            'x-apikey': 'iphoneap',
            "x-apisecret": 'fe5183cc3dea12bd0ce299cf110a75a2',
            
        },

    })
   //response 끝
   
   let json = await response.json();
  
   console.log(json);
  
  return json;
  };
   fetchapi(menuid).then(json => initialize(json));
  fetchapi(menuid)
  .catch( err => console.error(`Fetch problem: ${err.message}`) );
   
     
   
    
  // sets up the app logic, declares required variables, contains all the other functions
  function initialize(dataset) {
    console.log(dataset) 

    const choicemenu = document.querySelector('choicemenu');
    const newParam = window.location.search;
    const newhref = window.location.href;
    console.log(newhref);
    const url = new URL(newhref);
    const urlParams = url.searchParams;
    const id = urlParams.get('id');
    const menuid = urlParams.get('menu');
    console.log(menuid);
    
    const subchoicesGroup = dataset[0].items[0].subchoices;
 
    let para_subchoicesGroup = [] ;
    para_subchoicesGroup  =subchoicesGroup;

console.log(dataset.name);
    update_OptionGroup();

    para_subchoicesGroup= [];

    function OptionGroup(e){
        e.preventDefault();
      
    para_subchoicesGroup= [];
    }

    function update_OptionGroup(){
        while(choicemenu.firstChild){
            choicemenu.removeChild(choicemenu.firstChild);
        }
        for (const optiongroup of para_subchoicesGroup){
            fetchBlob(optiongroup);
        }
    }

    function fetchBlob(optiongroup){
        const optiongroupurl = `/`;
        fetch(optiongroupurl)
        .then(response =>{
            if(!response.ok){
                throw new Error(`HTTP error : ${response.status}`);
            }
            return response.blob();
        })
        .then(optiongroup_menuid => showGroup(optiongroup))
        .catch(err => console.log(`Fetch problems : ${err.message}`));
    }

    function showGroup(optiongroup){
        console.log(optiongroup.multiple);
        const newParam = window.location.search;
        const newhref = window.location.href;
        console.log(newhref);
        const goreview = document.querySelector('goreview');
        const reviewgobutton = document.createElement('a');
        const goreviewhref = 'http://127.0.0.1:5000/5?id=' + id;
        
        const optionsection = document.createElement('section');
        const choicetitlewrap = document.createElement('div');
        const choicetitle = document.createElement('div');
        const choicename = document.createElement('div');
        const choiceprice = document.createElement('div');
        const para_choice = document.createElement('p');
        const para_choicename = document.createElement('p');
        const para_chocieprice = document.createElement('p');
        const choiceparawrap = document.createElement('div');
        const optiongroup_menuid = optiongroup.name;
        const option_label = document.createElement('label');
        const option_input = document.createElement('input');

        const para_total = document.createElement('p');
        reviewgobutton.setAttribute('class','reviewgobutton');
        reviewgobutton.setAttribute('href',goreviewhref);
        console.log(optiongroup.name);
        console.log(optiongroup.subchoices);
        choicetitlewrap.setAttribute('class','choicetitlewrap');
        option_label.setAttribute('class','choiceparawrap' );
        choicename.setAttribute('class','choicename');
        choicetitle.setAttribute('class','choicetitle');
        choiceprice.setAttribute('class','choiceprice');
        para_choicename.setAttribute('class', 'para_choicename');
        para_chocieprice.setAttribute('class','para_choiceprice');
        para_choice.setAttribute('class', 'para_choice');
        option_input.setAttribute('type','radio');
        option_input.setAttribute('menuid',optiongroup_menuid);
        optionsection.setAttribute('class',' optionsection');


      para_choice.textContent = `${optiongroup.name}`;
        console.log(optiongroup);
      if (optiongroup.multiple == true && optiongroup.multiple_count >= 1){
        para_choice.textContent += `[추가옵션가능] `;  
    } else {
        para_choice.textContent +=   ``;
    
        }

    for (let i = 0; i<optiongroup.subchoices.length; i++){  
      
        if(optiongroup.multiple == true && optiongroup.multiple_count >= 1){
            optionsection.innerHTML  +=  `
            <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>

            <label id="${optiongroup.subchoices[i].name}"> 
            <div class='wrap_optionlabel'> 
            <div  class='wrap_optionlabelinput'> <input type="checkbox" class="btncheckbox" name="${optiongroup.name}" value="${optiongroup.subchoices[i].price}" id="${optiongroup.subchoices[i].name}">
            <div class='subchoicesname'> ${optiongroup.subchoices[i].name}  </div>
            </div>
            <span>${optiongroup.subchoices[i].price}원 </span></div>
            </label>
 
            `;  
        
        }else{
            optionsection.innerHTML  +=  `
            <script src="//code.jquery.com/jquery-1.11.0.min.js"></script>

            <label id="${optiongroup.subchoices[i].name}">  
            <div class='wrap_optionlabel'>
            <div class='wrap_optionlabelinput'>
            <input type="radio" class="btnradio" name="${optiongroup.name}" value="${optiongroup.subchoices[i].price}" id="${optiongroup.subchoices[i].name}">
            <div class='subchoicesname'> ${optiongroup.subchoices[i].name}</div>
          </div> 
           <span> ${optiongroup.subchoices[i].price}원 </span></div>
           </label>           
           `;
        }
    }
 
   

      choicemenu.appendChild(choicetitlewrap);  
      choicemenu.appendChild(choicename);
      choicename.appendChild( para_choicename);
      choicetitlewrap.appendChild(choicetitle);
      choicetitle.appendChild(para_choice);
    choicetitlewrap.appendChild(optionsection);
    optionsection.appendChild(   choiceparawrap);
    
 
     
    const gobasket = document.querySelector('gobasket')
    gobasket.setAttribute('class','gobasket');
    const checkoption = document.createElement('input');
checkoption.setAttribute('class','checkoption');
 const gobasketbutton = document.createElement('div');
 const gobaskethref = document.createElement('a');
 gobaskethref.setAttribute('href','./six.html');
 gobaskethref.setAttribute('class','gobaskethref');
 gobasketbutton.setAttribute('class','gobasketbutton');
    function btn_check() {
        const newParam = window.location.search;
        const newhref = window.location.href;
        console.log(newhref);
        const url = new URL(newhref);
        const urlParams2 = url.searchParams;
        const name = urlParams2.get('name');
        console.log(name);
        const price = urlParams2.get('price');
        console.log(price);
        var ckb = document.getElementsByClassName("btncheckbox");
        var ckr = document.getElementsByClassName("btnradio");
        checkoption.setAttribute('type','button');
      
        gobasketbutton.onclick = function(){ 
            let totalsum = 0;
            let totalcount = 0 ;
            let checkboxtotal = 0;
            let checkboxcount = 0;
        let checkboxname = '';
        let radioname = '';
            const totalname = document.createElement('span');
            for( var v = 0; v < ckb.length; v++){
                if(ckb[v].checked == true){
          console.log(ckb[v].id);
          checkboxname += `${ckb[v].id}` 
               checkboxtotal += parseInt(ckb[v].value);
               checkboxcount += 1 ;
            }
        }
      //  checkboxtotal = checkboxtotal.toLocaleString();
    //    console.log(checkboxtotal);
     //   console.log(checkboxcount);

        let radiototal = 0;
        let radiocount = 0;
        for( var r = 0; r < ckr.length; r++){
            if(ckr[r].checked == true){
         console.log(ckr[r].id);
         radioname += `${ckr[r].id}`
           radiototal += parseInt(ckr[r].value);
           radiocount += 1 ;
        }
    }
  //  radiototal = radiototal.toLocaleString();
//    console.log(radiototal);
//    console.log(radiocount);
console.log(radioname);
const parseprice = parseInt(price)
 
totalname.textContent += `${checkboxname} `;
const spantotalname = totalname.textContent
   const spantotalcount = checkboxcount + radiocount;
   const spantotalsum = checkboxtotal + radiototal + parseprice;
    console.log(spantotalname);
    console.log(spantotalsum);
    console.log(spantotalcount);
console.log(checkboxname);
window.localStorage.setItem('price', spantotalsum);
window.localStorage.setItem('menu',spantotalname);
window.localStorage.setItem('menu1',checkboxname);
window.localStorage.setItem('radioname',radioname);
window.localStorage.setItem('checkboxname',checkboxname);
    }
    
    const priceupdown = document.querySelector('priceupdown');

    const changenum = document.createElement('div');
    const para_num = document.createElement('span');
    const upbutton = document.createElement('input');
    const downbutton = document.createElement('input');
    const resultElement = document.createElement('div');
    upbutton.setAttribute('class','upbutton');
    upbutton.setAttribute('type','button');
    downbutton.setAttribute('type','button');
    downbutton.setAttribute('class','downbutton');
    para_num.textContent += `${totalsum}`; 
    priceupdown.appendChild(changenum);
    changenum.appendChild(upbutton);
    changenum.appendChild(resultElement);
    changenum.appendChild(downbutton);
    changenum.appendChild(para_num);
        return ;
    }
 
    gobasket.appendChild(checkoption);

    gobasket.appendChild(gobaskethref);
    gobaskethref.appendChild(gobasketbutton);
    btn_check()
    }
   
  
    const urlParams2 = url.searchParams;
    const name = urlParams2.get('name');
    console.log(name);
    const price = urlParams2.get('price');
   //   console.log(price);
   const group = urlParams2.get('group');
   console.log(group);
   window.localStorage.setItem('foodname',name);
    const storetitle =document.querySelector('storetitle');
    const foodname = document.createElement('div');
    const foodprice = document.createElement('div');
    const para_foodname = document.createElement('p');
    const para_foodprice = document.createElement('p');
    const foodimg = document.querySelector('foodimg');
    const divfoodimg = document.createElement('img');
    divfoodimg.setAttribute('class','foodimg'); 
    const num = urlParams.get('num');
    const goreview = document.querySelector('goreview');
    const reviewgobutton = document.createElement('a');
    const goreviewhref = './Five.html?id=' + id;
    const goreviewdiv = document.createElement('div');

    reviewgobutton.setAttribute('href',goreviewhref);
    reviewgobutton.setAttribute('class','reviewgobutton');

    ///
    const photoimg = 'foodimghrefsrc' + num;
    console.log(photoimg);
    const foodimgsrc = window.localStorage.getItem(photoimg);
 console.log(foodimgsrc);
    if(group==1){
    divfoodimg.setAttribute('src',foodimgsrc);
    }

    const topimg = 'foodimghref2src' + num;
    console.log(topimg);
    const foodimgsrc2 = window.localStorage.getItem(topimg);
 
   console.log(foodimgsrc2);
    if(group==2){
    divfoodimg.setAttribute('src',foodimgsrc2);
    }
 //
 
 const Oneimg = 'foodimghref3src' + num;
 console.log(Oneimg);
 const foodimgsrc3 = window.localStorage.getItem(Oneimg);

console.log(foodimgsrc3);
 if(group==3){
 divfoodimg.setAttribute('src',foodimgsrc3);
 }
 //

 const otherimg = 'foodimghref4src' + num;
 console.log(otherimg);
 const foodimgsrc4 = window.localStorage.getItem(otherimg);

console.log(foodimgsrc4);
 if(group==4){
 divfoodimg.setAttribute('src',foodimgsrc4);
 }
 

 console.log(foodimgsrc)
 
    goreviewdiv.setAttribute('class','goreviewdiv');
    para_foodname.textContent =` ${name} `;
    para_foodprice.textContent =`${price}원`;
    storetitle.setAttribute ('class','storetitle');
    foodname.setAttribute('class','foodname');
    foodprice.setAttribute('class','foodprice');
    goreviewdiv.textContent = `리뷰`;
    storetitle.appendChild(foodname);
    storetitle.appendChild( foodprice);
 goreview.setAttribute('class','goreview');
 

    foodname.appendChild(para_foodname);
    foodprice.appendChild(para_foodprice);
    goreview.appendChild(reviewgobutton);
  reviewgobutton.appendChild(goreviewdiv);


  if(foodimgsrc2 == null ||  foodimgsrc== null
    ||    foodimgsrc3 == null ||  foodimgsrc4 == null){
        divfoodimg = '';;
}  else( foodimg.append(divfoodimg))
   
     
const gobasket = document.querySelector('gobasket')
gobasket.setAttribute('class','gobasket');
 
const gobasketbutton2 = document.createElement('div');
const gobaskethref = document.createElement('a');
gobaskethref.setAttribute('href', 'http://127.0.0.1:5000/6');
gobaskethref.setAttribute('class','gobaskethref');
gobasketbutton2.setAttribute('class','gobasketbutton2');
 
gobasket.appendChild(gobaskethref);
gobaskethref.appendChild(gobasketbutton2);
     
     console.log(newhref);
 

}  
   


