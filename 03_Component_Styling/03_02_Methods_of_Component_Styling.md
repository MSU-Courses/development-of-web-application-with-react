# Методы стилизации компонентов

## Подготовка компонентов

> [!NOTE]
> В данной главе материал будет представлен на примере небольшого приложения — списка статей. В ходе изучения мы последовательно рассмотрим различные подходы к стилизации компонентов в React: от самых простых и примитивных методов, таких как inline стили, до более продвинутых и современных подходов, таких как CSS-in-JS или Tailwind CSS.

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

**SCSS** — это мощное расширение CSS, которое добавляет новые возможности, такие как переменные, вложенные правила, миксины и многое другое. SCSS упрощает разработку и поддержку стилей, а после компиляции преобразуется в обычный CSS, совместимый с браузерами [^2].

### Примеры синтаксиса SCSS [^3]

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

**Пример 3.** _Ссылка на родительский селектор_

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

**Пример 4.** _Использование для псевдоклассов_

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

**Пример 5.** _Вложенность с модификаторами_

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

**Пример 6.** _Миксин для медиа запросов_

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

**CSS модули** — это современный способ стилизации компонентов в React, позволяющий изолировать стили компонентов и избежать конфликтов. Они создают уникальные имена классов автоматически, что делает их особенно полезными в масштабируемых приложениях [^4].

> [!TIP]
> В данной главе используется `SCSS`, но вы можете использовать обычные CSS файлы.

### Что такое CSS модули?

**CSS модули** работают как обычные CSS/SCSS файлы, но при этом имена классов внутри файлов становятся уникальными.

Например, вместо `.header` будет создан уникальный класс `.header__1s3d2`, который исключает конфликты.

### Как создать CSS модуль?

Допустим, у нас есть компонент `Component`. Чтобы создать для него CSS модуль:

- Файл должен иметь расширение `.module.scss`. Например, `Component.module.scss`. 
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

**CSS-in-JS** — это подход к стилизации компонентов, который позволяет **писать стили прямо в JavaScript-коде**. Это упрощает управление стилями и делает их тесно связанными с логикой компонентов.

В данном разделе рассмотрим использование библиотеки `styled-components` — одной из самых популярных CSS-in-JS библиотек.

### Что такое `styled-components?`

`styled-components` позволяет создавать стилизованные компоненты с помощью тегов шаблонов (tagged template literals). Это обеспечивает изоляцию стилей и возможность динамической настройки.

**Пример 7.** _Базовый пример_

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
`;

function App() {
  return <Button>Click me</Button>;
}
```

В этом примере стили для кнопки заданы с помощью компонента `styled.button`, который автоматически генерирует уникальный класс.

**Пример 8.** _Условные и наследуемые стили_

Библиотека поддерживает условные и наследуемые стили, что делает её особенно удобной для работы с динамическими интерфейсами.

```jsx
import styled from 'styled-components';

// Условные стили: цвет зависит от значения пропса isPrimary
const Title = styled.h1`
  font-size: 2rem;
  color: ${({ isPrimary }) => (isPrimary ? 'blue' : 'black')};
`;

// Наследование стилей: TomatoTitle наследует стили от Title и добавляет свои
const TomatoTitle = styled(Title)`
  color: tomato;
`;

function App() {
  return (
    <>
      <Title isPrimary>Hello, world!</Title>
      <TomatoTitle>Styled-components</TomatoTitle>
    </>
  );
}
```

**Пример 9.** _Псевдоклассы и медиа-запросы_

```jsx
const Button = styled.button`
  background-color: blue;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;

  // Псевдокласс :hover
  &:hover {
    background-color: darkblue;
  }

  // Медиа-запрос
  @media (min-width: 576px) {
    padding: 1rem 2rem;
  }
`;
```

> [!NOTE]
> Символ `&` ссылается на родительский элемент. Например, `&:hover` означает, что стиль будет применяться к элементу при наведении курсора.

Полное описание возможностей библиотеки `styled-components` можно найти в официальной документации [^1].

### Пример: Стилизация компонента `Header`

1. Установите библиотеку `styled-components`:

   ```bash
   npm install styled-components
   ```

2. Переместите компонент `Header` в папку components и переименуйте его обратно в `Header.jsx`. Модули стилей больше не используются, так как стили теперь создаются с помощью `styled-components`.

