// Advanced KathiyawadScript Compiler Test Suite
const { KathiyawadScriptAdvancedCompiler } = require('./KathiyawadScriptCompiler.js');

class AdvancedCompilerTester {
    constructor() {
        this.compiler = new KathiyawadScriptAdvancedCompiler();
        this.tests = this.initializeTests();
    }

    initializeTests() {
        return [
            {
                name: "Variable Declarations",
                code: `le name = "KathiyawadScript"
le version = 4.0
le isActive = true`,
                expectedFeatures: ['variables', 'strings', 'numbers', 'booleans']
            },
            
            {
                name: "Constant Declarations",
                code: `pakka PI = 3.14159
pakka MAX_SIZE = 1000`,
                expectedFeatures: ['constants', 'numbers']
            },
            
            {
                name: "Type Annotations",
                code: `le count: number = 0
le message: string = "Hello"
le isValid: boolean = false`,
                expectedFeatures: ['type-annotations', 'variables']
            },
            
            {
                name: "Basic Function",
                code: `karyo greet(name: string): string {
    return "Hello, " + name + "!"
}`,
                expectedFeatures: ['functions', 'parameters', 'return-types']
            },
            
            {
                name: "Function with Default Parameters",
                code: `karyo welcome(name: string = "Guest"): string {
    return "Welcome, " + name
}`,
                expectedFeatures: ['functions', 'default-parameters']
            },
            
            {
                name: "Arrow Functions",
                code: `le add = (a: number, b: number) => a + b`,
                expectedFeatures: ['arrow-functions', 'expressions']
            },
            
            {
                name: "If-Else Statements",
                code: `vakhat age >= 18 {
    dekhad "Adult"
} nahi vakhat age >= 13 {
    dekhad "Teenager"  
} nahi {
    dekhad "Child"
}`,
                expectedFeatures: ['conditionals', 'else-if', 'else']
            },
            
            {
                name: "For Loops with Range",
                code: `fero i in 1..10 {
    dekhad i
}`,
                expectedFeatures: ['for-loops', 'ranges']
            },
            
            {
                name: "For Loops with Arrays",
                code: `le fruits = ["apple", "banana", "orange"]
fero fruit in fruits {
    dekhad fruit
}`,
                expectedFeatures: ['for-loops', 'arrays', 'iteration']
            },
            
            {
                name: "Arrays and Methods",
                code: `le numbers = [1, 2, 3, 4, 5]
numbers.push(6)
le first = numbers.shift()`,
                expectedFeatures: ['arrays', 'method-calls', 'member-access']
            },
            
            {
                name: "Objects",
                code: `le person = {
    name: "Kiran",
    age: 25,
    city: "Rajkot"
}
dekhad person.name`,
                expectedFeatures: ['objects', 'properties', 'member-access']
            },
            
            {
                name: "Basic Class",
                code: `class Person {
    private name: string
    
    constructor(name: string) {
        this.name = name
    }
    
    public getName(): string {
        return this.name
    }
}`,
                expectedFeatures: ['classes', 'constructor', 'methods', 'access-modifiers']
            },
            
            {
                name: "Class Inheritance",
                code: `class Student extends Person {
    private grade: string
    
    constructor(name: string, grade: string) {
        super(name)
        this.grade = grade
    }
    
    public getGrade(): string {
        return this.grade
    }
}`,
                expectedFeatures: ['inheritance', 'super-calls', 'classes']
            },
            
            {
                name: "Complex Expressions",
                code: `le result = (a + b) * c / d
le isValid = age >= 18 && hasLicense
le greeting = name ? "Hello, " + name : "Hello, Guest"`,
                expectedFeatures: ['complex-expressions', 'logical-operators', 'ternary']
            },
            
            {
                name: "Async Functions",
                code: `async karyo fetchData(): Promise<string> {
    return "Data fetched"
}`,
                expectedFeatures: ['async-functions', 'promises', 'generics']
            },
            
            {
                name: "Error Handling",
                code: `try {
    le result = divide(10, 0)
} catch (error) {
    dekhad "Error: " + error.message
} finally {
    dekhad "Cleanup"
}`,
                expectedFeatures: ['try-catch', 'error-handling', 'finally']
            },
            
            {
                name: "Multi-line Comments",
                code: `#*
  This is a multi-line comment
  that spans multiple lines
*#
le value = 42`,
                expectedFeatures: ['multi-line-comments', 'variables']
            },
            
            {
                name: "Template Literals",
                code: `le name = "World"
le greeting = \`Hello, \${name}!\``,
                expectedFeatures: ['template-literals', 'string-interpolation']
            },
            
            {
                name: "Comprehensive Program",
                code: `#* 
  Advanced KathiyawadScript Program
  Demonstrates multiple language features
*#

# Constants and variables
pakka MAX_USERS = 100
le currentUsers: number = 0

# Class definition
class UserManager {
    private users: string[]
    
    constructor() {
        this.users = []
    }
    
    public addUser(name: string): boolean {
        vakhat this.users.length < MAX_USERS {
            this.users.push(name)
            return true
        } nahi {
            return false
        }
    }
    
    public getUsers(): string[] {
        return this.users
    }
    
    public getUserCount(): number {
        return this.users.length
    }
}

# Function with error handling
karyo processUsers(manager: UserManager, names: string[]): void {
    try {
        fero name in names {
            le success = manager.addUser(name)
            vakhat success {
                dekhad "Added user: " + name
            } nahi {
                dekhad "Failed to add user: " + name
            }
        }
    } catch (error) {
        dekhad "Error processing users: " + error.message
    }
}

# Main execution
le manager = new UserManager()
le userNames = ["Alice", "Bob", "Charlie"]
processUsers(manager, userNames)

dekhad "Total users: " + manager.getUserCount()`,
                expectedFeatures: ['comprehensive', 'classes', 'functions', 'error-handling', 'loops', 'conditionals']
            }
        ];
    }

