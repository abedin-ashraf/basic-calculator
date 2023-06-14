document.addEventListener("DOMContentLoaded", function () {
    var typedNumbers = document.getElementById("typed-numbers");
    var buttons = document.getElementsByClassName("button");

    // Add event listeners to all buttons
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", handleButtonClick);
    }

    function handleButtonClick() {
        var buttonValue = this.textContent;

        if (buttonValue === "=") {
            try {
                var result = evaluateExpression(typedNumbers.value);
                typedNumbers.value = result;
            } catch (error) {
                // Handle invalid expressions or errors
                typedNumbers.value = "Error";
            }
        } else if (buttonValue === "C") {
            // Clear the input
            typedNumbers.value = "";
        } else {
            // Append the clicked button value to the input
            typedNumbers.value += buttonValue;
        }
    }

    function evaluateExpression(expression) {
        var tokens = tokenizeExpression(expression);
        var postfix = infixToPostfix(tokens);
        var result = evaluatePostfix(postfix);
        return result;
    }

    function tokenizeExpression(expression) {
        // Tokenize the expression based on numbers, operators, and parentheses
        // Implement your own logic here based on your calculator's requirements
        // Example implementation:
        var pattern = /(\d+|\+|\-|\*|\/|\(|\))/g;
        return expression.match(pattern);
    }

    function infixToPostfix(tokens) {
        // Convert infix expression to postfix using the Shunting Yard algorithm
        // Implement your own logic here based on your calculator's requirements
        // Example implementation:
        var precedence = {
            "+": 1,
            "-": 1,
            "*": 2,
            "/": 2,
        };
        var postfix = [];
        var operatorStack = [];

        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];

            if (isNumber(token)) {
                postfix.push(token);
            } else if (isOperator(token)) {
                while (
                    operatorStack.length > 0 &&
                    isOperator(operatorStack[operatorStack.length - 1]) &&
                    precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
                ) {
                    postfix.push(operatorStack.pop());
                }
                operatorStack.push(token);
            } else if (token === "(") {
                operatorStack.push(token);
            } else if (token === ")") {
                while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== "(") {
                    postfix.push(operatorStack.pop());
                }
                if (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] === "(") {
                    operatorStack.pop(); // Discard the opening parentheses
                }
            }
        }

        while (operatorStack.length > 0) {
            postfix.push(operatorStack.pop());
        }

        return postfix;
    }

    function evaluatePostfix(postfix) {
        // Evaluate the postfix expression using a stack
        // Implement your own logic here based on your calculator's requirements
        // Example implementation:
        var stack = [];

        for (var i = 0; i < postfix.length; i++) {
            var token = postfix[i];

            if (isNumber(token)) {
                stack.push(parseFloat(token));
            } else if (isOperator(token)) {
                var operand2 = stack.pop();
                var operand1 = stack.pop();
                var result;

                if (token === "+") {
                    result = operand1 + operand2;
                } else if (token === "-") {
                    result = operand1 - operand2;
                } else if (token === "*") {
                    result = operand1 * operand2;
                } else if (token === "/") {
                    result = operand1 / operand2;
                }

                stack.push(result);
            }
        }

        if (stack.length === 1) {
            return stack[0];
        } else {
            throw new Error("Invalid expression");
        }
    }

    function isNumber(token) {
        // Check if the token is a number
        // Implement your own logic here based on your calculator's requirements
        // Example implementation:
        var pattern = /^\d+$/;
        return pattern.test(token);
    }

    function isOperator(token) {
        // Check if the token is an operator
        // Implement your own logic here based on your calculator's requirements
        // Example implementation:
        var operators = ["+", "-", "*", "/"];
        return operators.includes(token);
    }
});
