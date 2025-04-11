# Работа с тестовым API (MockAPI)

В прошлом разделе мы познакомились с основами REST API в контексте React. Теперь пришло время применить полученные знания на практике. В этой главе мы будем использовать тестовый API, чтобы потренироваться в отправке запросов, получении и отображении данных, а также в создании, обновлении и удалении ресурсов.

Для этого мы воспользуемся популярным сервисом — MockAPI [^1].

**MockAPI** – это онлайн-сервис, который позволяет быстро создать макет (имитацию) API с тестовыми данными, не развертывая собственный сервер. По сути, MockAPI предоставляет "фальшивый" бэкенд, с которым можно выполнять все типичные запросы REST (`GET`, `POST`, `PUT`, `DELETE`) через интернет. Этот сервис особенно полезен для разработки и обучения: вы можете отрабатывать взаимодействие с API в фронтенд-приложении, даже если настоящий сервер еще не готов.

> [!TIP]
> Если вы хотите получить больше функциональности, то можете использовать JSON Server. Он позволяет создавать полноценный REST API на основе JSON-файла. Однако для этого потребуется немного больше настроек и знаний о Node.js. В этом разделе мы сосредоточимся на MockAPI, так как он проще в использовании и не требует установки дополнительных инструментов.

## Проектирование API

Прежде чем начать работу с API, нужно спроектировать структуру данных, с которыми мы будем работать. Допустим, мы хотим создать приложение для управления списком рецептов. Каждому рецепту будет соответствовать запись с такими полями:

- `id` — уникальный идентификатор (создаётся автоматически);
- `title` — название рецепта;
- `description` — описание рецепта;
- `ingredients` — список ингредиентов (массив строк);
- `instructions` — пошаговая инструкция по приготовлению (массив строк);
- `image` — URL-адрес изображения рецепта.

## Создание тестового API (MockAPI)

### Регистрация

1. Перейдите на сайт mockapi.io и нажмите кнопку "Create account".
2. Укажите адрес электронной почты и пароль, либо воспользуйтесь входом через GitHub или Google, если такие опции доступны.
3. Подтвердите регистрацию по ссылке из письма (если потребуется), и войдите в свою учётную запись.

   <div align="center"> <img src="https://img001.prntscr.com/file/img001/PSO6chGeT4m-0yXyyZ6WnQ.png" alt="MockAPI - регистрация" width="600" /> </div>

### Создание проекта

1. После входа вы попадёте в панель управления (Dashboard).

   1. Если у вас ещё нет проектов, появится сообщение "No project yet..." (`#1`).
   2. Чтобы создать новый проект, нажмите на иконку с плюсом (+) (`#2`):

   <div align="center"> <img src="https://img001.prntscr.com/file/img001/XqM-85rwRrSJeN15fJg_MQ.png" alt="MockAPI - панель управления" width="600" /> </div>

2. В открывшейся форме введите:

   1. `Project Name` — название проекта (например, RecipeAPI) (`#1`);
   2. API Prefix — префикс, который будет добавляться к URL-адресам (например, `/api`) (`#2`). Это позволит вам обращаться к API по адресу вроде: `https://yourproject.mockapi.io/api/`
   3. Нажмите кнопку "Create" (`#3`), чтобы завершить создание.

   <div align="center"> <img src="https://img001.prntscr.com/file/img001/Ql1r5SxtQaGracbcbtHsSA.png" alt="MockAPI - создание проекта" width="600" /> </div>

3. После создания проекта кликните по нему, чтобы открыть. Ниже надписи "API endpoint" вы увидите URL-адрес вашего API.Например: `https://6adf2f1a4ac11d5ff4bf7bca80.mockapi.io/api/:endpoint`. Вместо `:endpoint`, в дальнейшем, будет использоваться название вашего ресурса (например, `users`, `posts` и т.д.). Этот адрес будет использоваться для всех HTTP-запросов к вашему API из React-приложения.

### Создание и настройка ресурса

После создания проекта необходимо добавить ресурс (коллекцию), с которым будет работать ваше приложение. В нашем случае это будет коллекция рецептов.

