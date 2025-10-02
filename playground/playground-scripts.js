// Modern KathiyawadScript Playground - Premium Experience
class ModernPlaygroundManager {
    constructor() {
        this.compiler = new KathiyawadScriptCompiler();
        this.examples = this.initializeExamples();
        this.isTyping = false;
        this.typingTimeout = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupAnimations();
        this.loadDefaultExample();
        this.setupAutoSave();
        this.setupKeyboardShortcuts();
        this.loadSharedCode();
    }

    initializeExamples() {
        return {
            hello: {
                title: "Hello World",
                description: "Basic output and variables",
                code: `# Welcome to KathiyawadScript!
le name = "Developer"
le language = "KathiyawadScript"

dekhad "Hello, " + name + "!"
dekhad "Welcome to " + language + " v4.0"
dekhad "Let's start coding!"`,
                difficulty: "beginner"
            },
            
            kathiyawadi: {
                title: "Kathiyawadi Showcase", 
                description: "Authentic Kathiyawadi vocabulary",
                code: `# KathiyawadScript - Authentic Kathiyawadi Demo
dekhad "=== Kathiyawadi Vocabulary Demo ==="

# Variables with authentic words
le naam = "કિરણ"
le vay = 25
pakka SWAGAT = "આવજો, ખુશ આમદેદ!"

dekhad SWAGAT
dekhad "Naam: " + naam

# Boolean values in Kathiyawadi
le isActive = hoy        # true (yes)
le isComplete = nathi    # false (no)

# Function with Kathiyawadi
karyo kemCho(vyakti) {
    moklo "Kem cho, " + vyakti + "? Maja ma?"
}

le message = kemCho(naam)
dekhad message

# Conditional with authentic logic
vakhat vay >= 18 ane isActive {
    dekhad "આ વ્યક્તિ પુખ્ત છે!"
} nahi {
    dekhad "આ વ્યક્તિ નાનો છે."
}

# Array and Object in Kathiyawadi
le yaadi = ["કેરી", "કેળું", "સફરજન"]
le khata = { naam: "રમેશ", vay: 30 }

dekhad "Fruits yaadi:"
fero fal in yaadi {
    dekhad "- " + fal
}

dekhad "=== Maja ma! ==="`,
                difficulty: "cultural"
            },
            
            math: {
                title: "Math Operations",
                description: "Arithmetic and expressions",
                code: `# Advanced Math Operations
le a = 42
le b = 18
le c = 7

# Basic operations
le sum = a + b
le difference = a - b
le product = a * b
le quotient = a / b

dekhad "Numbers: a=" + a + ", b=" + b + ", c=" + c
dekhad "Sum: " + sum
dekhad "Difference: " + difference
dekhad "Product: " + product
dekhad "Quotient: " + quotient

# Complex expressions
le complex = (a + b) * c / 2
dekhad "Complex result: " + complex`,
                difficulty: "intermediate"
            },
            
            conditionals: {
                title: "Smart Conditionals",
                description: "Decision making with vakhat",
                code: `# Smart Decision Making
le score = 87
le grade = ""

dekhad "Student Score: " + score

vakhat score >= 90 {
    dekhad "Grade: A+ (Excellent!)"
}

vakhat score >= 80 {
    dekhad "Grade: A (Great job!)"
}

vakhat score >= 70 {
    dekhad "Grade: B (Good work!)"
}

vakhat score >= 60 {
    dekhad "Grade: C (Keep trying!)"
}

# Temperature check
le temp = 25
dekhad "Temperature: " + temp + "°C"

vakhat temp > 30 {
    dekhad "It's hot outside! 🌞"
}

vakhat temp < 10 {
    dekhad "It's cold outside! ❄️"
}`,
                difficulty: "intermediate"
            },
            
            loops: {
                title: "Powerful Loops",
                description: "Iteration with fero loops",
                code: `# Powerful Loop Examples
dekhad "=== Countdown Example ==="
fero i in 5..1 {
    dekhad "Countdown: " + i
}
dekhad "🚀 Launch!"

dekhad ""
dekhad "=== Multiplication Table ==="
le number = 7
fero i in 1..10 {
    le result = number * i
    dekhad number + " × " + i + " = " + result
}

dekhad ""
dekhad "=== Pattern Generation ==="
fero i in 1..5 {
    dekhad "Level " + i + " completed! ⭐"
    
    vakhat i == 3 {
        dekhad "🎉 Halfway milestone reached!"
    }
}`,
                difficulty: "advanced"
            },
            
            advanced: {
                title: "Advanced Features",
                description: "Complex programming concepts",
                code: `# Advanced KathiyawadScript Features
dekhad "=== Advanced Features Demo ==="

# Complex data structures
le students_yaadi = [
    { naam: "અમિત", marks: 85 },
    { naam: "પ્રિયા", marks: 92 },
    { naam: "રાહુલ", marks: 78 }
]

# Function to process data
karyo processStudents(students) {
    le total = 0
    le count = 0
    
    fero student in students {
        dekhad "Naam: " + student.naam + ", Marks: " + student.marks
        total = total + student.marks
        count = count + 1
        
        vakhat student.marks >= 90 {
            dekhad "  Grade: A+ (Excellent!)"
        } nahi vakhat student.marks >= 80 {
            dekhad "  Grade: A (Very Good!)"
        } nahi {
            dekhad "  Grade: B (Good!)"
        }
    }
    
    le average = total / count
    moklo average
}

le class_average = processStudents(students_yaadi)
dekhad "Class Average: " + class_average

vakhat class_average >= 85 ane students_yaadi.length > 2 {
    dekhad "🏆 Outstanding performance!"
} nahi {
    dekhad "📚 Keep working hard!"
}

dekhad "=== Advanced Demo Complete! ==="`,
                difficulty: "advanced"
            },
            
            realworld: {
                title: "Library System",
                description: "Real-world application example",
                code: `# પુસ્તકાલય વ્યવસ્થાપન સિસ્ટમ
dekhad "=== Library Management System ==="

# Library data
le library_khata = {
    naam: "સરસ્વતી પુસ્તકાલય",
    books: [],
    members: []
}

# Add book function
karyo addBook(title, author, copies) {
    le book = {
        title: title,
        author: author,
        copies: copies,
        id: library_khata.books.length + 1
    }
    
    library_khata.books.push(book)
    dekhad "✅ Book added: " + title
    moklo book
}

# Add member function  
karyo addMember(naam, phone) {
    le member = {
        id: library_khata.members.length + 1,
        naam: naam,
        phone: phone
    }
    
    library_khata.members.push(member)
    dekhad "✅ Member added: " + naam
    moklo member
}

# Demo the system
addBook("ગુજરાતી વ્યાકરણ", "કનૈયાલાલ મુનશી", 5)
addBook("કાઠિયાવાડી કથાઓ", "ઝવેરચંદ મેઘાણી", 3)

addMember("રમેશ પટેલ", "9876543210")
addMember("પ્રિયા શાહ", "9876543211")

dekhad "📚 Available Books:"
fero book in library_khata.books {
    dekhad book.id + ". " + book.title + " - " + book.author
}

dekhad "👥 Library Members:"
fero member in library_khata.members {
    dekhad member.id + ". " + member.naam
}

dekhad "=== System Ready! ==="`,
                difficulty: "expert"
            }
        };
    }

