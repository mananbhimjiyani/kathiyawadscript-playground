# KathiyawadScript - Real World Application Example
# A simple library management system in Kathiyawadi

dekhad "=== પુસ્તકાલય વ્યવસ્થાપન સિસ્ટમ ==="
dekhad "Library Management System in KathiyawadScript"

# Library data structure
le library_khata = {
    naam: "સરસ્વતી પુસ્તકાલય",
    location: "રાજકોટ, ગુજરાત",
    books: [],
    members: [],
    issued_books: []
}

# Book management functions
karyo addBook(title, author, isbn, copies) {
    le book = {
        title: title,
        author: author,
        isbn: isbn,
        total_copies: copies,
        available_copies: copies,
        id: library_khata.books.length + 1
    }
    
    library_khata.books.push(book)
    dekhad "✅ Book added: " + title + " by " + author
    moklo book
}

karyo findBook(search_term) {
    fero book in library_khata.books {
        vakhat book.title.includes(search_term) ke book.author.includes(search_term) {
            moklo book
        }
    }
    moklo khaali
}

karyo displayBooks() {
    dekhad "\n📚 Available Books:"
    dekhad "==================="
    
    vakhat library_khata.books.length == 0 {
        dekhad "No books available in library."
        moklo
    }
    
    fero book in library_khata.books {
        le status = book.available_copies > 0 ? "Available" : "Out of Stock"
        dekhad book.id + ". " + book.title + " - " + book.author
        dekhad "   ISBN: " + book.isbn + " | Copies: " + book.available_copies + "/" + book.total_copies + " | " + status
    }
}

# Member management
karyo addMember(naam, phone, address) {
    le member = {
        id: library_khata.members.length + 1,
        naam: naam,
        phone: phone,
        address: address,
        books_issued: [],
        join_date: "Today"
    }
    
    library_khata.members.push(member)
    dekhad "✅ Member added: " + naam + " (ID: " + member.id + ")"
    moklo member
}

karyo findMember(member_id) {
    fero member in library_khata.members {
        vakhat member.id == member_id {
            moklo member
        }
    }
    moklo khaali
}

# Book issuing system
karyo issueBook(member_id, book_id) {
    le member = findMember(member_id)
    le book = khaali
    
    # Find book by ID
    fero b in library_khata.books {
        vakhat b.id == book_id {
            book = b
        }
    }
    
    # Validation
    vakhat member == khaali {
        dekhad "❌ Member not found with ID: " + member_id
        moklo nathi
    }
    
    vakhat book == khaali {
        dekhad "❌ Book not found with ID: " + book_id
        moklo nathi
    }
    
    vakhat book.available_copies <= 0 {
        dekhad "❌ Book not available: " + book.title
        moklo nathi
    }
    
    # Issue the book
    book.available_copies = book.available_copies - 1
    member.books_issued.push(book_id)
    
    le issue_record = {
        member_id: member_id,
        book_id: book_id,
        issue_date: "Today",
        return_date: khaali
    }
    
    library_khata.issued_books.push(issue_record)
    
    dekhad "✅ Book issued successfully!"
    dekhad "   Member: " + member.naam + " (ID: " + member_id + ")"
    dekhad "   Book: " + book.title + " (ID: " + book_id + ")"
    
    moklo hoy
}

karyo returnBook(member_id, book_id) {
    le member = findMember(member_id)
    le book = khaali
    
    # Find book
    fero b in library_khata.books {
        vakhat b.id == book_id {
            book = b
        }
    }
    
    vakhat member == khaali ke book == khaali {
        dekhad "❌ Invalid member or book ID"
        moklo nathi
    }
    
    # Find and update issue record
    fero issue in library_khata.issued_books {
        vakhat issue.member_id == member_id ane issue.book_id == book_id ane issue.return_date == khaali {
            issue.return_date = "Today"
            book.available_copies = book.available_copies + 1
            
            # Remove from member's issued books
            le new_issued = []
            fero issued_book_id in member.books_issued {
                vakhat issued_book_id != book_id {
                    new_issued.push(issued_book_id)
                }
            }
            member.books_issued = new_issued
            
            dekhad "✅ Book returned successfully!"
            dekhad "   Member: " + member.naam
            dekhad "   Book: " + book.title
            moklo hoy
        }
    }
    
    dekhad "❌ No active issue found for this book and member"
    moklo nathi
}

# Reporting functions
karyo generateReport() {
    dekhad "\n📊 Library Report"
    dekhad "=================="
    dekhad "Library: " + library_khata.naam
    dekhad "Location: " + library_khata.location
    dekhad "Total Books: " + library_khata.books.length
    dekhad "Total Members: " + library_khata.members.length
    
    le total_copies = 0
    le available_copies = 0
    
    fero book in library_khata.books {
        total_copies = total_copies + book.total_copies
        available_copies = available_copies + book.available_copies
    }
    
    le issued_copies = total_copies - available_copies
    
    dekhad "Total Book Copies: " + total_copies
    dekhad "Available Copies: " + available_copies
    dekhad "Issued Copies: " + issued_copies
    
    # Active issues
    le active_issues = 0
    fero issue in library_khata.issued_books {
        vakhat issue.return_date == khaali {
            active_issues = active_issues + 1
        }
    }
    
    dekhad "Active Issues: " + active_issues
}

# Demo the system
dekhad "Initializing library system..."

# Add some books
addBook("ગુજરાતી વ્યાકરણ", "કનૈયાલાલ મુનશી", "978-1234567890", 5)
addBook("સાપ્તાહિક સમાચાર", "મહાત્મા ગાંધી", "978-1234567891", 3)
addBook("Programming in Gujarati", "Tech Author", "978-1234567892", 2)
addBook("કાઠિયાવાડી કથાઓ", "ઝવેરચંદ મેઘાણી", "978-1234567893", 4)

# Add some members
addMember("રમેશ પટેલ", "9876543210", "રાજકોટ")
addMember("પ્રિયા શાહ", "9876543211", "અમદાવાદ")
addMember("અમિત જોશી", "9876543212", "સુરત")

# Display initial state
displayBooks()

dekhad "\n👥 Library Members:"
fero member in library_khata.members {
    dekhad member.id + ". " + member.naam + " - " + member.phone
}

# Issue some books
dekhad "\n📖 Issuing Books:"
issueBook(1, 1)  # રમેશ પટેલ gets ગુજરાતી વ્યાકરણ
issueBook(2, 3)  # પ્રિયા શાહ gets Programming in Gujarati
issueBook(1, 2)  # રમેશ પટેલ gets સાપ્તાહિક સમાચાર

# Show updated status
displayBooks()

# Return a book
dekhad "\n📥 Returning Books:"
returnBook(1, 1)  # રમેશ પટેલ returns ગુજરાતી વ્યાકરણ

# Final report
generateReport()

dekhad "\n=== Library Management System Demo Complete! ==="
dekhad "આ સિસ્ટમ KathiyawadScript માં બનાવવામાં આવ્યું છે!"