3. Создайте стилизованные компоненты для `Header`.

   В компоненте Header создайте два стилизованных компонента с помощью styled-components: `Wrapper` и `HeaderTitle`:

   - `Wrapper` — для обёртки заголовка.
   - `HeaderTitle` — для самого заголовка.

   ```jsx
   // src/components/Header.jsx
   import styled from 'styled-components';

   // Создание стилизованного компонента Wrapper
   const Wrapper = styled.header`
     display: flex;
     color: #252525;
     padding: 0.5rem;
     text-align: center;
     margin-bottom: 2rem;
     border-radius: 10px;
     border: 1px solid #666;
     font-family: 'Space Grotesk', sans-serif;
     box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
   `;

   // Создание стилизованного компонента HeaderTitle
   const HeaderTitle = styled.h1`
     font-size: 2rem;
     font-weight: 600;

     @media (min-width: 1200px) {
       padding: 1rem;
     }
   `;

   function Header() {
     return (
       <Wrapper>
         <HeaderTitle>blog-app</HeaderTitle>
       </Wrapper>
     );
   }

   export default Header;
   ```

4. Повторите шаги для всех компонентов приложения, создавая для каждого компонента стилизованные компоненты с помощью `styled-components`. В итоге у вас должен остаться единственный `styles/app.scss` файл для глобальных стилей.

> [!TIP]
> В данном примере тема и переменные не использовались для упрощения. Чтобы добавить глобальную тему и переменные, используйте пример приложения (`05_02_advanced_styled_components_with_theme`). Это позволит централизованно управлять стилями, такими как цвета, шрифты и отступы.

#### Итоговая структура проекта

```bash
src/
├── components/
│   ├── Header.jsx
│   ├── ...
├── styles/
│   ├── app.scss
├── main.jsx
├── ...
```

### Преимущества и недостатки

| **Преимущества**                                           | **Недостатки**                                                            |
| ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| Стили применяются только к компоненту, исключая конфликты. | Стили добавляются в JS, что может увеличить размер файлов.                |
| Возможность легко изменять стили через пропсы.             | В больших проектах может увеличиться время рендеринга.                    |
| Все стили хранятся рядом с логикой компонента.             | Требуется использование внешних библиотек, таких как `styled-components`. |

## Использование CSS фреймворков

CSS фреймворки, такие как Tailwind CSS, становятся всё более популярными среди разработчиков благодаря их гибкости и быстроте.

Мы остановимся на рассмотрении **Tailwind CSS** для стилизации компонентов [^5].

### Что такое Tailwind CSS?

**Tailwind CSS** — это утилитарный CSS-фреймворк, который предоставляет сотни готовых классов для стилизации. Он использует атомарный подход, где каждый класс отвечает за отдельное свойство CSS, например:

- `text-center` — выравнивание текста по центру.
- `p-4` — отступы в 1 рем.
- `bg-blue-500` — фон синего цвета.

Благодаря такому подходу вы можете быстро создавать стильные и адаптивные интерфейсы, не писав дополнительный CSS.

### Аспекты использования Tailwind CSS

#### Атомарный подход

Tailwind CSS реализует атомарный подход к написанию стилей, где каждый класс отвечает за одно свойство CSS. Это делает стилизацию быстрой и гибкой.

Примеры классов:

- `text-center`: выравнивание текста по центру.
- `text-blue-500`: синий цвет текста.
- `bg-gray-100`: серый фон.
- `p-4`: отступы в 1 рем (4px).
- `px-4`: горизонтальные отступы по 4px.
- `flex`: использование Flexbox.
- `justify-center`: выравнивание содержимого по центру.

> [!NOTE]
> В Tailwind 1 единица (`1`) равна `0.25rem` (в браузерах это соответствует `4px`). Например, `p-1` означает `padding: 0.25rem`.

Полный список классов доступен в документации Tailwind CSS: https://tailwindcss.com/docs. _Используйте поиск для быстрого нахождения нужного свойства_.

#### Цветовая палитра

Tailwind CSS предоставляет готовую цветовую палитру с различными оттенками. Например, для цвета `blue` доступны варианты:

- `blue-50`
- `blue-100`
- `blue-200`
- `blue-300`
- `blue-400`
- `blue-500`
- `blue-600`
- `blue-700`
- `blue-800`
- `blue-900`
- `blue-950`

Эти оттенки можно использовать для стилизации текста, фона, границ.

**Пример 10.** _Использование цветовой палитры_

```html
<p class="text-blue-500 bg-blue-50 border-blue-500">Пример текста</p>
```

#### Шрифты

Tailwind предлагает предустановленные семейства шрифтов:

- `font-sans`: шрифты без засечек.
- `font-serif`: шрифты с засечками.
- `font-mono`: моноширинные шрифты.

**Пример 11.** _Использование семейств шрифтов_

```html
<p class="font-sans">Sans-serif шрифт</p>
<p class="font-mono">Monospace шрифт</p>
```

#### Использование медиа-запросов

