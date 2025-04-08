const list4 = [];
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
    const Othermenu = document.querySelector('Othermenu');
    const Othermenuhead = document.querySelector('Othermenuhead');
    const MenuGroupBtn = document.querySelector('button');
    const json2 = JSON.stringify(dataset);
  //  //console.log(json2)
    window.sessionStorage.setItem("tt3",json2);
    const Lode_json3 = window.sessionStorage.getItem("tt3");

    //음식 메뉴 그룹 카테고리에 관해서 전부 받는다.


    const PhotoMenuItems_title = dataset[0].name;
    const Top10_title = dataset[1].name;
    const Oneorder_title = dataset[2].name;
    const Other_title = dataset[3].name;

    //음식 메뉴 그룹 카테고리
    //console.log(dataset.name)
    //console.log("title", Other_title)

    const Othermenuheadwrap = document.createElement('div');
    const Othermenuheading = document.createElement('p');
    Othermenuhead.setAttribute('class', 'Othermenuhead');
    Othermenuheading.textContent = `${Other_title}`;
    Othermenuheadwrap.setAttribute('class', 'Othermenuheadwrap');
    Othermenuheading.setAttribute('class', 'Othermenuheading');
    Othermenuhead.appendChild(Othermenuheadwrap);
    Othermenuheadwrap.appendChild(Othermenuheading);

    const OtherGroup_info = dataset[3];
    //console.log("groupinfo", OtherGroup_info);

    const PhotoMenuItemsGroup = dataset[0].items;
    const Top10ItemsGroup = dataset[1].items;
    const OneorderItemsGroup = dataset[2].items;
    const OtherItemsGroup = dataset[3].items;

    //나머지 메뉴카테고리 중 첫번째 음식메뉴 그룹 전체
    //console.log("group", OtherItemsGroup);


    const OtherItem_id = dataset[3].items[0].id;

    //나머지 메뉴카테고리 중 첫번째 음식메뉴 id
    //console.log("id", OtherItem_id);

    const OtherItem_price = dataset[3].items[0].price;

    //나머지 메뉴카테고리 중 첫번째 음식메뉴 가격

    //console.log("price", OtherItem_price);

    let PhotoMenuGroup_title;
    let PhotoMenuGroup_info;
    let PhotoMenu_id;
    let PhotoMenu_name;
    let PhotoMenu_price;


    let Top10MenuGroup_title;
    let Top10MenuGroup_info;
    let Top10Menu_id;
    let Top10Menu_name;
    let Top10Menu_price;


    let Oneorder_MenuGroup_title;
    let Oneorder_MenuGroup_info;
    let Oneorder_Menu_id;
    let Oneorder_Menu_name;
    let Oneorder_Menu_price;

    let Other_MenuGroup_title;
    let Other_MenuGroup_info;
    let Other_Menu_id;
    let Other_Menu_name;
    let Other_Menu_price;


    let Other_MenuGroup;
    let PhotoMenuGroup;
    let Top10MenuGroup;
    let Oneorder_MenuGroup;


    PhotoMenuGroup = PhotoMenuItemsGroup;
    Top10MenuGroup = Top10ItemsGroup;
    Oneorder_MenuGroup = OneorderItemsGroup;
    Other_MenuGroup = OtherItemsGroup;

    update_menugroupDisplay();

    PhotoMenuGroup = [];
    Top10MenuGroup = [];
    Oneorder_MenuGroup = [];
    Other_MenuGroup = [];

 
    function Function_MenuGroup(e) {
        e.preventDefault();
        list4 = [];
        PhotoMenuGroup = [];
        Top10MenuGroup = [];
        Oneorder_MenuGroup = [];
        Other_MenuGroup = [];
    }

    function update_menugroupDisplay() {
        while (Othermenu.firstChild) {
            Othermenu.removeChild(Othermenu.firstChild);
        }
        let i = 0;
        for (const othersgroup of Other_MenuGroup) {
            fetchBlob(othersgroup, i);
            i = i + 1;
        }
        const photoarray = JSON.stringify(list4);
        //console.log(list4);
        window.localStorage.setItem("LIST4", list4);

        window.localStorage.setItem("foodimghref4", photoarray);

    }

    function fetchBlob(othersgroup, i) {
        const othersgroupurl = `/`;
        //console.log(othersgroupurl);
        fetch(othersgroupurl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.blob();
            })
            .then(othersgroup_id => showGroup(othersgroup, i))
            .catch(err => console.log(`Fetch problems : ${err.message}`));
    }

    function showGroup(othersgroup, i) {
        //console.log(othersgroup);
        //console.log(othersgroup.id);
        //console.log(othersgroup.name);
        //console.log(othersgroup.price);
        //console.log(othersgroup.image);

        //console.log(othersgroup.review_count);
        //console.log(othersgroup.section);
        const othersimagesrc = othersgroup.image;


        const othersimage = document.createElement('img');
        othersimage.setAttribute('src', othersimagesrc);
        othersimage.setAttribute('class', 'othersimage');
        const textt = 'foodimghref4src' + i;
        const textt2 = 'foodimghref4' + i;
        window.localStorage.setItem(textt, othersimagesrc);
        window.localStorage.setItem(textt2, othersgroup.original_image);



        //console.log(othersimagesrc);
        if (othersimagesrc === undefined) {
            const othersimage = document.createElement('span');

            othersimage.setAttribute('src', othersimagesrc);
            othersimage.setAttribute('class', 'othersimage');
        }

        othersimage.setAttribute('src', othersimagesrc);
        othersimage.setAttribute('class', 'othersimage');



        const othersgroup_id = othersgroup.id;

        const section = document.createElement('section');

        const section_menuheading = document.createElement('section');

        const section_othersgroup = document.createElement('section');
        const para_othername = document.createElement('p');
        const para_otherprice = document.createElement('p');
        const para_otherreview = document.createElement('p');

        const boxwrap_othersgroup = document.createElement('div');
        const textbox_othersgroup = document.createElement('div');
        const imagebox_othersgroup = document.createElement('div');
        const line1_othersgroup = document.createElement('div');
        const line2_othersgroup = document.createElement('div');

        const primaryURL_othersgroup = document.createElement('a');

        section_menuheading.setAttribute('class', 'section_menuheading');

        para_othername.setAttribute('class', 'othersgroup');
        line1_othersgroup.setAttribute('class', 'line1_othersgroup');
        imagebox_othersgroup.setAttribute('class', 'imagebox_group');
        boxwrap_othersgroup.setAttribute('class', ' boxwrap_group');
        section_othersgroup.setAttribute('id', othersgroup.id);
        textbox_othersgroup.setAttribute('class', 'textbox_group');

        para_othername.setAttribute('class', 'foodname');
        para_otherprice.setAttribute('class', 'min_price');
        para_otherreview.setAttribute('class', 'reviewcount');

        const newParam = window.location.search;
        const newhref = window.location.href;

        const url = new URL(newhref);
        const urlParams = url.searchParams;
        const id = urlParams.get('id');
        //console.log(id);
        // text > &group='번호' >> 장바구니 사진 선택
        const text = 'http://127.0.0.1:5000/4?id=' + id + '&group=' + 4 + '&menu=' + othersgroup_id + '&name=' + othersgroup.name + '&price=' + othersgroup.price + '&num=' + i;

        //console.log(dataset[3].name);
        primaryURL_othersgroup.setAttribute('class', 'primaryURL_othersgroup');

        primaryURL_othersgroup.setAttribute('href', text);


        para_othername.textContent = `${othersgroup.name}`;
        para_otherprice.textContent = `₩ ${othersgroup.price}`;
        para_otherreview.textContent = `리뷰 (${othersgroup.review_count})`


        //  menuhead.append(menuheading);
        Othermenu.appendChild(primaryURL_othersgroup);


        primaryURL_othersgroup.appendChild(section_othersgroup);
        section_othersgroup.appendChild(boxwrap_othersgroup);
        boxwrap_othersgroup.appendChild(textbox_othersgroup);
        boxwrap_othersgroup.appendChild(imagebox_othersgroup);

        textbox_othersgroup.appendChild(para_othername);

        textbox_othersgroup.appendChild(para_otherreview);
        textbox_othersgroup.appendChild(para_otherprice);
        if (othersimagesrc == undefined) {
            othersimage = '';
        } else {
            imagebox_othersgroup.appendChild(othersimage);
        }
    }

}