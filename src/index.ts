interface Provider {
  isGme?: boolean;
}

declare global {
  interface Window {
    ethereum?: Provider;
    gme?: Provider;
  }
}

interface DetectOpts {
  timeout: number;
}
const detectGmeProvider = (
  opts: DetectOpts = { timeout: 3000 }
): Promise<unknown> => {
  return new Promise((resolve) => {
    if (window.gme?.isGme) {
      resolve(window.gme);
      return;
    }

    if (window.ethereum?.isGme) {
      resolve(window.ethereum);
      return;
    }

    let handled;

    const handle = () => {
      if (!handled) return;
      handled = true;
      window.removeEventListener("ethereum#initialized", handle);

      if (window.gme && window.gme.isGme) {
        resolve(window.gme);
        return;
      }

      if (window.ethereum?.isGme) {
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

export default detectGmeProvider;