1. На странице проекта нажмите кнопку "New Resource" (`#1`), чтобы создать новый ресурс:

   <div align="center"> <img src="https://img001.prntscr.com/file/img001/ugefaJvGRZyuoq0gW-WDsg.png" alt="MockAPI - создание ресурса" width="600" /> </div>

2. В появившейся форме:

   1. Укажите название ресурса, например: recipes (`#1`). Это имя будет использоваться в URL для обращения к API, например: `https://yourproject.mockapi.io/api/recipes`
   2. Настройте схему данных, указав поля и их типы — как на скриншоте (`#2`). Вы можете использовать свои названия полей, но для примера предлагаем следующую структуру:

   <div align="center"> <img src="https://img001.prntscr.com/file/img001/fI2FaMHeSMO3PRs8OGVuFg.png" alt="MockAPI - настройка схемы" width="600" /> </div>

3. Убедитесь, что включены все методы работы с ресурсом (`GET`, `POST`, `PUT`, `DELETE`) (`#1`) — это важно для выполнения всех CRUD-операций. Затем нажмите кнопку "Create" (`#2`):

   <div align="center"> <img src="https://img001.prntscr.com/file/img001/3lsSVRhIQb2csY9bPlBaeQ.png" alt="MockAPI - подтверждение" width="600" /> </div>

### Добавление данных

1. После создания вы увидите ресурс в списке в панели слева. Кликните по нему, чтобы перейти к просмотру данных:

   <div align="center"> <img src="https://img001.prntscr.com/file/img001/PK7LN3ssRCWVGsKOLIW-oQ.png" alt="MockAPI - список ресурсов" width="600" /> </div>

2. Нажмите кнопку "Data" (`#1`), чтобы вручную добавить тестовые данные:

   <div align="center"> <img src="https://img001.prntscr.com/file/img001/LBErk6ZBR7C8wVMdO2kXPQ.png" alt="MockAPI - кнопка добавления данных" width="600" /> </div>

3. В открывшемся модальном окне вы можете ввести данные вручную или вставить их в формате JSON (`#1`). Затем нажмите "Update" (`#2)`), чтобы сохранить:

   <div align="center"> <img src="https://img001.prntscr.com/file/img001/3GT00M_bSUi2wToQT3V_HQ.png" alt="MockAPI - форма добавления данных" width="600" /> </div>

   <details>
   <summary>Пример данных (JSON)</summary>

   ```json
   [
     {
       "id": "1",
       "title": "Паста с томатным соусом",
       "description": "Простое и быстрое блюдо.",
       "ingredients": ["паста", "томатный соус", "чеснок", "базилик"],
       "instructions": ["Отварите пасту.", "Приготовьте соус.", "Смешайте пасту с соусом."],
       "image": "https://example.com/image1.jpg"
     },
     {
       "id": "2",
       "title": "Салат Цезарь",
       "description": "Классический салат с курицей и пармезаном.",
       "ingredients": ["курица", "салат романо", "пармезан", "гренки", "соус Цезарь"],
       "instructions": ["Приготовьте курицу.", "Смешайте все ингредиенты.", "Заправьте соусом."],
       "image": "https://example.com/image2.jpg"
     }
   ]
   ```

   </details>

4. После сохранения вы увидите записи в табличной форме. Эти данные теперь можно получить через REST API и использовать в вашем React-приложении:

   ```
   GET https://yourproject.mockapi.io/api/recipes
   ```

### Работа с данными

Теперь, когда вы создали ресурс и добавили тестовые данные в формате JSON, вы можете использовать MockAPI как полноценный REST API для своего React-приложения. Ниже приведены основные типы запросов, которые вы можете выполнять:

1. Получение всех данных

   ```http
   GET https://ваш-api.mockapi.io/api/recipes
   ```

   Возвращает массив всех данных из вашей коллекции.

2. Создание новой записи

   ```http
   POST https://ваш-api.mockapi.io/api/recipes
   ```

   В теле запроса нужно передать объект с данными в формате JSON:

   ```json
   {
     "title": "Новый рецепт",
     "description": "Описание рецепта",
     "ingredients": ["ингредиент 1", "ингредиент 2"],
     "instructions": ["шаг 1", "шаг 2"],
     "image": "https://example.com/image.jpg"
   }
   ```

