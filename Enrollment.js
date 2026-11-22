/** Заявка на занятие */
class Enrollment {
    /**
     * @param {Object}  data
     * @param {string}  data.name      Имя ученика
     * @param {string}  data.phone     Телефон
     * @param {string}  data.email     Электронная почта
     * @param {string}  data.grade     Класс
     * @param {string}  data.goal      Цель занятий
     * @param {string}  data.date      Желаемая дата первого занятия (YYYY-MM-DD)
     * @param {number}  data.lessons   Занятий в неделю
     * @param {string}  [data.comment] Комментарий
     * @param {boolean} data.consent   Согласие на обработку данных
     */
    constructor({ name, phone, email, grade, goal, date, lessons, comment = "", consent }) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.grade = grade;
        this.goal = goal;
        this.date = date;
        this.lessons = Number(lessons);
        this.comment = comment;
        this.consent = Boolean(consent);
        this.createdAt = new Date();
    }

    /** Форматированный вывод заявки в консоль */
    printToConsole() {
        const formatDate = (iso) => new Date(iso).toLocaleDateString("ru-RU");
        const rows = [
            ["Имя ученика", this.name],
            ["Телефон", this.phone],
            ["Почта", this.email],
            ["Класс", `${this.grade} класс`],
            ["Цель", this.goal],
            ["Первое занятие", formatDate(this.date)],
            ["Занятий в неделю", this.lessons],
            ["Комментарий", this.comment || "—"],
            ["Согласие на обработку данных", this.consent ? "да" : "нет"],
        ];
        const width = Math.max(...rows.map(([label]) => label.length));

        console.group("🐾 Новая заявка на занятие");
        console.log(`Создана: ${this.createdAt.toLocaleString("ru-RU")}`);
        rows.forEach(([label, value]) => {
            console.log(`${label.padEnd(width)} : ${value}`);
        });
        console.groupEnd();
    }
}
