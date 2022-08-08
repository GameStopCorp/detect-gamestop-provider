# detect-gamestop-provider

A utility library for detecting the presence of the [GameStop Wallet Browser Extension](https://wallet.gamestop.com/wallets) provider. It connects to the wallet via ```window.gamestop``` if it's set as the default provider, or ```window.ethereum``` if not set as the default provider.

&nbsp;&nbsp;&nbsp;
## Usage
### JS
    import detectGamestopProvider from "@gamestopnft/detect-gamestop-provider";

    detectGamestopProvider()
        .then((provider) => console.log(provider))
        .catch((e) => console.error(e));

### HTML
    <html>
        <body>
        </body>
        <script type="text/javascript" src="../dist/index.min.js"></script>
        <script type="text/javascript">
            detectGamestopProvider.default().then(p => alert(p));
        </script>
    </html>


&nbsp;&nbsp;&nbsp;
## Options
**detectGamestopProvider** accepts an optional parameter:

#### `options.timeout`

Denotes how much time (in milliseconds) to wait for asynchronously injected providers to load.

Type: `number`

Default: `3000`

&nbsp;&nbsp;&nbsp;
## Logos

Please utilize either of the following logos (svg or png) when integrating with the GameStop Wallet.

<img src="./public/gamestop_logo_circle.svg" alt="GameStop Logo Circle" width="64" height="64"/>
<img src="./public/gamestop_logo_square.svg" alt="GameStop Logo Square" width="64" height="64"/>

&nbsp;&nbsp;&nbsp;
## Browser support


[<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://gotbahn.github.io/browsers-support-badges/)<br>Chrome v92+
<br>
<br>
<br>
<br>

### By downloading this utility library, you agree to the License.