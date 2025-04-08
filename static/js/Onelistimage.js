
function whereami(elt) {
    // 이 객체를 getCurrentPosition() 메서드의 세번째 인자로 전달한다.
    var options = {
        // 가능한 경우, 높은 정확도의 위치(예를 들어, GPS 등) 를 읽어오려면 true로 설정
        // 그러나 이 기능은 배터리 지속 시간에 영향을 미친다. 
        enableHighAccuracy: false, // 대략적인 값이라도 상관 없음: 기본값

        // 위치 정보가 충분히 캐시되었으면, 이 프로퍼티를 설정하자, 
        // 위치 정보를 강제로 재확인하기 위해 사용하기도 하는 이 값의 기본 값은 0이다.
        maximumAge: 30000,     // 5분이 지나기 전까지는 수정되지 않아도 됨

        // 위치 정보를 받기 위해 얼마나 오랫동안 대기할 것인가?
        // 기본값은 Infinity이므로 getCurrentPosition()은 무한정 대기한다.
        timeout: 15000    // 15초 이상 기다리지 않는다.
    }

    if (navigator.geolocation) // geolocation 을 지원한다면 위치를 요청한다. 
        navigator.geolocation.getCurrentPosition(success, error, options);
    else
        console.log("이 브라우저에서는 Geolocation이 지원되지 않습니다.");

    // geolocation 요청이 실패하면 이 함수를 호출한다.
    function error(e) {
        // 오류 객체에는 수치 코드와 텍스트 메시지가 존재한다.
        // 코드 값은 다음과 같다.
        // 1: 사용자가 위치 정보를 공유 권한을 제공하지 않음.
        // 2: 브라우저가 위치를 가져올 수 없음.
        // 3: 타임아웃이 발생됨.
        elt.innerHTML = "Geolocation 오류 " + e.code + ": " + e.message;
    }


    // geolocation 요청이 성공하면 이 함수가 호출된다.
    function success(pos) {

        console.log(pos); // [디버깅] Position 객체 내용 확인

        // 항상 가져올 수 있는 필드들이다. timestamp는 coords 객체 내부에 있지 않고, 
        // 외부에서 가져오는 필드라는 점에 주의하다. 
        var msg = "당신은 " +
            new Date(pos.timestamp).toLocaleString() + "에 " +
            " 위도 " + pos.coords.latitude +
            " 경도 " + pos.coords.longitude + "에서 " +
            " 약 " + pos.coords.accuracy + " 미터 떨어진 곳에 있습니다.";

        // 해당 기기가 고도 (altitude)를 반환하면, 해당 정보를 추가한다.
        if (pos.coords.altitude) {
            msg += " 당신은 해발 " + pos.coords.altitude + " ± " +
                pos.coords.altitudeAccuracy + " 미터에 있습니다.";
        }

        // 해당 기기가 속도와 북쪽 기준 각 (heading)을 반환한다면 역시 추가해준다.
        if (pos.coords.speed) {
            msg += " 당신은 " + pos.coords.heading + " 방향으로 " +
                "초속 " + pos.coords.speed + "(m/s)의 속도로 움직이고 있습니다.";
        }

        console.log(msg);     // 모든 위치 정보를 출력한다.
        const latitude = pos.coords.latitude;
        const longitude = pos = pos.coords.longitude;
        console.log(latitude);
        console.log(longitude);
        const newParam = window.location.search;
        const newhref = window.location.href;
        console.log(newhref);
        const url = new URL(newhref);
        const urlParams = url.searchParams;
        const id = urlParams.get('id');

        console.log(id);



        async function fetchapi(id) {
            const yogiyoUrl = `http://127.0.0.1:5000/5000?id=${id}`
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

            console.log(json);

            return json;
        };
        fetchapi(id).then(json => initialize(json));
        fetchapi(id)
            .catch(err => console.error(`Fetch problem: ${err.message}`));

    }
}

