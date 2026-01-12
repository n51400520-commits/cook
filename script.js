const ingredients = [
  { name: "Ұн", amount: 200, unit: "г" },
  { name: "Сүт", amount: 300, unit: "мл" },
  { name: "Жұмыртқа", amount: 2, unit: "дана" }
];

const grid = document.getElementById("ingredientsGrid");
const servingsInput = document.getElementById("servings");
const shareBtn = document.getElementById("shareBtn");

// Загружаем сохранённые данные
if (localStorage.getItem("servings")) {
  servingsInput.value = localStorage.getItem("servings");
}

// Функция отрисовки
function renderIngredients() {
  grid.innerHTML = "";
  const servings = parseInt(servingsInput.value);
  ingredients.forEach(item => {
    const row = document.createElement("div");
    row.className = "ingredient-row";
    const calcAmount = item.amount * servings;
    row.textContent = `${item.name}: ${calcAmount} ${item.unit}`;
    grid.appendChild(row);
  });
}


servingsInput.addEventListener("input", () => {
  localStorage.setItem("servings", servingsInput.value);
  renderIngredients();
});


shareBtn.addEventListener("click", () => {
  let text = "🍲 Рецепт:\n";
  const servings = servingsInput.value;
  text += `Сыбаға саны: ${servings}\n\n`;
  ingredients.forEach(item => {
    const calcAmount = item.amount * servings;
    text += `${item.name}: ${calcAmount} ${item.unit}\n`;
  });
  navigator.clipboard.writeText(text).then(() => {
    alert("Рецепт буферге көшірілді!");
  });
});

// Первичная отрисовка
renderIngredients();
