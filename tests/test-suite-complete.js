// Complete KathiyawadScript Language Test Suite
const { KathiyawadScriptLanguage } = require('./KathiyawadScriptLanguage.js');
const { KathiyawadScriptTools } = require('./language-tools.js');

class CompleteLanguageTester {
    constructor() {
        this.compiler = new KathiyawadScriptLanguage();
        this.tools = new KathiyawadScriptTools();
        this.testSuites = this.initializeTestSuites();
    }

    initializeTestSuites() {
        return {
            basic: {
                name: "Basic Language Features",
                tests: [
                    {
                        name: "Variable Declarations",
                        code: `le name = "KathiyawadScript"
le version = 4.0
le isActive = true`,
                        shouldCompile: true,
                        expectedJS: true
                    },
                    {
                        name: "Constants",
                        code: `pakka PI = 3.14159
pakka MAX_SIZE = 1000`,
                        shouldCompile: true,
                        expectedJS: true
                    },
                    {
                        name: "Print Statements",
                        code: `dekhad "Hello, World!"
dekhad 42
dekhad true`,
                        shouldCompile: true,
                        expectedJS: true
                    }
                ]
            },
            
            functions: {
                name: "Functions",
                tests: [
                    {
                        name: "Basic Function",
                        code: `karyo greet(name) {
    return "Hello, " + name + "!"
}`,
                        shouldCompile: true,
                        expectedJS: true
                    },
                    {
                        name: "Function with Parameters",
                        code: `karyo add(a, b) {
    return a + b
}
le result = add(5, 3)`,
                        shouldCompile: true,
                        expectedJS: true
                    }
                ]
            },
            
            controlFlow: {
                name: "Control Flow",
                tests: [
                    {
                        name: "If Statement",
                        code: `le age = 25
vakhat age >= 18 {
    dekhad "Adult"
}`,
                        shouldCompile: true,
                        expectedJS: true
                    },
                    {
                        name: "If-Else Statement",
                        code: `le score = 85
vakhat score >= 90 {
    dekhad "A Grade"
} nahi {
    dekhad "B Grade"
}`,
                        shouldCompile: true,
                        expectedJS: true
                    },
                    {
                        name: "For Loop",
                        code: `fero i in 1..5 {
    dekhad i
}`,
                        shouldCompile: true,
                        expectedJS: true
                    },
                    {
                        name: "While Loop",
                        code: `le count = 0
jyare count < 5 {
    dekhad count
    count = count + 1
}`,
                        shouldCompile: true,
                        expectedJS: true
                    }
                ]
            },
            
            dataStructures: {
                name: "Data Structures",
                tests: [
                    {
                        name: "Arrays",
                        code: `le numbers = [1, 2, 3, 4, 5]
le fruits = ["apple", "banana", "orange"]
dekhad numbers[0]`,
                        shouldCompile: true,
                        expectedJS: true
                    },
                    {
                        name: "Objects",
                        code: `le person = {
    name: "Kiran",
    age: 25,
    city: "Rajkot"
}
dekhad person.name`,
                        shouldCompile: true,
                        expectedJS: true
                    }
                ]
            },
            
            expressions: {
                name: "Expressions",
                tests: [
                    {
                        name: "Arithmetic Expressions",
                        code: `le a = 10
le b = 5
le sum = a + b
le product = a * b
le division = a / b`,
                        shouldCompile: true,
                        expectedJS: true
                    },
                    {
                        name: "Logical Expressions",
                        code: `le isAdult = age >= 18
le hasLicense = true
le canDrive = isAdult && hasLicense`,
                        shouldCompile: true,
                        expectedJS: true
                    },
                    {
                        name: "Ternary Operator",
                        code: `le age = 20
le status = age >= 18 ? "Adult" : "Minor"`,
                        shouldCompile: true,
                        expectedJS: true
                    }
                ]
            },
            
            advanced: {
                name: "Advanced Features",
                tests: [
                    {
                        name: "Nested Structures",
                        code: `le users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
]
fero user in users {
    vakhat user.age >= 25 {
        dekhad user.name + " is adult"
    }
}`,
                        shouldCompile: true,
                        expectedJS: true
                    },
                    {
                        name: "Complex Function",
                        code: `karyo processNumbers(numbers) {
    le result = []
    fero num in numbers {
        vakhat num > 0 {
            result.push(num * 2)
        }
    }
    return result
}`,
                        shouldCompile: true,
                        expectedJS: true
                    }
                ]
            },
            
            errorCases: {
                name: "Error Cases",
                tests: [
                    {
                        name: "Syntax Error - Missing Brace",
                        code: `vakhat true {
    dekhad "test"`,
                        shouldCompile: false,
                        expectedError: true
                    },
                    {
                        name: "Syntax Error - Invalid Token",
                        code: `le name = @invalid`,
                        shouldCompile: false,
                        expectedError: true
                    }
                ]
            }
        };
    }