Tailwind CSS делает адаптивную стилизацию простой благодаря предустановленным медиа-запросам. Классы, такие как `sm`, `md`, `lg`, и `xl`, позволяют изменять стили на разных разрешениях:

```html
<div class="bg-blue-500 sm:bg-red-500 md:bg-green-500 lg:bg-yellow-500 xl:bg-purple-500">
  Адаптивный фон
</div>
```

- `bg-blue-500`: по умолчанию (до 640px).
- `sm:bg-red-500`: от 640px.
- `md:bg-green-500`: от 768px.
- `lg:bg-yellow-500`: от 992px.
- `xl:bg-purple-500`: от 1200px.

Можно комбинировать классы для адаптивности:

```html
<div class="p-3 md:p-5 lg:text-blue-900">Адаптивные отступы и цвет текста</div>
```

#### Использование пользовательских классов

Tailwind CSS позволяет использовать кастомные значения для стилей, если встроенных классов недостаточно. Для этого применяются квадратные скобки.

```html
<div class="w-[300px] h-[100%] bg-[#1DA1F2]">
  <p class="text-[18px]">Hello,</p>
  <i class="p-[30px]">world</i>
</div>
```

> [!NOTE]
> Квадратные скобки позволяют задать любое значение, поддерживаемое CSS, например, `px`, `%`, `em`, `rem`, и другие.

#### Использование состояний

Tailwind CSS предоставляет классы для стилизации состояний элементов, таких как `hover`, `focus`, `active`, `disabled`.

```html
<input class="read-only:bg-gray-100" readonly />
<button class="bg-blue-500 hover:bg-blue-700">Наведите курсор</button>
```

#### Гибкость и настраиваемость

Tailwind CSS легко адаптируется под нужды проекта:

- **Цвета**. Можно добавить или изменить в конфигурации.
- **Шрифты и отступы**. Настраиваются через tailwind.config.js.
- **Собственные темы**. Создание кастомных классов упрощает повторное использование.

