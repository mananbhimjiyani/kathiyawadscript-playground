// KathiyawadScript Complete Language Implementation v4.0
// Full-featured programming language with all modern constructs

class KathiyawadScriptLanguage {
    constructor() {
        this.keywords = new Set([
            // Variables and constants
            'le', 'pakka', 'apo',
            
            // Functions and classes
            'karyo', 'kaam', 'seva', 'varg', 'jaati', 'banavo',
            
            // Control flow
            'vakhat', 'nahi', 'joye', 'to', 'pela', 'pachhi',
            'fero', 'jyare', 'sudhi', 'karo', 'jaldi', 'aagad',
            
            // Object-oriented
            'navu', 'aa', 'baap', 'chhokro', 'gupat', 'sarvajanik',
            
            // Modules
            'lavo', 'moklo', 'mathi',
            
            // Error handling
            'koshish', 'pakdo', 'akhre', 'fenk', 'bhool',
            
            // Async
            'raah', 'vaado',
            
            // Types
            'akshar', 'sankhya', 'sachu', 'yaadi', 'khata', 'kaam', 'khaali',
            
            // Literals
            'hoy', 'nathi', 'khaali', 'anjaanu',
            
            // Logical operators
            'ane', 'ke', 'nakko',
            
            // Output
            'dekhad',
            
            // Other
            'moklo', 'in', 'of', 'prakar', 'instanceof',
            
            // Legacy support (keep for compatibility)
            'class', 'interface', 'enum', 'constructor',
            'new', 'this', 'super', 'extends', 'implements',
            'public', 'private', 'protected', 'static',
            'import', 'export', 'from',
            'try', 'catch', 'finally', 'throw',
            'async', 'await', 'Promise',
            'string', 'number', 'boolean', 'array', 'object', 'function', 'void',
            'true', 'false', 'null', 'undefined',
            'return', 'break', 'continue', 'typeof'
        ]);
        
        this.operators = [
            // Assignment
            '=', '+=', '-=', '*=', '/=', '%=',
            
            // Arithmetic
            '+', '-', '*', '/', '%', '**',
            
            // Comparison
            '==', '!=', '===', '!==', '<', '>', '<=', '>=',
            
            // Logical
            '&&', '||', '!',
            
            // Other
            '?', ':', '=>', '...', '??', '?.', '..', '++', '--'
        ];
        
        this.delimiters = ['(', ')', '[', ']', '{', '}', ',', ';', '.', ':'];
        this.builtinTypes = new Set(['string', 'number', 'boolean', 'array', 'object', 'function', 'void']);
    }