    setupEventListeners() {
        // Run button with enhanced feedback
        const runButton = document.getElementById('runButton');
        if (runButton) {
            runButton.addEventListener('click', () => this.runCode());
        }

        // Clear button with confirmation
        const clearButton = document.getElementById('clearButton');
        if (clearButton) {
            clearButton.addEventListener('click', () => this.clearCode());
        }

        // Share button with modern sharing
        const shareButton = document.getElementById('shareButton');
        if (shareButton) {
            shareButton.addEventListener('click', () => this.shareCode());
        }

        // Clear console
        const clearConsole = document.getElementById('clearConsole');
        if (clearConsole) {
            clearConsole.addEventListener('click', () => this.clearConsole());
        }

        // Example cards with enhanced interaction
        document.querySelectorAll('.example-card').forEach(card => {
            card.addEventListener('click', () => {
                const example = card.dataset.example;
                this.loadExample(example);
                this.addRippleEffect(card);
            });
        });

        // Code input with real-time compilation
        const codeInput = document.getElementById('codeInput');
        if (codeInput) {
            codeInput.addEventListener('input', () => this.onCodeChange());
            codeInput.addEventListener('keydown', (e) => this.handleKeyDown(e));
            codeInput.addEventListener('focus', () => this.onEditorFocus());
            codeInput.addEventListener('blur', () => this.onEditorBlur());
        }

        // Scroll to playground
        const scrollButton = document.querySelector('[onclick="scrollToPlayground()"]');
        if (scrollButton) {
            scrollButton.onclick = (e) => {
                e.preventDefault();
                this.scrollToPlayground();
            };
        }
    }

