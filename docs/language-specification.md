# KathiyawadScript Language Specification v4.0

## Language Overview

KathiyawadScript is a modern, statically-typed programming language with Gujarati keywords, designed for both beginners and advanced developers. It compiles to efficient JavaScript and supports modern programming paradigms.

## Core Language Features

### 1. Variables and Data Types

#### Variable Declaration
```kathiyawadscript
# Basic variables
le name = "Kiran"           # String
le age = 25                 # Number
le isActive = true          # Boolean
le score = 95.5             # Float

# Constants
pakka PI = 3.14159          # Constant declaration
pakka MAX_SIZE = 1000       # Cannot be reassigned

# Type annotations (optional)
le count: number = 0
le message: string = "Hello"
le isValid: boolean = false
```

#### Data Types
- `string` - Text data
- `number` - Integer and floating-point numbers
- `boolean` - true/false values
- `array` - Ordered collections
- `object` - Key-value pairs
- `null` - Null value
- `undefined` - Undefined value

### 2. Functions

#### Function Declaration
```kathiyawadscript
# Basic function
karyo greet(name: string): string {
    return "Hello, " + name + "!"
}

# Function with multiple parameters
karyo calculate(a: number, b: number): number {
    return a + b
}

# Function with default parameters
karyo welcome(name: string = "Guest"): string {
    return "Welcome, " + name
}

# Arrow functions
le add = (a: number, b: number) => a + b

# Higher-order functions
karyo forEach(arr: array, callback: function): void {
    fero item in arr {
        callback(item)
    }
}
```

### 3. Control Flow

#### Conditionals
```kathiyawadscript
# If-else statements
vakhat age >= 18 {
    dekhad "Adult"
} nahi vakhat age >= 13 {
    dekhad "Teenager"
} nahi {
    dekhad "Child"
}

# Switch-case equivalent
switch grade {
    case "A": dekhad "Excellent"
    case "B": dekhad "Good"
    case "C": dekhad "Average"
    default: dekhad "Needs improvement"
}
```

#### Loops
```kathiyawadscript
# For loops with ranges
fero i in 1..10 {
    dekhad i
}

# For loops with arrays
le fruits = ["apple", "banana", "orange"]
fero fruit in fruits {
    dekhad fruit
}

# While loops
jyare count < 10 {
    dekhad count
    count = count + 1
}

# Do-while loops
karo {
    dekhad "This runs at least once"
} jyare false
```

### 4. Data Structures

#### Arrays
```kathiyawadscript
# Array declaration
le numbers = [1, 2, 3, 4, 5]
le names: string[] = ["Alice", "Bob", "Charlie"]

# Array methods
numbers.push(6)              # Add element
le first = numbers.shift()   # Remove first element
le length = numbers.length   # Get length

# Array iteration
fero num in numbers {
    dekhad num * 2
}
```

#### Objects
```kathiyawadscript
# Object declaration
le person = {
    name: "Kiran",
    age: 25,
    city: "Rajkot"
}

# Object methods
le calculator = {
    add: karyo(a: number, b: number): number {
        return a + b
    },
    multiply: karyo(a: number, b: number): number {
        return a * b
    }
}

# Accessing properties
dekhad person.name
dekhad person["age"]
```

### 5. Classes and Objects

```kathiyawadscript
# Class declaration
class Person {
    # Properties
    private name: string
    private age: number
    
    # Constructor
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    
    # Methods
    public getName(): string {
        return this.name
    }
    
    public greet(): string {
        return "Hello, I'm " + this.name
    }
    
    # Static methods
    static create(name: string, age: number): Person {
        return new Person(name, age)
    }
}

# Inheritance
class Student extends Person {
    private grade: string
    
    constructor(name: string, age: number, grade: string) {
        super(name, age)
        this.grade = grade
    }
    
    public getGrade(): string {
        return this.grade
    }
}

# Usage
le person = new Person("Kiran", 25)
le student = new Student("Ravi", 20, "A")
```

### 6. Modules and Imports

```kathiyawadscript
# math.ks - Math utilities module
export karyo add(a: number, b: number): number {
    return a + b
}

export karyo multiply(a: number, b: number): number {
    return a * b
}

export pakka PI = 3.14159

# main.ks - Main application
import { add, multiply, PI } from "./math.ks"
import * as MathUtils from "./math.ks"

le result = add(5, 3)
dekhad result
```

### 7. Error Handling

```kathiyawadscript
# Try-catch blocks
try {
    le result = divide(10, 0)
    dekhad result
} catch (error) {
    dekhad "Error occurred: " + error.message
} finally {
    dekhad "Cleanup code here"
}

# Custom errors
karyo validateAge(age: number): void {
    vakhat age < 0 {
        throw new Error("Age cannot be negative")
    }
}
```

### 8. Async Programming

