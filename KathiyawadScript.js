// KathiyawadScript.js

// NOTE: This is a simplified compiler for demonstration.
// A production-ready version would require a more robust, recursive descent parser.

function lexer(input) {
  const tokens = [];
  let cursor = 0;
  const keywords = ["le", "dekhad", "jo", "nahitar", "pachijo", "ane", "ke", "jya sudhi", "kam", "pachhu aap", "vakhat", "puro", "puchho", "bhai", "ha_bapu", "na_re_bhai"];
  const punctuation = "()[],";
  while (cursor < input.length) {
    let char = input[cursor];
    if (/\s/.test(char)) { cursor++; continue; }
    if (char === '#') { while(char !== '\n' && cursor < input.length) char = input[++cursor]; continue; }
    if (punctuation.includes(char)) { tokens.push({ type: 'punctuation', value: char }); cursor++; continue; }
    if (char === '"') {
      let str = "";
      char = input[++cursor];
      while (char !== '"') { str += char; char = input[++cursor]; }
      tokens.push({ type: 'string', value: str });
      cursor++;
      continue;
    }
    if (/[a-zA-Z_]/.test(char)) {
      let word = "";
      while (/[a-zA-Z0-9_]/.test(char) && cursor < input.length) { word += char; char = input[++cursor]; }
      if (keywords.includes(word)) {
        if (word === 'ha_bapu' || word === 'na_re_bhai') tokens.push({ type: 'boolean', value: word });
        else tokens.push({ type: 'keyword', value: word });
      } else {
        tokens.push({ type: 'identifier', value: word });
      }
      continue;
    }
    if (/[0-9]/.test(char)) {
      let num = "";
      while (/[0-9]/.test(char) && cursor < input.length) { num += char; char = input[++cursor]; }
      tokens.push({ type: 'number', value: parseInt(num) });
      continue;
    }
    if (/[\+\-\*\/=<>!]/.test(char)) {
      let op = char;
      if (['>', '<', '=', '!'].includes(char) && input[cursor + 1] === '=') { op += input[++cursor]; }
      tokens.push({ type: 'operator', value: op });
      cursor++;
      continue;
    }
    throw new Error(`Aadhu avlu character malyu: ${char}`);
  }
  return tokens;
}

function parser(tokens) {
    // This highly simplified parser is for demonstration and works for the examples.
    let cursor = 0;
    const program = { type: 'Program', body: [] };
    while (cursor < tokens.length) {
        let token = tokens[cursor];
        if (token.type === 'number' && tokens[cursor + 1]?.value === 'vakhat') {
            const count = token.value;
            cursor += 2; // consume number and 'vakhat'
            const body = [];
            while (cursor < tokens.length && tokens[cursor].value !== 'puro') {
                if(tokens[cursor].value === 'dekhad'){
                    body.push({ type: 'PrintStatement', value: tokens[cursor + 1].value, tokenType: 'string' });
                }
                cursor += 2; // consume 'dekhad' and its value
            }
            cursor++; // consume 'puro'
            program.body.push({ type: 'ForLoop', count, body });
        } else if (token.value === 'dekhad') {
            const valueToken = tokens[cursor + 1];
            program.body.push({ type: 'PrintStatement', value: valueToken.value, tokenType: valueToken.type });
            cursor += 2;
        } else {
            cursor++; // Move past unhandled tokens
        }
    }
    return program;
}


function codegen(node) {
  switch (node.type) {
    case 'Program': return node.body.map(codegen).join('\n');
    case 'ForLoop':
        const loopBody = node.body.map(codegen).join('\n  ');
        return `for (let i = 0; i < ${node.count}; i++) {\n  ${loopBody}\n}`;
    case 'PrintStatement':
        // In a real sandbox, prompt is tricky. We'll simulate console.log.
        if (node.tokenType === 'string') return `console.log("${node.value}");`;
        return `console.log(${node.value});`;
    default:
      return '';
  }
}

// The main exportable function
export function KathiyawadScriptCompiler(input) {
    const tokens = lexer(input);
    const ast = parser(tokens);
    const jsCode = codegen(ast);
    return jsCode;
}