    // Complete lexer implementation
    lexer(input) {
        const tokens = [];
        let cursor = 0;
        let line = 1;
        let column = 1;

        const addToken = (type, value, position = { line, column }) => {
            tokens.push({ type, value, position });
        };

        while (cursor < input.length) {
            let char = input[cursor];

            // Handle newlines
            if (char === '\n') {
                line++;
                column = 1;
                cursor++;
                continue;
            }

            // Skip whitespace
            if (/\s/.test(char)) {
                cursor++;
                column++;
                continue;
            }

            // Handle single-line comments
            if (char === '#' && input[cursor + 1] !== '*') {
                while (cursor < input.length && input[cursor] !== '\n') {
                    cursor++;
                }
                continue;
            }

            // Handle multi-line comments
            if (char === '#' && input[cursor + 1] === '*') {
                cursor += 2;
                column += 2;
                while (cursor < input.length - 1) {
                    if (input[cursor] === '*' && input[cursor + 1] === '#') {
                        cursor += 2;
                        column += 2;
                        break;
                    }
                    if (input[cursor] === '\n') {
                        line++;
                        column = 1;
                    } else {
                        column++;
                    }
                    cursor++;
                }
                continue;
            }

            // Handle strings
            if (char === '"' || char === "'") {
                const quote = char;
                let str = '';
                cursor++; column++;
                
                while (cursor < input.length && input[cursor] !== quote) {
                    if (input[cursor] === '\\') {
                        cursor++; column++;
                        if (cursor < input.length) {
                            const escaped = input[cursor];
                            switch (escaped) {
                                case 'n': str += '\n'; break;
                                case 't': str += '\t'; break;
                                case 'r': str += '\r'; break;
                                case '\\': str += '\\'; break;
                                case '"': str += '"'; break;
                                case "'": str += "'"; break;
                                default: str += escaped; break;
                            }
                            cursor++; column++;
                        }
                    } else {
                        str += input[cursor];
                        cursor++; column++;
                    }
                }
                
                if (cursor >= input.length) {
                    throw new Error(`Unterminated string at line ${line}`);
                }
                
                cursor++; column++; // Skip closing quote
                addToken('string', str);
                continue;
            }

            // Handle template literals
            if (char === '`') {
                let str = '';
                cursor++; column++;
                
                while (cursor < input.length && input[cursor] !== '`') {
                    str += input[cursor];
                    cursor++; column++;
                }
                
                if (cursor >= input.length) {
                    throw new Error(`Unterminated template literal at line ${line}`);
                }
                
                cursor++; column++; // Skip closing backtick
                addToken('template', str);
                continue;
            }

            // Handle numbers
            if (/[0-9]/.test(char) || (char === '.' && /[0-9]/.test(input[cursor + 1]))) {
                let num = '';
                let hasDecimal = false;
                
                while (cursor < input.length) {
                    const ch = input[cursor];
                    if (/[0-9]/.test(ch)) {
                        num += ch;
                    } else if (ch === '.' && !hasDecimal) {
                        hasDecimal = true;
                        num += ch;
                    } else {
                        break;
                    }
                    cursor++; column++;
                }
                
                const value = hasDecimal ? parseFloat(num) : parseInt(num);
                addToken('number', value);
                continue;
            }

            // Handle range operator (..) first
            if (cursor < input.length - 1 && input.substr(cursor, 2) === '..') {
                addToken('operator', '..');
                cursor += 2;
                column += 2;
                continue;
            }

            // Handle multi-character operators
            let foundOperator = false;
            for (let op of this.operators.sort((a, b) => b.length - a.length)) {
                if (cursor <= input.length - op.length && input.substr(cursor, op.length) === op) {
                    addToken('operator', op);
                    cursor += op.length;
                    column += op.length;
                    foundOperator = true;
                    break;
                }
            }
            if (foundOperator) continue;

            // Handle delimiters
            if (this.delimiters.includes(char)) {
                addToken('delimiter', char);
                cursor++; column++;
                continue;
            }

            // Handle identifiers and keywords
            if (/[a-zA-Z_$]/.test(char)) {
                let word = '';
                
                while (cursor < input.length && /[a-zA-Z0-9_$]/.test(input[cursor])) {
                    word += input[cursor];
                    cursor++; column++;
                }
                
                if (this.keywords.has(word)) {
                    addToken('keyword', word);
                } else {
                    addToken('identifier', word);
                }
                continue;
            }

            // Unknown character
            throw new Error(`Unexpected character '${char}' at line ${line}, column ${column}`);
        }

        return tokens;
    }

