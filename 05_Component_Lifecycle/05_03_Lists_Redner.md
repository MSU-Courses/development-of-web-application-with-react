# Рендер списков в React

Одной из частых задач в React является отображение списков элементов.

**Список** — это массив элементов, которые необходимо отобразить на странице.

## Как отрендеритть список элементов?

Напомним, в JSX нельзя использовать циклы (_например_, `for`, `while`, ...) непосредственно внутри разметки.

```jsx
const list = [1, 2, 3, 4, 5];

function App() {
  return (
    <ul>
      {/* Этот код не сработает, так как JSX не поддерживает циклы */}
      {for (let i = 0; i < list.length; i++) {
        <li>{list[i]}</li>
      }}
    </ul>
  );
}

export default App;
```

Попробуем использовать цикл `for` в теле функции:

```jsx
const list = [1, 2, 3, 4, 5];

function App() {
  let listItems = <li>{list[0]}</li>;

  for (let i = 1; i < list.length; i++) {
    listItems += <li>{list[i]}</li>;
  }

  return <ul>{listItems}</ul>;
}
```

Однако данное решение не сработает, так как мы пытаемся конкатенировать JSX-элементы, что недопустимо. В результате мы получим следующее:

![Object Render](https://img001.prntscr.com/file/img001/pzoYDcOjRzC5MHu-P0TGVA.png)

### Метод `map`

Для рендеринга списков в React используется метод `map`.

Метод `map` создает новый массив, преобразуя элементы с помощью переданной функции:

```js
const list = [1, 2, 3, 4, 5];
const newList = list.map((item) => item * 2);

console.log(newList); // [2, 4, 6, 8, 10]
```

Таким же способом можно создать массив JSX-элементов для отображения списка в React [^1]:

```jsx
const frameworks = ['React?', 'Angular', 'Vue'];

function App() {
  return (
    <div>
      <h1>Frameworks I'd like to learn:</h1>
      <ul>
        {frameworks.map((framework) => (
          <li key={framework}>{framework}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

Рассмотрим подробнее следующий фрагмент кода:

```jsx
{
  frameworks.map((framework) => <li key={framework}>{framework}</li>);
}
```

Этот код проходит по массиву `frameworks`: `["React?", "Angular", "Vue"]` и на каждой итерации создает новый элемент `<li>`, содержащий текст из массива. В итоге мы получаем:

| Итерация | `framework` | JSX-элемент                      |
| -------- | ----------- | -------------------------------- |
| 1        | "React?"    | `<li key="React?">React?</li>`   |
| 2        | "Angular"   | `<li key="Angular">Angular</li>` |
| 3        | "Vue"       | `<li key="Vue">Vue</li>`         |

Итоговая разметка:

```html
<div>
  <h1>Frameworks i'd like to learn:</h1>
  <ul>
    <li key="React?">React?</li>
    <li key="Angular">Angular</li>
    <li key="Vue">Vue</li>
  </ul>
</div>
```

## Использование ключей (`key`)

Если при рендеринге списка не указать `key`, React выдаст предупреждение:

```
Warning: Each child in a list should have a unique "key" prop.
```

Ключи (key) необходимы для того, чтобы React мог корректно отслеживать изменения в списке. Это важно для оптимизации работы Virtual DOM и предотвращения лишних перерисовок (_чуть подробнее в следующем разделе_).

**Два основных правила ключей**:

- Ключи должны быть уникальными в пределах списка.
- Ключи не должны меняться во времени.

### Плохая практика ключей

#### Ключи должны быть уникальными

Не рекомендуется использовать **одинаковые ключи**:

```jsx
{
  frameworks.map((framework) => <li key="framework">{framework}</li>);
}
```

#### Ключи не должны меняться во времени

Не рекомендуется использовать **индексы массива** в качестве `key`:

```jsx
{
  frameworks.map((framework, index) => <li key={index}>{framework}</li>);
}
```

Если элементы массива изменятся (например, при добавлении или удалении), индексы могут сбиться, что приведет к некорректной перерисовке списка.

## Рендеринг массива объектов

Если у вас есть массив объектов, ключи лучше всего брать из уникального свойства объекта:

```jsx
const frameworks = [
  { id: 1, name: 'React?', description: 'A JavaScript library for building user interfaces' },
  { id: 2, name: 'Angular', description: 'A platform that makes it easy to build applications' },
  { id: 3, name: 'Vue', description: 'The Progressive JavaScript Framework' },
];
```

Рендеринг массива объектов:

```jsx
function App() {
  return (
    <div>
      <h1>Frameworks I'd like to learn:</h1>
      <ul>
        {frameworks.map((framework) => (
          <li key={framework.id}>
            <h2>{framework.name}</h2>
            <p>{framework.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Здесь `key={framework.id}` используется в качестве уникального идентификатора, что предотвращает возможные проблемы с перерисовкой элементов.

## Recap: Рендеринг списков

1. **Рендеринг списков в JSX**

   - В JSX **нельзя использовать циклы** (`for`, `while` и т. д.) внутри разметки.
   - Вместо этого применяется метод массива `.map()` для создания JSX-элементов.

2. **Использование `.map()` для рендеринга списков**

   - `.map()` создаёт новый массив элементов, которые можно рендерить в JSX.
   - Каждый элемент списка должен иметь уникальный `key`, чтобы React корректно отслеживал изменения.

3. **Ключи (`key`) в списках**

   - React использует `key` для оптимизации перерисовки списка.
   - **Хорошая практика**: использовать **уникальные идентификаторы** (например, `id` из объекта).
   - **Плохая практика**: использовать **индексы массива** в качестве `key`, так как они могут изменяться.

4. **Вывод**
   - Используйте `.map()` для рендеринга списков.
   - Добавляйте `key` каждому элементу списка.
   - Не используйте индексы массива в качестве `key`.
   - При рендеринге объектов используйте их `id` как `key`.

[^1]: _Rendering Lists_. react.dev [online resource]. Available at: https://react.dev/learn/rendering-lists
