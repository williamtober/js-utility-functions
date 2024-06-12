import { evaluateObject, overrideRW, createInterfaceRef, analyzeInterface  } from ".";

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
    const result = evaluateObject(sampleObject);
    console.log(result);
} catch (e) {
    errors.push(e);
}

// overrideRW test
// sample object needs to have immutable properties and nested objects

const sampleObject2: { a: number, b: string, c: { d: number, e: number[], f: Array<number> } } = {
    a: 1,
    b: 'string',
    c: {
        d: 10,
        e: [5, 3, 9],
        f: [1, 2, 3]
    }
};


try {
    const result = overrideRW(sampleObject2);
    console.log(result);
} catch (e) {
    errors.push(e);
}

// createInterfaceRef test
interface SampleInterface {
    a: number;
    b: string;
    c: {
        d: number;
        e: number[];
        f: {
            g: number;
            h: number;
        }
    }

}
try {
    const result = createInterfaceRef<SampleInterface>();
    console.log(result);
} catch (e) {
    errors.push(e);
}

// analyzeInterface test
interface SampleInterface2 {
    a: number;
    b: string;
    c: {
        // some Array references
        d: Array<number>;
        e: number[];
        // some nested objects
        f: {
            g: number;
            h: number;
        },
        // nested with record
        i: Record<string, number>;
        j: {
            k: Record<string, number>;
        }
    }
}

const sampleRef = createInterfaceRef<SampleInterface2>();
try {
    const result = analyzeInterface(sampleRef);
    console.log(result);
} catch(err) {
    errors.push(err);
}

if (errors.length > 0) {
    console.error('Errors found in tests');
} else {
    console.log('All tests passed');
}