    setupAnimations() {
        // Enhanced GSAP animations
        if (typeof gsap !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Stagger animations for better visual flow
            gsap.utils.toArray('.fade-in').forEach((element, index) => {
                gsap.fromTo(element, 
                    { opacity: 0, y: 40 },
                    { 
                        opacity: 1, 
                        y: 0, 
                        duration: 0.8,
                        delay: index * 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 85%",
                            end: "bottom 15%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

            // Enhanced slide animations
            gsap.utils.toArray('.slide-in-left').forEach(element => {
                gsap.fromTo(element,
                    { opacity: 0, x: -60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 80%"
                        }
                    }
                );
            });

            gsap.utils.toArray('.slide-in-right').forEach(element => {
                gsap.fromTo(element,
                    { opacity: 0, x: 60 },
                    {
                        opacity: 1,
                        x: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 80%"
                        }
                    }
                );
            });

            // Scale animations
            gsap.utils.toArray('.scale-in').forEach(element => {
                gsap.fromTo(element,
                    { opacity: 0, scale: 0.9 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.6,
                        ease: "back.out(1.7)",
                        scrollTrigger: {
                            trigger: element,
                            start: "top 80%"
                        }
                    }
                );
            });
        }

        // Create floating particles with better performance
        this.createModernParticles();
    }

    createModernParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        // Create fewer, more elegant particles
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random properties
            const size = Math.random() * 3 + 1;
            const duration = Math.random() * 20 + 15;
            const delay = Math.random() * 20;
            
            particle.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: linear-gradient(45deg, #6366f1, #8b5cf6);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5 + 0.2};
                animation: modernFloat ${duration}s linear infinite ${delay}s;
                pointer-events: none;
            `;
            
            particlesContainer.appendChild(particle);
        }

        // Add modern particle animation
        if (!document.getElementById('particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes modernFloat {
                    0% { 
                        transform: translateY(100vh) rotate(0deg) scale(0);
                        opacity: 0;
                    }
                    10% { 
                        opacity: 0.6;
                        transform: translateY(90vh) rotate(36deg) scale(1);
                    }
                    90% { 
                        opacity: 0.6;
                        transform: translateY(-10vh) rotate(324deg) scale(1);
                    }
                    100% { 
                        transform: translateY(-20vh) rotate(360deg) scale(0);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupAutoSave() {
        // Auto-save code to localStorage
        setInterval(() => {
            const codeInput = document.getElementById('codeInput');
            if (codeInput && codeInput.value.trim()) {
                localStorage.setItem('kathiyawadscript-autosave', codeInput.value);
            }
        }, 5000);

        // Load auto-saved code on startup
        const autoSaved = localStorage.getItem('kathiyawadscript-autosave');
        if (autoSaved && !this.hasSharedCode()) {
            const codeInput = document.getElementById('codeInput');
            if (codeInput && !codeInput.value.trim()) {
                codeInput.value = autoSaved;
                this.onCodeChange();
                this.showNotification('Auto-saved code restored', 'info');
            }
        }
    }

    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter to run
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.runCode();
            }
            
            // Ctrl/Cmd + S to save (prevent default and show notification)
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveCode();
            }
            
            // Ctrl/Cmd + K to clear
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.clearCode();
            }
        });
    }

    loadDefaultExample() {
        this.loadExample('hello');
    }

    loadExample(exampleName) {
        const codeInput = document.getElementById('codeInput');
        const example = this.examples[exampleName];
        
        if (codeInput && example) {
            // Smooth transition effect
            codeInput.style.opacity = '0.5';
            
            setTimeout(() => {
                codeInput.value = example.code;
                this.onCodeChange();
                codeInput.style.opacity = '1';
                
                // Enhanced notification with example info
                this.showNotification(
                    `Loaded "${example.title}" example (${example.difficulty})`, 
                    'success'
                );
                
                // Scroll to editor
                codeInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 150);
        }
    }

    onCodeChange() {
        // Debounce compilation for better performance
        clearTimeout(this.typingTimeout);
        this.isTyping = true;
        
        this.typingTimeout = setTimeout(() => {
            this.compileCode();
            this.isTyping = false;
        }, 300);
        
        // Update status immediately
        this.updateStatusIndicator('processing');
    }

    compileCode() {
        const codeInput = document.getElementById('codeInput');
        const jsOutput = document.getElementById('jsOutput');
        
        if (!codeInput || !jsOutput) return;

        const code = codeInput.value;
        
        if (code.trim() === '') {
            jsOutput.value = '';
            this.updateStatusIndicator('online');
            return;
        }

        try {
            const result = this.compiler.compile(code);
            
            if (result.success) {
                jsOutput.value = this.formatJavaScript(result.code);
                this.updateStatusIndicator('online');
                this.highlightSyntax(jsOutput);
            } else {
                jsOutput.value = `// ❌ Compilation Error:\n// ${result.error}\n\n// Fix the error above and try again`;
                this.updateStatusIndicator('error');
            }
        } catch (error) {
            jsOutput.value = `// ⚠️ Unexpected Error:\n// ${error.message}\n\n// Please report this issue`;
            this.updateStatusIndicator('error');
        }
    }