    runAllTests() {
        console.log('🚀 Running Complete KathiyawadScript Language Test Suite');
        console.log('=' .repeat(70));
        
        let totalTests = 0;
        let passedTests = 0;
        let failedTests = 0;
        const results = {};
        
        for (const [suiteKey, suite] of Object.entries(this.testSuites)) {
            console.log(`\n📂 ${suite.name}`);
            console.log('-'.repeat(50));
            
            const suiteResults = {
                name: suite.name,
                tests: [],
                passed: 0,
                failed: 0
            };
            
            for (const test of suite.tests) {
                totalTests++;
                console.log(`\n  🧪 ${test.name}`);
                
                try {
                    const result = this.runSingleTest(test);
                    
                    if (result.success) {
                        console.log(`    ✅ PASSED`);
                        passedTests++;
                        suiteResults.passed++;
                    } else {
                        console.log(`    ❌ FAILED: ${result.error}`);
                        failedTests++;
                        suiteResults.failed++;
                    }
                    
                    if (result.jsCode) {
                        console.log(`    📄 Generated JS: ${result.jsCode.split('\n').length} lines`);
                    }
                    
                    if (result.features && result.features.length > 0) {
                        console.log(`    🎯 Features: ${result.features.join(', ')}`);
                    }
                    
                    suiteResults.tests.push({
                        name: test.name,
                        passed: result.success,
                        error: result.error,
                        features: result.features || []
                    });
                    
                } catch (error) {
                    console.log(`    💀 RUNTIME ERROR: ${error.message}`);
                    failedTests++;
                    suiteResults.failed++;
                    
                    suiteResults.tests.push({
                        name: test.name,
                        passed: false,
                        error: error.message,
                        features: []
                    });
                }
            }
            
            results[suiteKey] = suiteResults;
        }
        
        // Print summary
        console.log('\n' + '='.repeat(70));
        console.log('📊 TEST SUMMARY');
        console.log('='.repeat(70));
        
        for (const [key, suite] of Object.entries(results)) {
            const total = suite.passed + suite.failed;
            const percentage = total > 0 ? Math.round((suite.passed / total) * 100) : 0;
            console.log(`${suite.name}: ${suite.passed}/${total} (${percentage}%)`);
        }
        
        console.log('\n📈 OVERALL RESULTS:');
        console.log(`✅ Passed: ${passedTests}/${totalTests} (${Math.round((passedTests/totalTests) * 100)}%)`);
        console.log(`❌ Failed: ${failedTests}/${totalTests} (${Math.round((failedTests/totalTests) * 100)}%)`);
        
        if (passedTests === totalTests) {
            console.log('\n🎉 ALL TESTS PASSED! KathiyawadScript is ready for production!');
        } else {
            console.log(`\n⚠️  ${failedTests} test(s) failed. Review implementation.`);
        }
        
        // Feature analysis
        this.analyzeLanguageFeatures(results);
        
        return {
            total: totalTests,
            passed: passedTests,
            failed: failedTests,
            percentage: Math.round((passedTests/totalTests) * 100),
            suites: results
        };
    }

    runSingleTest(test) {
        try {
            const compileResult = this.compiler.compile(test.code);
            
            if (test.shouldCompile) {
                if (!compileResult.success) {
                    return {
                        success: false,
                        error: `Expected compilation to succeed, but got: ${compileResult.error}`
                    };
                }
                
                // Test JavaScript execution if expected
                if (test.expectedJS) {
                    try {
                        const func = new Function(compileResult.code);
                        func(); // Try to execute
                    } catch (jsError) {
                        return {
                            success: false,
                            error: `Generated JavaScript is invalid: ${jsError.message}`
                        };
                    }
                }
                
                return {
                    success: true,
                    jsCode: compileResult.code,
                    features: compileResult.metadata?.features || []
                };
                
            } else {
                // Test should fail compilation
                if (compileResult.success) {
                    return {
                        success: false,
                        error: `Expected compilation to fail, but it succeeded`
                    };
                }
                
                return {
                    success: true,
                    error: compileResult.error
                };
            }
            
        } catch (error) {
            return {
                success: false,
                error: error.message
            };
        }
    }

