# Object Evaluation and Interface Analysis Module

This module provides functions for evaluating JavaScript objects and analyzing their interfaces for readability and writability.

## Usage

### Evaluating Objects

To evaluate an object and retrieve detailed information about its properties, use the `evaluateObject` function:

```typescript
import { evaluateObject } from 'object-analysis';

const obj = {
    // Your object here
};

const evaluationResult = evaluateObject(obj);
console.log(evaluationResult);
```

The `evaluateObject` function returns an `EvaluationResult` object containing information such as the maximum and minimum values, maximum depth, total size, and complexities.

### Overriding Readability and Writability

If you need to override the readability and writability of all properties of an object, you can use the `overrideRW` function:

```typescript
import { overrideRW } from 'object-analysis';

const obj = {
    // Your object here
};

const overriddenObj = overrideRW(obj);
```

This function makes all properties of the object readable and writable.

### Analyzing Interface

To analyze the interface of an object, including readability and writability of its properties, use the `analyzeInterface` function:

```typescript
import { analyzeInterface } from 'object-analysis';

const obj = {
    // Your object here
};

const interfaceAnalysisResult = analyzeInterface(obj);
console.log(interfaceAnalysisResult);
```

The `analyzeInterface` function returns an `InterfaceAnalysisResult` object containing information about the readability and writability of each property in the object's interface.

### Creating Interface Reference for Forms

If you want to create a placeholder object with default values for forms or states, you can use the `createInterfaceRef` function:

```typescript
import { createInterfaceRef } from 'object-analysis';

interface MyInterface {
    // Define your interface here
}

const interfaceRef = createInterfaceRef<MyInterface>();
console.log(interfaceRef);
```

This function creates a partial object with default values based on the specified interface.

## Types

This module exports several types that you may find useful:

- `VariableInfo`: Type definition for variable information.
- `EvaluationResult`: Type definition for the result of object evaluation.
- `PropertyAnalysis`: Type definition for property analysis.
- `InterfaceAnalysisResult`: Type definition for the result of interface analysis.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue on the GitHub repository.

---

Feel free to adjust the README to include any additional information or usage examples specific to your module's functionality or intended audience.
