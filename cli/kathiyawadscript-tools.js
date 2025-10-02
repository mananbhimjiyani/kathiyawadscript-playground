// KathiyawadScript Language Tools and Utilities
const { KathiyawadScriptLanguage } = require('../core/kathiyawadscript-compiler.js');

class KathiyawadScriptTools {
    constructor() {
        this.compiler = new KathiyawadScriptLanguage();
        this.standardLibrary = this.initializeStandardLibrary();
    }

    initializeStandardLibrary() {
        return {
            // String utilities
            string: {
                length: (str) => str.length,
                upper: (str) => str.toUpperCase(),
                lower: (str) => str.toLowerCase(),
                substring: (str, start, end) => str.substring(start, end),
                contains: (str, search) => str.includes(search),
                split: (str, delimiter) => str.split(delimiter),
                trim: (str) => str.trim(),
                replace: (str, search, replace) => str.replace(search, replace)
            },
            
            // Array utilities
            array: {
                length: (arr) => arr.length,
                push: (arr, item) => arr.push(item),
                pop: (arr) => arr.pop(),
                shift: (arr) => arr.shift(),
                unshift: (arr, item) => arr.unshift(item),
                slice: (arr, start, end) => arr.slice(start, end),
                map: (arr, fn) => arr.map(fn),
                filter: (arr, fn) => arr.filter(fn),
                reduce: (arr, fn, initial) => arr.reduce(fn, initial),
                find: (arr, fn) => arr.find(fn),
                includes: (arr, item) => arr.includes(item),
                sort: (arr, fn) => arr.sort(fn),
                reverse: (arr) => arr.reverse()
            },
            
            // Math utilities
            math: {
                abs: (x) => Math.abs(x),
                max: (...args) => Math.max(...args),
                min: (...args) => Math.min(...args),
                round: (x) => Math.round(x),
                floor: (x) => Math.floor(x),
                ceil: (x) => Math.ceil(x),
                random: () => Math.random(),
                sqrt: (x) => Math.sqrt(x),
                pow: (x, y) => Math.pow(x, y),
                sin: (x) => Math.sin(x),
                cos: (x) => Math.cos(x),
                tan: (x) => Math.tan(x),
                PI: Math.PI,
                E: Math.E
            },
            
            // Object utilities
            object: {
                keys: (obj) => Object.keys(obj),
                values: (obj) => Object.values(obj),
                entries: (obj) => Object.entries(obj),
                assign: (target, ...sources) => Object.assign(target, ...sources),
                freeze: (obj) => Object.freeze(obj),
                seal: (obj) => Object.seal(obj)
            },
            
            // Type utilities
            type: {
                isString: (value) => typeof value === 'string',
                isNumber: (value) => typeof value === 'number',
                isBoolean: (value) => typeof value === 'boolean',
                isArray: (value) => Array.isArray(value),
                isObject: (value) => typeof value === 'object' && value !== null && !Array.isArray(value),
                isFunction: (value) => typeof value === 'function',
                isNull: (value) => value === null,
                isUndefined: (value) => value === undefined
            },
            
            // Console utilities
            console: {
                log: (...args) => console.log(...args),
                error: (...args) => console.error(...args),
                warn: (...args) => console.warn(...args),
                info: (...args) => console.info(...args),
                clear: () => console.clear(),
                time: (label) => console.time(label),
                timeEnd: (label) => console.timeEnd(label)
            }
        };
    }

    // Language Server Protocol features
    getCompletions(code, position) {
        const keywords = [
            'le', 'pakka', 'karyo', 'class', 'interface', 'enum',
            'vakhat', 'nahi', 'fero', 'jyare', 'karo',
            'dekhad', 'return', 'break', 'continue',
            'try', 'catch', 'finally', 'throw',
            'import', 'export', 'from',
            'public', 'private', 'protected', 'static',
            'async', 'await', 'new', 'this', 'super'
        ];
        
        const types = [
            'string', 'number', 'boolean', 'array', 'object', 'function', 'void'
        ];
        
        const builtins = Object.keys(this.standardLibrary);
        
        return {
            keywords: keywords.map(kw => ({
                label: kw,
                kind: 'keyword',
                detail: `KathiyawadScript keyword`,
                documentation: this.getKeywordDocumentation(kw)
            })),
            types: types.map(type => ({
                label: type,
                kind: 'type',
                detail: `Built-in type`,
                documentation: this.getTypeDocumentation(type)
            })),
            builtins: builtins.map(lib => ({
                label: lib,
                kind: 'module',
                detail: `Standard library module`,
                documentation: `Built-in ${lib} utilities`
            }))
        };
    }