    // Complete parser implementation
    parser(tokens) {
        const ast = { type: 'Program', body: [] };
        let current = 0;

        const peek = (offset = 0) => tokens[current + offset];
        const consume = (expectedType = null, expectedValue = null) => {
            const token = tokens[current++];
            if (expectedType && token?.type !== expectedType) {
                throw new Error(`Expected ${expectedType}, got ${token?.type} at line ${token?.position?.line}`);
            }
            if (expectedValue && token?.value !== expectedValue) {
                throw new Error(`Expected '${expectedValue}', got '${token?.value}' at line ${token?.position?.line}`);
            }
            return token;
        };

        const parseType = () => {
            const token = peek();
            if (token?.type === 'keyword' && this.builtinTypes.has(token.value)) {
                consume('keyword');
                let type = { type: 'TypeAnnotation', name: token.value };
                
                // Handle array types
                if (peek()?.value === '[' && peek(1)?.value === ']') {
                    consume('delimiter', '[');
                    consume('delimiter', ']');
                    type = { type: 'ArrayType', elementType: type };
                }
                
                return type;
            } else if (token?.type === 'identifier') {
                const name = consume('identifier').value;
                return { type: 'TypeAnnotation', name };
            }
            return null;
        };

        const parseExpression = () => {
            return parseAssignmentExpression();
        };

        const parseAssignmentExpression = () => {
            let left = parseConditionalExpression();
            
            if (peek()?.type === 'operator' && ['=', '+=', '-=', '*=', '/=', '%='].includes(peek()?.value)) {
                const operator = consume('operator');
                const right = parseAssignmentExpression();
                return {
                    type: 'AssignmentExpression',
                    operator: operator.value,
                    left,
                    right
                };
            }
            
            return left;
        };

        const parseConditionalExpression = () => {
            let expr = parseLogicalOrExpression();
            
            if (peek()?.value === '?') {
                consume('operator', '?');
                const consequent = parseExpression();
                consume('delimiter', ':');
                const alternate = parseExpression();
                return {
                    type: 'ConditionalExpression',
                    test: expr,
                    consequent,
                    alternate
                };
            }
            
            return expr;
        };

        const parseLogicalOrExpression = () => {
            let left = parseLogicalAndExpression();
            
            while (peek()?.value === '||') {
                const operator = consume('operator');
                const right = parseLogicalAndExpression();
                left = {
                    type: 'LogicalExpression',
                    operator: operator.value,
                    left,
                    right
                };
            }
            
            return left;
        };

        const parseLogicalAndExpression = () => {
            let left = parseEqualityExpression();
            
            while (peek()?.value === '&&') {
                const operator = consume('operator');
                const right = parseEqualityExpression();
                left = {
                    type: 'LogicalExpression',
                    operator: operator.value,
                    left,
                    right
                };
            }
            
            return left;
        };

        const parseEqualityExpression = () => {
            let left = parseRelationalExpression();
            
            while (peek()?.type === 'operator' && ['==', '!=', '===', '!=='].includes(peek()?.value)) {
                const operator = consume('operator');
                const right = parseRelationalExpression();
                left = {
                    type: 'BinaryExpression',
                    operator: operator.value,
                    left,
                    right
                };
            }
            
            return left;
        };

        const parseRelationalExpression = () => {
            let left = parseAdditiveExpression();
            
            while (peek()?.type === 'operator' && ['<', '>', '<=', '>='].includes(peek()?.value)) {
                const operator = consume('operator');
                const right = parseAdditiveExpression();
                left = {
                    type: 'BinaryExpression',
                    operator: operator.value,
                    left,
                    right
                };
            }
            
            return left;
        };

        const parseAdditiveExpression = () => {
            let left = parseMultiplicativeExpression();
            
            while (peek()?.type === 'operator' && ['+', '-'].includes(peek()?.value)) {
                const operator = consume('operator');
                const right = parseMultiplicativeExpression();
                left = {
                    type: 'BinaryExpression',
                    operator: operator.value,
                    left,
                    right
                };
            }
            
            return left;
        };

        const parseMultiplicativeExpression = () => {
            let left = parseUnaryExpression();
            
            while (peek()?.type === 'operator' && ['*', '/', '%'].includes(peek()?.value)) {
                const operator = consume('operator');
                const right = parseUnaryExpression();
                left = {
                    type: 'BinaryExpression',
                    operator: operator.value,
                    left,
                    right
                };
            }
            
            return left;
        };

        const parseUnaryExpression = () => {
            if (peek()?.type === 'operator' && ['!', '-', '+'].includes(peek()?.value)) {
                const operator = consume('operator');
                const argument = parseUnaryExpression();
                return {
                    type: 'UnaryExpression',
                    operator: operator.value,
                    argument
                };
            }
            
            return parsePostfixExpression();
        };

        const parsePostfixExpression = () => {
            let expr = parsePrimaryExpression();
            
            while (true) {
                if (peek()?.value === '[') {
                    consume('delimiter', '[');
                    const property = parseExpression();
                    consume('delimiter', ']');
                    expr = {
                        type: 'MemberExpression',
                        object: expr,
                        property,
                        computed: true
                    };
                } else if (peek()?.value === '.') {
                    consume('delimiter', '.');
                    const property = consume('identifier');
                    expr = {
                        type: 'MemberExpression',
                        object: expr,
                        property: { type: 'Identifier', name: property.value },
                        computed: false
                    };
                } else if (peek()?.value === '(') {
                    consume('delimiter', '(');
                    const args = [];
                    
                    while (peek()?.value !== ')') {
                        args.push(parseExpression());
                        if (peek()?.value === ',') {
                            consume('delimiter', ',');
                        }
                    }
                    
                    consume('delimiter', ')');
                    expr = {
                        type: 'CallExpression',
                        callee: expr,
                        arguments: args
                    };
                } else {
                    break;
                }
            }
            
            return expr;
        };

        const parsePrimaryExpression = () => {
            const token = peek();
            
            if (token?.type === 'number') {
                return { type: 'Literal', value: consume('number').value };
            }
            
            if (token?.type === 'string') {
                return { type: 'Literal', value: `"${consume('string').value}"` };
            }
            
            if (token?.type === 'template') {
                return { type: 'TemplateLiteral', value: consume('template').value };
            }
            
            if (token?.type === 'keyword' && ['true', 'false'].includes(token.value)) {
                return { type: 'Literal', value: consume('keyword').value === 'true' };
            }
            
            if (token?.type === 'keyword' && ['null', 'undefined'].includes(token.value)) {
                return { type: 'Literal', value: consume('keyword').value };
            }
            
            if (token?.type === 'identifier') {
                return { type: 'Identifier', name: consume('identifier').value };
            }
            
            if (token?.value === '(') {
                consume('delimiter', '(');
                const expr = parseExpression();
                consume('delimiter', ')');
                return expr;
            }
            
            if (token?.value === '[') {
                consume('delimiter', '[');
                const elements = [];
                
                while (peek()?.value !== ']') {
                    elements.push(parseExpression());
                    if (peek()?.value === ',') {
                        consume('delimiter', ',');
                    }
                }
                
                consume('delimiter', ']');
                return { type: 'ArrayExpression', elements };
            }
            
            if (token?.value === '{') {
                consume('delimiter', '{');
                const properties = [];
                
                while (peek()?.value !== '}') {
                    let key;
                    if (peek()?.type === 'identifier') {
                        key = consume('identifier').value;
                    } else if (peek()?.type === 'string') {
                        key = consume('string').value;
                    } else {
                        throw new Error(`Expected property name at line ${peek()?.position?.line}`);
                    }
                    
                    consume('delimiter', ':');
                    const value = parseExpression();
                    
                    properties.push({
                        type: 'Property',
                        key: { type: 'Identifier', name: key },
                        value
                    });
                    
                    if (peek()?.value === ',') {
                        consume('delimiter', ',');
                    }
                }
                
                consume('delimiter', '}');
                return { type: 'ObjectExpression', properties };
            }
            
            throw new Error(`Unexpected token ${token?.type} at line ${token?.position?.line}`);
        };

        // Parse statements
        const parseStatement = () => {
            const token = peek();
            
            if (token?.type === 'keyword') {
                switch (token.value) {
                    case 'le': return parseVariableDeclaration();
                    case 'pakka': return parseConstantDeclaration();
                    case 'karyo': return parseFunctionDeclaration();
                    case 'class': return parseClassDeclaration();
                    case 'dekhad': return parsePrintStatement();
                    case 'vakhat': return parseIfStatement();
                    case 'fero': return parseForStatement();
                    case 'jyare': return parseWhileStatement();
                    case 'return': return parseReturnStatement();
                    case 'break': return parseBreakStatement();
                    case 'continue': return parseContinueStatement();
                    default:
                        throw new Error(`Unknown keyword '${token.value}' at line ${token.position?.line}`);
                }
            }
            
            // Expression statement
            const expr = parseExpression();
            if (peek()?.value === ';') {
                consume('delimiter', ';');
            }
            return { type: 'ExpressionStatement', expression: expr };
        };

        const parseVariableDeclaration = () => {
            consume('keyword', 'le');
            const identifier = consume('identifier');
            
            let typeAnnotation = null;
            if (peek()?.value === ':') {
                consume('delimiter', ':');
                typeAnnotation = parseType();
            }
            
            let init = null;
            if (peek()?.value === '=') {
                consume('operator', '=');
                init = parseExpression();
            }
            
            return {
                type: 'VariableDeclaration',
                identifier: identifier.value,
                typeAnnotation,
                init,
                kind: 'let'
            };
        };

        const parseConstantDeclaration = () => {
            consume('keyword', 'pakka');
            const identifier = consume('identifier');
            
            let typeAnnotation = null;
            if (peek()?.value === ':') {
                consume('delimiter', ':');
                typeAnnotation = parseType();
            }
            
            consume('operator', '=');
            const init = parseExpression();
            
            return {
                type: 'VariableDeclaration',
                identifier: identifier.value,
                typeAnnotation,
                init,
                kind: 'const'
            };
        };

        const parseFunctionDeclaration = () => {
            consume('keyword', 'karyo');
            const name = consume('identifier');
            
            consume('delimiter', '(');
            const params = [];
            
            while (peek()?.value !== ')') {
                const param = consume('identifier');
                let typeAnnotation = null;
                let defaultValue = null;
                
                if (peek()?.value === ':') {
                    consume('delimiter', ':');
                    typeAnnotation = parseType();
                }
                
                if (peek()?.value === '=') {
                    consume('operator', '=');
                    defaultValue = parseExpression();
                }
                
                params.push({
                    type: 'Parameter',
                    name: param.value,
                    typeAnnotation,
                    defaultValue
                });
                
                if (peek()?.value === ',') {
                    consume('delimiter', ',');
                }
            }
            
            consume('delimiter', ')');
            
            let returnType = null;
            if (peek()?.value === ':') {
                consume('delimiter', ':');
                returnType = parseType();
            }
            
            consume('delimiter', '{');
            const body = [];
            
            while (peek()?.value !== '}') {
                body.push(parseStatement());
            }
            
            consume('delimiter', '}');
            
            return {
                type: 'FunctionDeclaration',
                name: name.value,
                params,
                body,
                returnType
            };
        };

        const parseClassDeclaration = () => {
            consume('keyword', 'class');
            const name = consume('identifier');
            
            let superClass = null;
            if (peek()?.value === 'extends') {
                consume('keyword', 'extends');
                superClass = consume('identifier').value;
            }
            
            consume('delimiter', '{');
            const body = [];
            
            while (peek()?.value !== '}') {
                // For now, just skip class body parsing
                const member = parseStatement();
                body.push(member);
            }
            
            consume('delimiter', '}');
            
            return {
                type: 'ClassDeclaration',
                name: name.value,
                superClass,
                body
            };
        };

        const parsePrintStatement = () => {
            consume('keyword', 'dekhad');
            const expression = parseExpression();
            return {
                type: 'PrintStatement',
                expression
            };
        };

        const parseIfStatement = () => {
            consume('keyword', 'vakhat');
            const test = parseExpression();
            consume('delimiter', '{');
            
            const consequent = [];
            while (peek()?.value !== '}') {
                consequent.push(parseStatement());
            }
            
            consume('delimiter', '}');
            
            let alternate = null;
            if (peek()?.value === 'nahi') {
                consume('keyword', 'nahi');
                if (peek()?.value === 'vakhat') {
                    alternate = parseIfStatement();
                } else {
                    consume('delimiter', '{');
                    alternate = [];
                    while (peek()?.value !== '}') {
                        alternate.push(parseStatement());
                    }
                    consume('delimiter', '}');
                }
            }
            
            return {
                type: 'IfStatement',
                test,
                consequent,
                alternate
            };
        };

        const parseForStatement = () => {
            consume('keyword', 'fero');
            const variable = consume('identifier');
            consume('keyword', 'in');
            
            const iterable = parseExpression();
            consume('delimiter', '{');
            
            const body = [];
            while (peek()?.value !== '}') {
                body.push(parseStatement());
            }
            
            consume('delimiter', '}');
            
            return {
                type: 'ForStatement',
                variable: variable.value,
                iterable,
                body
            };
        };

        const parseWhileStatement = () => {
            consume('keyword', 'jyare');
            const test = parseExpression();
            consume('delimiter', '{');
            
            const body = [];
            while (peek()?.value !== '}') {
                body.push(parseStatement());
            }
            
            consume('delimiter', '}');
            
            return {
                type: 'WhileStatement',
                test,
                body
            };
        };

        const parseReturnStatement = () => {
            consume('keyword', 'return');
            let argument = null;
            
            if (peek()?.value !== ';' && peek()?.value !== '}' && peek()) {
                argument = parseExpression();
            }
            
            return {
                type: 'ReturnStatement',
                argument
            };
        };

        const parseBreakStatement = () => {
            consume('keyword', 'break');
            return { type: 'BreakStatement' };
        };

        const parseContinueStatement = () => {
            consume('keyword', 'continue');
            return { type: 'ContinueStatement' };
        };

        // Parse all statements
        while (current < tokens.length) {
            ast.body.push(parseStatement());
        }

        return ast;
    }

