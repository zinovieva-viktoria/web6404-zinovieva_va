/* Логика страницы signup.html: валидация, создание объекта Enrollment, вывод в консоль */
(function () {
    const form = document.getElementById("signup-form");
    const status = document.getElementById("form-status");
    const lessons = document.getElementById("lessons");
    const lessonsValue = document.getElementById("lessons-value");
    const dateInput = document.getElementById("date");

    // Нельзя выбрать дату в прошлом
    const today = new Date();
    dateInput.min = [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0"),
    ].join("-");

    // Значение ползунка рядом с подписью
    lessons.addEventListener("input", () => {
        lessonsValue.textContent = lessons.value;
    });

    const INVALID_CLASSES = ["form__input--invalid", "form__select--invalid", "form__textarea--invalid"];

    // Сообщения об ошибках на русском
    function getMessage(field) {
        const v = field.validity;
        if (v.valueMissing) {
            if (field.type === "checkbox") return "Нужно ваше согласие на обработку данных.";
            if (field.tagName === "SELECT") return "Выберите вариант из списка.";
            return "Заполните это поле.";
        }
        if (v.typeMismatch && field.type === "email") return "Введите корректный адрес почты, например name@example.com.";
        if (v.patternMismatch) return "Введите телефон в формате +7 (900) 000-00-00.";
        if (v.tooShort) return `Минимум символов: ${field.minLength}.`;
        if (v.rangeUnderflow) return "Выберите сегодняшнюю дату или позже.";
        return field.validationMessage;
    }

    function showError(field) {
        const box = form.querySelector(`[data-error-for="${field.name}"]`);
        const invalid = !field.checkValidity();
        INVALID_CLASSES.forEach((cls) => field.classList.remove(cls));
        if (invalid && field.type !== "checkbox") {
            const tag = field.tagName.toLowerCase();
            const mod = tag === "select" ? "select" : tag === "textarea" ? "textarea" : "input";
            field.classList.add(`form__${mod}--invalid`);
        }
        if (box) {
            box.textContent = invalid ? getMessage(field) : "";
        }
        return !invalid;
    }

    // Проверка поля «на лету» после первого ухода из него
    form.querySelectorAll("input, select, textarea").forEach((field) => {
        field.addEventListener("blur", () => showError(field));
        field.addEventListener("input", () => {
            if (field.classList.toString().includes("--invalid")) showError(field);
        });
    });

    form.addEventListener("submit", (event) => {
        // Отправка перехватывается: данные собираем в объект и выводим в консоль
        event.preventDefault();
        status.hidden = true;
        status.className = "form__status";

        const allValid = Array.from(form.elements)
            .filter((el) => el.name && el.type !== "radio")
            .map(showError)
            .every(Boolean);

        if (!allValid) {
            status.textContent = "Проверьте, пожалуйста, подсвеченные поля.";
            status.classList.add("form__status--error");
            status.hidden = false;
            form.querySelector("[class*='--invalid']")?.focus();
            return;
        }

        const data = new FormData(form);
        const enrollment = new Enrollment({
            name: data.get("name").trim(),
            phone: data.get("phone").trim(),
            email: data.get("email").trim(),
            grade: data.get("grade"),
            goal: data.get("goal"),
            date: data.get("date"),
            lessons: data.get("lessons"),
            comment: data.get("comment").trim(),
            consent: data.get("consent") === "on",
        });

        enrollment.printToConsole();

        // fetch(form.action, { method: "POST", headers: { "Content-Type": "application/json" },
        //                      body: JSON.stringify(enrollment) });

        status.textContent = `Спасибо, ${enrollment.name}! Заявка принята, скоро свяжусь с вами.`;
        status.classList.add("form__status--success");
        status.hidden = false;
        form.reset();
        lessonsValue.textContent = lessons.value;
    });
})();