// 나의 위치정보를 출력할 객체 구하기
var elt = document.getElementById("myLocationInfo");
// 나의 위치정보 출력하기
whereami(elt);


// sets up the app logic, declares required variables, contains all the other functions
function initialize(dataset) {
    console.log(dataset)
    const MenuGroupBtn = document.querySelector('button');

    const Onemenu = document.querySelector('Onemenu');
    const Onemenuhead = document.querySelector('Onemenuhead');

    //음식 메뉴 그룹 카테고리에 관해서 전부 받는다.
    console.log(dataset)

    const PhotoMenuItems_title = dataset[0].name;
    const Top10_title = dataset[1].name;
    const Oneorder_title = dataset[2].name;
    const Other_title = dataset[3].name;

    //음식 메뉴 그룹 카테고리

    console.log("title", Oneorder_title)

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
    console.log("groupinfo", OtherGroup_info);

    const PhotoMenuItemsGroup = dataset[0].items;
    const Top10ItemsGroup = dataset[1].items;
    const OneorderItemsGroup = dataset[2].items;
    const OtherItemsGroup = dataset[3].items;

    //나머지 메뉴카테고리 중 첫번째 음식메뉴 그룹 전체
    console.log("group", Top10ItemsGroup);


    const PhotoMenuItem_id = dataset[0].items[0].id;
    const Top10Item_id = dataset[1].items[0].id;
    const OneorderItem_id = dataset[2].items[0].id;
    const OtherItem_id = dataset[3].items[0].id;

    //나머지 메뉴카테고리 중 첫번째 음식메뉴 id
    console.log("id", OtherItem_id);

    const PhotoMenuItem_price = dataset[0].items[0].price;
    const Top10Item_price = dataset[1].items[0].price;
    const OneorderItem_price = dataset[2].items[0].price;
    const OtherItem_price = dataset[3].items[0].price;

    //나머지 메뉴카테고리 중 첫번째 음식메뉴 가격

    console.log("price", OtherItem_price);


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

    MenuGroupBtn.addEventListener('click', Function_MenuGroup);

    function Function_MenuGroup(e) {
        e.preventDefault();

        PhotoMenuGroup = [];
        Top10MenuGroup = [];
        Oneorder_MenuGroup = [];
        Other_MenuGroup = [];
    }

    function update_OnemenugroupDisplay() {
        while (Onemenu.firstChild) {
            Onemenu.removeChild(Onemenu.firstChild);
        }
        for (const Onegroup of Oneorder_MenuGroup) {
            fetchBlob(Onegroup);
        }
    }




    function fetchBlob(Onegroup) {
        const Onegroupurl = `/ `;
        fetch(Onegroupurl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                return response.blob();
            })
            .then(Onegroup_id => showGroup(Onegroup))
            .catch(err => console.log(`Fetch problems : ${err.message}`));
    }

    function showGroup(Onegroup) {
        console.log(Onegroup);
        console.log(Onegroup.id);
        console.log(Onegroup.name);
        console.log(Onegroup.price);
        console.log(Onegroup.image);
        console.log(Onegroup.review_count);
        console.log(Onegroup.section);
        const Onegroupimagesrc = Onegroup.image;
        const Onegroupimage = document.createElement('img');
        Onegroupimage.setAttribute('src', Onegroupimagesrc);
        Onegroupimage.setAttribute('class', 'Onegroupimage');
        window.localStorage.setItem('foodimghref', Onegroupimage);
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
        console.log(id);

        const text = 'http://127.0.0.1:5000/4?id=' + id + '&menu=' + Onegroup_id + '&name=' + Onegroup.name + '&price=' + Onegroup.price;

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
        imagebox_Onegroup.appendChild(Onegroupimage);
        textbox_Onegroup.appendChild(para_othername);

        textbox_Onegroup.appendChild(para_otherreview);
        textbox_Onegroup.appendChild(para_otherprice);
    }

}