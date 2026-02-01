// localStorage key
const SIGNUPS_KEY = 'studentSignups';

// Function to load sign-ups from localStorage
function loadSignups() {
    const raw = localStorage.getItem(SIGNUPS_KEY);
    if (raw) {
        return JSON.parse(raw);
    } else {
        return [];
    }
}

// Function to escape HTML
function escapeHtml(str) {
    let text = String(str);
    let escaped = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char === '&') {
            escaped += '&amp;';
        } else if (char === '<') {
            escaped += '&lt;';
        } else if (char === '>') {
            escaped += '&gt;';
        } else if (char === '"') {
            escaped += '&quot;';
        } else if (char === "'") {
            escaped += '&#39;';
        } else {
            escaped += char;
        }
    }
    return escaped;
}

// Function to render the table based on filter
function renderTable(filterClub) {
    // Load all sign-ups
    const allSignups = loadSignups();
    
    // Filter based on selected club
    let filteredSignups = allSignups;
    if (filterClub !== 'ALL') {
        filteredSignups = [];
        for (let i = 0; i < allSignups.length; i++) {
            if (allSignups[i].club === filterClub) {
                filteredSignups.push(allSignups[i]);
            }
        }
    }
    
    // Update total count
    const totalDisplay = document.getElementById('totalDisplay');
    totalDisplay.textContent = 'Total Signup: ' + filteredSignups.length;
    
    // Get container
    const container = document.getElementById('tableContainer');
    
    // Check if there are any sign-ups
    if (filteredSignups.length === 0) {
        // Show appropriate message
        if (filterClub === 'ALL') {
            container.innerHTML = '<div class="no-data">No sign-ups yet. Be the first to register!</div>';
        } else {
            container.innerHTML = '<div class="no-data">No Sign Ups for the club</div>';
        }
        return;
    }
    
    // Build table HTML
    let tableHTML = '<table>';
    tableHTML += '<thead><tr>';
    tableHTML += '<th>Club</th>';
    tableHTML += '<th>ID</th>';
    tableHTML += '<th>Fullname</th>';
    tableHTML += '<th>Grade</th>';
    tableHTML += '<th>Email</th>';
    tableHTML += '<th>Mobile</th>';
    tableHTML += '<th>Intern/Extern</th>';
    tableHTML += '</tr></thead>';
    tableHTML += '<tbody>';
    
    // Add rows for each signup
    for (let i = 0; i < filteredSignups.length; i++) {
        const student = filteredSignups[i];
        tableHTML += '<tr>';
        tableHTML += '<td>' + escapeHtml(student.club) + '</td>';
        tableHTML += '<td>' + escapeHtml(student.studentID) + '</td>';
        tableHTML += '<td>' + escapeHtml(student.fullName) + '</td>';
        tableHTML += '<td>' + escapeHtml(student.gradeLevel) + '</td>';
        tableHTML += '<td>' + escapeHtml(student.email) + '</td>';
        tableHTML += '<td>' + escapeHtml(student.mobilePhone) + '</td>';
        tableHTML += '<td>' + escapeHtml(student.internExtern) + '</td>';
        tableHTML += '</tr>';
    }
    
    tableHTML += '</tbody></table>';
    
    // Insert table into container
    container.innerHTML = tableHTML;
}

// Set up event listener for filter dropdown
document.getElementById('clubFilter').onchange = function() {
    const selectedClub = this.value;
    renderTable(selectedClub);
};

// Initial render - show all sign-ups
renderTable('ALL');