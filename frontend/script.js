new Vue({
  el: '#app',

  data: {
    formula: '5 7 + 2 * 8 4 / - 3 * 9 + 6 2 - / 1 - 4 * 2 / 7 3 * -',
    stack: [],
    valid: true,
    validOperators: ['*', 'x', '/', '-', '+'] },

  methods: {
		cls: function () {
			console.clear();
		},
		
    compute: function () {
      function randomErrorMessage() {
        const errorArray = [
          "check console for error logs.",
					"look at error logs!",
					"formula invalid, try again."
        ]
				
        return errorArray[Math.floor(Math.random(0, errorArray.length) * errorArray.length)];
      }

      function reversePolish(newExpr) {
				console.log("\nNew calculation!");
				
        let expr = newExpr.split(" ");
        let stack = [];
        
        if (expr === '') {
          return;
        }
				
        for (let i = 0; i < expr.length; i++) {
          if (!isNaN(expr[i]) && isFinite(expr[i])) {
            stack.push(expr[i]);
          }
          
          else {
						console.log("Items in stack: [" + stack + "]");
						
            let a = stack.pop();
            let b = stack.pop();

						switch (expr[i]) {
							case "+":
								console.log("Adding " + a + " and " + b + ".");
								stack.push(parseFloat(a) + parseFloat(b));
								break;
							case "-":
								console.log("Subtracting " + a + " and " + b + ".");
								stack.push(parseFloat(b) - parseFloat(a));
								break;
							case "*":
								console.log("Multiplying " + a + " and " + b + ".");
								stack.push(parseFloat(a) * parseFloat(b));
								break;
							case "/":
								console.log("Dividing " + a + " and " + b + ".");
								stack.push(parseFloat(b) / parseFloat(a));
								break;
							case "^":
								console.log("Exponentiating " + a + " and " + b + ".");
								stack.push(Math.pow(parseFloat(b), parseFloat(a)));
								break;
							case "%":
								console.log("Modding " + a + " and " + b + ".");
								stack.push(parseFloat(b) % parseFloat(a));
								break;
							case "~":
								console.log("You found an operator that doesn't exist!");
								stack.push(69);
								break;
							default:
								console.log("Invalid operator: " + expr[i]);
								break;
						}
						
            /*if (expr[i] === "+") {
              console.log("Adding " + a + " and " + b + ".");
              stack.push(parseFloat(a) + parseFloat(b));
            } 
            else if (expr[i] === "-") {
              stack.push(parseFloat(b) - parseFloat(a));
            } 
            else if (expr[i] === "*") {
              stack.push(parseFloat(a) * parseFloat(b));
            } 
            else if (expr[i] === "/") {
              stack.push(parseFloat(b) / parseFloat(a));
            }
            else if (expr[i] === "^") {
              stack.push(Math.pow(parseFloat(b), parseFloat(a)));
            }*/
          }
        }
      
        if (stack.length > 1) {
          return;
        } 
        
        else {
          return stack[0];
        }
      }
      
      // resets the stack to prevent spam errors
      this.stack = [];

      var result = reversePolish(this.formula);
      console.log("Calculation Result: " + result);
      this.stack.push(result);

      if (this.stack.length != 1 || isNaN(this.stack[0])) {
        this.stack = [];
        this.stack.push(randomErrorMessage());
        this.valid = false;
      }
      else {
        this.valid = true;
      }
}}});