new Vue({
	// vue frontend boilerplate
  el: '#app',

  data: {
    formula: '5.46 6.13 * 7.153 + 8.12 9 + * 424 / -2.128 ^ 10.1 - 3.0258 * 2.1 * 1.7 /',
    answer: "",
    valid: true,
    validOperators: ['*', 'x', '/', '-', '+'] },

  methods: {
		set: function () {
			this.formula = "3 2 +"
		},
		
		// utils for reset
		cls: function () {
			var input = document.getElementById("input");
			input.value = "";
			input.focus();
			console.clear();
			
			this.valid = true;
			this.answer = "";
		},
		
    compute: function () {
			/*
			Just for funsies, a random error message generator :)
			*/
      function errorMsg() {
        const errorArray = [
          "check console for error logs.",
					"look at error logs!",
					"try again.",
					"control+shift+i for console.",
					"not sure how to parse this.",
					"can't parse this. try again.",
					"something's wrong with your formula."
        ];
				
        return errorArray[Math.floor(Math.random() * errorArray.length)];
      }

			/*
			Container function for the reverse polish notation algorithm.
			*/
      function reversePolish(newExpr) {
				console.log("\nNew calculation!");
				
				// dynamic array from input formula
				var trimmed = newExpr.trim();
        let expr = trimmed.split(" ");
        let stack = [];
        
				// if nothing was passed into function
        if (expr === '') {
          return ["", ""];
        }
				
        for (let i = 0; i < expr.length; i++) {
					// if is number AND is finite, will be number. must also check
          if (!isNaN(expr[i]) && isFinite(expr[i])) {
            stack.push(expr[i]);
          }
					
					/*
					If !number (will pass above test), we have reached the end of 1 block.
					Time to begin calculations.
					*/
          else {
						/* 
						pops only the two most recent items, to 
						handle edge cases like 7 7 + 2 * 8 4 / - where 
						two operators are next to each other
						*/
						var a = stack.pop();
						var b = stack.pop();
						
						switch (expr[i]) {
							case "+":
								console.log("Doing " + b + " + " + a + ".");
								stack.push(parseFloat(b) + parseFloat(a));
								break;
							case "-":
								console.log("Doing " + b + " - " + a + ".");
								stack.push(parseFloat(b) - parseFloat(a));
								break;
							case "*": case "x":
								console.log("Doing " + b + " * " + a + ".");
								stack.push(parseFloat(b) * parseFloat(a));
								break;
							case "/":
								console.log("Doing " + b + " / " + a + ".");
								stack.push(parseFloat(b) / parseFloat(a));
								break;
							case "^":
								console.log("Doing " + b + " ^ " + a + ".");
								stack.push(Math.pow(parseFloat(b), parseFloat(a)));
								break;
							case "%":
								console.log("Doing " + b + " % " + a + ".");
								stack.push(parseFloat(b) % parseFloat(a));
								break;
							// secret operator hehe
							case "`":
								console.log("How did you even think of putting a backtick?");
								stack.push(69);
								break;
							default:
								console.log("Invalid operator: " + expr[i]);
								break;
						}
          }
        }
      
				// if there is more than one item in the stack, something went wrong
        if (stack.length != 1) {
          return ["", ""];
        }

        else {
          return [stack[0], expr.length];
        }
      }
			
			// calls the function and obtains result
      var result = reversePolish(this.formula);
		
			var answer = result[0];
			var length = result[1];
		
			// validates result
			if (isNaN(answer) || answer === "" || !isFinite(answer)) {
				console.log("Invalid formula: " + this.formula);
				this.answer = errorMsg();
				this.valid = false;
			}
			
			else {
				console.log("Result: " + answer + " | Formula: " + this.formula + " | Obtained in " + length + " steps.");
				this.answer = answer;
				this.valid = true;
			}
}}});