    formatJavaScript(code) {
        // Enhanced JavaScript formatting
        return code
            .replace(/;/g, ';\n')
            .replace(/\{/g, ' {\n    ')
            .replace(/\}/g, '\n}')
            .replace(/\n\s*\n/g, '\n')
            .replace(/^/gm, '')  // Remove leading spaces
            .split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .join('\n');
    }

    highlightSyntax(element) {
        // Simple syntax highlighting for JavaScript output
        if (!element) return;
        
        let code = element.value;
        // This is a placeholder - in production, use a proper syntax highlighter
        // like Prism.js or highlight.js
    }

    async runCode() {
        const runButton = document.getElementById('runButton');
        const loader = document.getElementById('loader');
        const consoleOutput = document.getElementById('consoleOutput');
        const jsOutput = document.getElementById('jsOutput');
        
        if (!runButton || !consoleOutput || !jsOutput) return;

        // Enhanced loading state
        runButton.disabled = true;
        runButton.style.transform = 'scale(0.95)';
        if (loader) loader.style.display = 'inline-block';
        this.updateStatusIndicator('processing');

        try {
            // Clear console with animation
            consoleOutput.style.opacity = '0.5';
            setTimeout(() => {
                consoleOutput.innerHTML = '';
                consoleOutput.style.opacity = '1';
            }, 100);
            
            // Capture console output
            const originalLog = console.log;
            const logs = [];
            
            console.log = (...args) => {
                logs.push(args.join(' '));
                originalLog.apply(console, args);
            };

            // Execute JavaScript
            const jsCode = jsOutput.value;
            
            if (jsCode.trim() && !jsCode.startsWith('//')) {
                // Simulate execution delay for better UX
                await new Promise(resolve => setTimeout(resolve, 200));
                
                const func = new Function(jsCode);
                await func();
                
                // Display results with enhanced formatting
                if (logs.length > 0) {
                    consoleOutput.innerHTML = logs.map((log, index) => 
                        `<div class="console-success" style="animation-delay: ${index * 0.1}s">
                            <span style="color: #64748b; margin-right: 8px;">${index + 1}.</span>
                            ${this.escapeHtml(log)}
                        </div>`
                    ).join('');
                } else {
                    consoleOutput.innerHTML = '<div class="console-info">✅ Code executed successfully (no output)</div>';
                }
                
                this.updateStatusIndicator('online');
                this.showNotification('Code executed successfully!', 'success');
            } else {
                consoleOutput.innerHTML = '<div class="console-error">❌ No valid code to execute</div>';
                this.updateStatusIndicator('error');
            }
            
            console.log = originalLog;
            
        } catch (error) {
            consoleOutput.innerHTML = `<div class="console-error">
                <strong>💥 Runtime Error:</strong><br>
                ${this.escapeHtml(error.message)}
            </div>`;
            this.updateStatusIndicator('error');
            this.showNotification('Runtime error occurred', 'error');
        } finally {
            // Reset button state
            runButton.disabled = false;
            runButton.style.transform = 'scale(1)';
            if (loader) loader.style.display = 'none';
        }
    }

    clearCode() {
        const codeInput = document.getElementById('codeInput');
        const jsOutput = document.getElementById('jsOutput');
        
        // Confirmation for non-empty code
        if (codeInput && codeInput.value.trim().length > 50) {
            if (!confirm('Are you sure you want to clear all code? This action cannot be undone.')) {
                return;
            }
        }
        
        // Smooth clear animation
        [codeInput, jsOutput].forEach(element => {
            if (element) {
                element.style.opacity = '0.5';
                setTimeout(() => {
                    element.value = '';
                    element.style.opacity = '1';
                }, 150);
            }
        });
        
        this.clearConsole();
        this.updateStatusIndicator('online');
        this.showNotification('Code cleared', 'info');
        
        // Clear auto-save
        localStorage.removeItem('kathiyawadscript-autosave');
    }

    clearConsole() {
        const consoleOutput = document.getElementById('consoleOutput');
        if (consoleOutput) {
            consoleOutput.style.opacity = '0.5';
            setTimeout(() => {
                consoleOutput.innerHTML = '<div class="console-info">// Ready to execute your code...</div>';
                consoleOutput.style.opacity = '1';
            }, 100);
        }
    }

