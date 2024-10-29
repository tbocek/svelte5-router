# Svelte Routing like a boss

An SPA router for Svelte that allows you to divide & conquer your app with nested routers, snippets, and more.

## Features

- Supports Svelte 5, just one rune baby 🚀!
- Divide & conquer - use nested routers all over the place.
- Use components, snippets, or both!
- Use regex paths (e.g. `/foo/(.*?)/bar`) and/or named parameters together 🔥.

## Installation

```bash
npm install @mateothegreat/svelte5-router
```

## Usage

All you need to do is define your routes and then use the `Router` component with the `routes` array.

To make a link, use the `route` directive with the `href` attribute such as `<a use:route href="/foo">foo</a>`.

### Routes

You can simply use static paths like `/foo` or dynamic paths like `/foo/(.*?)` with regex.

Example patterns:

| Pattern             | Description                         |
| ------------------- | ----------------------------------- |
| `/`                 | The root path.                      |
| `/foo`              | A static path.                      |
| `/foo/(.*?)`        | A dynamic path.                     |
| `/cool/(.*?)/(.*?)` | A dynamic path with two parameters. |

For transparency, here's the type definition for a route:

> Only `path` and `component` is required at a minimum.

```ts
export interface Route {
  path: RegExp | string;
  component: Component<any> | Snippet;
  props?: Record<string, any>;
  pre?: () => Route;
  post?: () => void;
}
```

#### Using Components & Snippets

For the quickest and easiest routes, you can use components:

```svelte
const routes: Route[] = [
  {
    path: "/foo",
    component: Foo
  }
];
```

For more complex routing needs, you can use snippets:

```svelte
<script lang="ts">
  import { route, Router, type Route } from "@mateothegreat/svelte5-router";
  import All from "./all.svelte";

  const routes: Route[] = [
    {
      path: "/snippetsarecool",
      component: mySnippet
    }
  ];
</script>

{#snippet mySnippet()}
  <div class="flex flex-col gap-3 bg-green-400 p-4">
    I'm a snippet!<br />
    Click on a link above to see the params..
  </div>
{/snippet}
```

#### Accessing Parameters

When your component is rendered, the `route` object will be passed in as a prop. You can then access the parameter(s) of a route using the `route.params` property:

```svelte
<script lang="ts">
  import type { Route } from "@mateothegreat/svelte5-router";

  let { route }: { route: Route } = $props();
</script>

<pre>{JSON.stringify(route.params, null, 2)}</pre>
```

If you were to route to `/cool/bar/baz`, this will result in the following output:

```json
[
  "bar",
  "baz"
]
```

#### Passing Props

You can pass props to a route by using the `props` property on any route. These props will be passed to the component as a prop:

```svelte
const routes: Route[] = [
  {
    path: "/user/profile",
    component: UserProfile,
    props: {
      myProp: {
        date: new Date(),
        name: "mateothegreat"
      }
    }
  }
];
```

Then, in your component, you can access the prop like this:

```svelte
<script lang="ts">
  let { myProp } = $props();
</script>

<pre>{JSON.stringify(myProp, null, 2)}</pre>
```

### `pre` and `post` hooks

Use `pre` and `post` hooks to run before and after a route is rendered to do things like authentication, logging, etc.

> The `pre` and `post` hooks are optional.

```svelte
const routes: Route[] = [
  {
    path: "unprotected",
    component: Unprotected
    post: () => {
      console.log("post hook fired");
    }
  },
  {
    path: "protected",
    component: Protected,
    pre: () => {
      // Crude example of checking if the user is logged in:
      if (!localStorage.getItem("token")) {
        // By returning false, the route will not be rendered and the
        // user will stay at the current route:
        return {
          path: "/login",
          component: Login
        };
      } else {
        return {
          path: "/protected",
          component: Logout
        };
      }
    },
  }
];
```

## Example

```svelte
<script lang="ts">
  import type { Route } from "@mateothegreat/svelte5-router";
  import { route, Router } from "@mateothegreat/svelte5-router";
  ...

  const routes: Route<any>[] = [
    {
      path: "/",
      component: Homepage
    },
    {
      path: "about",
      component: About
    },
    {
      path: "settings",
      component: Settings
    }
  ];
</script>

<div class="flex gap-2">
  <a use:route href="/">Home</a>
  <a use:route href="/about">About</a>
  <a use:route href="/settings">Settings</a>
</div>

<Router base="/" {routes} />
</div>
```

> For a real world example, check out the [test app](./test/app/src/app.svelte).
