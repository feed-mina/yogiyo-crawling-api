const list3 = [];
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
    const json2 = JSON.stringify(dataset);
  //  //console.log(json2)
    window.sessionStorage.setItem("tt1",json2);

    const Lode_json = window.sessionStorage.getItem("tt1");
    const MenuGroupBtn = document.querySelector('button');
    
    //console.log(JSON.parse(Lode_json));


    const Onemenu = document.querySelector('Onemenu');
    const Onemenuhead = document.querySelector('Onemenuhead');

    //음식 메뉴 그룹 카테고리에 관해서 전부 받는다.
    //console.log(dataset)

    const PhotoMenuItems_title = dataset[0].name;
    const Top10_title = dataset[1].name;
    const Oneorder_title = dataset[2].name;
    const Other_title = dataset[3].name;

    //음식 메뉴 그룹 카테고리

    //console.log("title", Oneorder_title)

    const Onemenuheadwrap = document.createElement('div');
    const Onemenuheading = document.createElement('p');
    Onemenuhead.setAttribute('class', 'Onemenuhead');
    Onemenuheading.textContent = `${Oneorder_title}`;
    Onemenuheadwrap.setAttribute('class', 'Onemenuheadwrap');
    Onemenuheading.setAttribute('class', 'Onemenuheading');
    Onemenuhead.appendChild(Onemenuheadwrap);
    Onemenuheadwrap.appendChild(Onemenuheading);

    const PhotoMenuItemsGroup_info = dataset[0];
    const Top10Group_info = dataset[1];
    const OneorderGroup_info = dataset[2];
    const OtherGroup_info = dataset[3];
    //console.log("groupinfo", OtherGroup_info);

    const PhotoMenuItemsGroup = dataset[0].items;
    const Top10ItemsGroup = dataset[1].items;
    const OneorderItemsGroup = dataset[2].items;
    const OtherItemsGroup = dataset[3].items;

    //나머지 메뉴카테고리 중 첫번째 음식메뉴 그룹 전체
    //console.log("group", Top10ItemsGroup);


    const PhotoMenuItem_id = dataset[0].items[0].id;
    const Top10Item_id = dataset[1].items[0].id;
    const OneorderItem_id = dataset[2].items[0].id;
    const OtherItem_id = dataset[3].items[0].id;

    //나머지 메뉴카테고리 중 첫번째 음식메뉴 id
    //console.log("id", OtherItem_id);

    const PhotoMenuItem_price = dataset[0].items[0].price;
    const Top10Item_price = dataset[1].items[0].price;
    const OneorderItem_price = dataset[2].items[0].price;
    const OtherItem_price = dataset[3].items[0].price;

    //나머지 메뉴카테고리 중 첫번째 음식메뉴 가격

    //console.log("price", OtherItem_price);


    let Oneorder_MenuGroup_title;
    let Oneorder_MenuGroup_info;
    let Oneorder_Menu_id;
    let Oneorder_Menu_name;
    let Oneorder_Menu_price;

    let Other_MenuGroup;
    let PhotoMenuGroup;
    let Top10MenuGroup;
    let Oneorder_MenuGroup;


    PhotoMenuGroup = PhotoMenuItemsGroup;
    Top10MenuGroup = Top10ItemsGroup;
    Oneorder_MenuGroup = OneorderItemsGroup;
    Other_MenuGroup = OtherItemsGroup;


    update_OnemenugroupDisplay();

    Oneorder_MenuGroup = [];

   // MenuGroupBtn.addEventListener('click', Function_MenuGroup);

    function Function_MenuGroup(e) {
        e.preventDefault();
        list3 = [];
        PhotoMenuGroup = [];
        Top10MenuGroup = [];
        Oneorder_MenuGroup = [];
        Other_MenuGroup = [];
    }

    function update_OnemenugroupDisplay() {
        while (Onemenu.firstChild) {
            Onemenu.removeChild(Onemenu.firstChild);
        }
        let i = 0;
        for (const Onegroup of Oneorder_MenuGroup) {
            fetchBlob(Onegroup, i);
            i = i + 1;
        }
        const photoarray = JSON.stringify(list3);
        //console.log(list3);
        window.localStorage.setItem("LIST3", list3);

        window.localStorage.setItem("foodimghref3", photoarray);
    }




    function fetchBlob(Onegroup, i) {
        const Onegroupurl = `/ `;
        fetch(Onegroupurl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.blob();
            })
            .then(Onegroup_id => showGroup(Onegroup, i))
            .catch(err => console.log(`Fetch problems : ${err.message}`));
    }

    function showGroup(Onegroup, i) {
        //console.log(Onegroup);
        //console.log(Onegroup.id);
        //console.log(Onegroup.name);
        //console.log(Onegroup.price);
        //console.log(Onegroup.image);
        //console.log(Onegroup.review_count);
        //console.log(Onegroup.section);
        const Onegroupimagesrc = Onegroup.image;


        if (typeof Onegroupimagesrc == "string") {
            //console.log(Onegroupimagesrc);
        }

        const Onegroupimage = document.createElement('img');
        Onegroupimage.setAttribute('src', Onegroupimagesrc);
        Onegroupimage.setAttribute('class', 'Onegroupimage');
        const textt = 'foodimghref3src' + i;
        const textt2 = 'foodimghref3' + i;
        window.localStorage.setItem(textt, Onegroupimagesrc);
        window.localStorage.setItem(textt2, Onegroup.original_image);
        const Onegroup_id = Onegroup.id;

        const section = document.createElement('section');

        const section_menuheading = document.createElement('section');

        const section_Onegroup = document.createElement('section');
        const para_othername = document.createElement('p');
        const para_otherprice = document.createElement('p');
        const para_otherreview = document.createElement('p');

        const boxwrap_Onegroup = document.createElement('div');
        const textbox_Onegroup = document.createElement('div');
        const imagebox_Onegroup = document.createElement('div');
        const line1_Onegroup = document.createElement('div');
        const line2_Onegroup = document.createElement('div');

        const primaryURL_Onegroup = document.createElement('a');

        section_menuheading.setAttribute('class', 'section_menuheading');

        para_othername.setAttribute('class', 'Onegroup');
        line1_Onegroup.setAttribute('class', 'line1_Onegroup');
        imagebox_Onegroup.setAttribute('class', 'imagebox_group');
        boxwrap_Onegroup.setAttribute('class', ' boxwrap_group');
        section_Onegroup.setAttribute('id', Onegroup.id);
        textbox_Onegroup.setAttribute('class', 'textbox_group');

        para_othername.setAttribute('class', 'foodname');
        para_otherprice.setAttribute('class', 'min_price');
        para_otherreview.setAttribute('class', 'reviewcount');


        primaryURL_Onegroup.setAttribute('class', 'primaryURL_Onegroup');

        const newhref = window.location.href;

        const url = new URL(newhref);
        const urlParams = url.searchParams;
        const id = urlParams.get('id');
        //console.log(id);
        const text = 'http://127.0.0.1:5000/4?id=' + id + '&group=' + 3 + '&menu=' + Onegroup_id + '&name=' + Onegroup.name + '&price=' + Onegroup.price + '&num=' + i;

        primaryURL_Onegroup.setAttribute('href', text);




        para_othername.textContent = `${Onegroup.name}`;
        para_otherprice.textContent = `${Onegroup.price}`;
        para_otherreview.textContent = `리뷰 (${Onegroup.review_count})`


        //  menuhead.append(menuheading);
        Onemenu.appendChild(primaryURL_Onegroup);


        primaryURL_Onegroup.appendChild(section_Onegroup);
        section_Onegroup.appendChild(boxwrap_Onegroup);
        boxwrap_Onegroup.appendChild(textbox_Onegroup);
        boxwrap_Onegroup.appendChild(imagebox_Onegroup);

        textbox_Onegroup.appendChild(para_othername);

        textbox_Onegroup.appendChild(para_otherreview);
        textbox_Onegroup.appendChild(para_otherprice);

        if (Onegroupimagesrc == undefined) {
            Onegroupimage = '';
        } else {
            imagebox_Onegroup.appendChild(Onegroupimage);
        }
    }

}