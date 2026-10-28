const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");
const year = document.getElementById("year");

// Display the current year.
year.textContent = new Date().getFullYear();

// Load the saved theme, if available.
let savedTheme = null;

try {
  savedTheme = localStorage.getItem("nexatech-theme");
} catch (error) {
  console.warn("Theme preferences cannot be saved.");
}

if (
  savedTheme === "dark" ||
  (!savedTheme &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  document.body.classList.add("dark");
}

function updateThemeButton() {
  const darkMode = document.body.classList.contains("dark");

  themeToggle.textContent = darkMode ? "☀️" : "🌙";
  themeToggle.setAttribute(
    "aria-label",
    darkMode ? "Switch to light mode" : "Switch to dark mode"
  );
}

updateThemeButton();

// Switch themes.
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const darkMode = document.body.classList.contains("dark");

  try {
    localStorage.setItem(
      "nexatech-theme",
      darkMode ? "dark" : "light"
    );
  } catch (error) {
    console.warn("Theme preference could not be saved.");
  }

  updateThemeButton();
});

// Open and close the mobile menu.
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close the mobile menu after selecting a link.
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Validate the form and show a demo response.
contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!contactForm.checkValidity()) {
    contactForm.reportValidity();
    return;
  }

  const name = document.getElementById("name").value.trim();

  formMessage.textContent =
    `Thank you, ${name}! Your demo inquiry is valid. ` +
    "No message has been sent to an inbox.";

  contactForm.reset();
});