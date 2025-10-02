# Simple KathiyawadScript Test

dekhad "Hello, KathiyawadScript!"

le name = "Kiran"
dekhad "Hello, " + name

karyo greet(person) {
    return "Namaste, " + person
}

le message = greet("Developer")
dekhad message

le age = 25
vakhat age >= 18 {
    dekhad "Adult"
} nahi {
    dekhad "Minor"
}