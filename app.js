let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turn0=true; //playerX, player 0
let count=0;    //to track draw

const winPatterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8], 
];

// game reset function //  
const resetGame= ()=>{   
    turn0=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");   //showwinner ne hide karva msgcontainer ne j classlist ma add karu hide class //
};

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        //console.log("box was clicked");
       if(turn0){           //player0 ni turn hoii to 0print thaase
        box.innerText="O";
        box.style.color="red";
        turn0=false;        //alternate turn hoi atla maate aek turn pchi turn0 ne false karvu pde...
       }else{               // playerX ni turn hoii to X ptint thasse
        box.innerText="X";
        box.style.color="purple";
        turn0=true;         // aek turn pchi 0 ni turn aave atla maate turn0 ne true karvu pde...
       }
       box.disabled=true;
       count++;

       let isWinner=checkWinner();

       if(count ===9 && !isWinner){
        drawGame();
       }
       //checkWinner()
    });
});

const drawGame=()=>{
    msg.innerText="Game was Draw! Play Again";
    msgContainer.classList.remove("hide");
    disableBoxes();
}

// disablebox function //
const disableBoxes=()=>{     // ek  vaar box click thai jaay pchi value chnage no thaavi joi
    for(let box of boxes){      
        box.disabled=true;      //disable=nochange
    }
};

// enablebox function //     //new game start thaay tyare badha box enable rahe... //
const enableBoxes=()=>{         //enable=change
    for(let box of boxes){
        box.disabled=false;    
        box.innerText="";       //reset game kariye tyare boxes ni innertext value reset karva innertext empty karyu...//
    }
};



//showwinner function//
const showWinner=(winner)=>{
    msg.innerText=`Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");   // winner jyare win thaay tyare j batave atla maatr msg-container ne hide rakhyu
    disableBoxes();
};


// checkwinner function//
const checkWinner=()=>{
    for(let pattern of winPatterns){
        
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

    if(pos1Val !="" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                //console.log("winner",pos1Val);
                showWinner(pos1Val);
                return true;
            }
        }

    }
};


//resetgame function call karyu//
newGameBtn.addEventListener("click",resetGame);

resetBtn.addEventListener("click",resetGame);