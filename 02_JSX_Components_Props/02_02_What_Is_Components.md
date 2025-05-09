# Что такое компоненты?

> [!NOTE]
> Хорошо известное правило разработки сложного программного обеспечения гласит: если что-то становится сложным – раздели это на более простые части и соедини наиболее очевидным способом.

Прежде чем углубляться в работу с библиотекой React, важно понять, что такое веб-компоненты, зачем они нужны и какие задачи они решают.

## Определение компонентов

**Веб-компоненты** (далее _компоненты_) — это независимые и переиспользуемые части пользовательского интерфейса (UI). Каждая из них отвечает за отображение определённой функциональности или визуального элемента. Они упрощают разработку приложений, позволяя разделить код на отдельные части, которые легче разрабатывать, тестировать и поддерживать.

**Компонентная архитектура** — это подход к разработке программного обеспечения, при котором интерфейс приложения разбивается на небольшие, независимые и переиспользуемые части, называемые компонентами. Каждый компонент инкапсулирует в себе **логику**, **данные** и **визуальное представление** конкретной части пользовательского интерфейса, что облегчает разработку, тестирование и поддержку приложения.

## Зачем нужны компоненты?

Представьте большое веб-приложение с множеством функциональных возможностей и элементов интерфейса. Для управления сложностью и обеспечения повторного использования отдельных частей интерфейса разработчики делят приложение на **компоненты**, такие как:

- Кнопки,
- Формы,
- Карточки,
- Меню,
- Хэдеры,
- Футеры
- другие элементы.

Основные преимущества компонентов:

- **Переиспользуемость**. Один и тот же компонент может быть использован в разных частях приложения.
- **Модульность**. Легче разрабатывать и поддерживать маленькие независимые модули.
- **Поддерживаемость**. Изменения в компоненте автоматически отражаются во всех местах его использования.

## Пример разделения приложения на компоненты

Рассмотрим пример приложения, которое естественным образом разбивается на компоненты [^1]:

<img src="https://imgur.com/rV4LItq.png" style="width: 100%; max-width: 800px;" />

1. **Верхняя навигация**. Отвечает за отображение меню и логотипа.
2. **Данные пользователя**. Содержит информацию о текущем пользователе.
3. **Предложения подписаться**. Отображает рекламные или рекомендательные блоки.
4. **Форма отправки сообщения**. Позволяет пользователю отправлять текстовые сообщения.
5. **Сообщения (6 и 7)**. Показывает список переписки или отдельных сообщений.

Вместе эти компоненты образуют страницу или раздел приложения. Каждый из них может быть использован в других частях приложения или даже в других проектах.

## Аналогия с реальной жизнью

**Компоненты можно сравнить с домом**:

- Дом состоит из комнат (например, гостиная, спальня, кухня).
- Комнаты содержат мебель и предметы интерьера (столы, стулья, кровати, картины).
- Каждый предмет выполняет свою функцию, но может быть перенесён в другую комнату или даже другой дом.

## Создание компонентов

### Создание компонентов на чистом JavaScript

Чистый JavaScript предоставляет возможность создавать компоненты с помощью **Web Components**, что позволяет разрабатывать кастомные HTML-элементы.

**Пример 1.** _Компонент кнопки с использованием Web Components_

```js
class MyButton extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    button.textContent = "Нажми меня";
    shadow.appendChild(button);
  }
}

customElements.define("my-button", MyButton);
```

В примере создаётся кастомный HTML-элемент `<my-button>`, который содержит кнопку с текстом "Нажми меня".

**Пример 2.** _Использование компонента кнопки_

```html
<my-button></my-button>
<script src="button.js"></script>
```

Хотя Web Components мощны, их использование требует написания большого количества кода, что увеличивает сложность разработки и приводит к дублированию. Именно поэтому большинство разработчиков предпочитают использовать библиотеки и фреймворки, такие как React, Angular и Vue, которые упрощают процесс создания компонентов.

### Создание компонентов на React

React значительно упрощает разработку компонентов благодаря своей компонентной архитектуре.

Каждый компонент в React представляет собой независимый и автономный фрагмент кода, который описывает часть пользовательского интерфейса. Это позволяет минимизировать ошибки, упрощает тестирование и делает код более читаемым [^2].

**Пример 3.** _Компонент кнопки на React_

```jsx
import React from 'react';

function MyButton({ text, onClick }) {
  return <button onClick={onClick}>{text}</button>;
}

export default MyButton;
```

Этот код может показаться вам сложным на первый взгляд, но не стоит беспокоиться. В следующих разделах мы детально разберем, как создавать компоненты в React и использовать их в приложениях.

[^1]: _Web Components Intro_. javascript.info [online resource]. Available at: https://javascript.info/webcomponents-intro
[^2]: _Начало работы с React_. developer.mozilla.org [online resource]. Available at: https://developer.mozilla.org/ru/docs/Learn_web_development/Core/Frameworks_libraries/React_getting_started
