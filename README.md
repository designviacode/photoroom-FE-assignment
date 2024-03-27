# Background Remover management tool

## Library choices
- state-management: `appStore.tsx` - has all the application logic using `Mobx`
- component-library: we're using `shadcn/ui` for simple reusable components
- storage: we're using `localForage` with `indexedDB` to persist state across sessions

## Directory structure
- components - all the components are available in the `components` directory
- utils - utils for storage library are availabe in the `utils` directory

Make sure you follow the .nvmrc and use Node 18

Start the app using the following command, replacing the key by your API key:

    VITE_API_KEY="your_api_key" pnpm run dev

## Setup

```sh
# use the right node.js version
nvm use

# Install depedencies and set up repository.
pnpm i

# run the app
pnpm dev

# run Storybook
pnpm storybook
```