    analyzeLanguageFeatures(results) {
        console.log('\n🔍 LANGUAGE FEATURE ANALYSIS');
        console.log('='.repeat(70));
        
        const allFeatures = new Set();
        const implementedFeatures = new Set();
        
        // Collect all features from tests
        for (const suite of Object.values(results)) {
            for (const test of suite.tests) {
                if (test.features) {
                    test.features.forEach(feature => {
                        allFeatures.add(feature);
                        if (test.passed) {
                            implementedFeatures.add(feature);
                        }
                    });
                }
            }
        }
        
        const coverage = allFeatures.size > 0 ? 
            Math.round((implementedFeatures.size / allFeatures.size) * 100) : 100;
        
        console.log(`📈 Feature Implementation: ${implementedFeatures.size}/${allFeatures.size} (${coverage}%)`);
        
        if (implementedFeatures.size > 0) {
            console.log('\n✅ Implemented Features:');
            Array.from(implementedFeatures).sort().forEach(feature => {
                console.log(`   • ${feature}`);
            });
        }
        
        const missingFeatures = Array.from(allFeatures).filter(f => !implementedFeatures.has(f));
        if (missingFeatures.length > 0) {
            console.log('\n❌ Missing Features:');
            missingFeatures.forEach(feature => {
                console.log(`   • ${feature}`);
            });
        }
    }

    // Performance benchmarks
    runPerformanceBenchmarks() {
        console.log('\n⚡ PERFORMANCE BENCHMARKS');
        console.log('='.repeat(70));
        
        const benchmarks = [
            {
                name: "Simple Variable Declaration",
                code: `le x = 42`,
                iterations: 1000
            },
            {
                name: "Function Declaration",
                code: `karyo test() { return 42 }`,
                iterations: 500
            },
            {
                name: "Complex Expression",
                code: `le result = (a + b) * c / d && e || f`,
                iterations: 300
            },
            {
                name: "Control Flow",
                code: `vakhat x > 0 { dekhad x } nahi { dekhad "negative" }`,
                iterations: 200
            }
        ];
        
        benchmarks.forEach(benchmark => {
            const startTime = process.hrtime.bigint();
            
            for (let i = 0; i < benchmark.iterations; i++) {
                this.compiler.compile(benchmark.code);
            }
            
            const endTime = process.hrtime.bigint();
            const totalTime = Number(endTime - startTime) / 1000000; // Convert to milliseconds
            const avgTime = totalTime / benchmark.iterations;
            
            console.log(`${benchmark.name}:`);
            console.log(`  Total: ${totalTime.toFixed(2)}ms for ${benchmark.iterations} iterations`);
            console.log(`  Average: ${avgTime.toFixed(4)}ms per compilation`);
            console.log(`  Rate: ${Math.round(benchmark.iterations / (totalTime / 1000))} compilations/second`);
            console.log('');
        });
    }

    // Generate language documentation
    generateDocumentation() {
        console.log('\n📚 GENERATING LANGUAGE DOCUMENTATION');
        console.log('='.repeat(70));
        
        const docs = {
            version: "4.0",
            description: "KathiyawadScript - A modern programming language with Gujarati keywords",
            features: [
                "Variables and Constants",
                "Functions",
                "Classes and Objects",
                "Control Flow (if/else, loops)",
                "Data Structures (arrays, objects)",
                "Type System",
                "Error Handling",
                "Modules and Imports",
                "Async Programming"
            ],
            syntax: {
                variables: "le name = value",
                constants: "pakka NAME = value",
                functions: "karyo name(params) { body }",
                conditionals: "vakhat condition { body }",
                loops: "fero item in iterable { body }",
                output: "dekhad expression"
            },
            examples: Object.values(this.testSuites)
                .filter(suite => suite.name !== "Error Cases")
                .map(suite => ({
                    category: suite.name,
                    tests: suite.tests.map(test => ({
                        name: test.name,
                        code: test.code
                    }))
                }))
        };
        
        console.log('✅ Documentation generated successfully');
        console.log(`📄 Features documented: ${docs.features.length}`);
        console.log(`📝 Examples included: ${docs.examples.reduce((sum, cat) => sum + cat.tests.length, 0)}`);
        
        return docs;
    }
}

// Run tests if called directly
if (require.main === module) {
    const tester = new CompleteLanguageTester();
    
    console.log('🎯 KathiyawadScript Complete Language Test Suite v4.0\n');
    
    // Run all tests
    const results = tester.runAllTests();
    
    // Run performance benchmarks
    tester.runPerformanceBenchmarks();
    
    // Generate documentation
    const docs = tester.generateDocumentation();
    
    console.log('\n🏁 Testing Complete!');
    process.exit(results.failed > 0 ? 1 : 0);
}

module.exports = { CompleteLanguageTester };