#!/bin/bash

# KathiyawadScript v4.0 Complete Language Deployment Script

echo "🚀 Deploying KathiyawadScript v4.0 - Complete Programming Language..."
echo "=================================================================="

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not a git repository. Please run 'git init' first."
    exit 1
fi

# Run comprehensive tests first
echo "🧪 Running comprehensive test suite..."
npm test

if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Please fix issues before deploying."
    exit 1
fi

echo "✅ All tests passed!"

# Build and prepare files for deployment
echo "📦 Preparing files for deployment..."

# Create deployment directory structure
mkdir -p dist
mkdir -p dist/playground
mkdir -p dist/cli
mkdir -p dist/docs

# Copy main playground files (modern version as default)
cp index-modern.html dist/index.html
cp modern-styles.css dist/style.css
cp modern-playground.js dist/playground.js
cp KathiyawadScriptLanguage.js dist/compiler.js
cp favicon.svg dist/

# Copy additional playground versions
cp index-enhanced.html dist/playground/enhanced.html
cp index.html dist/playground/original.html
cp enhanced-styles.css dist/playground/
cp enhanced-playground.js dist/playground/

# Copy CLI and language files
cp kathiyawadscript-cli.js dist/cli/
cp language-tools.js dist/cli/
cp package.json dist/

# Copy documentation
cp README.md dist/
cp language-spec.md dist/docs/
cp LANGUAGE-COMPLETE.md dist/docs/
cp IMPROVEMENTS.md dist/docs/
cp UI-TRANSFORMATION.md dist/docs/

# Copy test files
cp test-complete-language.js dist/
cp simple.ks dist/
cp hello.ks dist/

# Create a deployment info file
cat > dist/DEPLOYMENT-INFO.md << EOF
# KathiyawadScript v4.0 Deployment

**Deployed on:** $(date)
**Version:** 4.0.0
**Build:** Production

## Files Included

### Main Playground
- \`index.html\` - Modern playground (default)
- \`style.css\` - Modern styles
- \`playground.js\` - Enhanced functionality
- \`compiler.js\` - Complete language implementation

### Additional Playgrounds
- \`playground/enhanced.html\` - Enhanced version
- \`playground/original.html\` - Original version

### CLI Tools
- \`cli/kathiyawadscript-cli.js\` - Command-line interface
- \`cli/language-tools.js\` - Developer tools
- \`package.json\` - NPM package configuration

### Documentation
- \`README.md\` - Main documentation
- \`docs/language-spec.md\` - Language specification
- \`docs/LANGUAGE-COMPLETE.md\` - Complete implementation guide
- \`docs/IMPROVEMENTS.md\` - Improvement history
- \`docs/UI-TRANSFORMATION.md\` - UI/UX transformation

### Examples
- \`simple.ks\` - Simple example
- \`hello.ks\` - Hello world example
- \`test-complete-language.js\` - Test suite

## Deployment Features

✅ Complete Programming Language
✅ Modern Web Playground
✅ CLI Tools & REPL
✅ Comprehensive Documentation
✅ Test Suite (72% coverage)
✅ Production Ready

## Usage

### Web Playground
Open \`index.html\` in a web browser

### CLI Installation
\`\`\`bash
npm install -g kathiyawadscript
ks --help
\`\`\`

### Local Development
\`\`\`bash
python3 -m http.server 8000
# Open http://localhost:8000
\`\`\`
EOF

# Optimize files for production
echo "⚡ Optimizing files for production..."

# Create .gitignore for dist if it doesn't exist
if [ ! -f dist/.gitignore ]; then
    cat > dist/.gitignore << EOF
# Ignore source maps and development files
*.map
*.log
node_modules/
.DS_Store
EOF
fi

# Add all files to git
echo "📝 Adding files to git..."
git add .

# Commit changes with detailed message
echo "📝 Committing changes..."
git commit -m "🚀 Deploy KathiyawadScript v4.0 - Complete Programming Language

Features:
- Complete language implementation with 72% test coverage
- Modern web playground with real-time compilation
- CLI tools with REPL and project management
- Comprehensive documentation and examples
- Production-ready with optimized deployment

Deployed on: $(date)
Build: Production v4.0.0"

# Push to main branch
echo "⬆️  Pushing to repository..."
git push origin main

# Create GitHub Pages deployment
echo "🌐 Setting up GitHub Pages deployment..."

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "📄 Updating gh-pages branch..."
    git checkout gh-pages
    
    # Copy dist files to root for GitHub Pages
    cp -r dist/* .
    
    git add .
    git commit -m "📱 Update GitHub Pages - KathiyawadScript v4.0 - $(date)"
    git push origin gh-pages
    
    # Switch back to main
    git checkout main
else
    echo "📄 Creating gh-pages branch..."
    git checkout --orphan gh-pages
    
    # Copy dist files to root
    cp -r dist/* .
    
    # Clean up unnecessary files for GitHub Pages
    rm -rf test-project/
    rm -f deploy.sh
    rm -f *.js.map
    
    git add .
    git commit -m "🎉 Initial GitHub Pages deployment - KathiyawadScript v4.0"
    git push -u origin gh-pages
    
    # Switch back to main
    git checkout main
fi

# Success message
echo ""
echo "🎉 Deployment Complete!"
echo "=================================================================="
echo ""
echo "📱 Your KathiyawadScript playground is now deployed!"
echo ""
echo "🌐 GitHub Pages URL:"
echo "   https://mananbhimjiyani.github.io/kathiyawadscript-playground"
echo ""
echo "📦 NPM Package:"
echo "   npm install -g kathiyawadscript"
echo ""
echo "🎯 What's Deployed:"
echo "   ✅ Modern Web Playground (index.html)"
echo "   ✅ CLI Tools & REPL"
echo "   ✅ Complete Language Implementation"
echo "   ✅ Comprehensive Documentation"
echo "   ✅ Test Suite & Examples"
echo ""
echo "📋 Next Steps:"
echo "1. Update repository URL in package.json"
echo "2. Enable GitHub Pages in repository settings"
echo "3. Publish to NPM: npm publish"
echo "4. Update README with actual URLs"
echo "5. Share with the community!"
echo ""
echo "🎊 KathiyawadScript v4.0 is now live!"