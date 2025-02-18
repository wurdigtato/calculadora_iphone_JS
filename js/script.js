const display = document.querySelector('.calculator__display h1')
const subdisplay = document.querySelector('.calculator__display h3')
const keys = document.querySelector('.calculator__buttons')

let currentNumber = ''
let previousNumber = ' '
let operator = null
let equation = ''
let result = ''
// Implementar histórico
// let history = [] 


keys.addEventListener('click', (event) => {
    const button = event.target

    if(button.tagName === 'BUTTON'){
        let buttonText = button.textContent.trim();

        if(buttonText === '÷') buttonText = '/'
        if(buttonText === '×') buttonText = '*'
        
        if(!isNaN(buttonText) || buttonText === '.') {
            if(display.innerText === '0' && button !== '.') {
                currentNumber = buttonText
            } else {
                currentNumber += buttonText
            }
            equation += buttonText
            display.innerText = currentNumber
            subdisplay.innerText = equation
        } else if (['+', '-', '*', '/'].includes(buttonText)){
            if(currentNumber === '') return
            previousNumber = currentNumber
            currentNumber = ''
            operator = buttonText
            equation += `${operator}`
            subdisplay.innerText = equation
        } else if (buttonText === 'AC') {
            currentNumber = ''
            previousNumber = ''
            operator = null
            equation = ''
            display.innerText = '0'
            subdisplay.innerText = '0'
        } else if (buttonText === '+/-') {
            if(currentNumber !== '') {
                currentNumber = ((parseFloat(currentNumber) * -1).toString())
                display.innerText = currentNumber
            }
        } else if(buttonText === '%') {
            if(currentNumber !== '') {
                if (previousNumber !== '') {
                    currentNumber = ((parseFloat(previousNumber) * parseFloat(currentNumber)) / 100).toString()
                } else {
                    currentNumber = (parseFloat(currentNumber) / 100).toString()
                }
                result = eval(`${previousNumber} ${operator} ${currentNumber}`)
                display.innerText = result
                subdisplay.innerText = `${equation} = ${result}`
                currentNumber = result.toString()
                previousNumber = ''
                operator = null
                equation = ''
            }
            display.innerText = currentNumber
        } else if (buttonText === '='){
            if(previousNumber !== '' && currentNumber !== '') {
                result = eval(`${previousNumber} ${operator} ${currentNumber}`)
                display.innerText = result
                subdisplay.innerText = `${equation} = ${result}`
                currentNumber = result.toString()
                previousNumber = ''
                operator = null
                equation = ''
            }
        }

    } 
})