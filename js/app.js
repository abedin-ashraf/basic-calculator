document.getElementById('key-pad').addEventListener('click', function (event) {
    const number = event.target.innerText;
    const calcInput = document.getElementById('typed-numbers');
    const currentValue = calcInput.value;

    if (number === '=') {
        try {
            const result = calculateExpression(currentValue);
            calcInput.value = result;
        } catch (error) {
            calcInput.value = 'Error';
        }
    } else {
        calcInput.value += number;
    }
});

function calculateExpression(expression) {
    const operators = ['+', '-', '*', '/'];
    const numbers = expression.split(/[-+*/]/).map(Number);
    const operatorsArray = expression.split('').filter(char => operators.includes(char));

    let result = numbers[0];

    for (let i = 0; i < operatorsArray.length; i++) {
        const operator = operatorsArray[i];
        const nextNumber = numbers[i + 1];

        switch (operator) {
            case '+':
                result += nextNumber;
                break;
            case '-':
                result -= nextNumber;
                break;
            case '*':
                result *= nextNumber;
                break;
            case '/':
                if (nextNumber === 0) {
                    throw new Error('Divide by zero error');
                }
                result /= nextNumber;
                break;
            default:
                break;
        }
    }

    return result;
}
