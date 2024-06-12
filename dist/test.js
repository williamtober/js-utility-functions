"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const errors = [];
// evaluateObject test
const sampleObject = {
    a: 1,
    b: "string",
    c: {
        d: 10,
        e: [5, 3, 9],
        f: {
            g: 2,
            h: 20
        }
    }
};
try {
    const result = (0, _1.evaluateObject)(sampleObject);
    console.log(result);
}
catch (e) {
    errors.push(e);
}
// overrideRW test
// sample object needs to have immutable properties and nested objects
const sampleObject2 = {
    a: 1,
    b: 'string',
    c: {
        d: 10,
        e: [5, 3, 9],
        f: [1, 2, 3]
    }
};
try {
    const result = (0, _1.overrideRW)(sampleObject2);
    console.log(result);
}
catch (e) {
    errors.push(e);
}
try {
    const result = (0, _1.createInterfaceRef)();
    console.log(result);
}
catch (e) {
    errors.push(e);
}
const sampleRef = (0, _1.createInterfaceRef)();
try {
    const result = (0, _1.analyzeInterface)(sampleRef);
    console.log(result);
}
catch (err) {
    errors.push(err);
}
if (errors.length > 0) {
    console.error('Errors found in tests');
}
else {
    console.log('All tests passed');
}
