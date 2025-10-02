# KathiyawadScript Hello World Example
# This demonstrates basic language features

dekhad "=== KathiyawadScript Demo ==="

# Variables
le name = "Developer"
le language = "KathiyawadScript"
le version = 4.0

dekhad "Hello, " + name + "!"
dekhad "Welcome to " + language + " v" + version

# Function
karyo greet(person) {
    return "Namaste, " + person + "! Kem cho?"
}

# Function call
le greeting = greet("Kiran")
dekhad greeting

# Conditional
le age = 25
vakhat age >= 18 {
    dekhad "You are an adult!"
} nahi {
    dekhad "You are a minor!"
}

# Loop
dekhad "Counting from 1 to 5:"
fero i in 1..5 {
    dekhad "Count: " + i
}

# Array
le fruits = ["apple", "banana", "mango"]
dekhad "My favorite fruits:"
fero fruit in fruits {
    dekhad "- " + fruit
}

dekhad "=== Demo Complete ==="