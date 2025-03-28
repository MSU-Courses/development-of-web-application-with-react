# Хуки в React. Хук `useState`

Перед тем как углубиться в дальнейшее изучение React, важно разобраться, что такое хуки (hooks) и как они используются. Поскольку для управления состоянием компонента в функциональных компонентах необходимо применять хуки, их понимание является ключевым.

## Что такое хуки?

**Хуки (hooks)** — **это специальные функции в React**, которые позволяют добавлять дополнительный функционал в обычные (функциональные) компоненты. До появления хуков можно было управлять состоянием и работать с компонентами только в классовых компонентах. С хуками теперь можно делать это и в функциональных компонентах, что делает код проще и понятнее [^1].

Простыми словами, **хуки** помогают компонентам "запоминать" данные и реагировать на изменения без использования сложных конструкций.

Первый хук, с которым стоит познакомиться, — это `useState`. Он позволяет функциональным компонентам добавлять **"состояние"** и изменять его в процессе работы.

## Проблема с изменением состояния

**Рассмотрим ситуацию**: нам нужно создать счётчик, который увеличивается на 1 при каждом клике на кнопку. Попробуем использовать обычную переменную `count` и функцию `increment`, которая изменяет её значение:

**Пример 1.** _Счётчик без использования `useState`_

```jsx
function Counter() {
  let count = 0;

  function increment() {
    count += 1;
  }

  return (
    <div>
      <p>Счётчик: {count}</p>
      <button onClick={increment}>Увеличить</button>
    </div>
  );
}
```

На первый взгляд, код кажется правильным, но если нажимать на кнопку, счётчик не обновляется. Почему? Дело в том, что React не отслеживает изменения переменной `count` и не понимает, что компонент нужно перерисовать.

**Напомним, что React используется для создания SPA, и мы не хотим, чтобы пользователь обновлял страницу для отображения изменений (!)**. Поэтому важно, чтобы React самостоятельно отслеживал изменения и автоматически обновлял интерфейс.

## Использование хука `useState`

Так как значение счётчика — это состояние компонента, и мы хотим, чтобы React обновлял (перересовывал) интерфейс при изменении этого значения, воспользуемся хуком `useState`.

Синтаксис `useState`:

```jsx
const [state, setState] = useState(initialState);
```

- `state` — переменная, хранящая текущее значение состояния.
- `setState` — функция, позволяющая изменить состояние (_сеттер_).
- `initialState` — начальное значение состояния.

Чтобы изменить состояние, нельзя напрямую изменять `state`. Вместо этого используется `setState`, который обновляет его и заставляет React перерисовать компонент.

```jsx
setState(5);
// теперь переменная state равна 5
```

Таким образом, с помощью хука `useState` и функции-сеттера (`setState(...)`), отвечающей за обновление состояния, мы вмешиваемся в этот процесс и даём React сигнал о необходимости перерисовки интерфейса.

> [!IMPORTANT]
> При изменении `состояния (state)` или `свойства (props)` React заново вызывает функцию компонента, обновляя интерфейс в соответствии с новыми данными. **Этот процесс часто называют перерисовкой компонента**. Если компонент использует `useState`, React запоминает значение переменной и следит за её изменениями.

Следовательно, если мы хотим, чтобы React отслеживал изменения переменных и автоматически обновлял интерфейс, необходимо использовать хук `useState`. Фактически, мы указываем React сохранить значение переменной и реагировать на его изменения перерисовывая компонент.

### Реализация счётчика с `useState`

Теперь переделаем наш компонент, используя `useState`.

**Пример 2.** _Счётчик с использованием `useState`_

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    // count = count + 1 - не будет работать!

    // Берем прошлое значение count и увеличиваем на 1
    // Допустим count = 0, тогда count + 1 = 1
    setCount(count + 1); // Обновляем состояние
  }

  return (
    <div>
      <p>Счётчик: {count}</p>
      <button onClick={increment}>Увеличить</button>
    </div>
  );
}
```

Теперь **при каждом клике на кнопку**:

- Состояние `count` увеличивается на 1.
- React замечает изменение и перерисовывает компонент (вызывает функцию `Counter` ещё раз и обновляет интерфейс).

> [!NOTE]
> Данный процесс называется **реактивностью** — это способность компонента отслеживать изменения состояния и автоматически обновлять интерфейс. В первом примере компонент не был реактивным, поскольку React не отслеживал изменения переменной `count`. Во втором примере, благодаря использованию `useState`, компонент стал реактивным.

### Множество состояний в компоненте

Компонент может содержать несколько состояний, каждое из которых управляется отдельным хуком `useState`. Рассмотрим пример, в котором у нас есть массив постов (`posts.js`), и мы хотим создать слайдер, который будет последовательно отображать посты. Дополнительно предусмотрим возможность отображения полного описания поста по нажатию на кнопку.

_Исходные данные (массив постов)_

```js
// posts.js

