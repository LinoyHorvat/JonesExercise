// TODO: Delete this file
const validator = require("validator");

const name = (val) => {
    console.log(validator.isAlpha(val));
    return validator.isAlpha(val);
}
console.log(name("123"));