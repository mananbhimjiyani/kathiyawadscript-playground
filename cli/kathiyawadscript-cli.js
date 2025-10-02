#!/usr/bin/env node

// KathiyawadScript Command Line Interface
const fs = require('fs');
const path = require('path');
const { KathiyawadScriptLanguage } = require('../core/kathiyawadscript-compiler.js');
const { KathiyawadScriptTools } = require('./kathiyawadscript-tools.js');

class KathiyawadScriptCLI {
    constructor() {
        this.compiler = new KathiyawadScriptLanguage();
        this.tools = new KathiyawadScriptTools();
        this.version = '4.0.0';
    }

    run() {
        const args = process.argv.slice(2);
        
        if (args.length === 0) {
            this.showHelp();
            return;
        }

        const command = args[0];
        
        switch (command) {
            case 'compile':
            case 'c':
                this.compile(args.slice(1));
                break;
            case 'run':
            case 'r':
                this.run_file(args.slice(1));
                break;
            case 'repl':
                this.startREPL();
                break;
            case 'format':
            case 'fmt':
                this.format(args.slice(1));
                break;
            case 'analyze':
                this.analyze(args.slice(1));
                break;
            case 'test':
                this.test(args.slice(1));
                break;
            case 'init':
                this.init(args.slice(1));
                break;
            case 'version':
            case 'v':
                this.showVersion();
                break;
            case 'help':
            case 'h':
                this.showHelp();
                break;
            default:
                console.error(`Unknown command: ${command}`);
                this.showHelp();
                process.exit(1);
        }
    }

    compile(args) {
        if (args.length === 0) {
            console.error('Error: No input file specified');
            console.log('Usage: ks compile <input.ks> [output.js]');
            process.exit(1);
        }

        const inputFile = args[0];
        const outputFile = args[1] || inputFile.replace(/\.ks$/, '.js');

        try {
            if (!fs.existsSync(inputFile)) {
                console.error(`Error: File '${inputFile}' not found`);
                process.exit(1);
            }

            const code = fs.readFileSync(inputFile, 'utf8');
            const result = this.compiler.compile(code);

            if (result.success) {
                fs.writeFileSync(outputFile, result.code);
                console.log(`✅ Compiled successfully: ${inputFile} → ${outputFile}`);
                console.log(`📊 Tokens: ${result.tokens.length}, AST Nodes: ${result.metadata.astNodeCount}`);
                
                if (result.metadata.features.length > 0) {
                    console.log(`🎯 Features used: ${result.metadata.features.join(', ')}`);
                }
            } else {
                console.error(`❌ Compilation failed: ${result.error}`);
                process.exit(1);
            }
        } catch (error) {
            console.error(`💀 Error: ${error.message}`);
            process.exit(1);
        }
    }

    run_file(args) {
        if (args.length === 0) {
            console.error('Error: No input file specified');
            console.log('Usage: ks run <input.ks>');
            process.exit(1);
        }

        const inputFile = args[0];

        try {
            if (!fs.existsSync(inputFile)) {
                console.error(`Error: File '${inputFile}' not found`);
                process.exit(1);
            }

            const code = fs.readFileSync(inputFile, 'utf8');
            const result = this.compiler.compile(code);

            if (result.success) {
                console.log(`🚀 Running ${inputFile}...\n`);
                
                // Execute the compiled JavaScript
                const func = new Function(result.code);
                func();
            } else {
                console.error(`❌ Compilation failed: ${result.error}`);
                process.exit(1);
            }
        } catch (error) {
            console.error(`💀 Runtime error: ${error.message}`);
            process.exit(1);
        }
    }

