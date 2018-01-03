import math from 'mathjs';

export default {
  methods: {
    isSymbols(expression) {
      // Function to check that user did not enter a transformation that doesn't include 'x' or 'y'
      // E.g. x*2+c would throw an error
      let result = 0;

      // console.log("Expression", expression);
      // Mathjs to parse each transformation into a node
      const nodeParsed = math.parse(expression);
      // console.log("Parsed Nodes", node_parsed);

      nodeParsed.forEach((el) => {
        const t = el.filter(n => n.isSymbolNode);

        t.forEach((item) => {
          result += (item.name !== 'y' && el.name !== 'x');
        });
      });

      // console.log("result", result);
      return result > 0;
    },
  },
};
