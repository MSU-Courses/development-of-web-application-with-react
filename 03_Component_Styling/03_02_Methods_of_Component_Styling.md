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
   import PostCard from './components/PostCard';

   function App() {
     return (
       <div id="app">
         <Header />
         <main>
           <h1>Recent Posts</h1>
           <div>
             <PostCard title="Hello, World!" content="This is my first post" date="2025-01-17" />
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
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&display=swap');

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
        display: 'flex',
        color: 'black',
        padding: '1rem',
        textAlign: 'center',
        marginBottom: '2rem',
        borderRadius: '10px',
        border: '1px solid #ccc',
        fontFamily: 'Space Grotesk',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      }}>
      <h1
        style={{
          margin: 0,
          fontSize: '1.9rem',
        }}>
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
    backgroundColor: isDarkMode ? 'black' : 'white',
    color: isDarkMode ? 'white' : 'black',
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

1. **Добавьте стили в файл `App.css`**. Создайте или измените файл `App.css`, добавив туда следующие стили для компонента `Header`.

   ```css
   /* src/App.css */

   /* Стили для компонента Header */
   .header {
     display: flex;
     color: black;
     padding: 0.5rem;
     text-align: center;
     margin-bottom: 2rem;
     border-radius: 10px;
     border: 1px solid #ccc;
     font-family: 'Space Grotesk', sans-serif;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   }

   /* Стили для заголовка внутри Header */
   .header__title {
     margin: 0;
     font-size: 1.9rem;
   }

   /* Медиа-запросы для адаптивности */
   @media (min-width: 576px) {
     .header {
       padding: 1rem;
     }
   }
   ```

2. **Импортируйте стили в `App.jsx`**. Для того чтобы стили применились глобально, необходимо импортировать файл `App.css` в компонент `App.jsx`.

   ```jsx
   // ...
   import './App.css'; // Импорт CSS файла

   function App() {
     // ...
   }

   export default App;
   ```

> [!NOTE]
> Обратите внимание: мы не добавляем стили через `<link>` в HTML-файл. Вместо этого JSX позволяет напрямую подключать CSS-файлы к компонентам с помощью импорта. Это делает стилизацию более модульной и удобной.

#### Итоговая структура проекта

```bash
src/
├── components/
│   ├── Header.jsx
│   ├── ...
├── App.jsx
├── main.jsx
├── index.html
├── ...
```

### Преимущества и недостатки

| **Преимущества**                                         | **Недостатки**                                                    |
| -------------------------------------------------------- | ----------------------------------------------------------------- |
| Легко понять и использовать.                             | Возможны конфликты глобальных стилей.                             |
| Поддержка всех возможностей CSS.                         | Нет изоляции стилей для компонентов.                              |
| Не требует дополнительной конфигурации или инструментов. | Трудно масштабировать в больших проектах.                         |
| Подходит для глобальных и базовых стилей.                | Большое количество стилей в одном файле усложняет работу с кодом. |

## SCSS

**SCSS** — это мощное расширение CSS, которое добавляет новые возможности, такие как переменные, вложенные правила, миксины и многое другое. SCSS упрощает разработку и поддержку стилей, а после компиляции преобразуется в обычный CSS, совместимый с браузерами.

### Примеры синтаксиса SCSS

#### Использование переменных

> [!TIP]
> Переменные позволяют централизовать изменения в стилях. Например, один цвет можно переиспользовать в нескольких местах.

```scss
$primary-color: #3498db;

body {
  background-color: $primary-color;
  color: white;
}
```

#### Вложенные правила

> [!TIP]
> Вложенность упрощает структуру стилей, делая её более читаемой.

**Пример 1.** _Базовая вложенность_

```scss
.container {
  .header {
    color: red;
    .title {
      font-size: 1.5rem;
    }
  }
}
```

Скомпилируется в:

```css
.container .header {
  color: red;
}

.container .header .title {
  font-size: 1.5rem;
}
```

**Пример 2.** _Использование `&` для ссылок на родительский элемент_

```scss
.header {
  &__title {
    color: red;

    &--bold {
      font-weight: bold;
    }
  }
}
```

Скомпилируется в:

```css
.header__title {
  color: red;
}

.header__title--bold {
  font-weight: bold;
}
```

#### Использование ссылки на родительский элемент

