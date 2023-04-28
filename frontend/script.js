new Vue({
  el: '#app',

  data: {
    formula: '5 5 +',
    stack: [],
    valid: true,
    validOperators: ['*', 'x', '/', '-', '+'] },


  methods: {
    compute: function () {
      function randomErrorMessage() {
        const errorArray = [
          "L bozo ur formula is wrong lol.",
          "ur formula is wrong lol.",
          "learn rpn before u try this again.",
          "the formula's wrong, learn rpn bro."
        ]
        return errorArray[Math.floor(Math.random(0, errorArray.length) * errorArray.length)];
      }


      function reversePolish(newExpr) {
        let expr = newExpr.split(" ");
        let stack = [];
        
        if(expr === ''){
          return 0;
        }
      
        for (let i = 0; i < expr.length; i++) {
          if (!isNaN(expr[i]) && isFinite(expr[i])) {
            stack.push(expr[i]);
          }
          
          else {
            let a = stack.pop();
            let b = stack.pop();
            if(expr[i] === "+") {
              stack.push(parseInt(a) + parseInt(b));
            } else if(expr[i] === "-") {
                stack.push(parseInt(b) - parseInt(a));
              } else if(expr[i] === "*") {
                  stack.push(parseInt(a) * parseInt(b));
              } else if(expr[i] === "/") {
                  stack.push(parseInt(b) / parseInt(a));
              } else if(expr[i] === "^") {
                  stack.push(Math.pow(parseInt(b), parseInt(a)));
              }
          }
        }
      
        if (stack.length > 1) {
          return "ERROR";
        } 
        
        else {
          console.log(stack[0])
          return stack[0];
        }
      }
      
      this.stack = [];

      this.stack.push(reversePolish(this.formula));

      if (this.stack.length != 1 || isNaN(this.stack[0])) {
        this.stack = [];
        this.stack.push(randomErrorMessage());
        this.valid = false;
      } 
      else {
        this.valid = true;
      }

      /*for (var i = 0; i < this.formula.length; i++) {
        var char = this.formula.substring(i, i + 1);

        if (!isNaN(char) && char != " ") {
          // pushes the character
          this.stack.push(+char);
          console.log("Adding new number to stack! The stack is now: ", this.stack);
        } else if (char === " ") {
          console.log("Continuing...")
          continue;
        } else {

          var num1 = this.stack[this.stack.length - 2];
          var num2 = this.stack[this.stack.length - 1];
          var result = null;

          this.stack.splice(this.stack.length - 1, 1);
          this.stack.splice(this.stack.length - 1, 1);

          switch (char) {
            case "+":
              result = num1 + num2;
              console.log("Adding " + num1 + "+" + num2);
              break;

            case "-":
              result = num1 - num2;
              console.log("Subtracting " + num1 + "-" + num2);
              break;

            case "x": case "*":
              result = num1 * num2;
              console.log("Multiplying " + num1 + "*" + num2);
              break;

            case "/":
              result = num1 / num2;
              console.log("Dividing " + num1 + "/" + num2);
              break;
          }


          this.stack.push(result);
          console.log("Pushing the result of " + result + " on to the stack", this.stack);
        }
      }
      if (this.stack.length != 1 || isNaN(this.stack[0])) {
        this.stack = [];
        this.stack.push("Invalid formula");
        this.valid = false;
      } else {
        this.valid = true;
      }*/
    } } });