new Vue({
	// vue frontend boilerplate
  el: '#app',

  data: {
    formula: '7.85 7 + 2 * 8.8243 4 / - 3 * 9.1453 + 6 2 - / 1.102 - 4 * 2 / 7 3 * -',
    answer: "",
    valid: true,
    validOperators: ['*', 'x', '/', '-', '+'] },

  methods: {
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
      function randomErrorMessage() {
        const errorArray = [
          "check console for error logs.",
					"look at error logs!",
					"formula invalid, try again.",
					"control+shift+i for console.",
        ]
				
        return errorArray[Math.floor(Math.random(0, errorArray.length) * errorArray.length)];
      }

			
			/*
			Container function for the reverse polish notation algorithm.
			*/
      function reversePolish(newExpr) {
				console.log("\nNew calculation!");
				
				// dynamic array from input formula
        let expr = newExpr.split(" ");
        let stack = [];
        
				// nothing is in the formula
        if (expr === '') {
          return;
        }
				
        for (let i = 0; i < expr.length; i++) {
					// if is number AND is finite, will be number
          if (!isNaN(expr[i]) && isFinite(expr[i])) {
            stack.push(expr[i]);
          }
          
					/*
					If !number (will pass above test), we have reached the end of 1 block.
					Time to begin calculations.
					*/
          else {
						console.log("Items in stack: [" + stack + "]");
						
						/* 
						pops two most recent items from stack, to 
						handle edge cases like 7 7 + 2 * 8 4 / - where 
						two operators are next to each other
						*/
						let a = stack.pop();
            let b = stack.pop();

						switch (expr[i]) {
							case "+":
								console.log("Doing " + a + " + " + b + ".");
								stack.push(parseFloat(a) + parseFloat(b));
								break;
							case "-":
								console.log("Doing " + a + " - " + b + ".");
								stack.push(parseFloat(b) - parseFloat(a));
								break;
							case "*":
								console.log("Doing " + a + " * " + b + ".");
								stack.push(parseFloat(a) * parseFloat(b));
								break;
							case "/":
								console.log("Doing " + a + " / " + b + ".");
								stack.push(parseFloat(b) / parseFloat(a));
								break;
							case "^":
								console.log("Doing " + a + " ^ " + b + ".");
								stack.push(Math.pow(parseFloat(b), parseFloat(a)));
								break;
							case "%":
								console.log("Doing " + a + " % " + b + ".");
								stack.push(parseFloat(b) % parseFloat(a));
								break;
							// secret operator
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
        if (stack.length > 1) {
          return;
        } 
        
        else {
          return stack[0];
        }
      }

			// calls the function and obtains result
      var result = reversePolish(this.formula);
      //this.stack.push(result);
			this.answer = result;
			
			console.log("Calculation Result: " + result);
			
			// validates result
      /*if (this.stack.length != 1 || isNaN(this.stack[0]) || this.stack[0] === "") {
        this.stack = [];
        this.stack.push(randomErrorMessage());
        this.valid = false;
      }
			// makes the box go green
      else {
        this.valid = true;
      }*/
}}});