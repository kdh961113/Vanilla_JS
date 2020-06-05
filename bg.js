//이 자바스크립트는 홈페이지의 바탕화면(백그라운드)를 여러장의 사진으로 랜덤하게 출력하는 자바스크립트 코드입니다.
const body = document.querySelector("body");
//이전의 자바스크립트 코드들과 같이 HTML코드의 body 태그를 탐색하는 DOM 입니다.

const IMG_NUMUBER =4;// 이미지의 숫자의 값을 입력한 상수 IMG_NUMUBER입니다.


function paintImage(imgNumber){ // 이미지를 출력하는 인수와 객체를 가진 함수 paintIame입니다.
    const image = new Image(); // 상수 image를 생성하고 새로운 이미지를 호출합니다. 
    image.src = `image/${imgNumber +1}.jpg`; // 이미지 파일을 호출합니다. 여기서는 홈페이지에 동일한
    //디렉토리에 있는 image 폴더에 있는 사진을 호출 하였습니다. 그다음에 사진의 이름은 1부터 시작하므로
    // 인수 imgNumber의 값에 +1을 설정 해주었습니다.
    //즉 ramdom 함수가 0을 주면 1, 1을 주면 2, 2를 주면 3으로 출력되는 것입니다.
    image.classList.add("bgImage"); // "bGImage"라는 이름 ClassList를 상수 image에 추가합니다.
    body.prepend(image);//위에 설정한 이미지들을 body의 부분에서 실행하는 메소드 입니다.
}

function genRadom(){
    const number = Math.floor(Math.random() * IMG_NUMUBER);
    // Math.floor라는 내림 하는 함수안에 Math.random라는 랜덤값을 생성하는 함수를 내부에 생성을 하고,
    // IMG_NUMBER이라는 상수값에 5를 곱하는 함수입니다. 이렇게 해서 상수 number의 값이 생성되었습니다.
    return number; // 상수 number을 리턴합니다.
    //즉 랜덤값을 생성하는 함수와 입력된 이미지의 숫자를 곱한후, 내림을 실행하는 함수를 실행하는
    // 상수 number값을 실행하는 함수 genRadom이 생성되었습니다.
}

function init(){ //랜덤값을 생성하는 함수 init입니다.
    const randomNumber = genRadom(); // 상수 randomNumber에 랜덤값을 생성하는 genRadom 메소드를 생성합니다.
    paintImage(randomNumber);
}

init();