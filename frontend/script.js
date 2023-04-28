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
          "check console for error logs.",
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

            if (expr[i] === "+") {
              console.log("Adding " + a + " and " + b + ".");
              stack.push(parseInt(a) + parseInt(b));
            } 
            else if (expr[i] === "-") {
              stack.push(parseInt(b) - parseInt(a));
            } 
            else if (expr[i] === "*") {
              stack.push(parseInt(a) * parseInt(b));
            } 
            else if (expr[i] === "/") {
              stack.push(parseInt(b) / parseInt(a));
            }
            else if (expr[i] === "^") {
              stack.push(Math.pow(parseInt(b), parseInt(a)));
            }
          }
        }
      
        if (stack.length > 1) {
          return "error";
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