    // Complete code generator
    codegen(node, indent = 0) {
        const spaces = '  '.repeat(indent);
        
        switch (node.type) {
            case 'Program':
                return node.body.map(stmt => this.codegen(stmt, indent)).join('\n');
                
            case 'VariableDeclaration':
                const kind = node.kind === 'const' ? 'const' : 'let';
                const init = node.init ? ` = ${this.codegen(node.init)}` : '';
                return `${spaces}${kind} ${node.identifier}${init};`;
                
            case 'FunctionDeclaration':
                const params = node.params.map(p => p.name).join(', ');
                const body = node.body.map(stmt => this.codegen(stmt, indent + 1)).join('\n');
                return `${spaces}function ${node.name}(${params}) {\n${body}\n${spaces}}`;
                
            case 'ClassDeclaration':
                const extendsClause = node.superClass ? ` extends ${node.superClass}` : '';
                const classBody = node.body.map(member => this.codegen(member, indent + 1)).join('\n');
                return `${spaces}class ${node.name}${extendsClause} {\n${classBody}\n${spaces}}`;
                
            case 'PrintStatement':
                return `${spaces}console.log(${this.codegen(node.expression)});`;
                
            case 'IfStatement':
                const test = this.codegen(node.test);
                const consequent = node.consequent.map(stmt => this.codegen(stmt, indent + 1)).join('\n');
                let result = `${spaces}if (${test}) {\n${consequent}\n${spaces}}`;
                
                if (node.alternate) {
                    if (Array.isArray(node.alternate)) {
                        const alternate = node.alternate.map(stmt => this.codegen(stmt, indent + 1)).join('\n');
                        result += ` else {\n${alternate}\n${spaces}}`;
                    } else {
                        result += ` else ${this.codegen(node.alternate, indent).trim()}`;
                    }
                }
                
                return result;
                
            case 'ForStatement':
                const forBody = node.body.map(stmt => this.codegen(stmt, indent + 1)).join('\n');
                const iterable = this.codegen(node.iterable);
                
                // Handle range syntax (1..5)
                if (node.iterable.type === 'BinaryExpression' && node.iterable.operator === '..') {
                    const start = this.codegen(node.iterable.left);
                    const end = this.codegen(node.iterable.right);
                    return `${spaces}for (let ${node.variable} = ${start}; ${node.variable} <= ${end}; ${node.variable}++) {\n${forBody}\n${spaces}}`;
                } else {
                    return `${spaces}for (const ${node.variable} of ${iterable}) {\n${forBody}\n${spaces}}`;
                }
                
            case 'WhileStatement':
                const whileTest = this.codegen(node.test);
                const whileBody = node.body.map(stmt => this.codegen(stmt, indent + 1)).join('\n');
                return `${spaces}while (${whileTest}) {\n${whileBody}\n${spaces}}`;
                
            case 'ReturnStatement':
                const arg = node.argument ? ` ${this.codegen(node.argument)}` : '';
                return `${spaces}return${arg};`;
                
            case 'BreakStatement':
                return `${spaces}break;`;
                
            case 'ContinueStatement':
                return `${spaces}continue;`;
                
            case 'BinaryExpression':
                const left = this.codegen(node.left);
                const right = this.codegen(node.right);
                return `${left} ${node.operator} ${right}`;
                
            case 'LogicalExpression':
                return `${this.codegen(node.left)} ${node.operator} ${this.codegen(node.right)}`;
                
            case 'UnaryExpression':
                return `${node.operator}${this.codegen(node.argument)}`;
                
            case 'AssignmentExpression':
                return `${this.codegen(node.left)} ${node.operator} ${this.codegen(node.right)}`;
                
            case 'ConditionalExpression':
                return `${this.codegen(node.test)} ? ${this.codegen(node.consequent)} : ${this.codegen(node.alternate)}`;
                
            case 'CallExpression':
                const callee = this.codegen(node.callee);
                const args = node.arguments.map(arg => this.codegen(arg)).join(', ');
                return `${callee}(${args})`;
                
            case 'MemberExpression':
                const object = this.codegen(node.object);
                if (node.computed) {
                    return `${object}[${this.codegen(node.property)}]`;
                } else {
                    return `${object}.${this.codegen(node.property)}`;
                }
                
            case 'ArrayExpression':
                const elements = node.elements.map(el => this.codegen(el)).join(', ');
                return `[${elements}]`;
                
            case 'ObjectExpression':
                const properties = node.properties.map(prop => 
                    `${this.codegen(prop.key)}: ${this.codegen(prop.value)}`
                ).join(', ');
                return `{${properties}}`;
                
            case 'TemplateLiteral':
                // Simple template literal handling
                return `\`${node.value}\``;
                
            case 'Literal':
                return typeof node.value === 'string' ? node.value : String(node.value);
                
            case 'Identifier':
                return node.name;
                
            case 'ExpressionStatement':
                return `${spaces}${this.codegen(node.expression)};`;
                
            default:
                throw new Error(`Unknown node type: ${node.type}`);
        }
    }