3. Обновление существующей записи

   ```http
   PUT https://ваш-api.mockapi.io/api/recipes/:id
   ```

   Замените `:id` на ID нужного рецепта. В теле запроса передаётся обновлённый объект.

4. Удаление записи

   ```http
   DELETE https://ваш-api.mockapi.io/api/recipes/:id
   ```

   Удаляет рецепт по указанному `id`.

5. Получение одной записи по ID

```http
GET https://ваш-api.mockapi.io/api/recipes/:id
```

Позволяет получить детальную информацию об одном рецепте по его идентификатору (`id`).

6. Фильтрация данных

   ```http
   GET https://ваш-api.mockapi.io/api/recipes?title=Паста
   ```

   Возвращает только те рецепты, у которых поле `title` содержит значение **"Паста"**.

7. Пагинация

   ```http
   GET https://ваш-api.mockapi.io/api/recipes?page=1&limit=10
   ```

   Позволяет получить данные постранично. В данном примере: первая страница, по 10 рецептов на страницу: `page` - номер страницы, `limit` - количество элементов на странице.

8. Сортировка

   ```http
   GET https://ваш-api.mockapi.io/api/recipes?sortBy=title&order=asc
   ```

   - `sortBy` — поле, по которому происходит сортировка (например, title, id, createdAt);
   - `order` — порядок сортировки: asc (по возрастанию) или desc (по убыванию).

Все эти запросы можно выполнять как вручную (в браузере или Postman), так и из React-приложения с помощью `axios`, `fetch` или других средств.

## Использование MockAPI в React

В этой главе мы будем использовать библиотеку axios для взаимодействия с REST API. Если вы ещё не знакомы с ней, рекомендуем ознакомиться с документацией или использовать встроенный в браузеры метод `fetch` — оба варианта подходят, но `axios` делает работу с запросами более удобной и лаконичной.

### Создание конфигурации для `axios`

Чтобы не повторять базовые настройки в каждом запросе, создадим централизованную конфигурацию `axios`. Это поможет нам избежать дублирования кода и упростит работу с API.

1. Создайте в папке `src` директорию `api`, где будет храниться вся логика работы с API:

   ```
   src/
   ├── api/
   │   └── api.js
   ```

2. В файле `api.js` добавьте следующую настройку.

   ```javascript
   // src/api/api.js
   import axios from 'axios';

   const api = axios.create({
     baseURL: 'https://ваш-api.mockapi.io/api/', // замените на ваш фактический MockAPI URL
     headers: {
       'Content-Type': 'application/json',
     },
   });

   export default api;
   ```

   - `baseURL` — базовая часть адреса для всех запросов. Вы указываете только конечные пути (`/recipes`, `/users` и т.д.), а axios сам подставляет начало URL.
     - Пример: `api.get('/recipes')` превратится в запрос к `https://ваш-api.mockapi.io/api/recipes`.
   - `headers` — заголовки по умолчанию для всех запросов.
     - В данном случае мы указываем, что данные передаются в формате `application/json`.

Благодаря такой конфигурации вы сможете подключать api.js в других модулях (например, recipes.js, users.js) и делать запросы без лишнего дублирования:

### Создание функций для работы с API

Чтобы разделить логику работы с сервером и компонентами, рекомендуется выносить все запросы к API в отдельные модули. Это делает код более чистым, переиспользуемым и удобным для тестирования.

1. Создайте директорию `src/api/recipes/` и внутри неё файл `recipes.js`:

   ```
   src/
   ├── api/
   │   └── recipes/
   │       └── recipes.js
   ```

2. Код для работы с API:

   ```javascript
   import api from '../api'; // подключаем настроенный экземпляр axios

   export const getRecipes = async () => {
     const response = await api.get('/recipes');
     return response.data;
   };

   export const getRecipeById = async (id) => {
     const response = await api.get(`/recipes/${id}`);
     return response.data;
   };

   export const createRecipe = async (recipe) => {
     const response = await api.post('/recipes', recipe);
     return response.data;
   };

   export const updateRecipe = async (id, recipe) => {
     const response = await api.put(`/recipes/${id}`, recipe);
     return response.data;
   };

   export const deleteRecipe = async (id) => {
     await api.delete(`/recipes/${id}`);
   };
   ```

   - Каждая функция — это обёртка над `axios`, настроенным в `api.js`.
   - Возвращается только `response.data`, то есть полезная часть ответа.
   - Благодаря модульности, вы можете подключить эти функции в компонентах.