    getKeywordDocumentation(keyword) {
        const docs = {
            'le': 'Declare a variable that can be reassigned',
            'pakka': 'Declare a constant that cannot be reassigned',
            'karyo': 'Define a function',
            'class': 'Define a class',
            'vakhat': 'Conditional statement (if)',
            'nahi': 'Else clause',
            'fero': 'For loop',
            'jyare': 'While loop',
            'dekhad': 'Print to console',
            'return': 'Return a value from function',
            'break': 'Break out of loop',
            'continue': 'Continue to next iteration'
        };
        return docs[keyword] || 'KathiyawadScript keyword';
    }

    getTypeDocumentation(type) {
        const docs = {
            'string': 'Text data type',
            'number': 'Numeric data type (integer or float)',
            'boolean': 'True or false value',
            'array': 'Ordered collection of items',
            'object': 'Key-value pairs',
            'function': 'Executable code block',
            'void': 'No return value'
        };
        return docs[type] || 'Built-in type';
    }

    // Syntax highlighting
    getSyntaxHighlighting(code) {
        try {
            const tokens = this.compiler.lexer(code);
            return tokens.map(token => ({
                type: token.type,
                value: token.value,
                position: token.position,
                cssClass: this.getTokenCSSClass(token)
            }));
        } catch (error) {
            return [];
        }
    }

    getTokenCSSClass(token) {
        const classMap = {
            'keyword': 'ks-keyword',
            'identifier': 'ks-identifier',
            'string': 'ks-string',
            'number': 'ks-number',
            'operator': 'ks-operator',
            'delimiter': 'ks-delimiter',
            'template': 'ks-template'
        };
        return classMap[token.type] || 'ks-default';
    }

    // Error diagnostics
    getDiagnostics(code) {
        const diagnostics = [];
        
        try {
            const result = this.compiler.compile(code);
            if (!result.success) {
                diagnostics.push({
                    severity: 'error',
                    message: result.error,
                    line: this.extractLineFromError(result.error),
                    column: this.extractColumnFromError(result.error)
                });
            }
        } catch (error) {
            diagnostics.push({
                severity: 'error',
                message: error.message,
                line: 1,
                column: 1
            });
        }
        
        return diagnostics;
    }

    extractLineFromError(error) {
        const match = error.match(/line (\d+)/);
        return match ? parseInt(match[1]) : 1;
    }

    extractColumnFromError(error) {
        const match = error.match(/column (\d+)/);
        return match ? parseInt(match[1]) : 1;
    }

    // Code formatting
    formatCode(code) {
        try {
            const result = this.compiler.compile(code);
            if (result.success) {
                return this.formatJavaScript(result.code);
            }
            return code; // Return original if compilation fails
        } catch (error) {
            return code;
        }
    }

    formatJavaScript(jsCode) {
        // Simple JavaScript formatter
        let formatted = jsCode;
        let indentLevel = 0;
        const lines = formatted.split('\n');
        
        const formattedLines = lines.map(line => {
            const trimmed = line.trim();
            if (!trimmed) return '';
            
            // Decrease indent for closing braces
            if (trimmed.startsWith('}')) {
                indentLevel = Math.max(0, indentLevel - 1);
            }
            
            const indented = '  '.repeat(indentLevel) + trimmed;
            
            // Increase indent for opening braces
            if (trimmed.endsWith('{')) {
                indentLevel++;
            }
            
            return indented;
        });
        
        return formattedLines.join('\n');
    }

