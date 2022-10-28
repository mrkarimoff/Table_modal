/* 3rd program Modal Table*/

let modal = document.querySelector(".m-back");
let tBody = document.getElementById("tbody");
let inpName = document.getElementById("inp-name");
let inpPrice = document.getElementById("inp-price");
let inpNumber = document.getElementById("inp-number");
let isEditClicked = false;
let INDEX;

let storageData = JSON.parse(localStorage.getItem("data"));
let data = storageData
  ? storageData
  : [
      { id: 1, itemName: "phone", itemPrice: 250, quantity: 1, color: "#ff0000" },
      { id: 2, itemName: "toothbrush", itemPrice: 8, quantity: 1, color: "#ff0000" },
    ];

function addClass() {
  modal.classList.toggle("m-toggle");
}

draw();

function saveToLocalStorage() {
  localStorage.setItem("data", JSON.stringify(data));
}

function draw() {
  let s = "";
  data.map((item, index) => {
    s += `
		<tr>
			<th scope="row">${item.id}</th>
			<td>${item.itemName}</td>
			<td>$${item.itemPrice * item.quantity}</td>
			<td>${item.quantity}</td>
			<td class="act">
				<button onclick="incrementItem(${index})" class="w-25 btn btn-info">+1</button>
				<button onclick="decrementItem(${index})" class="w-25 btn btn-info">-1</button>
				<button onclick="editItem(${index})" class="w-25 btn btn-danger">edit</button>
				<button onclick="deleteItem(${index})" class="w-25 btn btn-danger">delete</button>
			</td>
			<td>
				<div class="d-flex  justify-content-around">
					<button class="color-box" style="background-color: ${item.color}">Click me</button>
					<input onchange="changeColor(event, ${index})" value="${item.color}" class="color-inp" type="color">
				</div>
			</td>
        </tr>
		`;
  });
  tBody.innerHTML = s;
}

function handleSubmit(e) {
  e.preventDefault();
  let itemName = e.target[0];
  let itemPrice = e.target[1];
  let quantity = e.target[2];

  if (isEditClicked) {
    data[INDEX].itemName = itemName.value;
    data[INDEX].itemPrice = itemPrice.value;
    data[INDEX].quantity = quantity.value;
    itemName.value = "";
    itemPrice.value = "";
    quantity.value = "";
    isEditClicked = false;
  } else if (itemName.value && itemPrice.value && quantity.value) {
    data.push({ id: data.length + 1, itemName: itemName.value, itemPrice: itemPrice.value, quantity: quantity.value, color: "red" });
    itemName.value = "";
    itemPrice.value = "";
    quantity.value = "";
  }

  draw();
  saveToLocalStorage();
}

function incrementItem(i) {
  ++data[i].quantity;
  draw();
  saveToLocalStorage();
}

function decrementItem(i) {
  if (data[i].quantity > 0) --data[i].quantity;
  draw();
  saveToLocalStorage();
}

function deleteItem(i) {
  data.splice(i, 1);
  draw();
  saveToLocalStorage();
}

function editItem(i) {
  addClass();
  inpName.value = data[i].itemName;
  inpPrice.value = data[i].itemPrice;
  inpNumber.value = data[i].quantity;
  isEditClicked = true;
  INDEX = i;
}

function changeColor(e, i) {
  e.preventDefault();
  let inpColor = e.target;
  data[i].color = inpColor.value;
  draw();
  saveToLocalStorage();
}
