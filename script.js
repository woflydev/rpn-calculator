new Vue({
	// vue frontend boilerplate
  el: '#app',

  data: {
    formula: '5.46 6.13 * 7.153 + 8.12 9 + * 424 / -2.128 ^ 10.1 - 3.0258 * 2.1 * 1.7 /',
    answer: "",
    valid: true,
    validOperators: ['*', 'x', '/', '-', '+', '%', '^'] },

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
		
    evaluate: function () {
			// viewmodel boilerplate
			var vm = this;
			
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
					"check console with control+shift+i.",
					"something's wrong with your formula.",
					"control+shift+i."
        ];

        return errorArray[Math.floor(Math.random() * errorArray.length)];
      }

			/*
			Container function for the reverse polish notation algorithm.
			*/
      function reversePolish(newExpr) {
				console.log("\nNew calculation!");
				
				// dynamic array from input formula
				let trimmed = newExpr.trim();
        let trimmedExpression = trimmed.split(" ");
        let stack = [];

        for (let i = 0; i < trimmedExpression.length; i++) {
					// if is number AND is finite, will be number. must also check
          if (!isNaN(trimmedExpression[i]) && isFinite(trimmedExpression[i])) {
						stack.push(trimmedExpression[i]);
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
						
						switch (trimmedExpression[i]) {
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
								console.log("Invalid operator: " + trimmedExpression[i]);
								break;
						}
          }
        }
      
				let calculationResult = stack[0];

				// if there is more than one item in the stack, something went wrong
				// validates result to ensure there wasn't error
        if (isNaN(calculationResult) || calculationResult === "" || !isFinite(calculationResult) || stack.length != 1) {
					switch (calculationResult) {
						case "":
							calculationResult = "Invalid formula.";
							break;
						case Infinity:
							calculationResult = "Infinity.";
							break;
						case -Infinity:
							calculationResult = "-Infinity.";
							break;
						default:
							calculationResult = "Non-mathematical formula.";
							break;
					}
					
					console.log("Invalid formula: " + vm.formula + " | Finished with error: " + calculationResult); vm.answer = errorMsg(); vm.valid = false;
        }

        else {					
					console.log("Result: " + calculationResult + " | Formula: " + vm.formula + " | Obtained in " + trimmedExpression.length + " steps."); vm.answer = calculationResult; vm.valid = true;
        }
      }
			
			// nooo you cant just chuck everything in one function
			// haha vue go brr
			reversePolish(this.formula);
}}});