export const posts = [
  {
    title: 'New Year',
    content: 'Happy New Year 2025!',
  },
  {
    title: "Saint Patrick's Day",
    content: "Saint Patrick's Day is a cultural and religious holiday celebrated on 17 March.",
  },
];
```

_Компонент `Slider`_

```jsx
// Slider.jsx
import React from 'react';

import { posts } from './posts';

function Slider() {
  // Индекс текущего поста
  // В начале показываем первый пост (индекс 0)
  const [index, setCurrentIndex] = React.useState(0);

  // Состояние для отображения полного описания поста
  // По умолчанию не показываем полное описание (false)
  const [isDescription, setIsDescription] = React.useState(false);

  // Функция для показа полного описания
  function showDescription() {
    // Меняем состояние на противоположное
    // Если isDescription было false, то станет true
    // Если isDescription было true, то станет false
    setIsDescription(!isDescription);
  }

  // Функция для перехода к следующему посту
  function nextPost() {
    // Если индекс меньше, чем количество постов
    if (index < posts.length - 1) {
      // Берем текущий индекс и увеличиваем на 1
      // Переходим к следующему посту
      setCurrentIndex(index + 1);
    }
  }

  // Функция для перехода к предыдущему посту
  function previosPost() {
    // Если индекс больше 0
    if (index > 0) {
      // Берем текущий индекс и уменьшаем на 1
      // Переходим к предыдущему посту
      setCurrentIndex(index - 1);
    }
  }

  // Текущий пост
  // При изменении индекса будет меняться и текущий пост
  let currentPost = posts[index];

  return (
    <div>
      <h2>{currentPost.title}</h2>
      <div>
        <p>
          ({index + 1} of {posts.length})
        </p>
      </div>
      {/* Если isDescription равно true, то показываем кнопку */}
      <button onClick={showDescription}>{isDescription ? 'Hide' : 'Show'} description</button>
      <p>{isDescription && currentPost.content}</p>
      <button onClick={nextPost}>Next post</button>
      <button onClick={previosPost}>Previous post</button>
    </div>
  );
}

export default Slider;
```

Допустим, при клике на кнопку **"Next Post"**:

1. Вызывается функция `nextPost`.
2. Внутри функции выполняется проверка: если текущий индекс (`index`) **меньше** количества постов минус один (`posts.length - 1`), то компонент обновляет индекс поста, увеличивая его на 1.
3. Вызывается `setCurrentIndex(index + 1)`, что обновляет состояние `index`.
4. Так как состояние изменилось, React **перерисовывает компонент**, вызывая его функцию заново.
5. В процессе нового вызова `Slider()` переменная `currentPost` пересчитывается и теперь указывает на новый пост из массива `posts`.
6. Обновленный интерфейс отображает **новый заголовок и описание** поста.
7. Счётчик (`{index + 1} of {posts.length}`) обновляется, отражая текущий номер поста.

Аналогичный процесс происходит при нажатии на **"Previous Post"**, но индекс уменьшается (`setCurrentIndex(index - 1)`), переключая слайдер на предыдущий пост.

### Состояние как снимок данных [^2]

Есть один важный момент, который не всегда сразу понятен, но играет ключевую роль в работе `useState`.

Когда мы изменяем состояние с помощью `setState`, React **не обновляет значение переменной мгновенно**. Вместо этого он создаёт **новый снимок** состояния и запоминает, что компонент нужно обновить. Например, если у нас был `Counter` с `count = 0`, после вызова `setState(count + 1)` создаётся новый `Counter` с `count = 1`.

То есть React сначала завершает выполнение текущего обработчика событий, а затем выполняет повторный рендеринг с обновлённым состоянием.

**Пример 3.** _Подробное объяснение работы `useState`_

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1); // count = count + 1
    setCount(count + 1); // count = count + 1
    setCount(count + 1); // count = count + 1

    // Здесь count не обновится мгновенно
    // Поэтому console.log(count) выведет старое значение
    console.log(count); // 0 (если это первый клик)
  }

  return (
    <div>
      <p>Счётчик: {count}</p>
      <button onClick={increment}>Увеличить</button>
    </div>
  );
}
```