### Тестирование API

Прежде чем подключать API к React-приложению, полезно протестировать его вручную. Это поможет убедиться, что все эндпоинты работают корректно, а ответы приходят в ожидаемом формате. Один из самых удобных инструментов для этого — **Postman**, а также встроенные инструменты разработчика браузера (например, вкладка `Network в Google Chrome`).

> [!NOTE]
> Ознакомиться с Postman можно здесь:
>
> 1. https://www.postman.com/ - официальный сайт Postman.
> 2. https://www.freecodecamp.org/news/how-to-use-an-api-with-postman/ - статья на freeCodeCamp о том, как использовать Postman для работы с API.

#### Как протестировать API с помощью Postman:

1. Откройте Postman или инструменты разработчика в браузере (DevTools → Network).
2. Создайте новый HTTP-запрос.
3. Укажите метод запроса (например, GET) и введите URL вашего API: `https://ваш-api.mockapi.io/api/recipes`
4. Нажмите кнопку **Send** (или клавишу Enter), чтобы отправить запрос.
5. Ознакомьтесь с результатом: в нижней части окна появится ответ сервера в формате JSON — список рецептов или сообщение об ошибке.

<div align="center"> <img src="https://img001.prntscr.com/file/img001/2jpoWCfBQCyPkB004LSepQ.png" alt="MockAPI - тестирование API" width="600" /> </div>

Вы также можете протестировать другие HTTP-методы:

- `POST` — создание нового рецепта;
- `PUT` — обновление существующего рецепта;
- `DELETE` — удаление рецепта по ID.

Просто выберите соответствующий метод в Postman, укажите URL и (при необходимости) тело запроса в формате JSON.

<div align="center"> <img src="https://img001.prntscr.com/file/img001/tieQSLj6S8G4t1sY4nHfbg.png" alt="MockAPI - тестирование API" width="600" /> </div>

### Реализация CRUD-операций в React

Теперь, когда у нас есть подключённое API и тестовые данные, перейдём к реализации всех операций CRUD: Create (создание), Read (чтение), Update (обновление), Delete (удаление) в нашем React-приложении.

Мы создадим три основных компонента:

- `RecipesList` — отображает список всех рецептов;
- `RecipeDetails` — показывает информацию о конкретном рецепте;
- `RecipeForm` — форма создания и редактирования рецептов.

#### Компонент `RecipesList`

```javascript
import React, { useEffect, useState } from 'react';
import * as recipeApi from '../api/recipes'; // импорт всех функций API

function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null); // для обработки ошибок

  useEffect(() => {
    setError(null); // сбрасываем ошибку при монтировании
    const fetchRecipes = async () => {
      try {
        const data = await recipeApi.getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Ошибка при загрузке рецептов:', error);
        setError('Не удалось загрузить рецепты. Попробуйте позже.');
      }
    };
    fetchRecipes(); // загружаем данные при монтировании
  }, []);

  return (
    <div>
      <h1>Список рецептов</h1>
      {error && <p className="error">{error}</p>}
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <a href={`/recipes/${recipe.id}`}>{recipe.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecipesList;
```

В данном примере, компонент:

- Получает список рецептов при загрузке страницы.
- Отображает их в виде ссылок (можно заменить на `<Link>` из react-router-dom для SPA-навигации).

#### Компонент `RecipeDetails`

```javascript
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as recipeApi from '../api/recipes';

function RecipeDetails() {
  const { id } = useParams(); // получаем ID из URL
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null); // для обработки ошибок

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await recipeApi.getRecipeById(id);
        setRecipe(data);
      } catch (error) {
        console.error('Ошибка при загрузке рецепта:', error);
        setError('Не удалось загрузить рецепт. Попробуйте позже.');
      }
    };
    fetchRecipe(); // загружаем данные рецепта
  }, [id]);

  if (!recipe) return <div>Загрузка...</div>;

  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>

      <h2>Ингредиенты</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>

      <h2>Инструкция</h2>
      <ol>
        {recipe.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetails;
```

