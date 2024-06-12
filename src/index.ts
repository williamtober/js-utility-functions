type VariableInfo = {
    type: string;
    readable: boolean;
    writable: boolean;
    size: number;
};

type EvaluationResult = {
    [key: string]: VariableInfo | number | string;
    maxNumber: number;
    minNumber: number;
    maxDepth: number;
    minDepth: number;
    totalSize: string;
    timeComplexity: string;
    spaceComplexity: string;
};

export function evaluateObject(obj: any): EvaluationResult {
    let maxNumber = Number.NEGATIVE_INFINITY;
    let minNumber = Number.POSITIVE_INFINITY;
    const result: { [key: string]: VariableInfo } = {};
    let numberOfKeys = 0;
    let maxDepth = 0;
    let minDepth = Number.POSITIVE_INFINITY;
    let totalSize = 0;

    function getSizeOfValue(value: any): number {
        if (typeof value === 'string') {
            return value.length * 2; // Approximate size in bytes
        } else if (typeof value === 'number') {
            return 8; // Size of a number in bytes
        } else if (typeof value === 'boolean') {
            return 4; // Size of a boolean in bytes
        } else if (value === null) {
            return 4; // Size of null in bytes
        } else if (Array.isArray(value)) {
            return value.reduce((sum, item) => sum + getSizeOfValue(item), 0);
        } else if (typeof value === 'object') {
            return getSizeOfObject(value);
        } else {
            return 0; // For undefined or other types
        }
    }

    function getSizeOfObject(obj: any): number {
        let size = 0;
        for (const key in obj) {
            size += getSizeOfValue(obj[key]);
        }
        return size;
    }

    function traverse(obj: any, depth: number = 1, path: string = ''): void {
        maxDepth = Math.max(maxDepth, depth);
        minDepth = Math.min(minDepth, depth);

        for (const key in obj) {
            numberOfKeys++;
            const value = obj[key];
            const fullPath = path ? `${path}.${key}` : key;
            const descriptor = Object.getOwnPropertyDescriptor(obj, key);
            const readable = descriptor ? (descriptor.enumerable || false) : true;
            const writable = descriptor ? !!descriptor.writable : true;
            const size = getSizeOfValue(value);
            totalSize += size;

            if (typeof value === 'number') {
                result[fullPath] = { type: 'number', readable, writable, size };
                if (value > maxNumber) {
                    maxNumber = value;
                }
                if (value < minNumber) {
                    minNumber = value;
                }
            } else if (typeof value === 'string') {
                result[fullPath] = { type: 'string', readable, writable, size };
            } else if (typeof value === 'boolean') {
                result[fullPath] = { type: 'boolean', readable, writable, size };
            } else if (value === null) {
                result[fullPath] = { type: 'null', readable, writable, size };
            } else if (Array.isArray(value)) {
                result[fullPath] = { type: 'array', readable, writable, size };
                traverse(value, depth + 1, fullPath);
            } else if (typeof value === 'object') {
                result[fullPath] = { type: 'object', readable, writable, size };
                traverse(value, depth + 1, fullPath);
            } else if (typeof value === 'undefined') {
                result[fullPath] = { type: 'undefined', readable, writable, size };
            }
        }
    }

    traverse(obj);

    // Correct minDepth if it didn't find any objects
    if (minDepth === Number.POSITIVE_INFINITY) {
        minDepth = 0;
    }

    // Calculate complexities
    const timeComplexity = `O(${numberOfKeys})`;
    const spaceComplexity = `O(${numberOfKeys})`;
    const totalSizeInKB = (totalSize / 1024).toFixed(2) + ' KB';

    return { ...result, maxNumber, minNumber, maxDepth, minDepth, totalSize: totalSizeInKB, timeComplexity, spaceComplexity };
}

// cheeky way to make all properties of an object writable
export function overrideRW(obj: any): any {
    function traverse(obj: any): void {
        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const descriptor = Object.getOwnPropertyDescriptor(obj, key);
                if (descriptor) {
                    // Make property readable (enumerable) and writable
                    Object.defineProperty(obj, key, {
                        enumerable: true,
                        writable: true,
                    });
                }

                const value = obj[key];
                if (typeof value === 'object' && value !== null) {
                    traverse(value);
                }
            }
        }
    }

    traverse(obj);
    // Return the modified object
    return obj;
}

type PropertyAnalysis = {
    readable: boolean;
    writable: boolean;
};

type InterfaceAnalysisResult = {
    [key: string]: PropertyAnalysis | InterfaceAnalysisResult;
};

// Function to get default values based on type
function getDefaultValue(value: any): any {
    switch (typeof value) {
      case 'string':
        return "";
      case 'number':
        return 0;
      case 'boolean':
        return false;
      case 'object':
        if (Array.isArray(value)) {
          return [];
        }
        return {}; // For nested objects, could be enhanced later tho 
      default:
        return undefined;
    }
}

// for use in useState when you want to create a placeholder object for forms.
export function createInterfaceRef<T>(): Partial<Record<keyof T, any>> {
    const ref: Partial<Record<keyof T, any>> = {} as Partial<Record<keyof T, any>>;
    for (const key in ref) {
      if (ref.hasOwnProperty(key)) {
        ref[key] = getDefaultValue(ref[key]);
      }
    }
    return ref;
}

// Function to analyze interface of an object, including readability and writability
export function analyzeInterface(obj: any): InterfaceAnalysisResult {
    const result: InterfaceAnalysisResult = {};

    function traverse(obj: any, path: string = ''): void {
        for (const key in obj) {
            const value = obj[key];
            const fullPath = path ? `${path}.${key}` : key;
            const descriptor = Object.getOwnPropertyDescriptor(obj, key);
            const readable = descriptor ? (descriptor.enumerable || false) : true;
            const writable = descriptor ? !!descriptor.writable : true;

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                result[fullPath] = analyzeInterface(value);
            } else {
                result[fullPath] = { readable, writable };
            }
        }
    }

    traverse(obj);
    return result;
}


