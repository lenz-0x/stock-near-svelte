[![Automated test suite and build container](https://github.com/tradingstrategy-ai/frontend/actions/workflows/javascript.yml/badge.svg)](https://github.com/tradingstrategy-ai/frontend/actions/workflows/javascript.yml)

# Trading Strategy protocol website

A frontend for [Trading Strategy protocol](https://tradingstrategy.ai).

## Install NPM dependencies

Node >=16.14 required.

```shell
npm install
```

## Install submodules

`frontend` has two submodule dependencies installed under `deps`:

- `trade-executor-frontend` - frontend to `trade-executor` (beta UI for active trading strategies)
- `fonts` - optional licensed fonts (see `static/fonts5.css` and `src/lib/components/css/typography.css`)

### Install all submodules (including private `fonts`)

If you have access to the private `tradingstrategy-ai/fonts`, initialize and install all submodules:

```shell
git submodule update --init --recursive
```

### Install only public submodules

If you don't have access to `fonts`, install only the public submodules:

```shell
git submodule update --init --recursive -- deps/trade-executor-frontend
```

### Building submodule dependencies

Once the submodules have been installed, their own install/build steps need to be run in order
to have a fully working environment. The following script runs `npm build` on submodules:

```shell
bash scripts/build-deps.sh
```

## Running in local dev

Environment variables required by the app are maintained in a `.env` file. Read about about
[magic VITE envs](https://stackoverflow.com/questions/68479217/how-to-load-environment-variables-in-svelte).

Start the SvelteKit development server:

```shell
npm run dev
```

## Documentation

- [Testing](./docs/tests.md)
- [Running in production](./docs/docker.md)
- [Doing page speed tests](./docs/speed.md)

## Notes

### Code Formatting Standards

We are using [Prettier](https://prettier.io/) for code formatting. Extensions are available for
most code editors / IDEs (see "Editor Support" on Prettier homepage).

If you prefer not to have your editor do automatic formatting, please run the following command and
commit properly formatted code before pushing a PR:

```shell
npm run format
```

Our CI/CD pipeline runs the following chack on PRs or pushes to `master`:

```shell
npm run format:check
```

### `dependencies` vs `devDependencies`

[`adapter-node` will bundle `devDependencies`](https://github.com/sveltejs/kit/tree/master/packages/adapter-node#deploying) whereas `dependencies` must be installed when deploying to production.
