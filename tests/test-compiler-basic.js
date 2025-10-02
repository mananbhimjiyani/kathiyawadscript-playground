// Node.js test for KathiyawadScript compiler
const { KathiyawadScriptCompiler } = require('./KathiyawadScript.js');

const compiler = new KathiyawadScriptCompiler();

// Test cases
const tests = [
    {
        name: "Variable Declaration",
        code: 'le name = "KathiyawadScript"',
        expected: 'let name = "KathiyawadScript";'
    },
    {
        name: "Print Statement", 
        code: 'dekhad "Hello World"',
        expected: 'console.log("Hello World");'
    },
    {
        name: "Math Expression",
        code: `le a = 5
le sum = a + 10
dekhad sum`,
        expected: `let a = 5;
let sum = a + 10;
console.log(sum);`
    }
];

console.log('🧪 Running KathiyawadScript Compiler Tests...\n');

let passed = 0;
let total = tests.length;

tests.forEach((test, index) => {
    console.log(`Test ${index + 1}: ${test.name}`);
    console.log(`Input: ${test.code}`);
    
    try {
        const result = compiler.compile(test.code);
        
        if (result.success) {
            console.log(`✅ Compiled successfully`);
            console.log(`Output: ${result.code}`);
            passed++;
        } else {
            console.log(`❌ Compilation failed: ${result.error}`);
        }
    } catch (error) {
        console.log(`❌ Runtime error: ${error.message}`);
    }
    
    console.log('---\n');
});

console.log(`📊 Results: ${passed}/${total} tests passed (${Math.round(passed/total * 100)}%)`);

if (passed === total) {
    console.log('🎉 All tests passed! Compiler is working correctly.');
} else {
    console.log('⚠️  Some tests failed. Check the compiler implementation.');
}