    startREPL() {
        console.log(`🎯 KathiyawadScript REPL v${this.version}`);
        console.log('Type "exit" to quit, "help" for commands\n');

        const readline = require('readline');
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            prompt: 'ks> '
        });

        const repl = this.tools.createREPL();

        rl.prompt();

        rl.on('line', (line) => {
            const input = line.trim();

            if (input === 'exit' || input === 'quit') {
                console.log('👋 Goodbye!');
                rl.close();
                return;
            }

            if (input === 'help') {
                console.log('REPL Commands:');
                console.log('  help    - Show this help');
                console.log('  clear   - Clear REPL context');
                console.log('  history - Show command history');
                console.log('  exit    - Exit REPL');
                rl.prompt();
                return;
            }

            if (input === 'clear') {
                repl.clearContext();
                console.log('🧹 Context cleared');
                rl.prompt();
                return;
            }

            if (input === 'history') {
                const context = repl.getContext();
                console.log('📜 Command History:');
                context.history.forEach((entry, index) => {
                    console.log(`  ${index + 1}. ${entry.code}`);
                });
                rl.prompt();
                return;
            }

            if (input === '') {
                rl.prompt();
                return;
            }

            try {
                const result = repl.evaluate(input);
                if (!result.success) {
                    console.error(`❌ ${result.error}`);
                }
            } catch (error) {
                console.error(`💀 ${error.message}`);
            }

            rl.prompt();
        });

        rl.on('close', () => {
            process.exit(0);
        });
    }

    format(args) {
        if (args.length === 0) {
            console.error('Error: No input file specified');
            console.log('Usage: ks format <input.ks>');
            process.exit(1);
        }

        const inputFile = args[0];

        try {
            if (!fs.existsSync(inputFile)) {
                console.error(`Error: File '${inputFile}' not found`);
                process.exit(1);
            }

            const code = fs.readFileSync(inputFile, 'utf8');
            const formatted = this.tools.formatCode(code);

            fs.writeFileSync(inputFile, formatted);
            console.log(`✨ Formatted: ${inputFile}`);
        } catch (error) {
            console.error(`💀 Error: ${error.message}`);
            process.exit(1);
        }
    }

    analyze(args) {
        if (args.length === 0) {
            console.error('Error: No input file specified');
            console.log('Usage: ks analyze <input.ks>');
            process.exit(1);
        }

        const inputFile = args[0];

        try {
            if (!fs.existsSync(inputFile)) {
                console.error(`Error: File '${inputFile}' not found`);
                process.exit(1);
            }

            const code = fs.readFileSync(inputFile, 'utf8');
            const analysis = this.tools.analyzeCode(code);

            if (analysis.success) {
                console.log(`📊 Code Analysis for ${inputFile}:`);
                console.log(`   Lines: ${analysis.metrics.lines}`);
                console.log(`   Tokens: ${analysis.metrics.tokens}`);
                console.log(`   AST Nodes: ${analysis.metrics.astNodes}`);
                console.log(`   Complexity: ${analysis.complexity}`);
                console.log(`   Features: ${analysis.metrics.features.join(', ')}`);

                if (analysis.suggestions.length > 0) {
                    console.log('\n💡 Suggestions:');
                    analysis.suggestions.forEach(suggestion => {
                        const icon = suggestion.type === 'warning' ? '⚠️' : 'ℹ️';
                        console.log(`   ${icon} ${suggestion.message}`);
                        console.log(`      ${suggestion.suggestion}`);
                    });
                }
            } else {
                console.error(`❌ Analysis failed: ${analysis.error}`);
                process.exit(1);
            }
        } catch (error) {
            console.error(`💀 Error: ${error.message}`);
            process.exit(1);
        }
    }

    test(args) {
        console.log('🧪 Running KathiyawadScript tests...\n');
        
        try {
            const { CompleteLanguageTester } = require('./test-complete-language.js');
            const tester = new CompleteLanguageTester();
            const results = tester.runAllTests();
            
            if (results.failed > 0) {
                process.exit(1);
            }
        } catch (error) {
            console.error(`💀 Test error: ${error.message}`);
            process.exit(1);
        }
    }

    init(args) {
        const projectName = args[0] || 'my-kathiyawadscript-project';
        const projectDir = path.join(process.cwd(), projectName);

        try {
            if (fs.existsSync(projectDir)) {
                console.error(`Error: Directory '${projectName}' already exists`);
                process.exit(1);
            }

            // Create project structure
            fs.mkdirSync(projectDir);
            fs.mkdirSync(path.join(projectDir, 'src'));
            fs.mkdirSync(path.join(projectDir, 'tests'));

            // Create main.ks
            const mainKs = `# KathiyawadScript Project
# Welcome to your new project!

dekhad "Hello from KathiyawadScript!"

# Example function
karyo greet(name) {
    return "Namaste, " + name + "!"
}

# Example usage
le message = greet("Developer")
dekhad message

# Example loop
dekhad "Counting to 5:"
fero i in 1..5 {
    dekhad "Count: " + i
}
`;

            fs.writeFileSync(path.join(projectDir, 'src', 'main.ks'), mainKs);

            // Create package.json
            const packageJson = {
                name: projectName,
                version: '1.0.0',
                description: 'A KathiyawadScript project',
                main: 'src/main.ks',
                scripts: {
                    start: 'ks run src/main.ks',
                    compile: 'ks compile src/main.ks',
                    test: 'ks test'
                },
                keywords: ['kathiyawadscript'],
                author: '',
                license: 'MIT'
            };

            fs.writeFileSync(
                path.join(projectDir, 'package.json'),
                JSON.stringify(packageJson, null, 2)
            );

            // Create README.md
            const readme = `# ${projectName}

A KathiyawadScript project.

## Getting Started

\`\`\`bash
# Run the project
ks run src/main.ks

# Compile to JavaScript
ks compile src/main.ks

# Format code
ks format src/main.ks

# Analyze code
ks analyze src/main.ks
\`\`\`

## Project Structure

- \`src/\` - Source code files (.ks)
- \`tests/\` - Test files
- \`package.json\` - Project configuration

## Learn More

Visit the KathiyawadScript documentation for more information.
`;

            fs.writeFileSync(path.join(projectDir, 'README.md'), readme);

            console.log(`✅ Created new KathiyawadScript project: ${projectName}`);
            console.log('\n📁 Project structure:');
            console.log(`   ${projectName}/`);
            console.log('   ├── src/');
            console.log('   │   └── main.ks');
            console.log('   ├── tests/');
            console.log('   ├── package.json');
            console.log('   └── README.md');
            console.log('\n🚀 Get started:');
            console.log(`   cd ${projectName}`);
            console.log('   ks run src/main.ks');

        } catch (error) {
            console.error(`💀 Error creating project: ${error.message}`);
            process.exit(1);
        }
    }

    showVersion() {
        console.log(`KathiyawadScript v${this.version}`);
        console.log('A modern programming language with Gujarati keywords');
    }

    showHelp() {
        console.log(`KathiyawadScript CLI v${this.version}`);
        console.log('A modern programming language with Gujarati keywords\n');
        
        console.log('Usage: ks <command> [options]\n');
        
        console.log('Commands:');
        console.log('  compile, c <file>     Compile .ks file to JavaScript');
        console.log('  run, r <file>         Run a .ks file');
        console.log('  repl                  Start interactive REPL');
        console.log('  format, fmt <file>    Format a .ks file');
        console.log('  analyze <file>        Analyze code quality');
        console.log('  test                  Run language tests');
        console.log('  init [name]           Create new project');
        console.log('  version, v            Show version');
        console.log('  help, h               Show this help\n');
        
        console.log('Examples:');
        console.log('  ks run hello.ks       # Run a KathiyawadScript file');
        console.log('  ks compile app.ks     # Compile to JavaScript');
        console.log('  ks repl               # Start interactive mode');
        console.log('  ks init my-app        # Create new project');
    }
}

// Run CLI if called directly
if (require.main === module) {
    const cli = new KathiyawadScriptCLI();
    cli.run();
}

module.exports = { KathiyawadScriptCLI };