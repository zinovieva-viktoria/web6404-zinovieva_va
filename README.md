# Математика и лапки — лабораторная работа №4

Сайт репетитора по математике (на основе лабораторной №2), доработанный с помощью HTML, CSS и JavaScript.

## Как соответствует заданию

| Требование | Где реализовано |
|---|---|
| Вёрстка Flexbox | `index.html` (hero, split, `cards--flex`, steps, cta) + шапка/навигация на всех страницах |
| Вёрстка Grid | `services.html` (`.plans` — сетка тарифов, `.lesson` — `grid-template-areas`) |
| Цвета только через переменные | все цвета в блоке `:root` файла `css/style.css`, вне него цветов нет |
| CSS-анимация | `.paw-trail` на главной: «следы лапок» шагают по баннеру (`@keyframes paw-step`) |
| Страница с формой (≥3 типов полей) | `signup.html`: text, tel, email, select, radio, date, range, textarea, checkbox + кнопка отправки |
| Класс с конструктором и методом вывода | `js/Enrollment.js` — `class Enrollment`, метод `printToConsole()` |
| Создание объекта при отправке | `js/signup.js` — на `submit` создаётся `new Enrollment(...)` и вызывается `printToConsole()` (результат — в консоли браузера, F12) |
| Бонус: БЭМ | классы вида `block__element--modifier` (`nav__link--active`, `form__input--invalid`, `btn--light` и т. д.) |

## Запуск

Открыть `index.html` в браузере (сервер не нужен).