Знак `&` в SCSS используется для ссылки на родительский селектор. Это позволяет создавать вложенные правила и упрощать работу с модификаторами и псевдоклассами.

**Пример 1.** _Ссылка на родительский селектор_

```scss
.button {
  &--primary {
    background-color: blue;
  }

  &--secondary {
    background-color: gray;
  }
}
```

Скомпилируется в:

```css
.button--primary {
  background-color: blue;
}

.button--secondary {
  background-color: gray;
}
```

**Пример 2.** _Использование для псевдоклассов_

```scss
.button {
  &:hover {
    background-color: darkblue;
  }

  &:active {
    background-color: navy;
  }
}
```

Скомпилируется в:

```css
.button:hover {
  background-color: darkblue;
}

.button:active {
  background-color: navy;
}
```

**Пример 3.** _Вложенность с модификаторами_

```scss
.card {
  &__title {
    font-size: 1.5rem;

    &--highlight {
      color: red;
    }
  }
}
```

Скомпилируется в:

```css
.card__title {
  font-size: 1.5rem;
}

.card__title--highlight {
  color: red;
}
```

#### Миксины для медиа-запросов

> [!TIP]
> Миксины позволяют упростить работу с адаптивными стилями.

**Пример 1.** _Миксин для медиа запросов_

```scss
@mixin sm {
  @media (min-width: 576px) {
    @content;
  }
}

@mixin md {
  @media (min-width: 768px) {
    @content;
  }
}

@mixin lg {
  @media (min-width: 992px) {
    @content;
  }
}

@mixin xl {
  @media (min-width: 1200px) {
    @content;
  }
}

.container {
  padding: 1rem;

  @include sm {
    background-color: gray;
  }

  @include md {
    background-color: darkgray;
  }

  @include lg {
    background-color: black;
  }

  @include xl {
    background-color: blue;
  }
}
```

Скомпилируется в:

```css
.container {
  padding: 1rem;
}

@media (min-width: 576px) {
  .container {
    background-color: gray;
  }
}

@media (min-width: 768px) {
  .container {
    background-color: darkgray;
  }
}

@media (min-width: 992px) {
  .container {
    background-color: black;
  }
}

@media (min-width: 1200px) {
  .container {
    background-color: blue;
  }
}
```

> [!NOTE]
> Миксины в SCSS работают как обычные функции: они принимают аргументы и возвращают стили. Этот подход упрощает работу с медиа-запросами и позволяет эффективно создавать адаптивные стили.

#### Импорт файлов стилей

SCSS поддерживает **импорт файлов** для организации кода. Теперь CSS можно разбить на несколько логических частей и импортировать их в один файл.

```scss
// _variables.scss
$primary-color: #3498db;

// _header.scss
.header {
  background-color: $primary-color;
}

// styles.scss
@import 'variables';
@import 'header';
```

Все стили из файлов `_variables.scss` и `_header.scss` будут объединены в `styles.css`.

