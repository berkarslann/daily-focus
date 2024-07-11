/* VARIABLES */
const buttonDailyMin = document.getElementById('button-daily-min');
const buttonDailyMax = document.getElementById('button-daily-max')
const dailyPomValue1 = document.getElementById('Input-text');
const dailyPomValue2 = document.getElementById('Input-text2');
const doneBoxes = document.getElementById('done-boxes');
const doneBoxes2 = document.getElementById('done-boxes2')
const pomodoroBreak = document.getElementById('pomodoro-break')
const longBreak = document.getElementById('long-break')
const shortBreak = document.getElementById('short-break')
const firstPomBarElement = document.getElementById('123')
const secondPomBarElement = document.getElementById('1234')
const motivation = document.getElementById('motivation')
const motivationAuthor = document.getElementById('motivation-author')

/* POMODORO BARS CHANGES */

var temporaryArray = []
temporaryArray.push(document.getElementById('123'))
var temporaryArray_2 = []
temporaryArray_2.push(document.getElementById('1234'))

buttonDailyMin.addEventListener('click', dailyPomAmountMin);
buttonDailyMax.addEventListener('click', dailyPomAmountMax);
let previousAmount = 1;
let previousAmount2 = 1;
let secondPomBarElementCounter = false

function dailyPomAmountMax(e){
  let secondPomBarElementCounter = true;
    if(dailyPomValue2.value<=0){
        console.log('geçersiz daily-min pomodorosu')
        previousAmount2 = 1;
    }else if(dailyPomValue2.value < previousAmount2 ){

        for(i=0; i < previousAmount2-dailyPomValue2.value ; i++){
            doneBoxes2.removeChild(doneBoxes2.lastChild)
        }
            
        previousAmount2 = dailyPomValue2.value;
         

    } else if(dailyPomValue2.value >= previousAmount2){
       
        for(i=0; i < dailyPomValue2.value - previousAmount2 ; i++){
            const ix = document.createElement('i');
            ix.className = 'icon fa-regular fa-circle-check fa-lg icons belge2';
            ix.style = "color: #006d8f;"
            ix.id= '123'
            temporaryArray_2.push(ix)
            doneBoxes2.appendChild(ix);
            
            }

         previousAmount2 = dailyPomValue2.value
         
    } pomodoroCircles = document.querySelectorAll(".belge2");
        
     
    pomodoroCircles.forEach((element)=>{
     
      
        element.addEventListener('click', ()=>{
     
          if(element.classList == 'icon fa-regular fa-circle-check fa-lg icons belge2'){
            element.classList.replace('fa-regular', 'fa-solid')
          }
          else{
            element.classList.replace('fa-solid', 'fa-regular')
          }
         


        }
        )
      


    })

    secondPomBarElement.addEventListener('click', (e)=>{
      if(e.target.classList == 'icon fa-regular fa-circle-check fa-lg icons belge2'){
        e.target.classList.replace('fa-regular', 'fa-solid')
      }
      else{
        e.target.classList.replace('fa-solid', 'fa-regular')
      }
     }
    )


}

if(secondPomBarElementCounter == false){
  secondPomBarElement.addEventListener('click', (e)=>{
    if(e.target.classList == 'icon fa-regular fa-circle-check fa-lg icons belge2'){
      e.target.classList.replace('fa-regular', 'fa-solid')
    }
    else{
      e.target.classList.replace('fa-solid', 'fa-regular')
    }
   }
  )
}

let firstPomBarElementCounter = false
function dailyPomAmountMin(e){
  let firstPomBarElementCounter = true;
            if(dailyPomValue1.value<=0){
                alert('geçersiz daily-min pomodorosu')
                previousAmount = 1;
            }else if(dailyPomValue1.value < previousAmount ){

                for(i=0; i < previousAmount-dailyPomValue1.value ; i++){
                    doneBoxes.removeChild(doneBoxes.lastChild)
                    temporaryArray[i].remove
                }
                    
                previousAmount = dailyPomValue1.value;
                 

            } else if(dailyPomValue1.value >= previousAmount){
               
                for(i=0; i < dailyPomValue1.value - previousAmount ; i++){
                    const ix = document.createElement('i');
                    ix.className = 'icon fa-regular fa-circle-check fa-lg icons belge';
                    ix.style = "color: #006d8f;"
                    doneBoxes.appendChild(ix);
                    temporaryArray.push(ix)
                   
                    }
                    
                 previousAmount = dailyPomValue1.value
            }

       
          pomodoroCircles = document.querySelectorAll(".belge");
        
     
            pomodoroCircles.forEach((element)=>{
               element.addEventListener('click', ()=>{
                if(element.classList == 'icon fa-regular fa-circle-check fa-lg icons belge'){
                  element.classList.replace('fa-regular', 'fa-solid')
                }
                else{
                  element.classList.replace('fa-solid', 'fa-regular')
                }
               })
            })
            firstPomBarElement.addEventListener('click', (e)=>{
              if(e.target.classList == 'icon fa-regular fa-circle-check fa-lg icons belge'){
                e.target.classList.replace('fa-regular', 'fa-solid')
              }
              else{
                e.target.classList.replace('fa-solid', 'fa-regular')
              }
             }
            )
            
}

if(firstPomBarElementCounter == false){
  firstPomBarElement.addEventListener('click', (e)=>{
    if(e.target.classList == 'icon fa-regular fa-circle-check fa-lg icons belge'){
      e.target.classList.replace('fa-regular', 'fa-solid')
    }
    else{
      e.target.classList.replace('fa-solid', 'fa-regular')
    }
   }
  )
}


