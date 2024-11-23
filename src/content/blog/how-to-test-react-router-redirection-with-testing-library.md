---
title: How to test react-router redirection with testing-library
description: React testing-library is very convenient to test React components rendering from props, fire events and check DOM elements. react-router uses a <Redirect> component to trigger a redirect, but how can we test that this component is called using testing-library?
pubDate: 2021-08-20
heroImage: https://res.cloudinary.com/practicaldev/image/fetch/s--IqKN_SSk--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/b5t7qfsnpnj4531hhi9a.png
language: en
---

React testing-library is very convenient to test React components rendering from props, fire events and check DOM elements. react-router uses a `<Redirect>` component to trigger a redirect, but how can we test that this component is called using testing-library?

Let’s say we have a CreateBookForm component that creates a new book. It calls our API when the form is submitted.

```jsx
// BookCreateForm.js
import React, { useState } from 'react';
import api from './api';

function CreateBookForm() {
  const [title, setTitle] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    await api.createBook({ title });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Book's title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button>Create book</button>
    </form>
  );
}

export default CreateBookForm;
```

It's easy to test that our api is called when the form is submitted with testing-library:

```jsx
// BookCreateForm.test.js
import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';

import BookCreateForm from './BookCreateForm';
import api from './api';

jest.mock('./api');

test('it calls api on form submit', async () => {
  api.createBook = jest.fn(() => Promise.resolve({ id: 1 }));
  const { 
    getByPlaceholderText, getByText, findByDisplayValue 
  } = render(<BookCreateForm />);

  await act(async () => {
    const input = getByPlaceholderText(/Book's title/);
    fireEvent.change(input, { target: { value: 'Yama Loka Terminus' }});
    await findByDisplayValue(/Yama Loka Terminus/);

    const button = getByText(/Create book/);
    fireEvent.click(button);
  });

  expect(api.createBook).toHaveBeenCalledWith({ title: 'Yama Loka Terminus' });
});
```

Now, let's say we want our component to redirect to the new book page once it's created.

```jsx
// BookCreateForm.js
import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'

import api from './api';

function CreateBookForm() {
  const [title, setTitle] = useState('');
  const [createdId, setCreatedId] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    const { id } = await api.createBook({ title });
    setCreatedId(id);
  }

  return createdId ?
    <Redirect to={`/book/${createdId}`}/> :
    (
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Book's title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <button>Create book</button>
      </form>
    );
}

export default CreateBookForm;
```

We'll probably have a router wrapping our form and a BookPage component:

```jsx
// App.js
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/book/create">
          <BookCreateForm />
        </Route>
        <Route path="/book/:id">
          <BookPage />
        </Route>
      </BrowserRouter>
    </div>
  );
}
```

Now, our test runner will complain that we use `<Redirect>` outside of a router, so let's wrap our component test into one.

```jsx
// BookCreateForm.test.js
// …
import { BrowserRouter } from 'react-router-dom';
// …
  const { 
    container, 
    getByPlaceholderText, 
    getByText, 
    findByDisplayValue 
  } = render(<BrowserRouter><BookCreateForm /></BrowserRouter>);
// …
```

Everything is working fine, but how can we ensure that our form component is redirecting to the new page after the api's response?

That's a tricky question and I've been struggling with this. I've seen some complex solutions involving creating fake routers or mocking the react-router module. But there's actually a pretty simple way to test this.

If we try to snapshot our component after our API was called, we'll notice that it renders an empty div.

```js
expect(container).toMatchInlineSnapshot(`<div />`);
```

That's because the redirection indeed happened, but there was no route to redirect to. From the testing-library renderer perspective, they are no routes defined, we just ask it to render and empty router containing the form.

To ensure that our user gets redirected to `/book/1` (as the book's id returned by our API mock is `1`), we can add a route for that specific url with a simple text as children.

```jsx
  const { 
    container, 
    getByPlaceholderText, 
    getByText, 
    findByDisplayValue 
  } = render(
    <BrowserRouter>
      <BookCreateForm />
      <Route path="/book/1">Book page</Route>
    </BrowserRouter>
  );
```

And test that the component rendered the text:

```js
expect(container).toHaveTextContent(/Book page/);
```

Our final test :

```jsx
// BookCreateForm.test.js
import React from 'react';
import { render, act, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route } from 'react-router-dom';

import BookCreateForm from './BookCreateForm';
import api from './api';

jest.mock('./api');

test('it calls api on form submit', async () => {
  api.createBook = jest.fn(() => Promise.resolve({ id: 1 }));
  const { 
    container, 
    getByPlaceholderText, 
    getByText, 
    findByDisplayValue 
  } = render(
    <BrowserRouter>
      <BookCreateForm />
      <Route path="/book/1">Book page</Route>
    </BrowserRouter>
  );

  await act(async () => {
    const input = getByPlaceholderText(/Book's title/);
    fireEvent.change(input, { target: { value: 'Yama Loka Terminus' }});
    await findByDisplayValue(/Yama Loka Terminus/);

    const button = getByText(/Create book/);
    fireEvent.click(button);
  });

  expect(api.createBook).toHaveBeenCalledWith({ title: 'Yama Loka Terminus' });
  expect(container).toHaveTextContent(/Book page/);
});
```













