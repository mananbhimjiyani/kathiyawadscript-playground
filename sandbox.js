// sandbox.js
import { KathiyawadScriptCompiler } from './KathiyawadScript.js';

const codeInput = document.getElementById('codeInput');
const jsOutput = document.getElementById('jsOutput');
const runButton = document.getElementById('runButton');
const consoleOutput = document.getElementById('consoleOutput');

runButton.addEventListener('click', () => {
    const kathiyawadCode = codeInput.value;
    consoleOutput.textContent = ''; // Clear previous output

    try {
        // 1. Compile the code
        const generatedJs = KathiyawadScriptCompiler(kathiyawadCode);
        jsOutput.value = generatedJs;

        // 2. Capture console.log and run the generated code
        const capturedLogs = [];
        const originalLog = console.log;
        
        // Temporarily override console.log
        console.log = (...args) => {
            // Convert all arguments to strings and join them
            const message = args.map(arg => {
                if (typeof arg === 'object' && arg !== null) {
                    return JSON.stringify(arg, null, 2);
                }
                return String(arg);
            }).join(' ');
            capturedLogs.push(message);
        };

        // Execute the generated code
        new Function(generatedJs)();
        
        // Restore the original console.log
        console.log = originalLog;

        // 3. Display the captured output
        consoleOutput.textContent = capturedLogs.join('\n');
        if(capturedLogs.length === 0){
            consoleOutput.textContent = "// Tamaro program chalyo pan kai print nathi thayu.";
        }

    } catch (error) {
        consoleOutput.textContent = `Vando aavyo bhai!\n\nError: ${error.message}`;
        consoleOutput.style.color = '#e74c3c'; // Make errors red
    }
});