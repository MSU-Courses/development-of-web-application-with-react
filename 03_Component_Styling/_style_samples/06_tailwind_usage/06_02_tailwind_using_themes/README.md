# Стилизация компонентов с помощью Tailwind CSS и настройка темы

## Настройка темы

В Tailwind CSS **тема** представляет собой набор переменных, которые используются в
стилях. _Например_, цвета, шрифты, размеры и другие параметры темы.

С помощью директивы `@theme` можно создавать пользовательские переменные и использовать их в стилях.

Tailwind CSS поддерживает использование различных `namespace` (пространств имен) для создания пользовательских переменных, что делает стили более структурированными и управляемыми. [^7].

```css
/* Добавляем пользовательские цвета в тему */
@theme {
  /* Цвета */
  --color-primary: #3498db;

  /* Цветовая палитра */
  --color-avocado-100: oklch(0.99 0 0);
  --color-avocado-200: oklch(0.98 0.04 113.22);
  --color-avocado-300: oklch(0.94 0.11 115.03);

  /* Размеры */
  --size-small: 0.5rem;
  --size-medium: 1rem;
  --size-large: 2rem;
}
```

```html
<button class="text-primary">Button</button>
<div class="bg-avocado-200">Фон цвета авокадо</div>
<div class="p-small">Отступ 0.5rem</div>
```

Данные переменные можно использовать в стилях с помощью функции `var()`:

```css
/* Использование пользовательских переменных */
.text-primary {
  color: var(--color-primary);
}
```

## Запуск проекта

1. Передийдите в папку с проектом:

```bash
cd <путь до папки с проектом>
```

2. Установите зависимости:

```bash
npm install
```

3. Запустите проект:

```bash
npm run dev
```

[^7]: _Theme variable namespaces_. tailwindcss [online resource]. Available at: https://tailwindcss.com/docs/theme#theme-variable-namespaces
