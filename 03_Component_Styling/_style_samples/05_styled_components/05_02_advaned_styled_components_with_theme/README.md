# Стилизация с помощью Styled Components и настройка темы

**Styled Components** позволяют создавать стилизованные компоненты с помощью тегов шаблонов (tagged template literals). Они обеспечивают изоляцию стилей и возможность динамической настройки.

## Настройка темы

Для удобства управления стилями в Styled Components можно использовать темы.

**Тема** — это объект, содержащий набор переменных, которые могут быть использованы в стилях компонентов.

```jsx
import styled from 'styled-components';

const theme = {
  colors: {
    primary: 'blue',
    secondary: 'green',
  },
};

const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
`;

function App() {
  return <Button>Click me</Button>;
}

export default App;
```

В этом примере стили для кнопки заданы с помощью компонента `styled.button`, который автоматически генерирует уникальный класс. Цвет кнопки зависит от значения переменной `theme.colors.primary`.

## Передача темы

Чтобы передать тему в компонент, используется компонент `ThemeProvider` из библиотеки `styled-components`.

```jsx
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary: 'blue',
    secondary: 'green',
  },
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);

export default App;
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