> [!TIP]
> Подробнее о возможностях SCSS можно узнать в официальной [документации SCSS](https://sass-lang.com/documentation).

### Пример: Стилизация компонента `Header`

С помощью SCSS и его возможностей код можно разбить на несколько для отделения стилей компонентов и их частей.

1. Установите SCSS в проект.

   ```bash
   npm install sass
   ```

2. Создайте директорию `styles` в директории `src` для хранения всех файлов стилей.

3. Создайте директорию `components` в директории `styles` для хранения стилей отделённых компонентов. В данной структуре файлы стилей компонентов будут храниться в папке `components`, а общие переменные и миксины — в корне папки `styles`.

4. В папке `styles/components` создайте файл `_header.scss` и добавьте стили для компонента `Header`.

   ```scss
   // src/styles/components/_header.scss
   .header {
     display: flex;
     color: $primary-color;
     padding: 0.5rem;
     text-align: center;
     margin-bottom: 2rem;
     border-radius: 10px;
     border: 1px solid $extra-color;
     font-family: $heading-font;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

     &__title {
       margin: 0;
       font-size: 1.9rem;
     }

     // Используем медиа запросы для адаптивности
     @include lg {
       padding: 1rem;
     }
   }
   ```

> [!NOTE]
> Название файла начинается с подчёркивания (`_header.scss`), что указывает, что это частичный файл (`partial`). Частичные файлы не компилируются в отдельные CSS-файлы, а импортируются в другие SCSS-файлы.

5. Добавьте файл `_variables.scss` в папке `styles` для хранения общих переменных.

   ```scss
   // src/styles/_variables.scss
   $primary-color: #3498db;
   $extra-color: #666;
   $heading-font: 'Space Grotesk';
   ```

6. В папке `styles/mixins` создайте файл `_media-query.scss`, который будет содержать адаптивные миксины.

   ```scss
   // src/styles/mixins/_media-query.scss
   @mixin sm {
     @media screen and (min-width: $xs) {
       @content;
     }
   }

   @mixin md {
     @media screen and (min-width: $sm) {
       @content;
     }
   }

   @mixin lg {
     @media screen and (min-width: $md) {
       @content;
     }
   }

   @mixin xl {
     @media screen and (min-width: $lg) {
       @content;
     }
   }
   ```

7. Создайте файл `_all.scss` в папке `styles/components` для импорта всех стилей компонентов:

   ```scss
   // src/styles/components/_all.scss
   @import './header';
   ```

   Данный файл будет импортировать все стили из других файлов в папке `components`, для большего удобства.

8. Создайте файл `main.scss` в папке `styles`, который будет объединять переменные, миксины и стили компонентов:

   ```scss
   // src/styles/main.scss

   // Import Variables
   @import './variables';

   // Import Mixins
   @import './mixins/media-query';

   // Import Components
   @import './components/_all';
   ```

> [!NOTE]
> Расширение `.scss` указывать не нужно — SCSS автоматически определяет тип файла.

9. В файле `main.jsx` подключите главный файл стилей.

   ```jsx
   // src/main.jsx
   import React from 'react';
   import ReactDOM from 'react-dom/client';
   import App from './App';

   // Подключение стилей
   import './styles/main.scss';

   ReactDOM.createRoot(document.getElementById('root')).render(
     <React.StrictMode>
       <App />
     </React.StrictMode>,
   );
   ```

10. Удалите старый импорт файла `App.css` из `App.jsx`, так как все стили теперь подключены через SCSS в файле `main.jsx`.

```jsx
// src/App.jsx
function App() {
  return (
   // ...
  );
}

export default App;
```

#### Итоговая структура проекта

```bash
src/
├── components/
│   ├── Header.jsx
├── styles/
│   ├── components/
│   │   ├── _header.scss
│   │   ├── _all.scss
│   │   ├── ...
│   ├── mixins/
│   │   ├── _media-query.scss
│   ├── _variables.scss
│   ├── main.scss
├── main.jsx
├── ...
```

### Преимущества и недостатки

| **Преимущества**                          | **Недостатки**                                     |
| ----------------------------------------- | -------------------------------------------------- |
| Легко разделять стили по компонентам.     | Даже неиспользуемые стили попадают в итоговый CSS. |
| Переменные и миксины сокращают код.       | Требуется компиляция SCSS.                         |
| Структура SCSS улучшает организацию кода. | Увеличивается количество файлов в проекте.         |

## CSS модули

**CSS модули** — это современный способ стилизации компонентов в React, позволяющий изолировать стили компонентов и избежать конфликтов. Они создают уникальные имена классов автоматически, что делает их особенно полезными в масштабируемых приложениях.

> [!TIP]
> В данной главе используется `SCSS`, но вы можете использовать обычные CSS файлы.

### Что такое CSS модули?

**CSS модули** работают как обычные CSS/SCSS файлы, но при этом имена классов внутри файлов становятся уникальными.

Например, вместо `.header` будет создан уникальный класс `.header__1s3d2`, который исключает конфликты.

### Как создать CSS модуль?

Допустим, у нас есть компонент `Component`. Чтобы создать для него CSS модуль:

- Назовите файл стилей `Component.module.css` (или `.scss`).
- Разместите файл стилей в той же папке, где находится компонент.

**Структура файлов:**

```bash
src/
├── components/
│   ├── Component/
│   │   ├── index.jsx
│   │   ├── Component.module.scss
```

**Код компонента:**

```jsx
// src/components/Component/index.jsx
import React from 'react';
import styles from './Component.module.scss';

function Component() {
  return (
    <div className={styles.component}>
      <p className={styles.content}>Hi, I'm a component</p>
    </div>
  );
}

export default Component;
```

**Код стилей:**

```scss
/* src/components/Component/Component.module.scss */
.component {
  color: red;
}

.content {
  font-size: 1.2rem;
}
```

После импорта модуля styles он становится объектом с уникальными именами классов:

```js
{
  component: '_component_1s3d2',
  content: '_content_1s3d4',
}
```

Компонент был переименован в `index.jsx`, чтобы избежать тавтологии. Теперь файл компонента называется `index.jsx`, а папка с компонентом — `Component`, вместо того, чтоб при импорте указывать путь к файлу `Component/Component`.

### Пример: Стилизация компонента `Header`

1. Создайте директорию `Header` в папке `components`, чтобы хранить компонент и его стили.
2. Создайте файл `_utils.scss` в папке `styles`, чтобы объединить все переменные и миксины, которые будут использоваться в компонентах. Этот файл можно импортировать в любой модуль стилей.

   ```scss
   // src/styles/_utils.scss

   // Импорт переменных
   @import '_variables.scss';

   // Импорт миксинов
   @import 'mixins/_media-query.scss';
   ```

3. Добавьте файл `Header.module.scss` для стилей компонента:

   ```scss
   // src/components/Header/Header.module.scss
   @import '../../styles/_utils';

   .header {
     display: flex;
     color: $primary-color;
     padding: 0.5rem;
     text-align: center;
     margin-bottom: 2rem;
     border-radius: 10px;
     border: 1px solid $extra-color;
     font-family: $heading-font;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   }

   .title {
     margin: 0;
     font-size: 1.9rem;

     @include lg {
       padding: 1rem;
     }
   }
   ```

> [!NOTE]
> Благодаря уникальности CSS модулей больше нет необходимости создавать сложные иерархические имена классов (например, `header__title`). Можно использовать простые и интуитивно понятные имена (например, `title`), которые автоматически будут преобразованы в уникальные.

4. Используйте стили в компоненте:

   ```jsx
   // src/components/Header/Header.jsx
   import React from 'react';

   // Импорт стилей как переменной
   import styles from './Header.module.scss';

   function Header() {
     // styles — это объект, в котором хранятся уникальные имена классов
     return (
       <header className={styles.header}>
         <h1 className={styles.title}>blog-app</h1>
       </header>
     );
   }

   export default Header;
   ```

5. Удалите файл `/styles/components/_header.scss`, так как все стили теперь находятся в модуле Header.module.scss.

6. Для упрощения импорта и избежания тавтологии переименуйте файл компонента `Header.jsx` в `index.jsx`. Это позволит импортировать компонент без указания имени файла:

   ```jsx
   // src/components/Header/index.jsx
   function Header() {
     return (
       <header className={styles.header}>
         <h1 className={styles.title}>blog-app</h1>
       </header>
     );
   }

   export default Header;
   ```

7. Измените импорт компонента в `App.jsx`:

   ```jsx
   // src/App.jsx
   import Header from './components/Header';

   function App() {
     return (
       // ...
     );
   }

   export default App;
   ```

8. Повторите шаги для всех компонентов приложения, создавая для каждого компонента отдельные модули стилей. В итоге все стили будут храниться в папках компонентов, а директория `styles/components` станет ненужной и может быть удалена. Этот подход улучшает модульность и упрощает управление стилями.

> [!NOTE]
> Файл `main.scss` предназначен для хранения глобальных стилей, а также для импорта шрифтов, переменных и миксинов, доступных для всего приложения.

#### Итоговая структура проекта

```bash
src/
├── components/
│   ├── Header
│   │   ├── index.jsx
│   │   ├── Header.module.scss
│   ├── ...
├── styles/
│   ├── mixins/
│   │   ├── _media-query.scss
│   ├── _utils.scss
│   ├── _variables.scss
│   ├── main.scss
├── main.jsx
├── ...
```

### Преимущества и недостатки

| **Преимущества**                                           | **Недостатки**                                    |
| ---------------------------------------------------------- | ------------------------------------------------- |
| Стили изолированы и не конфликтуют с другими компонентами. | Каждый компонент требует отдельного файла стилей. |
| Можно использовать привычный CSS или SCSS.                 | Каждый файл стилей нужно импортировать вручную.   |
| Уникальные имена классов создаются автоматически.          | Вложенность директорий может усложнить структуру. |

## CSS-in-JS

## Использование CSS фреймворков

## Использование библиотек для стилизации
