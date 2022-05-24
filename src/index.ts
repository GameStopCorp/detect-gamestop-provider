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
    if (window.gamestop?.isGamestop) {
      resolve(window.gamestop);
      return;
    }

    if (window.ethereum?.isGamestop) {
      resolve(window.ethereum);
      return;
    }

    let handled;

    const handle = () => {
      if (handled) return;
      handled = true;
      window.removeEventListener("ethereum#initialized", handle);

      if (window.gamestop && window.gamestop.isGamestop) {
        resolve(window.gamestop);
        return;
      }

      if (window.ethereum?.isGamestop) {
        resolve(window.ethereum);
        return;
      }

      console.error("GME Browser Wallet not detected");
      resolve(null);
    };

    window.addEventListener("ethereum#initialized", handle);

    setTimeout(handle, opts.timeout);
  });
};

export default detectGamestopProvider;
