# Стилизация компонентов с помощью CSS Modules

**CSS модули** — это современный способ стилизации компонентов в React, позволяющий изолировать стили компонентов и избежать конфликтов. Они создают уникальные имена классов автоматически, что делает их особенно полезными в масштабируемых приложениях.

> [!TIP]
> В данной главе используется `SCSS`, но вы можете использовать обычные CSS файлы.

## Что такое CSS модули?

**CSS модули** работают как обычные CSS/SCSS файлы, но при этом имена классов внутри файлов становятся уникальными.

Например, вместо `.header` будет создан уникальный класс `.header__1s3d2`, который исключает конфликты.

## Как создать CSS модуль?

Допустим, у нас есть компонент `Component`. Чтобы создать для него CSS модуль:

- Файл со стилями должен иметь расширение `.module.scss`. Например, `Component.module.scss`.
- Разместите файл стилей в той же папке, где находится компонент.

**Структура файлов:**

```bash
src/
├── components/
│   ├── Component/
│   │   ├── index.jsx
│   │   ├── Component.module.scss
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

**Код компонента:**

```jsx
// src/components/Component/index.jsx
import React from 'react';
import styles from './Component.module.scss';

function Component() {
  return (
    // Используем уникальные имена классов
    // Которые автоматически создаются CSS модулями
    <div className={styles.component}>
      <p className={styles.content}>Hi, I'm a component</p>
    </div>
  );
}

export default Component;
```

После импорта модуля styles он становится объектом с уникальными именами классов:

```js
{
  component: '_component_1s3d2',
  content: '_content_1s3d4',
}
```

> [!NOTE]
> Компонент был переименован в `index.jsx`, чтобы избежать тавтологии. Теперь файл компонента называется `index.jsx`, а папка с компонентом — `Component`, вместо того, чтоб при импорте указывать путь к файлу `Component/Component`.

## Преимущества и недостатки

| **Преимущества**                                           | **Недостатки**                                    |
| ---------------------------------------------------------- | ------------------------------------------------- |
| Стили изолированы и не конфликтуют с другими компонентами. | Каждый компонент требует отдельного файла стилей. |
| Можно использовать привычный CSS или SCSS.                 | Каждый файл стилей нужно импортировать вручную.   |
| Уникальные имена классов создаются автоматически.          | Вложенность директорий может усложнить структуру. |

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
