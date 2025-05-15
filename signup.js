let nationalityIndex = 0;
let jobIndex = 0;

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    return /^\+?[\d\s-]{10,}$/.test(phone);
}

function addNationalityForm() {
    const selectedNationality = document.getElementById("nationalitySelect").value;
    if (!selectedNationality) {
        alert("Please select a nationality.");
        return;
    }

    nationalityIndex++;
    const container = document.getElementById("nationalitiesContainer");

    const nationalityForm = document.createElement("div");
    nationalityForm.className = "nationality-block";
    nationalityForm.dataset.index = nationalityIndex;
    nationalityForm.innerHTML = `
        <h4>Nationality #${nationalityIndex}: ${selectedNationality}</h4>
        <input type="hidden" name="nationality_${nationalityIndex}" value="${selectedNationality}" />

        <input type="text" name="nid_${nationalityIndex}" placeholder="National ID" required />

        <label>Country:</label>
        <select name="country_${nationalityIndex}" required>
            <option value="">Select Country</option>
            <option value="Egypt">Egypt</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
        </select>

        <label>City:</label>
        <select name="city_${nationalityIndex}" required>
            <option value="">Select City</option>
            <option value="Cairo">Cairo</option>
            <option value="New York">New York</option>
            <option value="Toronto">Toronto</option>
        </select>

        <label>District:</label>
        <select name="district_${nationalityIndex}" required>
            <option value="">Select District</option>
            <option value="Downtown">Downtown</option>
            <option value="Heliopolis">Heliopolis</option>
            <option value="Scarborough">Scarborough</option>
        </select>

        <label>State:</label>
        <select name="state_${nationalityIndex}" required>
            <option value="">Select State</option>
            <option value="Giza">Giza</option>
            <option value="California">California</option>
            <option value="Ontario">Ontario</option>
        </select>

        <label>Postal Code:</label>
        <input type="text" name="postal_code_${nationalityIndex}" placeholder="Enter Postal Code" required />

        <hr>
        <button type="button" onclick="removeBlock(this)">Remove</button>
    `;

    container.appendChild(nationalityForm);
    document.getElementById("nationalitySelect").value = "";
}

function removeBlock(button) {
    const block = button.parentElement;
    block.remove();
}

function addJobForm() {
    const selectedJob = document.getElementById("job").value;
    if (!selectedJob) {
        alert("Please select a job.");
        return;
    }

    jobIndex++;
    const container = document.getElementById("jobsContainer");

    const jobForm = document.createElement("div");
    jobForm.className = "job-block";
    jobForm.dataset.index = jobIndex;

    jobForm.innerHTML = `
        <h4>Job #${jobIndex}: ${selectedJob}</h4>
        <input type="hidden" name="job_${jobIndex}" value="${selectedJob}" />

        <label>Description:</label>
        <input type="text" name="description_${jobIndex}" placeholder="Job description" required />

        <label>Category:</label>
        <select name="category_${jobIndex}" required>
            <option value="">Select Category</option>
            <option value="IT">IT</option>
            <option value="Finance">Finance</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
        </select>

        <label>Seniority Level:</label>
        <select name="seniority_${jobIndex}" required>
            <option value="">Select Level</option>
            <option value="Intern">Intern</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
            <option value="Lead">Lead</option>
        </select>

        <label>Sector:</label>
        <select name="sector_${jobIndex}" required>
            <option value="">Select Sector</option>
            <option value="Private">Private</option>
            <option value="Public">Public</option>
            <option value="Government">Government</option>
            <option value="Freelance">Freelance</option>
        </select>

        <label>Field:</label>
        <select name="field_${jobIndex}" required>
            <option value="">Select Field</option>
            <option value="Software Development">Software Development</option>
            <option value="Data Science">Data Science</option>
            <option value="Networking">Networking</option>
            <option value="Project Management">Project Management</option>
        </select>

        <label>Start Date:</label>
        <input type="date" name="start_${jobIndex}" required />

        <label>End Date:</label>
        <input type="date" name="end_${jobIndex}" id="end_${jobIndex}" />
        <label><input type="checkbox" onchange="toggleTillNow(${jobIndex})" /> Till Now</label>

        <button type="button" onclick="removeBlock(this)">Remove</button>
        <hr>
    `;

    container.appendChild(jobForm);
    document.getElementById("job").value = "";
}