    // Code analysis
    analyzeCode(code) {
        try {
            const result = this.compiler.compile(code);
            if (!result.success) {
                return {
                    success: false,
                    error: result.error
                };
            }
            
            const analysis = {
                success: true,
                metrics: {
                    lines: code.split('\n').length,
                    tokens: result.tokens.length,
                    astNodes: result.metadata.astNodeCount,
                    features: result.metadata.features
                },
                complexity: this.calculateComplexity(result.ast),
                suggestions: this.generateSuggestions(result.ast, code)
            };
            
            return analysis;
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    calculateComplexity(ast) {
        let complexity = 1; // Base complexity
        
        const traverse = (node) => {
            if (!node || typeof node !== 'object') return;
            
            // Add complexity for control flow structures
            switch (node.type) {
                case 'IfStatement':
                    complexity += 1;
                    if (node.alternate) complexity += 1;
                    break;
                case 'ForStatement':
                case 'WhileStatement':
                    complexity += 2;
                    break;
                case 'ConditionalExpression':
                    complexity += 1;
                    break;
                case 'LogicalExpression':
                    if (node.operator === '&&' || node.operator === '||') {
                        complexity += 1;
                    }
                    break;
            }
            
            // Traverse child nodes
            for (const key in node) {
                if (key === 'type' || key === 'position') continue;
                
                const value = node[key];
                if (Array.isArray(value)) {
                    value.forEach(traverse);
                } else if (typeof value === 'object') {
                    traverse(value);
                }
            }
        };
        
        traverse(ast);
        return complexity;
    }

    generateSuggestions(ast, code) {
        const suggestions = [];
        
        // Check for unused variables
        const declaredVars = new Set();
        const usedVars = new Set();
        
        const traverse = (node) => {
            if (!node || typeof node !== 'object') return;
            
            if (node.type === 'VariableDeclaration') {
                declaredVars.add(node.identifier);
            } else if (node.type === 'Identifier') {
                usedVars.add(node.name);
            }
            
            // Traverse child nodes
            for (const key in node) {
                if (key === 'type' || key === 'position') continue;
                
                const value = node[key];
                if (Array.isArray(value)) {
                    value.forEach(traverse);
                } else if (typeof value === 'object') {
                    traverse(value);
                }
            }
        };
        
        traverse(ast);
        
        // Find unused variables
        for (const varName of declaredVars) {
            if (!usedVars.has(varName)) {
                suggestions.push({
                    type: 'warning',
                    message: `Variable '${varName}' is declared but never used`,
                    suggestion: `Consider removing unused variable '${varName}'`
                });
            }
        }
        
        // Check for long functions
        const lines = code.split('\n');
        if (lines.length > 50) {
            suggestions.push({
                type: 'info',
                message: 'Function is quite long',
                suggestion: 'Consider breaking this into smaller functions'
            });
        }
        
        return suggestions;
    }

    // REPL (Read-Eval-Print Loop)
    createREPL() {
        const context = {
            variables: new Map(),
            functions: new Map(),
            history: []
        };
        
        return {
            evaluate: (code) => {
                try {
                    const result = this.compiler.compile(code);
                    if (!result.success) {
                        return {
                            success: false,
                            error: result.error
                        };
                    }
                    
                    // Execute the JavaScript code
                    const func = new Function('context', 'stdlib', `
                        ${result.code}
                        return { success: true };
                    `);
                    
                    const execResult = func(context, this.standardLibrary);
                    context.history.push({ code, result: execResult });
                    
                    return execResult;
                } catch (error) {
                    return {
                        success: false,
                        error: error.message
                    };
                }
            },
            
            getContext: () => context,
            clearContext: () => {
                context.variables.clear();
                context.functions.clear();
                context.history = [];
            }
        };
    }

    // Package manager simulation
    createPackageManager() {
        const packages = new Map();
        
        return {
            install: (packageName, version = 'latest') => {
                // Simulate package installation
                packages.set(packageName, {
                    name: packageName,
                    version,
                    installed: new Date(),
                    dependencies: []
                });
                
                return {
                    success: true,
                    message: `Package '${packageName}@${version}' installed successfully`
                };
            },
            
            uninstall: (packageName) => {
                if (packages.has(packageName)) {
                    packages.delete(packageName);
                    return {
                        success: true,
                        message: `Package '${packageName}' uninstalled successfully`
                    };
                } else {
                    return {
                        success: false,
                        error: `Package '${packageName}' not found`
                    };
                }
            },
            
            list: () => {
                return Array.from(packages.values());
            },
            
            info: (packageName) => {
                return packages.get(packageName) || null;
            }
        };
    }

    // Testing framework
    createTestFramework() {
        const tests = [];
        let currentSuite = null;
        
        return {
            describe: (name, fn) => {
                currentSuite = { name, tests: [] };
                tests.push(currentSuite);
                fn();
                currentSuite = null;
            },
            
            it: (description, fn) => {
                const test = {
                    description,
                    fn,
                    passed: false,
                    error: null
                };
                
                if (currentSuite) {
                    currentSuite.tests.push(test);
                } else {
                    tests.push({ name: 'Default', tests: [test] });
                }
            },
            
            expect: (actual) => ({
                toBe: (expected) => {
                    if (actual !== expected) {
                        throw new Error(`Expected ${expected}, got ${actual}`);
                    }
                },
                toEqual: (expected) => {
                    if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                        throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
                    }
                },
                toBeTruthy: () => {
                    if (!actual) {
                        throw new Error(`Expected truthy value, got ${actual}`);
                    }
                },
                toBeFalsy: () => {
                    if (actual) {
                        throw new Error(`Expected falsy value, got ${actual}`);
                    }
                }
            }),
            
            run: () => {
                const results = {
                    total: 0,
                    passed: 0,
                    failed: 0,
                    suites: []
                };
                
                tests.forEach(suite => {
                    const suiteResult = {
                        name: suite.name,
                        tests: [],
                        passed: 0,
                        failed: 0
                    };
                    
                    suite.tests.forEach(test => {
                        results.total++;
                        
                        try {
                            test.fn();
                            test.passed = true;
                            results.passed++;
                            suiteResult.passed++;
                        } catch (error) {
                            test.passed = false;
                            test.error = error.message;
                            results.failed++;
                            suiteResult.failed++;
                        }
                        
                        suiteResult.tests.push(test);
                    });
                    
                    results.suites.push(suiteResult);
                });
                
                return results;
            }
        };
    }
}

// Export for use in Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KathiyawadScriptTools };
}