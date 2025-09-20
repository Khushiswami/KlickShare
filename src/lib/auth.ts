"use client";

export function setAdminAuth(value: boolean) {
  if (typeof window !== "undefined") {
    localStorage.setItem("isAdmin", value ? "true" : "false");
  }
}

export function isAdminAuthenticated(): boolean {
  if (typeof window !== "undefined") {
    return localStorage.getItem("isAdmin") === "true";
  }
  return false;
}

export function logoutAdmin() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("isAdmin");
  }
}


// admin@klickshare.com
// admin123