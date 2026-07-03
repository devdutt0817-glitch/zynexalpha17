/* =========================================================
   Devdutt Sharma — Portfolio
   Shared Firebase init + admin auth helpers
   Loaded AFTER the firebase-*-compat.js scripts on every page.
   ========================================================= */

const firebaseConfig = {
  apiKey: "AIzaSyCSy39eeFdJONcPSFJ76BJaciS1l6ESvTE",
  authDomain: "zynexalpha.firebaseapp.com",
  projectId: "zynexalpha"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Only this email gets admin / edit rights across the whole site.
const ADMIN_EMAIL = "devdutt0817@gmail.com";

let isAdmin = false;

/**
 * Runs `onChange(isAdminBool, user)` whenever auth state changes,
 * and toggles any element with the `.admin-only` class, plus the
 * `.admin-badge`, automatically.
 */
function watchAdmin(onChange) {
  auth.onAuthStateChanged((user) => {
    isAdmin = !!(user && user.email === ADMIN_EMAIL);

    document.querySelectorAll(".admin-only").forEach((el) => {
      el.classList.toggle("visible", isAdmin);
    });
    document.querySelectorAll(".admin-badge").forEach((el) => {
      el.classList.toggle("visible", isAdmin);
    });

    if (typeof onChange === "function") onChange(isAdmin, user);
  });
}

function logoutAdmin() {
  auth.signOut().then(() => window.location.href = "index.html");
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