    compile(input) {
        try {
            const tokens = this.lexer(input);
            const ast = this.parser(tokens);
            const jsCode = this.codegen(ast);
            
            return { 
                success: true, 
                code: jsCode, 
                ast, 
                tokens,
                metadata: {
                    tokenCount: tokens.length,
                    astNodeCount: this.countASTNodes(ast),
                    features: this.analyzeFeatures(ast)
                }
            };
        } catch (error) {
            return { 
                success: false, 
                error: error.message,
                stack: error.stack
            };
        }
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

    analyzeFeatures(ast) {
        const features = new Set();
        
        const traverse = (node) => {
            if (!node || typeof node !== 'object') return;
            
            switch (node.type) {
                case 'VariableDeclaration':
                    features.add(node.kind === 'const' ? 'constants' : 'variables');
                    if (node.typeAnnotation) features.add('type-annotations');
                    break;
                case 'FunctionDeclaration':
                    features.add('functions');
                    break;
                case 'ClassDeclaration':
                    features.add('classes');
                    break;
                case 'IfStatement':
                    features.add('conditionals');
                    break;
                case 'ForStatement':
                    features.add('for-loops');
                    break;
                case 'WhileStatement':
                    features.add('while-loops');
                    break;
                case 'ArrayExpression':
                    features.add('arrays');
                    break;
                case 'ObjectExpression':
                    features.add('objects');
                    break;
                case 'BinaryExpression':
                    features.add('binary-expressions');
                    break;
                case 'LogicalExpression':
                    features.add('logical-expressions');
                    break;
                case 'ConditionalExpression':
                    features.add('ternary-operator');
                    break;
                case 'TemplateLiteral':
                    features.add('template-literals');
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
        return Array.from(features);
    }
}

// Export for use in browser and Node.js
if (typeof window !== 'undefined') {
    window.KathiyawadScriptLanguage = KathiyawadScriptLanguage;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { KathiyawadScriptLanguage };
}