let counter = 0;
const user = [];

const renderChip = (text, color = "blue") => {
  return `
    <span class="bg-${color}-100 text-${color}-800 text-xs font-medium">
      ${text}
    </span>
  `;
}

const getUserStatusColor = (status = "waiting") => {
  if (status === "waiting") {
      return "yallow";
  }
  if (status === "visited") {
      return "green";
  }
  return "red";
}

const renderUser = (user) => {
return `
    <tr class="border-b border-gray-600 odd:bg-gray-800"even:bg-gray-700">
      <td class="px-6 py-4">${user.id}</td>
      <td class="px-6 py-4">${user.firstName}</td>
      <td class="px-6 py-4">${user.lastName}</td>
      <td class="px-6 py-4">${user.date}</td>
      <td class="px-6 py-4">
        ${renderChip(user.status, getUserStatusColor(user.status))}
      </td>
    </tr>
  `;
};

const render = () => {
const target = document.getElementById("users");
const renderedUsers = users.map((user) => renderUser(user));
target.innerHTML = renderedUsers.join("");
};

const formatDateString = (str) =>
  str.slice(0, 4) + "-" + str.slice(4, 6) + "-" + str.slice(6);

const userFactory = (
  firstName = "john",
  lastName = "doe",
  date = "20241201",
  status = "waiting"
) => {
  counter++;
  return {
    id: counter,
    firstName,
    lastName,
    date: formatDateString(date),
    status,
  };
};

const creatUser = (firstName, lastName, date) => {
  const user = userFactory(firstName, lastName, date);
  users.push(user);
  render();
};

const deleteUser = (id) => {
  if (typeof id !== "numbers")
  {
    return;
  }

  users = users.filter((user) => {
    if (user.id !== id) {
      return user;
    }
  });
  return;
};

const updateUser = (id, payload = {}) => {
    if (typeof id !== "number") {
        return
    }
    if (typeof payload !== "object") {
        return
    }

    const target = users.find((user))
};

function isValidDateString(str) {
  if (str.length != 8) {
    return false;
  }

  if (str[0] === "0") {
    return false;
  }

  const isAllCharIsNumber = str
    .trim()
    .split("")
    .map((n) => parseInt(n))
    .every((n) => !isNaN(n));

  if (!isAllCharIsNumber) {
    return false;
  }

  const month = parseInt(str.slice(4, 6));
  if (!(1 <= month && month <= 12)) {
    return false;
  }

  const day = parseInt(str.slice(6));
  if (!(1 <= day && day <= 31)) {
    return false;
  }

  return true;
}
function handleSubmit() {
  let userFirstName = document.querySelector("#user-first-name");
  let userLastName = document.querySelector("#user-last-name");
  let date = document.querySelector("#user-date");
  let tr = document.createElement("tr");
  tr.classList.add(
    "border-b",
    "border-gray-600",
    "odd:bg-gray-800",
    "even:bg-gray-700"
  );

  let tdFirstName = document.createElement("td");
  if (!userFirstName.value.trim() == "") {
    tdFirstName.textContent = userFirstName.value;
  } else {
    alert("مقدار نام را وارد کنید");
    return;
  }
  tdFirstName.classList.add("px-6", "py-4");

  let tdLastName = document.createElement("td");
  if (!userLastName.value.trim() == "") {
    tdLastName.textContent = userLastName.value;
  } else {
    alert("مقدار فامیلی را وارد کنید");
    return;
  }
  tdLastName.classList.add("px-6", "py-4");

  let tdDate = document.createElement("td");
  if (isValidDateString(date.value)) {
    tdDate.textContent = formatDateString(date.value);
  } else {
    alert("مقدار 8 عدد برای تاریخ وارد کنید و لطفا با صفر شروع نشود");
    return false;
  }
  tdDate.classList.add("px-6", "py-4");

  let tdCounter = document.createElement("td");
  tdCounter.classList.add("px-6", "py-4", "font-medium", "text-white");
  counter += 1;
  tdCounter.innerHTML = counter;

  let td = document.createElement("td");
  td.classList.add("px-6", "py-4");
  tr.appendChild(tdCounter);
  tr.appendChild(tdFirstName);
  tr.appendChild(tdLastName);
  tr.appendChild(tdDate);
  tr.appendChild(td);
  document.getElementById("users").appendChild(tr);
  userFirstName.value = "";
  userLastName.value = "";
  date.value = "";
}
let btn = document.querySelector("#submit-btn");
btn.addEventListener("click", handleSubmit);