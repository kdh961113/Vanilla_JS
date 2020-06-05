// 이 자바스크립트는 할 일 리스트를 입력받고 출력하는 자바스크립트 입니다.

const todoDoform =document.querySelector(".js-toDoForm")
toDoInput = todoDoform.querySelector("input"),
toDoList =document.querySelector(".js-toDoList");

//이전에 자바스크립트 코드들과 똑같이 HTML 코드의 js-toDoForm,input,js-toDoList들의 자식(Class,Tag,Id)들을 탐색하는 DOM입니다.

const TODOS_LS = "toDos";

let toDos=[]; // 아래에서 생성된 paintToDo(text)의 값의 인수들을 object가 아닌 Array로 변경해주는 변수입니다.

function deleteToDo(event){ // paintToDo에 만든 delBtn(delete 버튼)을 사용하는 이벤트 값을 가진 함수입니다.
    const btn = event.target; // 이벤트의 타켓이 되는 값을 정하는 상수 btn을 생성합니다.
    const li = btn.parentNode; // 상수 li의 값은 btn 상수의 부모(상위)의 키값입니다.
    toDoList.removeChild(li); //toDoList의 li 자식(하위)키값을 삭제합니다.
    const cleanToDos = toDos.filter(function(toDo){ // 상수 cleanToDos는 변수 toDos의 filter 메소드는 toDo 함수의 arrary(배열)을 필터링합니다. 
        return toDo.id !==parseInt(li.id); // parseInt 메소드를 사용하여, 상수 li의 id값(string)을 숫자로 변환하고,
        // 상수 toDo의 id가, 상수 li의 id와 같지 않을 때 리턴됩니다.
    });
    toDos = cleanToDos; //변수 toDos의 값을 상수 cleanToDos을 같게, 동기화를 시켜줍니다.

    saveToDos();
    //즉 요약을 하자면 상수 clearnToDos는 deletetToDo라는 함수의 삭제 이벤트를 적용한 값이고
    //변수 toDos는 로컬디스크에 저장된 값인데, deleteToDo의 삭제 이벤트를 적용하지 전 값입니다.
    // 값이 변경된 상수 cleanToDos는 변수 toDos와 동기화를 해주어 saveToDos 함수를 호출해 값을
    // 저장해줍니다. 이렇게 된다면 함수 deleteToDo의 값이 함수 SaveToDos에 저장되어 로컬스토리지에 저장이 되며
    // 그와 동시에 함수 painteToDo에도 적용이 되어 HTML 홈페이지 화면에서 삭제 효과가 발생 되는 것입니다.


}

function saveToDos(){ // saveToDos 함수는 toDos의 값을 가져와서 로컬스토리지에 저장합니다.
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    //JSON.stringify는 todoes의 object(객체)를 string(문자열)로 변경해줍니다.
    //왜 이렇게 하냐면 자바스크립트는 로컬스토리지에서 object(객체)를 지원하지 않기 때문에 string(문자열)로 변경해줘야 합니다.
}

function paintToDo(text){
        const li = document.createElement("li"); // HTML의 li 태그의 인자를 생성하는 상수입니다. 즉 HTML에서 목록을 생성하는 상수입니다.
        const delBtn = document.createElement("button"); // HTML의 button 태그의 인자를 생성하는 상수입니다. 즉 HTML에서 버튼을 생성하는 상수입니다.
        const span = document.createElement("span"); // HTML의 span 태그의 인자를 생성하는 상수입니다. 즉 HTML에서 영역을 생성하는 상수입니다.
        const newId = toDos.length +1; // newId값은 맨 처음 생성 될때 값이 아예 없으니 임의로 id값을 +1 추가해줍니다.
        delBtn.innerText="✖"; // delBtn 상수에서 이모지 ✖ 값을 추가해 삭제 버튼이 출력되게 합니다.
        delBtn.addEventListener("click", deleteToDo);// 클릭하면 deleteToDo 함수가 작동하는 이벤트입니다.
        span.innerText = text; //span의 입력받는 text는
        li.appendChild(delBtn); // delBtn 상수의 값을 li 상수의 값에 입력하는 메소드입니다.
        li.appendChild(span); // span 상수의 값을 li 상수의 값에 입력하는 메소드입니다.
        li.id = newId; // li 상수들의 id 값을 newId로 설정합니다. 왜냐하면 butten 태그 인자(화면에서는 버튼)들이 삭제 될 때
        // li 태그의 인자들중 어느것을 지워야 하는지를 알 수 있기 때문입니다.
        toDoList.appendChild(li); //li 상수의 값을 toDoList 상수에 입력하는 메소드입니다.
        const toDoObj={
            text:text, // function paintToDo(text)의 key 값을 value로 변경해줍니다.
            id: newId // 또한 변경한 value 값에 id 값을 생성해줍니다.
        };
        toDos.push(toDoObj); // todos array(배열) 안에 todoObj의 element(인자) 값을 추가해줍니다. 
        // 즉 object(객체)의 key 값을 array(배열)의 value 값으로 변경해주는 것 입니다.
        // 그 다음에 변경된 value 값은 toDos array(배열)에 저장됩니다.
        saveToDos(); //saveToDos 함수를 호출합니다. 
        // 즉 할 일 리스트의 값을 입력 받았을때 작동하는 이벤트를 자바스크립트로 코딩 한 것입니다.
        // 리스트에서 입력값을 완료(엔터) 했을때 li(태그+상수)를 동시에 생성하고 
        // 역시 동시에 각각 delete(태그+상수), span(태그+상수를) 생성하게 됩니다.
        // 요약을 하자면 li 상수가 작동을 하면 delete, span 상수가 한꺼번에 작동하는 것입니다.
    }

function hadleSubmit(event){ // hadleSunbmitd은 event 인자를 실행합니다.
    event.preventDefault(); // event의 디폴트 메소드(작업) 값 작성
    const currentValue = toDoInput.value; // input의 value값을 로드
    paintToDo(currentValue);
    toDoInput.value=""; //toDoInput의 value값을 초기화합니다.
     //sumit(전송)을 했을때 paintToDo 함수에서 CurrentValue 인자값을 호출합니다.
    
}

 
function loadedToDos(){ // 로컬스토리지에서 인수의 값을 로드하는 함수입니다.
    const loadedToDos =localStorage.getItem(TODOS_LS) ; // loadedToDos 상수는 로컬스토리지에서 값을 가져옵니다.
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        //ToDos의 값이 null이 아니라면 로컬스토리지에 값을 가져옵니다.
        parsedToDos.forEach(function(toDo){ //forEach 메소드는 arrary에 있던 값들을 각각 한번씩 실행시켜줍니다.
            //즉 parsedToDos의 상수는 toDo에 있는 각각의 배열에 대해서 함수를 실행한다는 것입니다.
            // 로컬스토리지의 srting(문자열)값을 자바크스립트가 다룰수 있게 object(객체)로 변경해주는 함수입니다. 
           paintToDo(toDo.text);
           //로컬스토리지에 저장된 toDo 인수의 text 값을 홈페이지 화면에 출력하는 함수를 불러옵니다.
           //즉 로컬스토리지에 저장된 string 값을 object로 변경해주고 그 변경된 값을 화면에 출력해 주는 함수입니다.
        })
    }
}

function init(){
    loadedToDos(); //loadedToDos를 실행하는 함수입니다.
    todoDoform.addEventListener("submit",hadleSubmit)
    //입력된 값을 todoDoform에 전송을 하면 함수 hadeSubmit의 값을 전송합니다.
}

init();