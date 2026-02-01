// localStorage key
const SIGNUPS_KEY = 'studentSignups';

// Function to load existing sign-ups from localStorage
function loadSignups() {
    const raw = localStorage.getItem(SIGNUPS_KEY);
    if (raw) {
        return JSON.parse(raw);
    } else {
        return []; // Initialize empty array if no data
    }
}

// Function to save sign-ups to localStorage
function saveSignups(signups) {
    localStorage.setItem(SIGNUPS_KEY, JSON.stringify(signups));
}

// Get the form element
const form = document.getElementById('login');

// Handle form submission
form.onsubmit = function(event) {
    // Prevent default form submission
    event.preventDefault();
    
    // Confirm submission
    const confirmed = confirm('Do you really want to submit this form?');
    
    if (!confirmed) {
        return false; // user cancels
    }
    
    // Get all values
    const studentID = document.getElementById('StudentID').value.trim();
    const fullName = document.getElementById('FullName').value.trim();
    const birthday = document.getElementById('Birthday').value;
    const email = document.getElementById('Email').value.trim();
    const mobilePhone = document.getElementById('MobilePhone').value.trim();
    const gradeLevel = document.getElementById('GradeLevel').value;
    
    // Get selected radio button value
    let internExtern = '';
    const internExternRadios = document.getElementsByName('InternExtern');
    for (let i = 0; i < internExternRadios.length; i++) {
        if (internExternRadios[i].checked) {
            internExtern = internExternRadios[i].value;
            break;
        }
    }
    
    const club = document.getElementById('clubs').value;
    const reason = document.getElementById('tArea').value.trim();
    
    // Create student object
    const studentData = {
        id: Date.now(), //timestamp
        studentID: studentID,
        fullName: fullName,
        birthday: birthday,
        email: email,
        mobilePhone: mobilePhone,
        gradeLevel: gradeLevel,
        internExtern: internExtern,
        club: club,
        reason: reason,
        timestamp: new Date().toLocaleString() // Record when submitted
    };
    
    // Load existing sign-ups
    const signups = loadSignups();
    
    // Add new student to the array
    signups.push(studentData);
    
    // Save updated array back to localStorage
    saveSignups(signups);
    
    // Show success message
    alert('Registration submitted successfully!');
    
    // Reset the form
    form.reset();
    
    return false; // Prevent actual form submission
};

document.getElementById('viewSignups').onclick = function() {
    // Navigate to the view page
    window.location.href = 'viewSignUps.html';
};