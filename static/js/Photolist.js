
const list = [];


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
    const Photomenu = document.querySelector('Photomenu');
    const Photomenuhead = document.querySelector('Photomenuhead');
    const json2 = JSON.stringify(dataset);
  //  //console.log(json2)
    window.sessionStorage.setItem("tt4",json2);
    const Lode_json4 = window.sessionStorage.getItem("tt4");


    //음식 메뉴 그룹 카테고리에 관해서 전부 받는다.
    //console.log(dataset)

    const Photo_title = dataset[0].name;


    //음식 메뉴 그룹 카테고리

    //console.log("title", Photo_title)

    const Photomenuheadwrap = document.createElement('div');
    const Photomenuheading = document.createElement('p');
    Photomenuhead.setAttribute('class', 'Photomenuhead');
    Photomenuheading.textContent = `${Photo_title}`;
    Photomenuheadwrap.setAttribute('class', 'Photomenuheadwrap');
    Photomenuheading.setAttribute('class', 'Photomenuheading');
    Photomenuhead.appendChild(Photomenuheading);


    const PhotoGroup_info = dataset[0];

    //console.log("groupinfo", PhotoGroup_info);

    const PhotoMenuItemsGroup = dataset[0].items;

    //나머지 메뉴카테고리 중 첫번째 음식메뉴 그룹 전체
    //console.log("group", PhotoMenuItemsGroup);

    const PhotoItem_id = dataset[0].items[0].id;

    //나머지 메뉴카테고리 중 첫번째 음식메뉴 id
    //console.log("id", PhotoItem_id);

    const PhotoItem_price = dataset[0].items[0].price;


    //나머지 메뉴카테고리 중 첫번째 음식메뉴 가격

    //console.log("price", PhotoItem_price);

    let PhotoMenuItems_title;
    let PhotoMenuItems_info;
    let PhotoMenu_id;
    let PhotoMenu_name;
    let PhotoMenu_price;

    let PhotoMenuGroup;

    PhotoMenuGroup = PhotoMenuItemsGroup;


    update_PhotomenugroupDisplay();


    PhotoMenuGroup = [];


    function Function_MenuGroup(e) {
        e.preventDefault();
        list = [];
        PhotoMenuGroup = [];
        Oneorder_MenuGroup = [];
        Other_MenuGroup = [];
    }


    function update_PhotomenugroupDisplay() {
        while (Photomenu.firstChild) {
            Photomenu.removeChild(Photomenu.firstChild);
        }
        let i = 0;
        for (const Photogroup of PhotoMenuGroup) {
            fetchBlob(Photogroup, i);
            i = i + 1;
        }
        // for 문 let json 으로 바꾸기
        const photoarray = JSON.stringify(list);
        //console.log(list);
        window.localStorage.setItem("LIST", list);

        window.localStorage.setItem("foodimghref", photoarray);
    }



    function fetchBlob(Photogroup, i) {
        const Photogroupurl = `/ `;
        fetch(Photogroupurl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.blob();
            })
            .then(Photogroup_id => showGroup(Photogroup, i))
            .catch(err => console.log(`Fetch problems : ${err.message}`));
    }

    function showGroup(Photogroup, i) {
        //console.log(Photogroup);
        //console.log(Photogroup.id);
        //console.log(Photogroup.name);
        //console.log(Photogroup.price);
        //console.log(Photogroup.image);
        //console.log(Photogroup.review_count);
        //console.log(Photogroup.section);
        //console.log(Photogroup.original_image);
        const Photogroupimagesrc = Photogroup.image;

        if (typeof Photogroupimagesrc == "string") {
            //console.log(Photogroupimagesrc);
        }

        const Photogroupimage = document.createElement('img');
        Photogroupimage.setAttribute('src', Photogroupimagesrc);
        Photogroupimage.setAttribute('alt', '');
        Photogroupimage.setAttribute('class', 'Photogroupimage');
        const textt = 'foodimghrefsrc' + i;
        const textt2 = 'foodimghref' + i;
        window.localStorage.setItem(textt, Photogroupimagesrc);
        window.localStorage.setItem(textt2, Photogroup.original_image);

        const Photogroup_id = Photogroup.id;
        //console.log(Photogroup_id);
        const section = document.createElement('section');

        const section_menuheading = document.createElement('section');
        const para_Photoname = document.createElement('p');
        const para_Photoprice = document.createElement('p');
        const para_Photoreview = document.createElement('p');

        const section_Photogroup = document.createElement('section');

        const boxwrap_Photogroup = document.createElement('div');
        const textbox_Photogroup = document.createElement('div');
        const imagebox_Photogroup = document.createElement('div');
        const line1_Photogroup = document.createElement('div');
        const line2_Photogroup = document.createElement('div');

        const primaryURL_Photogroup = document.createElement('a');

        section_menuheading.setAttribute('class', 'section_menuheading');


        line1_Photogroup.setAttribute('class', 'line1_Photogroup');

        section_Photogroup.setAttribute('id', Photogroup.id);
        section_Photogroup.style.display = "flex";
        section_Photogroup.style.flexDirection = "column";
        section_Photogroup.style.paddingRight = "20px";

        boxwrap_Photogroup.setAttribute('class', ' boxwrap_photogroup');


        imagebox_Photogroup.setAttribute('class', 'imagebox_photogroup');

        textbox_Photogroup.setAttribute('class', 'textbox_photogroup');

        para_Photoname.setAttribute('class', 'photo_foodname');
        para_Photoprice.setAttribute('class', 'photo_min_price');
        para_Photoreview.setAttribute('class', 'photo_reviewcount');


        primaryURL_Photogroup.setAttribute('class', 'primaryURL_Photogroup');
        const newhref = window.location.href;

        const url = new URL(newhref);
        const urlParams = url.searchParams;
        const id = urlParams.get('id');
        //console.log(id);
        const text = 'http://127.0.0.1:5000/4?id=' + id + '&group=' + 1 + '&menu=' + Photogroup_id + '&name=' + Photogroup.name + '&price=' + Photogroup.price + '&num=' + i;


        primaryURL_Photogroup.setAttribute('href', text);


        //console.log(Photogroup_id);
        para_Photoname.textContent = `${Photogroup.name}`;
        para_Photoprice.textContent = `₩ ${Photogroup.price}`;
        para_Photoreview.textContent = `리뷰 (${Photogroup.review_count})`


        const Photo_price = para_Photoprice.textContent;

        //  menuhead.append(menuheading);
        Photomenu.appendChild(primaryURL_Photogroup);


        primaryURL_Photogroup.appendChild(section_Photogroup);
        section_Photogroup.appendChild(boxwrap_Photogroup);
        boxwrap_Photogroup.appendChild(imagebox_Photogroup);
        boxwrap_Photogroup.appendChild(textbox_Photogroup);
        imagebox_Photogroup.appendChild(Photogroupimage);

        textbox_Photogroup.appendChild(para_Photoname);

        textbox_Photogroup.appendChild(para_Photoreview);
        textbox_Photogroup.appendChild(para_Photoprice);
        if (Photogroupimagesrc == undefined) {
            Photogroupimage = '';
        } else {
            imagebox_Photogroup.appendChild(Photogroupimage);
        }
    }

}