**Почему так происходит?**

1.  React обновляет состояние не сразу, а запоминает изменения и выполняет ререндер позже.
2.  В текущем вызове функции `count` остаётся неизменным. Будет 3 раза вызвано: `setCount(0 + 1)`, `setCount(0 + 1)`, `setCount(0 + 1)`.
3.  После ререндера компонента новое значение `count` становится доступным и будет равно `1`.

> [!TIP]
> Данное поведение можно сравнить с официантом, который записывает заказы клиентов. Он не выполняет заказы сразу, а записывает их и выполняет позже.

Таким образом, состояние в React работает как **снимок данных**, который обновляется при каждом новом рендере. Этот механизм, называемый группировкой обновлений (**batching**), делает React-приложения более производительными и предотвращает частично обновлённые рендеры, когда только часть переменных была изменена.

### Обновление состояния несколько раз перед рендером [^3]

Иногда возникает необходимость обновить состояние несколько раз подряд до следующего рендера. Для этого используется **функциональное обновление состояния**. Вместо передачи нового значения в `setState`, можно передать функцию-обновитель, которая принимает предыдущее состояние и возвращает новое.

**Пример 4.** _Функциональное обновление состояния_

```jsx
import React from 'react';

function Counter() {
  const [count, setCount] = React.useState(0);

  function increment() {
    // Функциональное обновление состояния
    // Передаем функцию, которая принимает предыдущее состояние
    // и возвращает новое состояние
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  }

  return (
    <div>
      <p>Счётчик: {count}</p>
      <button onClick={increment}>Увеличить</button>
    </div>
  );
}
```

Функция-обновитель `(c) => c + 1` ставится в очередь обновлений, и React выполняет их последовательно перед следующим рендером.

Последовательность обновлений:

```jsx
setCount((c) => c + 1); // добавляется в очередь
setCount((c) => c + 1); // добавляется в очередь
setCount((c) => c + 1); // добавляется в очередь
```

**При следующем рендере** React берёт предыдущее значение состояния и применяет каждое обновление последовательно:

| Очередь      | Предыдущее значение (`count`) | Новое значение (`count`) |
| ------------ | ----------------------------- | ------------------------ |
| `c => c + 1` | 0                             | 1                        |
| `c => c + 1` | 1                             | 2                        |
| `c => c + 1` | 2                             | 3                        |

> [!TIP]
> Использование функционального обновления гарантирует, что каждое обновление будет учитывать актуальное состояние, а не устаревшее значение.

#### Что происходит, если обновить состояние после его замены?

**Может возникнуть вопрос**: что будет, если сначала обновить состояние через функцию-обновитель, а затем заменить его конкретным значением?

В таком случае React перезапишет предыдущее обновление новым значением.

**Пример 5.** _Обновление состояния после его замены_

```jsx
<button
  onClick={() => {
    setCount(5); // Устанавливаем конкретное значение
    setCount((c) => c + 1); // Функция-обновитель
  }}>
  Обновить состояние
</button>
```

При следующем рендере React выполняет обновления в таком порядке:

| Очередь         | Предыдущее значение (`count`) | Новое значение (`count`) |
| --------------- | ----------------------------- | ------------------------ |
| "заменить на 5" | 0 (не используется)           | 5                        |
| `c => c + 1`    | 5                             | 6                        |

`count` становится 6, потому что:

- `setCount(5)` сразу заменяет состояние `count`, игнорируя предыдущее значение.
- Затем `setCount(c => c + 1)` увеличивает его на `1`.

#### Что будет, если заменить состояние после обновления?

Рассмотрим ситуацию, когда сначала изменяется состояние через функцию-обновитель, а затем заменяется конкретным значением.

**Пример 6.** _Замена состояния после его обновления_

```jsx
<button
  onClick={() => {
    setCount(count + 5); // Устанавливаем конкретное значение
    setCount((c) => c + 1); // Функция-обновитель
    setNumber(42); // Заменяем другое состояние
  }}>
  Обновить состояние
</button>
```

1. `setCount(count + 5)`: React добавляет в очередь команду «заменить на count + 5».
2. `setCount(c => c + 1)`: добавляется функция-обновитель, которая увеличивает предыдущее значение на 1.
3. `setNumber(42)`: добавляется команда «заменить number на 42».

На следующем рендере React выполняет эти команды по очереди:

