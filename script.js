const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeEl = document.querySelectorAll('span');
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete- button');


let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;  
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//Set Date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

function updateDOM() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    //Hide Inputs
    inputContainer.hidden = true;

    //If countdown has ended
    if (distance < 0){
        //Hide Countdown
        countdownEl.hidden = true; 
        clearInterval(countdownActive);
        completeEl.hidden = false;
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
    }else{
    //Populate Countdown
        countdownElTitle.textContent =  `${countdownTitle}`;
        timeEl[0].textContent = `${days}`;
        timeEl[1].textContent = `${hours}`;
        timeEl[2].textContent = `${minutes}`;
        timeEl[3].textContent = `${seconds}`;
        //Show Countdown
        countdownEl.hidden = false; 
    }
    },second);
}

//Take values from submitted form input
function eventCountdown(e) {
    e.preventDefault();
    
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value; 
    
    //Save to local storage 
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));
    //check for valid data
    if (countdownDate ===''){
        alert('Please select a valid date');
    } else{ 
        //Get current date in the form of numbers
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
    
}

//Reset Function
function reset() {
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    //Stop counting in background
    clearInterval(countdownActive);
    countdownTitle = '';
    countdownDate = '';
    localStorage.removeItem('countdown');
}

//Get countdown from localStorage if available
function restorePrevCountdown() {
    if (localStorage.getItem('countdown')) {
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();

    }
}

//Event Listener
countdownForm.addEventListener('submit', eventCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click',reset);

//Check local storage
restorePrevCountdown();