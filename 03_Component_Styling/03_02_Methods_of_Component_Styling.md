# Методы стилизации компонентов

## Подготовка компонентов

Рассмотрим 3 компонента:

- `PostCard` — отображает пост с заголовком, текстом и датой.
- `Header` — отображает заголовок страницы.
- `App` — объединяет всё приложение и отображает список постов.

1. Очистите стили в файлах `App.css` и `index.css`. Убедитесь, что в этих файлах отсутствуют стили, чтобы создать страницу с нуля.

2. Создание компонента `PostCard`. Создайте файл `PostCard.jsx` в папке `components`:

   ```jsx
   function PostCard({ title, content, date }) {
     return (
       <div>
         <h2>{title}</h2>
         <p>{content}</p>
         <p>{date}</p>
       </div>
     );
   }

   export default PostCard;
   ```

3. Создание компонента Header. Создайте файл `Header.jsx` в папке `components`:

   ```jsx
   // src/components/Header.jsx
   function Header() {
     return (
       <header>
         <h1>blog-app</h1>
       </header>
     );
   }

   export default Header;
   ```

4. Обновите файл `App.jsx` так, чтобы он использовал компоненты `PostCard` и `Header`:

   ```jsx
   // src/App.jsx
   import PostCard from "./components/PostCard";

   function App() {
     return (
       <div id="app">
         <Header />
         <main>
           <h1>Recent Posts</h1>
           <div>
             <PostCard
               title="Hello, World!"
               content="This is my first post"
               date="2025-01-17"
             />
             <PostCard
               title="React Props"
               content="Learn how to use props in React"
               date="2025-01-17"
             />
             <PostCard
               title="React Components"
               content="Explore the world of React components"
               date="2025-01-17"
             />
           </div>
         </main>
       </div>
     );
   }

   export default App;
   ```

В итоге страница должна выглядеть следующим образом:

<img src="https://imgur.com/91E7epN.png" alt="App page" style="width: 100%; max-width: 800px;" />

### Текущая структура проекта

```
src/
├── components/
│   ├── Header.jsx
│   ├── PostCard.jsx
├── App.jsx
├── index.css
├── main.jsx
├── index.html
├── ...
```

### Подготовка стилей

Чтобы установить базовые глобальные стили для всего приложения, добавьте в файл `index.css` следующий код:

```css
/* src/index.css */
@import url("https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap");

:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  font-weight: 400;
}

body {
  margin: 40px auto;
  padding: 0;
  max-width: 1270px;
  background-color: #f5f5f5;
}

/* Normalize */

* {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: 0;
}
```

## Назначение файлов стилей

- `index.css`

  - Глобальные стили приложения.
  - Здесь можно задать:
    - Основные шрифты.
    - Сброс стилей (reset).
    - Стили для body и других глобальных элементов.

- `App.css`
  - Стили компонента `App` и связанных с ним элементов.

> [!NOTE]
> В текущей главе показаны примеры стилизации компонентов на примере компонента `Header`. Полные стили для всех компонентов вы можете найти в директории [\_style_samples](./_style_samples).

## Inline styles

Самый простой способ стилизации компонентов — это использование inline стилей.

**Inline стили** — это стили, которые задаются прямо в компоненте через атрибут `style`.

### Пример: Стилизация компонента `Header`

#### Стилизация через строку

В JSX можно задавать стили с помощью строки, аналогично стандартному HTML.

```jsx
// src/components/Header.jsx
function Header() {
  return (
    <header style="display: flex; color: black; padding: 1rem; text-align: center; margin-bottom: 2rem; border-radius: 10px; border: 1px solid #ccc; font-family: 'Space Grotesk'; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
      <h1>blog-app</h1>
    </header>
  );
}
```

> [!WARNING]
> Этот код будет работать, но такой подход противоречит идеологии React. В React атрибут style ожидает объект JavaScript, а не строку.

#### Использование объекта для стилизации

В React стили задаются через объект, где:

- Ключами являются CSS-свойства, записанные в формате `camelCase` (например, `backgroundColor` вместо `background-color`).
- Значениями являются строки или переменные с CSS-значениями.

```jsx
// src/components/Header.jsx
function Header() {
  return (
    <header
      style={{
        display: "flex",
        color: "black",
        padding: "1rem",
        textAlign: "center",
        marginBottom: "2rem",
        borderRadius: "10px",
        border: "1px solid #ccc",
        fontFamily: "Space Grotesk",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "1.9rem",
        }}
      >
        blog-app
      </h1>
    </header>
  );
}

export default Header;
```

