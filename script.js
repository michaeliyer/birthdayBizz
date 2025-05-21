import { theNames } from "./allNames.js";
const inputs = {
  firstName: document.getElementById("firstName"),
  lastName: document.getElementById("lastName"),
  birthMonth: document.getElementById("birthMonth"),
  birthDay: document.getElementById("birthDay"),
  birthYear: document.getElementById("birthYear"),
};

const resultsDiv = document.getElementById("results");
const clearBtn = document.getElementById("clearBtn");
const showAllBtn = document.getElementById("showAllBtn");
const clearAllBtn = document.getElementById("clearAllBtn");
let allNamesVisible = false;

function getSortedNames(arr) {
  return [...arr].sort((a, b) => {
    const nameA = a.lastName?.toLowerCase() || "";
    const nameB = b.lastName?.toLowerCase() || "";
    return nameA.localeCompare(nameB);
  });
}

function filterNames() {
  const query = {
    firstName: inputs.firstName.value.trim().toLowerCase(),
    lastName: inputs.lastName.value.trim().toLowerCase(),
    birthMonth: inputs.birthMonth.value.trim().toLowerCase(),
    birthDay: inputs.birthDay.value.trim(),
    birthYear: inputs.birthYear.value.trim(),
  };

  const results = theNames.filter((aHuman) => {
    return (
      (!query.firstName ||
        aHuman.firstName.toLowerCase().startsWith(query.firstName)) &&
      (!query.lastName ||
        aHuman.lastName.toLowerCase().startsWith(query.lastName)) &&
      (!query.birthMonth ||
        (aHuman.birthMonth &&
          aHuman.birthMonth.toLowerCase() === query.birthMonth)) &&
      (!query.birthDay || aHuman.birthDay == query.birthDay) &&
      (!query.birthYear || aHuman.birthYear == query.birthYear)
    );
  });

  displayResults(getSortedNames(results));
  allNamesVisible = false;
}

function displayResults(results) {
  resultsDiv.innerHTML = "";
  if (results.length === 0) {
    resultsDiv.innerHTML = "<p>No matches found.</p>";
    return;
  }

  results.forEach((aHuman) => {
    const div = document.createElement("div");
    div.className = "result";
    let birthday = "";
    if (aHuman.birthMonth) {
      birthday = aHuman.birthMonth;
      if (aHuman.birthDay) {
        birthday += ` ${aHuman.birthDay}`;
        if (aHuman.birthYear) {
          birthday += `, ${aHuman.birthYear}`;
        }
      } else if (aHuman.birthYear) {
        birthday += `, ${aHuman.birthYear}`;
      }
    } else if (aHuman.birthDay) {
      birthday = aHuman.birthDay;
      if (aHuman.birthYear) {
        birthday += `, ${aHuman.birthYear}`;
      }
    } else if (aHuman.birthYear) {
      birthday = aHuman.birthYear;
    }
    let line = `<strong>${aHuman.firstName} ${aHuman.lastName}</strong>`;
    if (aHuman.passedAway) {
      line += " ---";
      if (birthday) {
        line += ` Born: ${birthday} -`;
      }
      line += ` Passed Away: ${aHuman.passedAway}, RIP ${aHuman.firstName} ${aHuman.lastName}`;
    } else if (birthday) {
      line += `: ${birthday}`;
    }
    div.innerHTML = line;
    resultsDiv.appendChild(div);
  });
}

Object.values(inputs).forEach((input) => {
  input.addEventListener("input", filterNames);
});

clearBtn.addEventListener("click", () => {
  Object.values(inputs).forEach((input) => {
    if (input.tagName === "SELECT") input.selectedIndex = 0;
    else input.value = "";
  });
  resultsDiv.innerHTML = "";
  allNamesVisible = false;
});

showAllBtn.addEventListener("click", () => {
  displayResults(getSortedNames(theNames));
  allNamesVisible = true;
});

clearAllBtn.addEventListener("click", () => {
  resultsDiv.innerHTML = "";
  allNamesVisible = false;
});

// Hide all data on page load
resultsDiv.innerHTML = "";
