let body= document.querySelector("body")
let level=document.querySelector("h3")
let playground= document.querySelector(".gameGround")
let boxes= document.querySelectorAll(".innerBox")
let helpBtn= document.querySelector(".help")
let resBtn = document.querySelector(".replay")

let started =false;
let memArr=[];
// memArr= ['box1', 'box3', 'box2', 'box4']
let userArr=[];
let levelNum=0
let num=0;
let clicks=0; // will count user clicks
let score=0;

playground.addEventListener('click', ()=>{
if(started){
    if(event.target.className=='innerBox'){
        userFlash(event.target)
        clicks++;
        console.log(clicks);
        userArr.push(event.target.id)
        checker()
    }
}
})

function userFlash(innerBox){
    innerBox.classList.add('userflash');

    setTimeout(()=>{
        innerBox.classList.remove('userflash')
    }, 200)
}

function checker(){
    //memArr: [1,3,4,2,6 ,5]
    //userArr: [1]
    //clicks=1
    if(userArr[clicks-1] != memArr[clicks-1]){
        // lost the game
        level.innerText = `You have lost the GAME, your score is ${score}`
        started=false;
        userArr=[];
        memArr=[];
        clicks=0;
        num=0;
        levelNum= 1;
    }
    else{
        num++;
    }
    if(num==memArr.length  && num !=0){
        //user clicked all boxes in correct manner
        score +=10;
        userArr=[];
        clicks=0;
        num=0;
        setTimeout(selectBox, 500);
    }
}
body.addEventListener('keydown', ()=>{
    if(started== false){
        started=true;
        selectBox()
    }
})

function selectBox(){
    level.innerText=`Level ${levelNum}`
    levelNum++;

    let randVal= Math.floor(Math.random()*6)
    flashRand(randVal);
    memArr.push(boxes[randVal].id)
}

function flashRand(randVal){
   boxes[randVal].classList.add('memFlash')

   setTimeout(() => {
      boxes[randVal].classList.remove('memFlash')
   }, [250])
}

helpBtn.addEventListener('click', ()=>{
    let initText=level.innerText;
    level.innerText = `Memory array is: ${memArr}`
   
    setTimeout(()=>{
     level.innerText= initText
    },2000)
})

resBtn.addEventListener('click', ()=>{
    levelNum =0;
    clicks=0;
    memArr=[];
    userArr=[];
    score=0;
    started=true;
    level.classList.remove('gameoverh3');
    level.innerText = `Level ${levelNum}`;
    selectBox();
})