| Очередь          | Предыдущее значение (`count`) | Новое значение (`count`) |
| ---------------- | ----------------------------- | ------------------------ |
| "заменить на 5"  | 0 (не используется)           | 5                        |
| `n => n + 1`     | 5                             | 6                        |
| "заменить на 42" | 6 (не используется)           | 42                       |

**Результат**: `count` становится 42, так как финальное обновление заменило все предыдущие

#### Рекомендации по наименованию

Часто в качестве аргумента используют первые буквы переменной, чтобы сохранить лаконичность кода:

```jsx
setEnabled((e) => !e);
setLastName((ln) => ln.reverse());
setFriendCount((fc) => fc * 2);
setCount((c) => c + 1);
```

Если важно подчеркнуть, что функция получает предыдущее значение состояния, можно использовать более развернутые названия, например, начиная с `prev`:

```jsx
setEnabled((prevEnabled) => !prevEnabled);
setLastName((prevLastName) => prevLastName.reverse());
setFriendCount((prevCount) => prevCount * 2);
setCount((prevCount) => prevCount + 1);
```

### Обновление объектов в состоянии [^4]

В React состояние должно оставаться неизменяемым. Это значит, что нельзя напрямую изменять объекты и массивы в `useState`, иначе React не заметит изменений и не перерисует компонент. Вместо этого нужно создавать новый объект или массив при каждом обновлении.

**Пример 7.** _Обновление объекта в состоянии_

Допустим, у нас есть объект `user` с полями `name` и `age`, и мы хотим изменить его имя:

```jsx
import React from 'react';

function Profile() {
  const [user, setUser] = React.useState({ name: 'Alice', age: 25 });

  function changeName() {
    user.name = 'Bob'; // ❌ Ошибка! React не увидит изменений
  }

  return (
    <div>
      <p>Имя: {user.name}</p>
      <p>Возраст: {user.age}</p>
      <button onClick={changeName}>Изменить имя</button>
    </div>
  );
}
```

Технически JavaScript разрешает изменять объект `user`, но React не отслеживает такие изменения и не обновит интерфейс. Чтобы React увидел изменения, нужно передать в `setState` новый объект:

```jsx
function changeName() {
  setUser({
    name: 'Bob',
    age: 25,
  });
}
```

Но что, если у объекта много полей, и мы хотим обновить только одно? Чтобы не копировать все поля вручную, можно использовать оператор расширения (`spread`, `...`):

```jsx
function changeName() {
  setUser({
    ...user,
    name: 'Bob',
  });
}
```

> [!TIP]
> Попробуйте написать компонент `Dot` (точка), который будет следить за курсором и отображать его координаты на экране. Используйте `useState` для хранения координат `x` и `y` в виде объекта и событие `onPointerMove` для их обновления.

### Обновление массивов в состоянии [^5]

Массивы в JavaScript являются объектами, поэтому их нельзя изменять напрямую в `useState`. Вместо этого нужно создавать новый массив при каждом обновлении, иначе React не заметит изменений и не обновит интерфейс.

Рассмотрим пример, в котором у нас есть массив `books`, и мы хотим добавить новую книгу.

**Пример 8.** _Неправильный подход (не сработает! 🚫)_

```jsx
import React from 'react';

function Library() {
  const [books, setBooks] = React.useState(['JavaScript', 'React', 'Node.js']);

  function addBook() {
    // Хоть массивы и иммутабельны, но такой способ не сработает
    // React не обнаружит изменений и не перерисует компонент
    books.push('TypeScript');
  }

  return (
    <div>
      <ul>
        {/* Выводим список книг */}
      </ul>
      <button onClick={addBook}>Добавить книгу</button>
    </div>
  );
}
```

Так делать нельзя, потому что `push()` изменяет исходный массив, а React не отслеживает мутации состояний.

Вместо этого используем `spread-оператор (...)`, чтобы создать новый массив, включающий в себя все старые элементы плюс новую книгу:

```jsx
function addBook() {
  // Будет создан новый массив, содержащий все книги из books и новую книгу
  setBooks([...books, 'TypeScript']);
}
```

#### Удаление элемента из массива

Для удаления элемента используем `filter()`, который создаёт новый массив, исключая ненужные элементы.

**Пример 9.** _Удаление элемента из массива_

```jsx
function removeBook(book) {
  setBooks(books.filter((b) => b !== book)); // Создаём новый массив без удаляемой книги
}
```

#### Вставка элемента в массив на определённую позицию