- Загружает данные рецепта по его `id`.
- Показывает подробную информацию: заголовок, изображение, описание, ингредиенты и шаги приготовления.

#### Компонент `RecipeForm`

```javascript
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as recipeApi from '../api/recipes';

function RecipeForm() {
  const { id } = useParams(); // получаем ID из URL (если есть)
  const navigate = useNavigate(); // хук для навигации
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    ingredients: [],
    instructions: [],
    image: '',
  });

  // Загружаем данные, если редактируем существующий рецепт
  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        const data = await recipeApi.getRecipeById(id);
        setRecipe(data);
      };
      fetchRecipe();
    }
  }, [id]);

  // Обработка изменения в input/textarea
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await recipeApi.updateRecipe(id, recipe); // редактирование
    } else {
      await recipeApi.createRecipe(recipe); // создание нового рецепта
    }
    navigate('/recipes'); // после сохранения — переход назад к списку
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={recipe.title}
        onChange={handleChange}
        placeholder="Название рецепта"
      />
      <textarea
        name="description"
        value={recipe.description}
        onChange={handleChange}
        placeholder="Описание рецепта"
      />
      <input
        type="text"
        name="ingredients"
        value={recipe.ingredients.join(', ')}
        onChange={(e) => setRecipe({ ...recipe, ingredients: e.target.value.split(', ') })}
        placeholder="Ингредиенты (через запятую)"
      />
      <input
        type="text"
        name="instructions"
        value={recipe.instructions.join(', ')}
        onChange={(e) => setRecipe({ ...recipe, instructions: e.target.value.split(', ') })}
        placeholder="Инструкция (через запятую)"
      />
      <input
        type="text"
        name="image"
        value={recipe.image}
        onChange={handleChange}
        placeholder="URL изображения"
      />
      <button type="submit">{id ? 'Обновить' : 'Создать'}</button>
    </form>
  );
}

export default RecipeForm;
```

Данный компонент:

- Используется как для создания, так и для редактирования рецептов.
- При наличии `id` — загружает данные для редактирования.
- Обрабатывает ввод через `useState` и `handleChange`.
- После отправки формы делает `POST` или `PUT` запрос, а затем перенаправляет пользователя на `/recipes`.

#### Удаление рецепта

Теперь добавим возможность удалять рецепт прямо из списка. Для этого:

1. В компоненте `RecipesList` добавим обработчик `handleDelete`.
2. После успешного удаления — обновим состояние, чтобы рецепт исчез из интерфейса.

```javascript
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // ← хук для получения id и редиректа
import * as recipeApi from '../api/recipes';
import NotFound from './NotFound'; // ← компонент для отображения страницы 404

function RecipeDetails() {
  const { id } = useParams(); // получаем id рецепта из URL
  const navigate = useNavigate(); // используется для редиректа при ошибке
  const [recipe, setRecipe] = useState(null); // состояние: загруженный рецепт
  const [error, setError] = useState(null); // состояние: общая ошибка
  const [notFound, setNotFound] = useState(false); // состояние: если рецепт не найден (404)

  useEffect(() => {
    // Функция для получения данных о рецепте с сервера
    const fetchRecipe = async () => {
      try {
        const data = await recipeApi.getRecipeById(id); // запрос по id
        setRecipe(data); // сохраняем рецепт в состояние
        setNotFound(false); // сбрасываем флаг 404 (если перешли от другого ID)
      } catch (err) {
        // Если сервер вернул 404 — устанавливаем флаг notFound
        if (err.response && err.response.status === 404) {
          setNotFound(true);
        } else {
          // Логируем и сохраняем текст ошибки в состоянии
          console.error('Ошибка при загрузке рецепта:', err);
          setError('Произошла ошибка при загрузке рецепта.');
        }
      }
    };

    fetchRecipe(); // вызываем при монтировании и при изменении id
  }, [id]);

  // Если рецепт не найден — показываем компонент 404
  if (notFound) {
    return <NotFound />;
  }

  // Если произошла другая ошибка — редиректим на главную (или можно на /error)
  if (error) {
    return navigate('/'); // или: navigate('/error')
  }

  // Пока рецепт не загружен (null) — отображаем индикатор загрузки
  if (!recipe) {
    return <p>Загрузка...</p>;
  }

  // Основной контент страницы — детали рецепта
  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>

      <h2>Ингредиенты</h2>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h2>Инструкция</h2>
      <ol>
        {recipe.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetails;
```

