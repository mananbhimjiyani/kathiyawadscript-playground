# KathiyawadScript - Authentic Kathiyawadi Vocabulary Showcase
# આ ફાઇલ કાઠિયાવાડી ભાષાના શબ્દોનો ઉપયોગ દર્શાવે છે

dekhad "=== KathiyawadScript - Kathiyawadi Vocabulary Demo ==="

# Variables with Kathiyawadi words
le naam = "કિરણ"
le vay = 25
le gaam = "રાજકોટ"
pakka SWAGAT = "આવજો, ખુશ આમદેદ!"

dekhad SWAGAT
dekhad "Naam: " + naam
dekhad "Vay: " + vay
dekhad "Gaam: " + gaam

# Boolean values in Kathiyawadi
le isActive = hoy        # true (yes)
le isComplete = nathi    # false (no)

dekhad "Is Active: " + isActive
dekhad "Is Complete: " + isComplete

# Function with Kathiyawadi name
karyo kemCho(vyakti) {
    moklo "Kem cho, " + vyakti + "? Maja ma?"
}

# Call function
le message = kemCho(naam)
dekhad message

# Conditional with Kathiyawadi logic
vakhat vay >= 18 ane isActive {
    dekhad "આ વ્યક્તિ પુખ્ત છે ane active છે!"
} nahi {
    dekhad "આ વ્યક્તિ નાનો છે ke inactive છે."
}

# Array (yaadi) example
le yaadi = ["કેરી", "કેળું", "સફરજન", "દ્રાક્ષ"]
dekhad "Fruits yaadi:"
fero fal in yaadi {
    dekhad "- " + fal
}

# Object (khata) example  
le vyakti_khata = {
    naam: "રમેશ",
    vay: 30,
    vyavasay: "ખેડૂત",
    gaam: "જામનગર"
}

dekhad "Vyakti ni mahiti:"
dekhad "Naam: " + vyakti_khata.naam
dekhad "Vay: " + vyakti_khata.vay
dekhad "Vyavasay: " + vyakti_khata.vyavasay

# Loop with Kathiyawadi counting
dekhad "Ginati 1 thi 5 sudhi:"
fero i in 1..5 {
    dekhad "Ginati: " + i
    
    vakhat i == 3 {
        dekhad "અડધી વાત પૂરી થઈ!"
    }
}

# While loop example
le count = 0
dekhad "Jyare loop:"
jyare count < 3 {
    count = count + 1
    dekhad "Count: " + count
}

# Function for calculation
karyo ganit(a, b) {
    le jod = a + b
    le gun = a * b
    
    dekhad "Jod: " + jod
    dekhad "Gun: " + gun
    
    moklo jod
}

le result = ganit(5, 3)
dekhad "Final result: " + result

dekhad "=== Kathiyawadi Demo Complete! Maja ma! ==="