Если нужно вставить элемент в середину массива, используем `slice()` и `spread-оператор`:

**Пример 10.** _Вставка элемента в массив_

```jsx
function insertBook(index, book) {
  setBooks([...books.slice(0, index), book, ...books.slice(index)]);
}
```

1. `books.slice(0, index)` — создаёт новый массив, содержащий элементы до `index`.
2. `book` — добавляет новую книгу.
3. `books.slice(index)` — добавляет оставшиеся элементы после `index`.

#### Обновление объекта в массиве

Если массив содержит объекты, и нужно обновить только один из них, используем `map()`.

**Пример 11.** _Обновление объекта в массиве_

```jsx
import React from 'react';

function Library() {
  const [books, setBooks] = React.useState([
    { id: 1, title: 'JavaScript' },
    { id: 2, title: 'React' },
    { id: 3, title: 'Node.js' },
  ]);

  function updateBook(id, newTitle) {
    setBooks(books.map((book) => (book.id === id ? { ...book, title: newTitle } : book)));
  }

  return (
    <div>
      <ul>
        {/* Выводим список книг */}
      </ul>
      <button onClick={() => updateBook(2, 'React Native')}>Обновить книгу</button>
    </div>
  );
}
```

## Recap: Основные моменты

1. **Хуки в React** — это специальные функции, позволяющие функциональным компонентам управлять состоянием и другими возможностями, доступными ранее только в классовых компонентах.
2. **`useState`** — один из ключевых хуков, который позволяет **добавлять состояние** в функциональные компоненты и обновлять его.
3. **Состояние — это "память" компонента**, оно сохраняется между рендерами, в отличие от обычных переменных внутри функции.
4. **Изменение переменной не обновляет интерфейс**, потому что React **не отслеживает изменения обычных переменных**, а только состояние, переданное в `useState`.
5. **Использование `useState`**:
   ```jsx
   const [state, setState] = useState(initialValue);
   ```
   - `state` — текущее значение состояния.
   - `setState` — функция для его обновления.
   - `initialValue` — начальное значение состояния.
6. **React не обновляет `state` мгновенно**. Вместо этого он планирует новый рендер, поэтому сразу после вызова `setState` переменная состояния не меняется.
7. **Состояние ведёт себя как снимок (snapshot)**. В рамках одного рендера переменная состояния остаётся неизменной, даже если вызывается `setState`.
8. **Группировка обновлений (batching)**. React может объединять несколько вызовов `setState`, если они идут подряд в одном обработчике событий, чтобы избежать лишних ререндеров.
9. **Функциональное обновление состояния** помогает правильно обновлять `state`, когда новое значение зависит от предыдущего:
   ```jsx
   setCount((prevCount) => prevCount + 1);
   ```
10. **Если вызвать `setState(значение)` после `setState(prev => newValue)`, React перезапишет все предыдущие обновления**.
11. **Изменять объекты и массивы напрямую нельзя!** React не заметит изменений. Нужно **создавать новые объекты и массивы** перед передачей в `setState`:
    ```jsx
    setUser({ ...user, name: 'Bob' });
    setBooks([...books, 'New Book']);
    ```
12. **Для удаления элементов из массива используем `filter()`**, так как он создаёт новый массив:
    ```jsx
    setBooks(books.filter((book) => book !== 'React'));
    ```
13. **Для обновления объектов в массиве используем `map()`**, чтобы создать новый массив с изменёнными данными:
    ```jsx
    setBooks(books.map((book) => (book.id === 2 ? { ...book, title: 'React Native' } : book)));
    ```
14. **Конвенция наименования в `setState`**:
    - `setCount(c => c + 1)` (сокращённые названия переменных).
    - `setCount(prevCount => prevCount + 1)` (более явные названия).
15. **Хуки должны вызываться на верхнем уровне функции**, а не внутри условий или циклов.

[^1]: _State: A Component's Memory_. react. dev [online resource]. Available at: https://react.dev/learn/state-a-components-memory
[^2]: _State as Snapshot_. react. dev [online resource]. Available at: https://react.dev/learn/state-as-a-snapshot
[^3]: _Queueing a Series of State Updates_. react.dev [online resource]. Available at: https://react.dev/learn/queueing-a-series-of-state-updates
[^4]: _Updating Objects in State_. react.dev [online resource]. Available at: https://react.dev/learn/updating-objects-in-state
[^5]: _Updating Arrays in State_. react.dev [online resource]. Available at: https://react.dev/learn/updating-arrays-in-state
