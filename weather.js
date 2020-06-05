//이 자바스크립트는 날씨 API를 가져와 홈페이지에 날씨와 지도 정보를 표시해주는 자바스크립트 코드입니다.
//안타깝지만 해당 코드는 웹호스팅 환경에서는 무료 API의 제한 때문에 화면에 출력되지 않고 로컬디스크 환경에서만 정상적으로 작동이 됩니다.
const weather = document.querySelector(".js-weather");
//이전의 자바스크립트 코드들과 같이 HTML코드의 js-weather 클래스를 탐색하는 DOM 입니다.

const API_KEY = "3f923f16c133f9fbc7b1bfdabff41947"; // 함수 API_KEY는 "3f923f16c133f9fbc7b1bfdabff41947"라는 키값을 가집니다.
const COORDS = "coords"; 

function getWeather(lat, lng){ //API 함수 객체 설정, 해당 API는 서버를 이용해 지역 및 날씨 정보를 알려주는 함수입니다.
         //함수 getWeather는 인자 lat(위도),lng(경도)를 가져옵니다.
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&APPID=${API_KEY}&units=metric`
    //fetch는 HTTP 통신 프로토콜을 사용해 가져올 데이터를 불러옵니다. 여기서는 API 키값을 불러왔습니다.
    //해당 API 키값은 제가 직접 날씨와 위치 정보를 얻는 홈페이지에 가입하여 받은 API 키캆입니다.
    ).then(function(response){ 
        return response.json()
        //데이터가 사용자에게 비정상적으로 전달 되었을때 호출하는 함수 입니다.
        //return문을 사용해 데이터를 다시 요청합니다.
    }).then(function(json){
        const temperature = json.main.temp;
        //상수 temperature는 API값에서 온도 값을 가져옵니다.
        const place = json.name;
        //상수 place는 API 값에서 위치정보를 가져옵니다.
        weather.innerText = `
        TODAY

        ${temperature} C 
        ${place} City`;
        // 출력 텍스트는 TODAY로 설정하였고, 온도와 도시 설정도 해두었습니다.
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS,JSON.stringify(coordsObj));
    //함수 saveCoords는 로컬스토리지에 string(문자열)을 COORDS에 저장합니다.
}

function hadleGeoSucces(position){ //함수 hadleGeoSucces는 좌표를 가져오는데 성공했을때 처리하는 함수입니다.
    const latitude = position.coords.latitude; 
    // 상수 latitude는 함수 asForCoords에서 navigator.geolocation 객체을 이용해 위도를 가져오는 키값을 가집니다.
    const longitude = position.coords.longitude;
    // 상수 latitude는 상수 latitude와 똑같이 함수 asForCoods에서 navigator.geolocation 객체을 이용해 경도를 가져오는 키값을 가집니다.
    const coordsObj = { 
        latitude,
        longitude
        //객체의 변수 이름과 객체의 key의 이름응 같게 설정 합니다.
    };
    saveCoords(coordsObj);//함수 saveCoords의 인자 coordsObj를 호출합니다.
    getWeather(latitude, longitude);//함수 getWeather의 인자 latitude, longitude를 호출합니다.
}

function handleGeoError(){
    console.log('Cant access geo location')
    // 함수 handleGeoError 함수는 위치정보를 확인 할 수 없을때 콘솔 로그에
    // 'Cant access geo location'을 출력합니다.
}

function asForCoords(){
    navigator.geolocation.getCurrentPosition(hadleGeoSucces, handleGeoError)
    //naviagetor 객체는 현재 사용하고 있는 웹브라우저에 관한 정보를 제공해주는 객체입니다.
    //geolocation 객체는 위치 정보 서비스를 지원하게 해주는 객체입니다.
    //getCurrentPoistion은 메소드를 호출해서 사용자의 현재 위치를 얻는 메소드입니다.
    //즉,hadleGeoSucces, handleGeoError 이 2가지의 함수를 호출히여
    //현재 사용하고 있는 웹브라우저와 정보서비스 위치에 대한 정보에 대한 API 값을 가지는 함수입니다.
    //사용자가 위치정보를 수락한다면 함수 handleGeoSucces를 호출하고
    //사용자가 위치정보를 거부한다면 함수 handleGeoError를 호출합니다. 
    
    
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    //상수 loadedCoords는 로컬스토리지에 있는 상수 'COORDS'의값을 가져옵니다.
    if(loadedCoords === null){
        asForCoords(); // loadedCooords의 함수값이 null이라면 asForCoords 함수를 호출합니다.
    }
    else {
        const parsedCoords = JSON.parse(loadedCoords);
        //상수 parsedCoords는 상수 loadedCoords의 srting(문자열)값을 object(객체)로 변환시킨 값을 가집니다.
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
        //함수 getWeather의 인자 latitude, longitude string(문자열)값을 
        //상수 parsedCoords을 이용해 Object(객체)로 변환시켜 호출합니다.
    }
    //즉 함수 loadCoords는  로컬스토리지에 있는 상수 'COORDS'의 값을 가져오는데 if-else문을 사용하여
    //loadedCoords의 값이 null 이라면 asFoorCoords 함수를 호출하여 값을 가져옵니다. 로컬디스크에 저장된 값이 없을때 작동됩니다.
    //loadedCoords의 값이 null이 아니라면 상수 parsedCoords의 값을 상수 loadedCoords에서 설정된 로컬스토리지에 있는 COORDS값을 가져옵니다.
    //쉽게 말하자면 로컬스토리지에 있는 값을 상수 parsedCoords의 값으로 동기화시킵니다.
    //그런 다음 함수 getWeather의 인자 latitude, longitude 값을 호출합니다.
    // 원래 latitude,longiude의 값은 string(문자열)인데, 상수 parsedCoords를 적용하여
    //string(문자열)에서 object(객체)로 변환 시켜줘서 홈페이지 API에서 작동이 가능하게 설정합니다.
    //위에서 이미 상수 parsedCoords는 함수 JSON.parse를 사용하여 string(문자열)에서 object로 변환시켜주었습니다.
}

function init(){
    loadCoords();
}

init();