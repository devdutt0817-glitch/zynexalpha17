/* =========================================================
   Devdutt Sharma — Portfolio
   Gmail-based admin authentication (simple & secure)
   ========================================================= */

// ONLY this Gmail can be admin
const ADMIN_EMAIL = "devdutt0817@gmail.com";
const ADMIN_PASSWORD = "devdutt@123"; // Set your secure password here

let isAdmin = false;

/**
 * Runs `onChange(isAdminBool)` whenever admin state changes,
 * and toggles any element with the `.admin-only` class automatically.
 */
function watchAdmin(onChange) {
  // Check if already logged in (stored in sessionStorage)
  const storedAdmin = sessionStorage.getItem("isAdminLoggedIn") === "true";
  const storedEmail = sessionStorage.getItem("adminEmail");
  
  isAdmin = storedAdmin && storedEmail === ADMIN_EMAIL;
  
  document.querySelectorAll(".admin-only").forEach((el) => {
    el.classList.toggle("visible", isAdmin);
  });
  document.querySelectorAll(".admin-badge").forEach((el) => {
    el.classList.toggle("visible", isAdmin);
  });

  if (typeof onChange === "function") onChange(isAdmin);
}

function logoutAdmin() {
  sessionStorage.removeItem("isAdminLoggedIn");
  sessionStorage.removeItem("adminEmail");
  window.location.href = "index.html";
}

/**
 * Marks the current page's tab as active based on the filename.
 */
function markActiveTab() {
  const current = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".tab[data-page]").forEach((tab) => {
    if (tab.getAttribute("data-page") === current) {
      tab.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", markActiveTab);