/* DAILY MOTIVATION SECTION */

let randomNumber = Math.floor(Math.random() * 50);
fetch("https://type.fit/api/quotes")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data[randomNumber].text);
    motivation.innerHTML = '"' + data[randomNumber].text + '"';
    motivationAuthor.innerHTML = '-' + data[randomNumber].author;
    if(data[randomNumber].author == null ){
      motivationAuthor.innerHTML = '-Anonymous'
    }

  });

  /* POMODORO TIMER SECTION */
  
 
 

pomodoroBreak.addEventListener('click', controlPomodoroButton)
shortBreak.addEventListener('click', controlShortButton)
longBreak.addEventListener('click', controlLongButton)

let pomodoroBreakProps = {
  disabled : true
}
let longBreakProps = {
  disabled : false
}
let shortBreakProps = {
  disabled : false

}

document.getElementById('minutes').innerHTML = 25;
document.getElementById('seconds').innerHTML = '00'; 

function controlPomodoroButton() {
  if(stopButtonProps.disabled == true){
    pomodoroBreakFunction()
  }
  
  else if (stopButtonProps.disabled == false) {
    alert('Şu an kronometreniz açık. Yer değiştirmek için lütfen süreyi durdurun.')
  }
}
function controlShortButton() {
if(stopButtonProps.disabled == true){
  shortBreakFunction()
}
else if (stopButtonProps.disabled == false) {
  alert('Şu an kronometreniz açık. Yer değiştirmek için lütfen süreyi durdurun.')
}
}
function controlLongButton() {
  if(stopButtonProps.disabled == true){
    longBreakFunction()
  }else if (stopButtonProps.disabled == false) {
    alert('Şu an kronometreniz açık. Yer değiştirmek için lütfen süreyi durdurun.')
  }
}
function pomodoroBreakFunction(e){
  
  document.body.style.backgroundColor = '#004d65';
  pomodoroBreak.style.backgroundColor = '#012834';
  shortBreak.style.backgroundColor = 'transparent';
  longBreak.style.backgroundColor = 'transparent';

  session_seconds = 59;
  session_minutes = 24;
  document.getElementById('minutes').innerHTML = 25;
  document.getElementById('seconds').innerHTML = '00';  
  longBreakProps.disabled = false;
  shortBreakProps.disabled = false
  pomodoroBreakProps.disabled = true;
}

function shortBreakFunction(e){

  session_seconds = 59;
  session_minutes = 4;
  
  document.getElementById('minutes').innerHTML = 5;
  document.getElementById('seconds').innerHTML = '00'; 
    
  
    document.body.style.backgroundColor = '#01607d'
    shortBreak.style.backgroundColor = '#012834';
    pomodoroBreak.style.backgroundColor = 'transparent'
    longBreak.style.backgroundColor = 'transparent';

    longBreakProps.disabled = false;
    shortBreakProps.disabled = true
    pomodoroBreakProps.disabled = false;
}

function longBreakFunction(e){
  
    document.body.style.backgroundColor = '#007699';
    longBreak.style.backgroundColor = '#012834';
    pomodoroBreak.style.backgroundColor = 'transparent'
    shortBreak.style.backgroundColor = 'transparent';
    
    session_seconds = 59;
    session_minutes = 14;
    document.getElementById('minutes').innerHTML = 15;
    document.getElementById('seconds').innerHTML = '00'; 

    longBreakProps.disabled = true;
    shortBreakProps.disabled = false
    pomodoroBreakProps.disabled = false;
}

const startButton = document.getElementById('pomodoroButton');
const stopButton = document.getElementById('stopButton');

let stopButtonProps = {
  disabled : false
}
let startButtonProps = {
  disabled : false
}

stopButtonProps.disabled = true;

function stop() {
  stopButtonProps.disabled = true;
  startButtonProps.disabled = false;
}

let session_seconds = 59;
let session_minutes = 24;
let cycleCounterForLongBreak = 0;
let counterForStartButton = 0;
function start() {
  startButtonProps.disabled = true;
  stopButtonProps.disabled = false;
  let counterForStartButton2 = counterForStartButton++;
  if(counterForStartButton == 1){

    minutes_interval = setInterval(minutesTimer, 60000);
    seconds_interval = setInterval(secondsTimer, 1000);

    function minutesTimer() {
      session_minutes--;
      document.getElementById('minutes').innerHTML = session_minutes;
    }

    function secondsTimer() {
      session_seconds--;
      document.getElementById('seconds').innerHTML = session_seconds;
      if(stopButtonProps.disabled == true){
        clearInterval(seconds_interval)
        counterForStartButton = 0;
        return
      }
      if (session_seconds <= 0) {
        if (session_minutes <= 0) {
          if(shortBreakProps.disabled == false){
            pomodoroBreakFunction()
            start()
          } else if(shortBreakProps.disabled == true){
            shortBreakFunction()
            start()
            cycleCounterForLongBreak++;
            if(cycleCounterForLongBreak == 2){
              alert('Congratulations! You have completed 4 pomodoros. You can take a long break.');
              cycleCounterForLongBreak = 0;
              longBreakFunction()
            }
          }
          clearInterval(minutes_interval);
          clearInterval(seconds_interval);
          counterForStartButton = 0;
        }
        session_seconds = 60;
      }
    }
  }
}

startButton.addEventListener('click', start);
stopButton.addEventListener('click', stop);
