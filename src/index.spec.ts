import detectGmeProvider from "./index";

import sinon from "sinon";

interface Provider {
  isGme?: boolean;
}

declare global {
  interface Window {
    ethereum?: Provider;
    gme?: Provider;
  }
}

describe("tests detectGmeProvider", () => {
  it("detect window.ethereum.isGme = true", () => {
    const provider = {
      isGme: true,
    };

    window.ethereum = provider;
    detectGmeProvider().then((p) => {
      expect(p).toStrictEqual(provider);
    });
  });

  it("detect window.gme.isGme = true", () => {
    const provider = {
      isGme: true,
    };

    window.gme = provider;
    detectGmeProvider().then((p) => {
      expect(p).toStrictEqual(provider);
    });
  });

  it("doesn't detect window.gme.isGme = false, times out with null", () => {
    const provider = {
      isGme: false,
    };

    window.gme = provider;
    detectGmeProvider({ timeout: 2000 }).then((p) =>
      expect(p).toStrictEqual(null)
    );
  });

  it("detects window.gme.isGme after timeout", () => {
    const provider = {
      isGme: false,
    };
    setTimeout(() => {
      window.gme = provider;
    }, 1500);
    detectGmeProvider({ timeout: 3000 }).then((p) =>
      expect(p).toStrictEqual(provider)
    );
  });

  it("detects window.ethereum.isGme after timeout", () => {
    const provider = {
      isGme: false,
    };
    setTimeout(() => {
      window.ethereum = provider;
    }, 1500);
    detectGmeProvider({ timeout: 3000 }).then((p) =>
      expect(p).toStrictEqual(provider)
    );
  });

  it("doesn't detect window.ethereum.isGme = false", () => {
    const provider = {
      isGme: false,
    };

    window.ethereum = provider;
    detectGmeProvider().then((p) => {
      expect(p).toStrictEqual(null);
    });
  });

  it("doesn't detect window.ethereum not present", () => {
    detectGmeProvider().then((p) => {
      expect(p).toStrictEqual(null);
    });
  });
});
