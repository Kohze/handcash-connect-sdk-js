const chai = require('chai');
chai.use(require('chai-as-promised'));

const { expect } = chai;

const definitionToMatch = (expectedStructure, actualStructure) => {
   expect(actualStructure).to.have.all.keys(Object.keys(expectedStructure));
   Object.entries(expectedStructure).forEach((value) => {
      const [name, type] = value;
      if (type instanceof Array && actualStructure[name][0] instanceof Object) {
         if (actualStructure[name].length > 0) definitionToMatch(type[0], actualStructure[name][0]);
      } else if (type instanceof Array) {
         if (actualStructure[name].length > 0) expect(actualStructure[name][0]).to.be.a(type[0]);
      } else if (type instanceof Object) {
         definitionToMatch(type, actualStructure[name]);
      } else if (actualStructure[name] !== null && type !== 'any') {
         expect(actualStructure[name]).to.be.a(type);
      }
   });
};

expect.definitionToMatch = definitionToMatch;

module.exports = chai;
