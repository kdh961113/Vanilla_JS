//이 자바스크립트는 사용자를 입력받고 출력하는 자바스크립트 입니다.

const form= document.querySelector(".js-form"), 
input = form.querySelector("input"),
greeting =document.querySelector(".js-greetings");
//첫번째 자바스크립트 코드와 같이 js-form,input, js-greeting의 자식(Class,Tag,Id)들을 탐색하는 DOM입니다.

const USER_LS = "currentUser",
SHOWING_CN = "showing"; 
//currentUser와 showing이라는 클래스 2개를 추가합니다.

function saveName(text){
    localStorage.setItem(USER_LS, text);//로컬스토리지에 text값을 저장하는 DOM 입니다.
}

function hadleSubmit(event) { // hadleSunbmitd은 event 인자를 실행합니다.
    event.preventDefault(); //event의 디폴트 메소드(작업) 값 작성
    const currentValue= input.value; //input의 value값을 로드
    paintGreeting(currentValue);
    saveName(currentValue);
    //sumit(전송)을 했을때 paintGreeting 함수에서 CurrentValue 인자값을 불러오고
    //saveName의 함수에서 로컬스토리지에 저장된 loadName 함수의 USER_LS 인자값과 텍스트를 불러옵니다.
}

function askForName() {// currentUser의 값이 없으면 User값을 요청하는 함수
    form.classList.add(SHOWING_CN); //form의 ClassList에서 SHOWING_CN값을 추가합니다.
    form.addEventListener("submit", hadleSubmit); //어떠한 값을 form에 전송을 하면 함수 hadeSubmit의 값을 전송합니다.
}

function paintGreeting(text){ //text라는 이름의 인수로 가지는 paintGreeting 함수입니다.
    form.classList.remove(SHOWING_CN); //form의 ClassList에 SHOWING_CN이라는 변수를 삭제합니다.
    greeting.classList.add(SHOWING_CN); //ClassList에 SHOWING_CN이라는 변수의 값을 추가합니다.
    greeting.innerText = `Hello ${text}`; //현재 로컬스토리지에 유저(loadName)값이 있다면

}

function loadName(){ 
    const currentUser = localStorage.getItem(USER_LS);
    if(currentUser === null){
        //유저가 없는(null) 경우, 즉 로컬스토리지에서 값이 없을 경우입니다.
        askForName();
    } else{
        //유저가 있는 경우, 즉 로컬스토리지에서 값이 있을 경우 
        //로컬 스토리지에서 가져온 텍스트 값과 함께 paintGreeting 함수를 로드합니다.
        paintGreeting(currentUser);
    }
}

function init(){
    loadName();
    //로컬스토리지에서 값을 불러오는 함수입니다.
}

init();
