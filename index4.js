//이 자바스크립트는 홈페이지의 시간을 작동시켜 주는 것입니다.

const clockContainer = document.querySelector(".js-clock"), //querySelector는 요소의 자식(Class,Tag,Id)들을 탐색합니다.
clockTitle = clockContainer.querySelector("h1"); //js-clock 클래스의 자식들을 탐색, h1 클래스를 탐색합니다.

function getTime(){ //객체 getTime
    const date = new Date(); //현재의 시간, 요일,월, 년도를 불러오는 DOM입니다. 
    const minutes = date.getMinutes(); 
    const hours =  date.getHours();
    const seconds = date.getSeconds();
    //현재의 분 시간 초를 알려주는 각각의 변수와 DOM입니다.
    clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
        //innerText는 객체안에 텍스트를 넣기 위한 DOM입니다.
        minutes < 10 ? `0${minutes}`: minutes //분 설정
    }:${seconds < 10 ? `0${seconds}` : seconds}`;//초 설정
    // 해당 코드 해석을 하자면
    //`$(hours,minutes,seconds) < 10 ? `0${hours,minutes,seconds}` : hours,minutes,seconds}
    //는 숫자가 10보다 작으면 그 앞에 0을 넣는 문자열, 코드입니다. 
    //즉 원래 설정대로라면 13:8:2 이렇게 출력되는 것인데, 해당코드는 10보다 작은 수에 앞에
    //0을 추가(리턴)하는 비교문을 추가하였습니다. 이렇게 설정하면 정상적으로 13:08:02라고 출력이 됩니다.
}

function init(){
    getTime(); //getTime 함수 불러옵니다.
    setInterval(getTime,1000); 
    //setInerval 함수는 두개의 인자값(argument)을 받는데,첫번째 인자로 실행할 함수를 받고
    //두 번째 인자값은 받은 함수를 실행하고 싶은 시간의 간격을 설정합니다.
    //즉, 매초마다 getTime 함수를 실행해서, 매초 마다 시간을 업데이트 합니다.
    //이렇게 업데이트한 getTime 함수는  js-clock,h1 클래스를 값을 변경시켜줍니다.
    //해당 함수가 작동되는 HTML 파트는 00:00 입니다.
    
}

init();
