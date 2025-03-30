# Лабораторная работа №6. Глобальное состояние и Redux Toolkit

## Цель работы

Познакомиться с концепцией глобального состояния в React и научиться использовать Redux Toolkit для управления общими данными между компонентами. Научиться добавлять, изменять и удалять товары в корзине с использованием глобального хранилища.

## Условия

Продолжите разработку интернет-магазина. На этом этапе реализуйте функциональность корзины товаров с использованием Redux Toolkit. Пользователь должен иметь возможность добавлять товары в корзину из карточки товара, просматривать список добавленных товаров, изменять количество и удалять их.

### Задание 1. Установка и настройка Redux Toolkit

1. Установите необходимые зависимости:

   ```bash
   npm install @reduxjs/toolkit react-redux
   ```

2. Создайте директорию `src/store/` и добавьте в ней следующие файлы:

   - `store.js` — основной файл для настройки Redux Store.
   - `cart/slice.js` — файл для создания среза состояния корзины.

3. В файле `store.js` настройте Redux Toolkit Store:

   ```jsx
   import { configureStore } from '@reduxjs/toolkit';
   import cartReducer from './cart/slice';

   export const store = configureStore({
     reducer: {
       cart: cartReducer,
     },
   });
   ```

4. Оберните всё приложение в `Provider` в `main.jsx`.

### Задание 2. Реализация корзины через Redux Toolkit

1. В `cart/slice.js` создайте слайс с начальными значениями:

   ```jsx
   import { createSlice } from '@reduxjs/toolkit';

   const initialState = {
     items: [],
     totalQuantity: 0,
   };

   const cartSlice = createSlice({
     name: 'cart',
     initialState,
     reducers: {
       addToCart(state, action) {
         // логика добавления товара
       },
       removeFromCart(state, action) {
         // логика удаления по id
       },
       updateQuantity(state, action) {
         // логика изменения количества
       },
     },
   });

   export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
   export default cartSlice.reducer;
   ```

2. Реализуйте добавление товара в корзину из компонента `ProductCard`.

   1. Используйте `useDispatch` и `addToCart`
   2. Добавьте кнопку `"Добавить в корзину"` или используйте уже существующую.

3. Создайте страницу `CartPage.jsx`, если такая ещё не создана, на которой:
   1. Выводится список товаров из `useSelector(state => state.cart.items)`
   2. Можно _увеличить/уменьшить количество_
   3. Можно _удалить товар_

### Задание 3. Отображение количества товаров в шапке

1. Добавьте в `Header` иконку или ссылку `Корзина (N)`, где `N` — общее количество товаров.
2. Используйте `useSelector` и `reduce`, чтобы посчитать общее количество товаров в корзине.

### Задание 4. Отдельный файл для `actions`

_Задание на высшую оценку._

Для лучшей структуры проекта и удобства масштабирования рекомендуется разделять слайсы и дополнительные действия (actions).

1. Создайте файл `actions.js` в папке `cart/`.
2. В этот файл поместите селекторы (например, `selectCart`, `selectCartItemsCount`).
3. Импортируйте эти действия и селекторы в нужных местах, например:
   - в `CartPage.jsx`, чтобы отобразить итоговую сумму. Теперь вместо `useSelector(state => state.cart.items)` используйте `useSelector(selectCart)`.
   - в `Header`, чтобы показать количество товаров. Теперь вместо `useSelector(state => state.cart.totalQuantity)` используйте `useSelector(selectCartItemsCount)`.

### Задание 4. _Дополнительное задание_. Сохранение состояния корзины (дополнительно)

1. Используйте `localStorage` для сохранения состояния корзины.
2. При загрузке приложения проверьте наличие сохранённого состояния и восстановите его в Redux Store.
3. При изменении состояния корзины обновляйте `localStorage`.

### Задание 5. _Дополнительное задание_. Асинхронная загрузка товаров с использованием `createAsyncThunk` или `RTK Query`

На этом этапе необходимо заменить ручную загрузку данных с сервера на асинхронную через Redux Toolkit.

Выберите один из двух подходов: `createAsyncThunk` или `RTK Query` и реализуйте:

- загрузку товаров с mockapi.io (GET-запрос);
- отправку нового товара на сервер (POST-запрос).

#### Вариант 1: `

Видеоуроки для выполнения задания:

- [React Redux Toolkit и createAsyncThunk (YouTube)](https://www.youtube.com/watch?v=6RTbC8Acj1M)

1. Создайте папку `store/products/`.
2. В папке `store/products/` создайте файл `actions.js` и `slice.js`.
3. В `store/products/actions.js`:
   1. Создайте `createAsyncThunk` для загрузки товаров (`fetchProducts`).
   2. Создайте `createAsyncThunk` для добавления товара (`createProduct`).
4. В `store/products/slice.js` создайте слайс для управления состоянием товаров.
5. В `store.js` подключите `productsReducer`
6. В `ProductList.jsx` используйте `useEffect(() => dispatch(fetchProducts()), [])`.
7. В `ProductForm.jsx` при отправке вызывайте `dispatch(createProduct(formData))`.

#### Вариант 2: `RTK Query`

Видеоуроки для выполнения задания:

- [Link](https://www.youtube.com/watch?v=uSwe-5dPrV8) - более короткий про RTK Query
- [Link](https://www.youtube.com/watch?v=gPmYTqGPDWA) - более длинный про Redux Toolkit и RTK Query

1. Установите необходимые зависимости:
   ```bash
   npm install @reduxjs/toolkit react-redux
   ```
2. В папке `src/api/ `создайте файл `productsApi.js`:

   ```jsx
   import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

   export const productsApi = createApi({
     reducerPath: 'productsApi',
     baseQuery: fetchBaseQuery({ baseUrl: 'https://your-api.mockapi.io/' }),
     endpoints: (builder) => ({
       getProducts: builder.query({
         query: () => 'products',
       }),
       createProduct: builder.mutation({
         query: (newProduct) => ({
           url: 'products',
           method: 'POST',
           body: newProduct,
         }),
       }),
     }),
   });

   export const { useGetProductsQuery, useCreateProductMutation } = productsApi;
   ```

3. Подключите `productsApi.reducer` и `middleware` в `store.js`:

   ```jsx
   // store/store.js
   import { configureStore } from '@reduxjs/toolkit';
   import cartReducer from './cart/slice';
   import { productsApi } from '../api/productsApi'; // путь к RTK Query API

   export const store = configureStore({
     reducer: {
       cart: cartReducer,
       [productsApi.reducerPath]: productsApi.reducer,
     },
     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(productsApi.middleware),
   });
   ```

4. В `ProductList` используйте.
   1. Используйте хук `useGetProductsQuery()` для загрузки товаров.
   2. Отобразите состояние загрузки или ошибки при необходимости.
5. В `ProductForm.jsx`.
   1. Используйте хук `useCreateProductMutation()` для отправки данных.

### Задание 6. Документация проекта

1. Документируйте код (там где необходимо) в соответствии со стандартами JSDoc.

## Контрольные вопросы

1. Что такое глобальное состояние и зачем оно нужно?
2. Что такое Redux Toolkit и как он упрощает работу с глобальным состоянием?
3. Что такое слайсы и как они помогают организовать код?