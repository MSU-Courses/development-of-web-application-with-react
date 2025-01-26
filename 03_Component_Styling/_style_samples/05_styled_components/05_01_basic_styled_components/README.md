# Стилизация компонентов с помощью Styled Components

**CSS-in-JS** — это подход к стилизации компонентов, который позволяет **писать стили прямо в JavaScript-коде**. Это упрощает управление стилями и делает их тесно связанными с логикой компонентов.

В данном разделе рассмотрим использование библиотеки `styled-components` — одной из самых популярных CSS-in-JS библиотек.

## Что такое `styled-components?`

`styled-components` позволяет создавать стилизованные компоненты с помощью тегов шаблонов (tagged template literals). Это обеспечивает изоляцию стилей и возможность динамической настройки.

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

## Преимущества и недостатки

| **Преимущества**                                           | **Недостатки**                                                            |
| ---------------------------------------------------------- | ------------------------------------------------------------------------- |
| Стили применяются только к компоненту, исключая конфликты. | Стили добавляются в JS, что может увеличить размер файлов.                |
| Возможность легко изменять стили через пропсы.             | В больших проектах может увеличиться время рендеринга.                    |
| Все стили хранятся рядом с логикой компонента.             | Требуется использование внешних библиотек, таких как `styled-components`. |


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
