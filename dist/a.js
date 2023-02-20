"use strict";
var Person = /** @class */ (function () {
    function Person() {
        this.name = 'xiaozhangzhang';
    }
    Person.prototype.getName = function () {
        return this.name;
    };
    return Person;
}());
var p = new Person();
console.log(p.getName);
