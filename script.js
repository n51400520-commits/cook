// Список рецептов
const recipes = {
  plov: [
    { name: "Ет (қой)", amount: 500, unit: "г" },
    { name: "Сәбіз", amount: 300, unit: "г" },
    { name: "Күріш", amount: 400, unit: "г" },
    { name: "Пияз", amount: 2, unit: "дана" }
  ],
  lagman: [
    { name: "Сиыр еті", amount: 400, unit: "г" },
    { name: "Кеспе", amount: 300, unit: "г" },
    { name: "Көкөніс қоспасы", amount: 250, unit: "г" }
  ],
  japanese_curry: [
    { name: "Тауық еті", amount: 300, unit: "г" },
    { name: "Картоп", amount: 2, unit: "дана" },
    { name: "Сәбіз", amount: 1, unit: "дана" },
    { name: "Curry roux", amount: 100, unit: "г" }
  ],
  omelet: [
    { name: "Жұмыртқа", amount: 3, unit: "дана" },
    { name: "Сүт", amount: 50, unit: "мл" },
    { name: "Тұз", amount: 1, unit: "шымшым" },
    { name: "Май", amount: 20, unit: "г" }
  ],
  onigiri: [
    { name: "Күріш", amount: 200, unit: "г" },
    { name: "Нори", amount: 2, unit: "парақ" },
    { name: "Толтыру (тунец/лосось)", amount: 50, unit: "г" }
  ]
};

// Элементы DOM
const grid = document.getElementById("ingredientsGrid");
const servingsInput = document.getElementById("servings");
const dishSelect = document.getElementById("dish");
const shareBtn = document.getElementById("shareBtn");

// Загружаем сохранённые данные
if (localStorage.getItem("servings")) {
  servingsInput.value = localStorage.getItem("servings");
}
if (localStorage.getItem("dish")) {
  dishSelect.value = localStorage.getItem("dish");
}

// Функция отрисовки ингредиентов
function renderIngredients() {
  grid.innerHTML = "";
  const servings = parseInt(servingsInput.value);
  const currentDish = dishSelect.value;

  recipes[currentDish].forEach(item => {
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

// Событие выбора блюда
dishSelect.addEventListener("change", () => {
  localStorage.setItem("dish", dishSelect.value);
  renderIngredients();
});

// Кнопка «Бөлісу» — копируем рецепт в буфер
shareBtn.addEventListener("click", () => {
  let text = "🍲 Рецепт:\n";
  const servings = servingsInput.value;
  const currentDish = dishSelect.value;

  text += `Тағам: ${dishSelect.options[dishSelect.selectedIndex].text}\n`;
  text += `Сыбаға саны: ${servings}\n\n`;

  recipes[currentDish].forEach(item => {
    const calcAmount = item.amount * servings;
    text += `${item.name}: ${calcAmount} ${item.unit}\n`;
  });

  navigator.clipboard.writeText(text).then(() => {
    alert("Рецепт буферге көшірілді!");
  });
});

// Первичная отрисовка
renderIngredients();


