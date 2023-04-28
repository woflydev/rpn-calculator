new Vue({
  el: '#app',

  data: {
    formula: '5 5 +',
    stack: [],
    valid: true,
    validOperators: ['*', 'x', '/', '-', '+'] },


  methods: {
    
    compute: function () {
      this.stack = [];
      for (var i = 0; i < this.formula.length; i++) {
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
      }
    } } });