    saveCode() {
        const codeInput = document.getElementById('codeInput');
        if (!codeInput || !codeInput.value.trim()) {
            this.showNotification('No code to save', 'error');
            return;
        }
        
        // Save to localStorage
        localStorage.setItem('kathiyawadscript-saved', codeInput.value);
        this.showNotification('Code saved locally', 'success');
    }

    shareCode() {
        const codeInput = document.getElementById('codeInput');
        if (!codeInput) return;

        const code = codeInput.value;
        if (code.trim() === '') {
            this.showNotification('No code to share', 'error');
            return;
        }

        try {
            // Create shareable URL
            const encodedCode = btoa(encodeURIComponent(code));
            const shareUrl = `${window.location.origin}${window.location.pathname}?code=${encodedCode}`;
            
            // Modern clipboard API
            navigator.clipboard.writeText(shareUrl).then(() => {
                this.showNotification('Share URL copied to clipboard! 🔗', 'success');
            }).catch(() => {
                // Fallback
                this.fallbackCopyToClipboard(shareUrl);
                this.showNotification('Share URL copied to clipboard! 🔗', 'success');
            });
        } catch (error) {
            this.showNotification('Failed to create share URL', 'error');
        }
    }

    fallbackCopyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }

    scrollToPlayground() {
        const playground = document.getElementById('playground');
        if (playground) {
            playground.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    handleKeyDown(event) {
        const textarea = event.target;
        
        // Enhanced tab handling
        if (event.key === 'Tab') {
            event.preventDefault();
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            
            // Insert 4 spaces
            textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 4;
            
            // Trigger change event
            this.onCodeChange();
        }
        
        // Auto-closing brackets
        const pairs = {
            '(': ')',
            '[': ']',
            '{': '}',
            '"': '"'
        };
        
        if (pairs[event.key]) {
            event.preventDefault();
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const selectedText = textarea.value.substring(start, end);
            
            textarea.value = textarea.value.substring(0, start) + 
                           event.key + selectedText + pairs[event.key] + 
                           textarea.value.substring(end);
            
            textarea.selectionStart = textarea.selectionEnd = start + 1;
            this.onCodeChange();
        }
    }

    onEditorFocus() {
        const codeInput = document.getElementById('codeInput');
        if (codeInput) {
            codeInput.parentElement.style.borderColor = 'var(--primary)';
        }
    }

    onEditorBlur() {
        const codeInput = document.getElementById('codeInput');
        if (codeInput) {
            codeInput.parentElement.style.borderColor = 'var(--surface-elevated)';
        }
    }

    updateStatusIndicator(status) {
        const indicators = document.querySelectorAll('.status-indicator');
        indicators.forEach(indicator => {
            indicator.className = `status-indicator status-${status}`;
        });
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Add icon based on type
        const icons = {
            success: '✅',
            error: '❌',
            info: 'ℹ️',
            warning: '⚠️'
        };
        
        notification.innerHTML = `
            <span style="margin-right: 8px;">${icons[type] || icons.info}</span>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    addRippleEffect(element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(99, 102, 241, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            width: ${size}px;
            height: ${size}px;
            left: ${rect.width / 2 - size / 2}px;
            top: ${rect.height / 2 - size / 2}px;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        // Add ripple animation
        if (!document.getElementById('ripple-styles')) {
            const style = document.createElement('style');
            style.id = 'ripple-styles';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(2);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        setTimeout(() => ripple.remove(), 600);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    hasSharedCode() {
        return new URLSearchParams(window.location.search).has('code');
    }

    loadSharedCode() {
        const urlParams = new URLSearchParams(window.location.search);
        const encodedCode = urlParams.get('code');
        
        if (encodedCode) {
            try {
                const code = decodeURIComponent(atob(encodedCode));
                const codeInput = document.getElementById('codeInput');
                if (codeInput) {
                    codeInput.value = code;
                    this.onCodeChange();
                    this.showNotification('Shared code loaded successfully! 🎉', 'success');
                    
                    // Clean URL
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            } catch (error) {
                this.showNotification('Failed to load shared code', 'error');
            }
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const playground = new ModernPlaygroundManager();
    
    // Make globally available
    window.playground = playground;
    
    // Add some global utilities
    window.scrollToPlayground = () => playground.scrollToPlayground();
});

// Legacy support
function scrollToPlayground() {
    if (window.playground) {
        window.playground.scrollToPlayground();
    }
}