Рекомендуется использовать объект для стилизации компонентов, по следующим причинам:

- **Совместимость с синтаксисом React**. React ожидает, что атрибут style будет объектом. Использование строки нарушает соглашения фреймворка.
- **Поддержка динамических стилей**. Объекты позволяют задавать стили на основе переменных или условий. Например:

  ```jsx
  const isDarkMode = true;

  const headerStyle = {
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };

  function Header() {
    return (
      <header style={headerStyle}>
        <h1>blog-app</h1>
      </header>
    );
  }
  ```

- **Читаемость и масштабируемость**. Объекты упрощают организацию стилей и делают код более понятным.
- **Безопасность**. React автоматически предотвращает XSS-атаки, проверяя значения в объекте стилей.

### Преимущества и недостатки

### Преимущества и недостатки использования Inline CSS

| **Преимущества**                | **Недостатки**                                    |
| ------------------------------- | ------------------------------------------------- |
| Легкость и простота применения. | Нет поддержки псевдоклассов и медиа-запросов.     |
| Удобны для динамических стилей. | Код становится менее читаемым при сложных стилях. |
| Исключают конфликты стилей.     | Сложно переиспользовать стили.                    |
| Не требуют настройки сборщиков. | Не подходят для масштабных проектов.              |

## CSS файлы

Второй по простоте способ стилизации компонентов в React — использование CSS файлов. Это привычный способ, который вы используете в HTML, и он остаётся актуальным для React.

### Типы стилей

- **Глобальные стили**. Применяются ко всему приложению (например, общие стили для body, заголовков и т.д.).
- **Локальные стили**. Применяются только к конкретным компонентам. В React предпочтительно использовать локальные стили для уменьшения риска конфликтов.

### Методы стилизации компонентов через CSS файлы

- **Размещение стилей в одном файле**. Подходит для небольших проектов. Все стили размещаются в одном файле, например, `index.css`, и подключаются в основном компоненте `main.jsx`.
- **Размещение стилей в отдельных файлах**. Предпочтительный способ для средних и больших проектов. Для каждого компонента создаётся отдельный CSS файл, который импортируется только в этот компонент.

### Пример: Стилизация компонента `Header`

1. **Создайте директорию styles**. В папке src создайте директорию `styles`, где будут храниться все файлы стилей.
2. **Создайте директорию components**. Внутри `styles` создайте папку `components`. В этой папке будут находиться файлы стилей для отдельных компонентов.
3. **Создайте файл Header.css**. В папке `components` создайте файл `Header.css` и добавьте в него следующий код:

```css
/* src/styles/components/Header.css */
.header {
  display: flex;
  color: black;
  padding: 1rem;
  text-align: center;
  margin-bottom: 2rem;
  border-radius: 10px;
  border: 1px solid #ccc;
  font-family: "Space Grotesk";
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.header__title {
  margin: 0;
  font-size: 1.9rem;
}
```

4. **Подключите стили в Header.jsx**. Импортируйте файл стилей в компонент Header:

```jsx
// src/components/Header.jsx
import "./styles/components/Header.css";

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">blog-app</h1>
    </header>
  );
}

export default Header;
```

> [!NOTE]
> Обратите внимание: мы не добавляем стили через `<link>` в HTML-файл. Вместо этого JSX позволяет напрямую подключать CSS-файлы к компонентам с помощью импорта. Это делает стилизацию более модульной и удобной.

### Итоговая структура проекта

```bash
src/
├── components/
│   ├── Header.jsx
├── styles/
│   ├── components/
│   │   ├── Header.css
│   │   ├── ...
│   ├── index.css
├── App.jsx
├── main.jsx
├── index.html
├── ...
```

### Преимущества и недостатки

| **Преимущества**                           | **Недостатки**                               |
| ------------------------------------------ | -------------------------------------------- |
| Легко понять и использовать.               | Возможны конфликты глобальных стилей.        |
| Поддержка всех возможностей CSS.           | Нет изоляции стилей для компонентов.         |
| Логика и стили разделены, код читаем.      | Трудно масштабировать в больших проектах.    |
| Подходит для глобальных и базовых стилей.  | Требует поддержания порядка в файлах.        |
| Простая интеграция с инструментами сборки. | Нужно следовать правилам именования классов. |

## SCSS

## SCSS модули

## CSS-in-JS

## Использование CSS фреймворков

## Использование библиотек для стилизации