**Пример 12.** _Добавление кастомных цветов_

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: '#1DA1F2',
      },
    },
  },
};
```

Теперь можно использовать класс `bg-brand` или `text-brand`.

### Как работает Tailwind CSS?

Tailwind сканирует HTML-файл и файлы JavaScript, чтобы определить, какие классы используются в проекте. Затем он генерирует CSS-файл, который содержит только те стили, которые используются в проекте.

Например, вы используете класс `bg-blue-500` в HTML-файле. Tailwind CSS сканирует файл, находит этот класс и добавляет в итоговый CSS-файл стили для фона синего цвета: `.bg-blue-500 { background-color: #3498db }`.

### Установка Tailwind CSS с Vite

1. Установите зависимости

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   ```

2. Инициализируйте Tailwind CSS. После этого будет создан файл `tailwind.config.js`

   ```bash
   npx tailwindcss init -p
   ```

3. Добавьте в конфигурационный файл пути для сканирования файлов

   ```js
   // tailwind.config.js
   /** @type {import('tailwindcss').Config} */
   export default {
     content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
     theme: {
       extend: {},
     },
     plugins: [],
   };
   ```

4. Подключите Tailwind CSS

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

5. Запустите проект. Сборщик `Vite` будет автоматически генерировать CSS-файл с использованными классами.

### Пример: Стилизация компонента `Header`

1. Установите Tailwind CSS и инициализируйте проект (следуя шагам установки и настройки)

2. Добавьте в файл `styles/main.scss` директивы для подключения Tailwind CSS

   ```scss
   @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600&display=swap');

   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   // ...дополнительные глобальные стили
   ```

3. Добавьте пользовательские шрифты в конфигурацию Tailwind

   ```js
   // tailwind.config.js
   module.exports = {
     content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
     theme: {
       extend: {
         // Добавляем шрифты
         fontFamily: {
           sans: ['Inter', 'sans-serif', 'ui-sans-serif', 'system-ui'],
           serif: ['Space Grotesk', 'sans-serif', 'ui-sans-serif', 'system-ui'],
         },
       },
     },
     plugins: [],
   };
   ```

4. Используйте классы Tailwind для создания стилизованного компонента `Header`

   ```jsx
   // src/components/Header/Header.jsx
   function Header() {
     return (
       <header className="font-serif flex text-slate-900 p-2 text-center mb-8 rounded-lg border border-slate-600 shadow-md">
         <h1 className="text-3xl font-bold lg:p-4">blog-app</h1>
       </header>
     );
   }

   export default Header;
   ```

#### Итоговая структура проекта

```bash
├── src/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ...
│   ├── styles/
│   │   ├── main.scss
│   ├── main.jsx
├── tailwind.config.js
├── postcss.config.js
├── ...
```

5. Стилизуйте другие компоненты аналогично с использованием классов Tailwind CSS.

### Преимущества и недостатки

| **Преимущества**                           | **Недостатки**                       |
| ------------------------------------------ | ------------------------------------ |
| Быстрая и гибкая стилизация.               | Увеличивает размер CSS-файла.        |
| Атомарный подход упрощает создание стилей. | Необходимость внедрения в проект.    |
| Готовые классы для стилизации.             | Необходимость изучения документации. |

## Использование CSS-модулей в связке с Tailwind CSS

У предыдущего подхода есть **недостаток**: с увеличением объема стилей размер файлов компонентов также возрастает, так как все стили записываются непосредственно в атрибуте className. Это может негативно влиять на производительность и увеличивать время загрузки страницы. Для решения этой проблемы можно использовать **CSS-модули вместе с Tailwind CSS**.

Этот подход сочетает в себе изоляцию стилей, которую предоставляют CSS-модули, и мощные готовые классы для стилизации, предлагаемые Tailwind CSS. Таким образом, разработчики получают гибкость и оптимизацию.

### Директива `@apply`

Директива `@apply` позволяет применять классы Tailwind CSS внутри пользовательских классов, упрощая создание переиспользуемых стилей и избегая дублирования.

**Пример 13.** _Использование `@apply`_

```scss
body {
  @apply bg-gray-100 text-gray-800;
}
```

### Пример: Стилизация компонента `Header`

1. Следуйте шагам из раздела [CSS-модули](#css-модули), чтобы создать CSS-модуль для компонента Header. Итоговая структура:

   ```bash
   src/
   ├── components/
   │   ├── Header/
   │   │   ├── index.jsx
   │   │   ├── Header.module.scss
   ```

2. Добавьте стили с использованием `@apply`.

   ```scss
   // src/components/Header/Header.module.scss
   .header {
     @apply font-serif flex text-slate-900 p-2 text-center mb-8 rounded-lg border border-slate-600 shadow-md;

     .title {
       @apply text-3xl font-bold lg:p-4;
     }
   }
   ```

3. Импортируйте CSS-модуль в компонент `Header` и примените стили

   ```jsx
   // src/components/Header/index.jsx
   import styles from './Header.module.scss';

   function Header() {
     return (
       <header className={styles.header}>
         <h1 className={styles.title}>blog-app</h1>
       </header>
     );
   }

   export default Header;
   ```

4. Повторите процесс для других компонентов.

> [!TIP]  
> В примере `07_02_tailwind_using_theme` демонстрируется, как использовать Tailwind CSS с настройкой темы.

#### Итоговая структура

```bash
├── src/
│   ├── components/
│   │   ├── Header/
│   │   │   ├── index.jsx
│   │   │   ├── Header.module.scss
│   │   ├── ...
│   ├── styles/
│   │   ├── main.scss
│   ├── main.jsx
├── tailwind.config.js
├── postcss.config.js
├── ...
```

### Преимущества и недостатки

| **Преимущества**                                                         | **Недостатки**                                                                   |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| Классы и стили модулей уникальны, что предотвращает конфликты.           | Требуется настройка для совместной работы CSS-модулей и Tailwind CSS.            |
| Модули упрощают управление стилями отдельных компонентов.                | Для каждого компонента создается отдельный файл стилей.                          |
| Позволяет использовать мощь Tailwind CSS с изоляцией стилей модулей.     | Смешивание Tailwind классов и модульного CSS может усложнить восприятие.         |
| Уменьшается количество классов в className, что улучшает читаемость JSX. | Понимание взаимодействия Tailwind CSS и модулей может быть сложным для новичков. |

## Использование компонентов-библиотек

Для ускорения разработки и улучшения совместимости компонентов в проекте можно использовать готовые компоненты из библиотек. 

Данный подход позволяет использовать уже готовые компоненты, которые можно легко настраивать и переиспользовать в различных проектах React.

Такими библиотеками являются Material-UI, Ant Design, Flowbite и другие.

[^1]: _styled components documentation_. styled-components [online resource]. Available at: https://styled-components.com/docs/
[^2]: _CSS with superpowers_. scss [online resource]. Available at: https://sass-lang.com/
[^3]: _Sass Documentation_. sass [online resourse]. Available at: https://sass-lang.com/documentation/
[^4]: _Adding a CSS Modules Stylesheet_. Create React App [online resource]. Available at: https://create-react-app.dev/docs/adding-a-css-modules-stylesheet
[^5]: _Tailwind CSS_. Tailwind [online resource]. Available at: https://tailwindcss.com/