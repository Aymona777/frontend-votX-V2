let nationalityIndex = 0;

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
<input type="text" name="state_${nationalityIndex}" placeholder="Enter Postal Code " required />

  <hr>
  <button type="button" onclick="removeBlock(this)">Remove</button>
`;

  
    

  container.appendChild(nationalityForm);

  // Optionally clear the select after adding
  document.getElementById("nationalitySelect").value = "";
}

function removeBlock(button) {
  const block = button.parentElement;
  block.remove();
}
let jobIndex = 0;

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

function removeBlock(button) {
  button.parentElement.remove();
}
