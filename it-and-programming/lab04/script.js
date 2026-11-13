// ============================================================
// Шаг 1. Находим элементы на странице
// ============================================================
const billInput = document.getElementById('bill');
const tipSelect = document.getElementById('tip');
const calcBtn = document.getElementById('calcBtn');
const resultBlock = document.getElementById('result');
// ============================================================
// Шаг 2. Пишем функцию, которая считает чаевые
// ============================================================
function calculateTips() {
    // Получаем значение из поля ввода и преобразуем в число
    const bill = Number(billInput.value);
    // Получаем процент из выпадающего списка и преобразуем в число
    const tipPercent = Number(tipSelect.value);
    // Проверяем: если поле пустое или введено не число
    if (isNaN(bill) || bill <= 0) {
        resultBlock.textContent = 'Пожалуйста, введите корректную сумму.';
        resultBlock.style.borderColor = 'red';
        return; // выходим из функции, дальше не идём
    }
    // Считаем чаевые и итоговую сумму
    const tipAmount = bill * tipPercent / 100;
    const total = bill + tipAmount;
    // Формируем текст результата
    resultBlock.textContent =
        'Сумма счёта: ' + bill.toFixed(2) + ' ₽\n' +
        'Чаевые (' + tipPercent + '%): ' + tipAmount.toFixed(2) + ' ₽\n' +
        'Итого: ' + total.toFixed(2) + ' ₽';
    // Меняем цвет рамки в зависимости от процента
    if (tipPercent < 10) {
        resultBlock.style.borderColor = 'green'; // мало - зелёный
    } else if (tipPercent <= 15) {
        resultBlock.style.borderColor = 'orange'; // средне - оранжевый
    } else {
        resultBlock.style.borderColor = 'red'; // много - красный
    }
}
// ============================================================
// Шаг 3. Привязываем функцию к кнопке
// ============================================================
calcBtn.addEventListener('click', calculateTips);