- `handleDelete` отправляет `DELETE-запрос` через API-функцию `deleteRecipe(id)`.
- После удаления, рецепт исключается из текущего состояния, чтобы обновить отображаемый список без перезагрузки страницы.
- Кнопка рядом с названием рецепта позволяет пользователю удалить нужный элемент в один клик.
- Можно добавить подтверждение (`confirm()`), чтобы избежать случайных удалений.

### Обработка ошибки 404 (Not Found) в React-приложении с MockAPI

**Ошибки** — неотъемлемая часть взаимодействия с API. Одна из самых распространённых — 404 Not Found, которая возникает, когда запрашиваемый ресурс не найден. В этой главе мы научимся правильно обрабатывать такую ситуацию в React-компонентах, используя axios и MockAPI.

#### Когда возникает ошибка 404?

Запрос типа:

```http
GET https://yourproject.mockapi.io/api/recipes/9999
```

вернёт 404, если рецепта с id = 9999 не существует. Такое может произойти, если:

- пользователь вручную изменил URL;
- рецепт был удалён;
- в коде произошла ошибка с ID;
- кто-то сохранил устаревшую ссылку.

#### Как отловить 404 в React?

`axios` автоматически выбрасывает исключение при HTTP-ошибках. В объекте ошибки (`error`) есть свойство `response.status`, которое и позволяет определить тип ошибки.

**Пример 1**. _Отображение ошибки 404 в компоненте_

Добавим проверку 404 и покажем пользователю информативное сообщение:

```javascript
*import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as recipeApi from '../api/recipes';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false); // ← флаг для 404

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await recipeApi.getRecipeById(id);
        setRecipe(data);
        setNotFound(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setNotFound(true); // ← если статус 404
        } else {
          console.error('Ошибка при загрузке рецепта:', err);
          setError('Произошла ошибка при загрузке рецепта.');
        }
      }
    };
    fetchRecipe();
  }, [id]);

  if (notFound) {
    return <NotFound />; // ← компонент для 404
  }

  if (error) {
    navigate('/'); // ← редирект на страницу ошибки
  }

  if (!recipe) {
    return <p>Загрузка...</p>;
  }

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} />
      <p>{recipe.description}</p>

      <h2>Ингредиенты</h2>
      <ul>
        {recipe.ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>

      <h2>Инструкция</h2>
      <ol>
        {recipe.instructions.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}

export default RecipeDetails;*
```


## Recap: Работа с тестовым API (MockAPI)

1. **MockAPI** — это онлайн-сервис, позволяющий быстро создать REST API без сервера. Идеально подходит для обучения и прототипирования.

2. В MockAPI можно:

   - создать **ресурсы** с нужными полями;
   - выполнять все основные запросы: `GET`, `POST`, `PUT`, `DELETE`;
   - фильтровать, сортировать и постранично загружать данные.

3. В React-приложении:

   - Для работы с API удобно использовать **axios**, предварительно настроив `baseURL`.
   - Логику работы с API лучше выносить в отдельные модули (например, `api/recipes.js`).
   - В компонентах реализуется полный цикл CRUD:
     - `GET` — получение данных;
     - `POST` — создание рецепта;
     - `PUT` — обновление;
     - `DELETE` — удаление.
   - Реализована **обработка ошибок** (в том числе 404) и отображение соответствующего состояния (`loading`, `error`, `notFound`).

4. Для тестирования API удобно использовать **Postman** — визуальный инструмент для отправки HTTP-запросов.

[^1]: _MockAPI_. mockapi.io [online resource]. Available at: https://mockapi.io/