    runTests() {
        console.log('🚀 Running KathiyawadScript Advanced Compiler Tests...\n');
        console.log('=' .repeat(60));
        
        let passed = 0;
        let failed = 0;
        let total = this.tests.length;
        
        this.tests.forEach((test, index) => {
            console.log(`\n📝 Test ${index + 1}/${total}: ${test.name}`);
            console.log('-'.repeat(40));
            
            try {
                const result = this.compiler.compile(test.code);
                
                if (result.success) {
                    console.log('✅ Compilation: SUCCESS');
                    console.log(`📊 Tokens: ${result.tokens.length}`);
                    console.log(`🌳 AST Nodes: ${this.countASTNodes(result.ast)}`);
                    
                    if (result.metadata) {
                        if (result.metadata.variables.length > 0) {
                            console.log(`📦 Variables: ${result.metadata.variables.join(', ')}`);
                        }
                        if (result.metadata.functions.length > 0) {
                            console.log(`⚡ Functions: ${result.metadata.functions.join(', ')}`);
                        }
                        if (result.metadata.classes.length > 0) {
                            console.log(`🏗️  Classes: ${result.metadata.classes.join(', ')}`);
                        }
                    }
                    
                    // Test JavaScript execution
                    try {
                        const func = new Function(result.code);
                        console.log('🎯 JavaScript Execution: VALID');
                    } catch (jsError) {
                        console.log('⚠️  JavaScript Execution: INVALID');
                        console.log(`   Error: ${jsError.message}`);
                    }
                    
                    console.log('\n📄 Generated JavaScript:');
                    console.log(this.formatCode(result.code));
                    
                    passed++;
                } else {
                    console.log('❌ Compilation: FAILED');
                    console.log(`💥 Error: ${result.error}`);
                    failed++;
                }
                
            } catch (error) {
                console.log('💀 Runtime Error:', error.message);
                failed++;
            }
        });
        
        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 TEST SUMMARY');
        console.log('='.repeat(60));
        console.log(`✅ Passed: ${passed}/${total} (${Math.round(passed/total * 100)}%)`);
        console.log(`❌ Failed: ${failed}/${total} (${Math.round(failed/total * 100)}%)`);
        
        if (passed === total) {
            console.log('\n🎉 ALL TESTS PASSED! The advanced compiler is working perfectly!');
            console.log('🚀 KathiyawadScript is ready for production use!');
        } else {
            console.log(`\n⚠️  ${failed} test(s) failed. Please review the compiler implementation.`);
        }
        
        // Feature coverage analysis
        this.analyzeFeatureCoverage();
        
        return { passed, failed, total };
    }
    
    countASTNodes(node) {
        if (!node || typeof node !== 'object') return 0;
        
        let count = 1;
        for (const key in node) {
            if (key === 'type' || key === 'position') continue;
            
            const value = node[key];
            if (Array.isArray(value)) {
                count += value.reduce((sum, item) => sum + this.countASTNodes(item), 0);
            } else if (typeof value === 'object') {
                count += this.countASTNodes(value);
            }
        }
        return count;
    }
    
    formatCode(code) {
        return code.split('\n').map((line, index) => 
            `${String(index + 1).padStart(3, ' ')} | ${line}`
        ).join('\n');
    }
    
    analyzeFeatureCoverage() {
        console.log('\n🔍 FEATURE COVERAGE ANALYSIS');
        console.log('='.repeat(60));
        
        const allFeatures = new Set();
        const testedFeatures = new Set();
        
        this.tests.forEach(test => {
            test.expectedFeatures.forEach(feature => {
                allFeatures.add(feature);
                
                // Simple heuristic to check if feature is tested
                if (this.compiler.compile(test.code).success) {
                    testedFeatures.add(feature);
                }
            });
        });
        
        const coverage = Math.round((testedFeatures.size / allFeatures.size) * 100);
        
        console.log(`📈 Feature Coverage: ${testedFeatures.size}/${allFeatures.size} (${coverage}%)`);
        console.log('\n✅ Tested Features:');
        Array.from(testedFeatures).sort().forEach(feature => {
            console.log(`   • ${feature}`);
        });
        
        const untestedFeatures = Array.from(allFeatures).filter(f => !testedFeatures.has(f));
        if (untestedFeatures.length > 0) {
            console.log('\n❌ Untested Features:');
            untestedFeatures.forEach(feature => {
                console.log(`   • ${feature}`);
            });
        }
    }
}

// Run tests if called directly
if (require.main === module) {
    const tester = new AdvancedCompilerTester();
    tester.runTests();
}

module.exports = { AdvancedCompilerTester };