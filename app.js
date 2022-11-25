const startBtn = document.querySelector('#start')
const finishBtn = document.querySelector('#finish')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
let time = 0
let score = 0
let timeInterval

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
    finishBtn.classList.add('invisible')
})

finishBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens.forEach((item) => {
        item.classList.remove('up')
    })
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }  
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    score = 0
    board.innerHTML = ''
    timeEl.parentNode.classList.remove('hide')
    timeInterval = setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function finishGame() {
    board.innerHTML = `<div class='finishScreen'><h3>Игра окончена</h3><h1>Счет: <span class='primary'>${score}</span></h1></div>`
    timeEl.parentNode.classList.add('hide')
    finishBtn.classList.remove('invisible')
    clearInterval(timeInterval)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width-size)
    const y = getRandomNumber(0, height-size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    setColor(circle)

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function setColor(element) {
    const color = getRandomColor()
    element.style.backgroundColor = color
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}

function getRandomColor() {
    const randomColor = []
    for (let i = 0; i < 3; i++) {
        const randomColorComponent = parseInt(Math.random() * 255)
        randomColor.push(randomColorComponent)
    }
    return `rgb(${randomColor[0]}, ${randomColor[1]}, ${randomColor[2]})`
}