interface Provider {
  isGamestop?: boolean;
}

declare global {
  interface Window {
    ethereum?: Provider;
    gamestop?: Provider;
  }
}

interface DetectOpts {
  timeout: number;
}

const detectGamestopProvider = (
  opts: DetectOpts = { timeout: 3000 }
): Promise<unknown> => {
  return new Promise((resolve) => {
    if (window.ethereum?.isGamestop) {
      resolve(window.ethereum);
      return;
    }

    if (window.gamestop) {
      resolve(window.gamestop);
      return;
    }

    let handled: boolean = false;

    const handle = () => {
      if (handled) return;
      handled = true;
      window.removeEventListener("gamestop#initialized", handle);

      if (window.ethereum?.isGamestop) {
        resolve(window.ethereum);
        return;
      }

      if (window.gamestop) {
        resolve(window.gamestop);
        return;
      }

      console.error("Gamestop Browser Wallet not detected");
      resolve(null);
    };

    window.addEventListener("gamestop#initialized", handle);

    setTimeout(handle, opts.timeout);
  });
};

export default detectGamestopProvider;
