// Countdown to October 4, 10:00 AM of the current year (or next year if date passed)
(function () {
  const now = new Date();
  const currentYear = now.getFullYear();
  const targetThisYear = new Date(`${currentYear}-10-04T10:00:00`); // 10 AM local
  const target = now > targetThisYear ? new Date(`${currentYear + 1}-10-04T10:00:00`) : targetThisYear;

  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateCountdown() {
    const diffMs = target.getTime() - Date.now();
    if (diffMs <= 0) {
      daysEl.textContent = '0';
      hoursEl.textContent = '0';
      minutesEl.textContent = '0';
      secondsEl.textContent = '0';
      return;
    }
    const totalSeconds = Math.floor(diffMs / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    daysEl.textContent = String(days);
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);
})();

// Register form mock submit
document.getElementById('registerSubmit')?.addEventListener('click', function () {
  const name = /** @type {HTMLInputElement|null} */(document.getElementById('name'))?.value.trim();
  const email = /** @type {HTMLInputElement|null} */(document.getElementById('email'))?.value.trim();
  const college = /** @type {HTMLSelectElement|null} */(document.getElementById('college'))?.value;
  const status = document.getElementById('formStatus');
  if (!status) return;
  if (!name || !email || !college) {
    status.hidden = false;
    status.style.color = '#f87171';
    status.textContent = 'Please fill in your name, email, and college.';
    return;
  }
  // If My College selected, verify prefilled credentials
  if (college === 'my') {
    const passwordEl = /** @type {HTMLInputElement|null} */(document.getElementById('password'));
    const password = passwordEl ? passwordEl.value : '';
    if (email !== 'harshrajverma099@gmail.com' || password !== '12378945') {
      status.hidden = false;
      status.style.color = '#f87171';
      status.textContent = 'For My College, use the provided email and password.';
      return;
    }
  }
  // Show team list for all successful registrations
  const teamList = document.getElementById('teamList');
  if (teamList) teamList.hidden = false;
  status.hidden = false;
  status.style.color = '';
  status.textContent = `Welcome ${name}! You're registered from ${college}. Team list revealed below.`;
});

// Find Group form functionality
function handleFindGroup() {
  const email = document.getElementById('findEmail')?.value.trim().toLowerCase();
  const password = document.getElementById('findPassword')?.value.trim();
  const college = document.getElementById('findCollege')?.value?.trim().toLowerCase();
  const status = document.getElementById('findGroupStatus');
  const groupDetails = document.getElementById('groupDetails');
  
  if (!status || !groupDetails) return;

  if (!email || !password || !college) {
    status.hidden = false;
    status.style.color = '#f87171';
    status.textContent = 'Please fill in all fields.';
    groupDetails.hidden = true;
    return;
  }

  const validEmail = 'harshrajverma099@gmail.com';
  const validPassword = '12378945';
  const validCollege = 'buddha institute of technology';

  if (email === validEmail && password === validPassword && college === validCollege) {
    // Show group details directly instead of redirect
    groupDetails.hidden = false;
    status.hidden = true;
    // Scroll into view
    groupDetails.scrollIntoView({ behavior: 'smooth' });
  } else {
    status.hidden = false;
    status.style.color = '#f87171';
    status.textContent = 'Invalid credentials. Please check your email, password, and college selection.';
    groupDetails.hidden = true;
  }
}

// Event listeners
document.querySelector('.find-group-form')?.addEventListener('submit', function(e){
  e.preventDefault();
  handleFindGroup();
});
document.getElementById('findGroupSubmit')?.addEventListener('click', handleFindGroup);
document.querySelector('.find-group-form')?.addEventListener('keydown', function(e){
  if(e.key === 'Enter') {
    e.preventDefault();
    handleFindGroup();
  }
});

// Prevent Enter key from causing a network submit; run the same handler instead
document.querySelector('.find-group-form')?.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    handleFindGroup();
  }
});

// Footer year
document.getElementById('year').textContent = String(new Date().getFullYear());

// College selection behavior: reveal password field and prefill creds for My College
const collegeSelect = /** @type {HTMLSelectElement|null} */(document.getElementById('college'));
const emailInput = /** @type {HTMLInputElement|null} */(document.getElementById('email'));
const passwordRow = document.getElementById('passwordRow');
const passwordInput = /** @type {HTMLInputElement|null} */(document.getElementById('password'));
collegeSelect?.addEventListener('change', function () {
  if (this.value === 'my') {
    if (passwordRow) passwordRow.hidden = false;
    if (emailInput) emailInput.value = 'harshrajverma099@gmail.com';
    if (passwordInput) passwordInput.value = '12378945';
  } else {
    if (passwordRow) passwordRow.hidden = true;
  }
});