function toggleTillNow(index) {
    const endInput = document.getElementById(`end_${index}`);
    endInput.disabled = !endInput.disabled;
    if (endInput.disabled) {
        endInput.value = '';
    }
}

function collectFormData() {
    const formData = {
        personalInfo: {
            firstName: document.getElementById('firstName').value,
            middleName: document.getElementById('middleName').value,
            lastName: document.getElementById('lastName').value,
            username: document.getElementById('username').value,
            password: document.getElementById('password').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            email: document.getElementById('email').value,
            gender: document.getElementById('gender').value,
            birthDate: document.getElementById('birthDate').value
        },
        nationalities: [],
        jobs: []
    };

    const nationalityBlocks = document.querySelectorAll('.nationality-block');
    nationalityBlocks.forEach(block => {
        const index = block.dataset.index;
        formData.nationalities.push({
            nationality: block.querySelector(`input[name="nationality_${index}"]`).value,
            nationalId: block.querySelector(`input[name="nid_${index}"]`).value,
            country: block.querySelector(`select[name="country_${index}"]`).value,
            city: block.querySelector(`select[name="city_${index}"]`).value,
            district: block.querySelector(`select[name="district_${index}"]`).value,
            state: block.querySelector(`select[name="state_${index}"]`).value,
            postalCode: block.querySelector(`input[name="postal_code_${index}"]`).value
        });
    });

    const jobBlocks = document.querySelectorAll('.job-block');
    jobBlocks.forEach(block => {
        const index = block.dataset.index;
        formData.jobs.push({
            title: block.querySelector(`input[name="job_${index}"]`).value,
            description: block.querySelector(`input[name="description_${index}"]`).value,
            category: block.querySelector(`select[name="category_${index}"]`).value,
            seniority: block.querySelector(`select[name="seniority_${index}"]`).value,
            sector: block.querySelector(`select[name="sector_${index}"]`).value,
            field: block.querySelector(`select[name="field_${index}"]`).value,
            startDate: block.querySelector(`input[name="start_${index}"]`).value,
            endDate: block.querySelector(`input[name="end_${index}"]`).value || null
        });
    });

    return formData;
}

function validateFormData(formData) {
    const errors = [];

    if (!isValidEmail(formData.personalInfo.email)) {
        errors.push("Invalid email format");
    }
    if (!isValidPhone(formData.personalInfo.phone)) {
        errors.push("Invalid phone number format");
    }
    if (formData.personalInfo.password.length < 8) {
        errors.push("Password must be at least 8 characters long");
    }
    if (formData.personalInfo.password !== document.getElementById('confirmPassword').value) {
        errors.push("Passwords do not match");
    }

    if (formData.nationalities.length === 0) {
        errors.push("At least one nationality is required");
    }

    return errors;
}

async function submitFormData(formData) {
    try {
        const response = await fetch('YOUR_BACKEND_API_URL/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { success: true, data };
    } catch (error) {
        console.error('Error submitting form:', error);
        return { success: false, error: error.message };
    }
}

async function validateSignup(event) {
    event.preventDefault();

    const submitButton = document.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Signing up...';

    try {
        const formData = collectFormData();

        const validationErrors = validateFormData(formData);
        if (validationErrors.length > 0) {
            alert(validationErrors.join('\n'));
            return false;
        }

        const result = await submitFormData(formData);
        if (result.success) {
            alert('Signup successful!');
            window.location.href = 'login.html';
        } else {
            alert(`Signup failed: ${result.error}`);
        }
    } catch (error) {
        console.error('Error in form submission:', error);
        alert('An unexpected error occurred. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }

    return false;
}
