# KathiyawadScript - Advanced Features Demo
# Advanced programming concepts with Kathiyawadi vocabulary

dekhad "=== Advanced KathiyawadScript Features ==="

# Advanced data structures
le students_yaadi = [
    { naam: "અમિત", marks: 85, subject: "ગણિત" },
    { naam: "પ્રિયા", marks: 92, subject: "વિજ્ઞાન" },
    { naam: "રાહુલ", marks: 78, subject: "ઇતિહાસ" }
]

# Function to process student data
karyo processStudents(students) {
    le total = 0
    le count = 0
    
    dekhad "Student Details:"
    fero student in students {
        dekhad "Naam: " + student.naam + ", Marks: " + student.marks
        total = total + student.marks
        count = count + 1
        
        # Grade calculation
        vakhat student.marks >= 90 {
            dekhad "  Grade: A+ (Excellent!)"
        } nahi vakhat student.marks >= 80 {
            dekhad "  Grade: A (Very Good!)"
        } nahi vakhat student.marks >= 70 {
            dekhad "  Grade: B (Good!)"
        } nahi {
            dekhad "  Grade: C (Need improvement)"
        }
    }
    
    le average = total / count
    moklo average
}

# Process the students
le class_average = processStudents(students_yaadi)
dekhad "Class Average: " + class_average

# Complex conditional logic
vakhat class_average >= 85 ane students_yaadi.length > 2 {
    dekhad "🏆 Outstanding class performance!"
} nahi vakhat class_average >= 75 ke students_yaadi.length >= 5 {
    dekhad "👍 Good class performance!"
} nahi {
    dekhad "📚 Class needs more focus!"
}

# Nested data processing
le school_data = {
    naam: "સરસ્વતી વિદ્યાલય",
    location: "રાજકોટ",
    classes: [
        { standard: 10, students: 45, teacher: "શર્મા સાહેબ" },
        { standard: 11, students: 38, teacher: "પટેલ મેડમ" },
        { standard: 12, students: 42, teacher: "શાહ સર" }
    ]
}

dekhad "School Information:"
dekhad "School: " + school_data.naam
dekhad "Location: " + school_data.location

le total_students = 0
fero class_info in school_data.classes {
    dekhad "Standard " + class_info.standard + ": " + class_info.students + " students, Teacher: " + class_info.teacher
    total_students = total_students + class_info.students
}

dekhad "Total students in school: " + total_students

# Mathematical operations
karyo calculateStatistics(numbers) {
    le sum = 0
    le max = numbers[0]
    le min = numbers[0]
    
    fero num in numbers {
        sum = sum + num
        
        vakhat num > max {
            max = num
        }
        
        vakhat num < min {
            min = num
        }
    }
    
    le average = sum / numbers.length
    
    moklo {
        sum: sum,
        average: average,
        max: max,
        min: min,
        count: numbers.length
    }
}

# Test with marks data
le all_marks = [85, 92, 78, 88, 95, 73, 89, 91]
le stats = calculateStatistics(all_marks)

dekhad "Statistics for all marks:"
dekhad "Sum: " + stats.sum
dekhad "Average: " + stats.average
dekhad "Highest: " + stats.max
dekhad "Lowest: " + stats.min
dekhad "Total count: " + stats.count

# Pattern matching and filtering
karyo filterHighPerformers(students, threshold) {
    le high_performers = []
    
    fero student in students {
        vakhat student.marks >= threshold {
            high_performers.push(student)
        }
    }
    
    moklo high_performers
}

le top_students = filterHighPerformers(students_yaadi, 85)
dekhad "High performers (85+ marks):"
fero student in top_students {
    dekhad "🌟 " + student.naam + " - " + student.marks + " marks"
}

# Recursive-like function simulation
karyo factorial(n) {
    vakhat n <= 1 {
        moklo 1
    } nahi {
        le result = 1
        fero i in 1..n {
            result = result * i
        }
        moklo result
    }
}

le fact5 = factorial(5)
dekhad "Factorial of 5: " + fact5

# String manipulation
karyo formatStudentInfo(student) {
    le formatted = "Student: " + student.naam + 
                  " | Marks: " + student.marks + 
                  " | Subject: " + student.subject
    moklo formatted
}

dekhad "Formatted student information:"
fero student in students_yaadi {
    le info = formatStudentInfo(student)
    dekhad info
}

dekhad "=== Advanced Features Demo Complete! ==="