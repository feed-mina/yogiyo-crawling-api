
const list2 = [];
const newParam = window.location.search;
const newhref = window.location.href;
//console.log(newhref);
const url = new URL(newhref);
const urlParams = url.searchParams;
const id = urlParams.get('id');

//console.log(id);



async function fetchapi(id) {
    const yogiyoUrl = `http://52.53.244.181:80/5000?id=${id}`
    //   
    ""
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

    //console.log(json);

    return json;
};
fetchapi(id).then(json => initialize(json));
fetchapi(id)
    .catch(err => console.error(`Fetch problem: ${err.message}`));


// sets up the app logic, declares required variables, contains all the other functions
function initialize(dataset) {
    //console.log(dataset) 
    const MenuGroupBtn = document.querySelector('button');

    const Top10menu = document.querySelector('Top10menu');
    const Top10menuhead = document.querySelector('Top10menuhead');

    const json2 = JSON.stringify(dataset);
  //  //console.log(json2)
    window.sessionStorage.setItem("tt2",json2);
    const Lode_json2 = window.sessionStorage.getItem("tt2");

    //음식 메뉴 그룹 카테고리에 관해서 전부 받는다.
    //console.log(dataset) 

    const Top10_title = dataset[1].name;


    //음식 메뉴 그룹 카테고리

    //console.log("title",Top10_title)

    const Top10menuheadwrap = document.createElement('div');
    const Top10menuheading = document.createElement('p');
    Top10menuhead.setAttribute('class', 'Top10menuhead');
    Top10menuheading.textContent = `${Top10_title}`;
    Top10menuheadwrap.setAttribute('class', 'Top10menuheadwrap');
    Top10menuheading.setAttribute('class', 'Top10menuheading');
    Top10menuhead.appendChild(Top10menuheadwrap);
    Top10menuheadwrap.appendChild(Top10menuheading);

    const Top10Group_info = dataset[1];

    //console.log("groupinfo", Top10Group_info);

    const Top10ItemsGroup = dataset[1].items;


    //나머지 메뉴카테고리 중 첫번째 음식메뉴 그룹 전체
    //console.log("group",Top10ItemsGroup);

    const Top10Item_id = dataset[1].items[0].id;

    //나머지 메뉴카테고리 중 첫번째 음식메뉴 id
    //console.log("id",Top10Item_id);

    const Top10Item_price = dataset[1].items[0].price;


    //나머지 메뉴카테고리 중 첫번째 음식메뉴 가격

    //console.log("price",Top10Item_price);

    let Top10MenuGroup_title;
    let Top10MenuGroup_info;
    let Top10Menu_id;
    let Top10Menu_name;
    let Top10Menu_price;



    let Other_MenuGroup;
    let PhotoMenuGroup;
    let Top10MenuGroup;
    let Oneorder_MenuGroup;



    Top10MenuGroup = Top10ItemsGroup;


    update_Top10menugroupDisplay();


    Top10MenuGroup = [];


 
    function Function_MenuGroup(e) {
        e.preventDefault();
        list2 = [];
        PhotoMenuGroup = [];
        Top10MenuGroup = [];
        Oneorder_MenuGroup = [];
        Other_MenuGroup = [];
    }


    function update_Top10menugroupDisplay() {
        while (Top10menu.firstChild) {
            Top10menu.removeChild(Top10menu.firstChild);
        }
        let i = 0;
        for (const Top10group of Top10MenuGroup) {
            fetchBlob(Top10group, i);
            i = i + 1;
        }
        const photoarray = JSON.stringify(list2);
       // console.log(list2);
        window.localStorage.setItem("LIST2", list2);

        window.localStorage.setItem("foodimghref2", photoarray);

    }



    function fetchBlob(Top10group, i) {
        const Top10groupurl = `/ `;
        fetch(Top10groupurl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.blob();
            })
            .then(Top10group_id => showGroup(Top10group, i))
            .catch(err => console.log(`Fetch problems : ${err.message}`));
    }

    function showGroup(Top10group, i) {
        //console.log(Top10group);
        //console.log(Top10group.id);
        //console.log(Top10group.name);
        //console.log(Top10group.price);
        //console.log(Top10group.image);
        //console.log(Top10group.review_count);
        //console.log(Top10group.section);
        const Top10groupimagesrc = Top10group.image;

        if (typeof Top10groupimagesrc == "string") {
          // console.log(Top10groupimagesrc);
        }

        const Top10groupimage = document.createElement('img');
        Top10groupimage.setAttribute('src', Top10groupimagesrc);
        Top10groupimage.setAttribute('class', 'Top10groupimage');
        const textt = 'foodimghref2src' + i;
        const textt2 = 'foodimghref2' + i;
        window.localStorage.setItem(textt, Top10groupimagesrc);
        window.localStorage.setItem(textt2, Top10group.original_image);
        const Top10group_id = Top10group.id;

        const section = document.createElement('section');

        const section_menuheading = document.createElement('section');
        const para_Top10name = document.createElement('p');
        const para_Top10price = document.createElement('p');
        const para_Top10review = document.createElement('p');

        const section_Top10group = document.createElement('section');

        const boxwrap_Top10group = document.createElement('div');
        const textbox_Top10group = document.createElement('div');
        const imagebox_Top10group = document.createElement('div');
        const line1_Top10group = document.createElement('div');
        const line2_Top10group = document.createElement('div');

        const primaryURL_Top10group = document.createElement('a');

        section_menuheading.setAttribute('class', 'section_menuheading');


        line1_Top10group.setAttribute('class', 'line1_Top10group');
        imagebox_Top10group.setAttribute('class', 'imagebox_group');
        boxwrap_Top10group.setAttribute('class', ' boxwrap_group');
        section_Top10group.setAttribute('id', Top10group.id);
        textbox_Top10group.setAttribute('class', 'textbox_group');

        para_Top10name.setAttribute('class', 'foodname');
        para_Top10price.setAttribute('class', 'min_price');
        para_Top10review.setAttribute('class', 'reviewcount');


        primaryURL_Top10group.setAttribute('class', 'primaryURL_Top10group');
        const newhref = window.location.href;

        const url = new URL(newhref);
        const urlParams = url.searchParams;
        const id = urlParams.get('id');
        //console.log(id);
        const text = 'http://127.0.0.1:5000/4?id=' + id + '&group=' + 2 + '&menu=' + Top10group_id + '&name=' + Top10group.name + '&price=' + Top10group.price + '&num=' + i;


        primaryURL_Top10group.setAttribute('href', text);



        para_Top10name.textContent = `${Top10group.name}`;
        para_Top10price.textContent = `₩ ${Top10group.price}`;
        para_Top10review.textContent = `리뷰 (${Top10group.review_count})`


        //  menuhead.append(menuheading);
        Top10menu.appendChild(primaryURL_Top10group);
        //console.log(Top10groupimage);


        primaryURL_Top10group.appendChild(section_Top10group);
        section_Top10group.appendChild(boxwrap_Top10group);
        boxwrap_Top10group.appendChild(textbox_Top10group);
        boxwrap_Top10group.appendChild(imagebox_Top10group);

        textbox_Top10group.appendChild(para_Top10name);

        textbox_Top10group.appendChild(para_Top10review);
        textbox_Top10group.appendChild(para_Top10price);
        if (Top10groupimagesrc == undefined) {
            Top10groupimage = '';
        } else {
            imagebox_Top10group.appendChild(Top10groupimage);
        }

    }

}