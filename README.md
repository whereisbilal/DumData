# DumData

[DumData](https://dumdata.vercel.app) is a free REST API for generating fake JSON data. No setup, no API key, no rate limits. Just fetch and build.

📘 Docs: [https://dumdata.vercel.app/docs](https://dumdata.vercel.app/docs)

**New:** Create your own API from any JSON with [Custom Response](https://dumdata.vercel.app/custom-response). Paste your JSON, click Generate Now and get a unique URL.

## Why DumData?

* Build and test your UI without writing a backend
* No signup, no API key, no rate limits
* Realistic, well-structured data from the first request
* Works with any framework or language
* Pagination, search, sorting and field selection built in
* Simulate slow networks and error responses
* Great for prototyping, demos, testing and learning

## How to Fetch Data

Use whatever you like: the fetch API, Axios or jQuery. They all work.

```js
const res = await fetch('https://dumdata.vercel.app/api/products');
const data = await res.json();
console.log(data);
```

Or with Axios:

```js
const { data } = await axios.get('https://dumdata.vercel.app/api/products');
console.log(data);
```

## Resources

* [Products (190+)](https://dumdata.vercel.app/docs/products)
* [Users (200+)](https://dumdata.vercel.app/docs/users)
* [Posts (250+)](https://dumdata.vercel.app/docs/posts)
* [Comments (340+)](https://dumdata.vercel.app/docs/comments)
* [Todos (250+)](https://dumdata.vercel.app/docs/todos)
* [Carts (20)](https://dumdata.vercel.app/docs/carts)
* [Quotes (100)](https://dumdata.vercel.app/docs/quotes)
* [Recipes (50)](https://dumdata.vercel.app/docs/recipes)
* [Auth / Login](https://dumdata.vercel.app/docs/auth-login)
* [Dynamic Image](https://dumdata.vercel.app/docs/image)
* [Mock HTTP Status Codes](https://dumdata.vercel.app/docs/http)
* [IP Address](https://dumdata.vercel.app/docs/ip)
* [Custom Response](https://dumdata.vercel.app/custom-response)

## Features

* **Search**
  [https://dumdata.vercel.app/api/products/search?q=phone](https://dumdata.vercel.app/api/products/search?q=phone)

* **Pagination**
  [https://dumdata.vercel.app/api/products?limit=10&skip=10](https://dumdata.vercel.app/api/products?limit=10&skip=10)

* **Sorting**
  [https://dumdata.vercel.app/api/products?sortBy=price&order=desc](https://dumdata.vercel.app/api/products?sortBy=price&order=desc)

* **Select only the fields you need**
  [https://dumdata.vercel.app/api/products?select=id,title,price](https://dumdata.vercel.app/api/products?select=id,title,price)

* **Nested resources**
  [https://dumdata.vercel.app/api/users/1/carts](https://dumdata.vercel.app/api/users/1/carts)

* **Delay responses** (to test loading states)
  [https://dumdata.vercel.app/api/products?delay=1000](https://dumdata.vercel.app/api/products?delay=1000)

## Auth

Login with a username and password and get JWT access and refresh tokens. Auth is simulated, so it is meant for testing your login flow, not for real security.

```js
const res = await fetch('https://dumdata.vercel.app/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'emilys', password: 'emilyspass' }),
});
const { accessToken } = await res.json();
```

## Custom Response

Need an API for your own JSON? Send it with a `POST` request and get a unique URL back.

```js
const res = await fetch('https://dumdata.vercel.app/api/custom', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ data: { name: 'Ali', role: 'admin' } }),
});
const { url } = await res.json();
// GET that url to receive your JSON back
```

* JSON up to 5 MB
* Each URL stays active for 7 days

You can also try it in the browser at [dumdata.vercel.app/custom-response](https://dumdata.vercel.app/custom-response).

## Dynamic Image

Generate placeholder images with a custom size and text.

```
https://dumdata.vercel.app/api/image/WIDTHxHEIGHT
```

Example: [https://dumdata.vercel.app/api/image/200x150?text=Hello](https://dumdata.vercel.app/api/image/200x150?text=Hello)

![Example](https://dumdata.vercel.app/api/image/200x150?text=Hello)

## Run Locally

```bash
git clone https://github.com/mrvornex/dumdata.git
cd dumdata
npm install
```

Create a `.env.local` file for the Custom Response feature (it stores data in Vercel KV):

```
KV_REST_API_URL=your_url
KV_REST_API_TOKEN=your_token
```

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Built With

* [Next.js](https://nextjs.org)
* [TypeScript](https://www.typescriptlang.org)
* [Tailwind CSS](https://tailwindcss.com)
* [Vercel](https://vercel.com) and Vercel KV

## Contributing

Found a bug or have an idea? Open an [issue](https://github.com/mrvornex/dumdata/issues) or send a pull request.

## License

MIT