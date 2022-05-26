# detect-gme-provider

Detect GME Provider

## Description

A utility library for detecting the Gamestop Wallet Browser Extension via `window.ethereum.isGamestop` if set to be the default provider, or `window.gamestop` if not.

## Usage

```ts
import detectGamestopProvider from "@gamestopnft/detect-gamestop-provider";

detectGamestopProvider()
  .then((provider) => console.log(provider))
  .catch((e) => console.error(e));
```

## License

MIT