```kathiyawadscript
# Promises
karyo fetchData(): Promise<string> {
    return new Promise((resolve, reject) => {
        # Simulate API call
        setTimeout(() => {
            resolve("Data fetched successfully")
        }, 1000)
    })
}

# Async/await
async karyo loadUserData(userId: number): Promise<User> {
    try {
        le userData = await fetchUser(userId)
        le userPosts = await fetchUserPosts(userId)
        return { ...userData, posts: userPosts }
    } catch (error) {
        dekhad "Failed to load user data: " + error.message
        throw error
    }
}
```

### 9. Advanced Features

#### Generics
```kathiyawadscript
# Generic functions
karyo identity<T>(arg: T): T {
    return arg
}

# Generic classes
class Container<T> {
    private value: T
    
    constructor(value: T) {
        this.value = value
    }
    
    public getValue(): T {
        return this.value
    }
}

le stringContainer = new Container<string>("Hello")
le numberContainer = new Container<number>(42)
```

#### Interfaces
```kathiyawadscript
# Interface declaration
interface Drawable {
    draw(): void
    getArea(): number
}

# Interface implementation
class Circle implements Drawable {
    private radius: number
    
    constructor(radius: number) {
        this.radius = radius
    }
    
    public draw(): void {
        dekhad "Drawing a circle"
    }
    
    public getArea(): number {
        return PI * this.radius * this.radius
    }
}
```

#### Enums
```kathiyawadscript
# Enum declaration
enum Color {
    RED = "red",
    GREEN = "green",
    BLUE = "blue"
}

enum Direction {
    UP = 1,
    DOWN = 2,
    LEFT = 3,
    RIGHT = 4
}

# Usage
le favoriteColor = Color.RED
le moveDirection = Direction.UP
```

## Standard Library

### Built-in Functions

#### Console Operations
```kathiyawadscript
dekhad "Hello World"           # console.log
dekhad.error "Error message"   # console.error
dekhad.warn "Warning"          # console.warn
dekhad.info "Information"      # console.info
```

#### String Operations
```kathiyawadscript
le text = "KathiyawadScript"
dekhad text.length             # String length
dekhad text.upper()            # Uppercase
dekhad text.lower()            # Lowercase
dekhad text.substring(0, 5)    # Substring
dekhad text.contains("Script") # Contains check
```

#### Array Operations
```kathiyawadscript
le numbers = [1, 2, 3, 4, 5]
dekhad numbers.map(x => x * 2)        # Map
dekhad numbers.filter(x => x > 3)     # Filter
dekhad numbers.reduce((a, b) => a + b) # Reduce
dekhad numbers.find(x => x === 3)     # Find
```

#### Math Operations
```kathiyawadscript
dekhad Math.abs(-5)           # Absolute value
dekhad Math.max(1, 2, 3)      # Maximum
dekhad Math.min(1, 2, 3)      # Minimum
dekhad Math.round(3.7)        # Round
dekhad Math.random()          # Random number
```

## Language Keywords

### Core Keywords
- `le` - Variable declaration
- `pakka` - Constant declaration
- `karyo` - Function declaration
- `class` - Class declaration
- `interface` - Interface declaration
- `enum` - Enum declaration
- `import` - Import statement
- `export` - Export statement

### Control Flow
- `vakhat` - If statement
- `nahi` - Else
- `switch` - Switch statement
- `case` - Case in switch
- `default` - Default case
- `fero` - For loop
- `jyare` - While loop
- `karo` - Do statement
- `break` - Break statement
- `continue` - Continue statement

### Object-Oriented
- `new` - Object instantiation
- `this` - Current object reference
- `super` - Parent class reference
- `extends` - Class inheritance
- `implements` - Interface implementation
- `public` - Public access modifier
- `private` - Private access modifier
- `protected` - Protected access modifier
- `static` - Static member

### Error Handling
- `try` - Try block
- `catch` - Catch block
- `finally` - Finally block
- `throw` - Throw exception

### Async Programming
- `async` - Async function
- `await` - Await expression
- `Promise` - Promise type

### Output
- `dekhad` - Print/console output

## Type System

### Primitive Types
- `string` - Text data
- `number` - Numeric data
- `boolean` - Boolean data
- `null` - Null value
- `undefined` - Undefined value

### Composite Types
- `array` - Array type
- `object` - Object type
- `function` - Function type

### Advanced Types
- `Promise<T>` - Promise type
- `Array<T>` - Generic array
- `T | U` - Union types
- `T & U` - Intersection types
- `T?` - Optional types

## File Extensions
- `.ks` - KathiyawadScript source files
- `.ksd` - KathiyawadScript declaration files

## Comments
```kathiyawadscript
# Single line comment

#*
  Multi-line comment
  Can span multiple lines
*#

#** 
 * Documentation comment
 * @param name The person's name
 * @returns A greeting message
 *#
karyo greet(name: string): string {
    return "Hello, " + name
}
```

This specification provides a solid foundation for a complete programming language with modern features while maintaining the Gujarati cultural identity through keywords.