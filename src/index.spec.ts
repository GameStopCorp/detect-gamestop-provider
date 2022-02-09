import detectGmeProvider from "./index";

interface Provider {
  isGamestop?: boolean;
}

declare global {
  interface Window {
    ethereum?: Provider;
    gamestop?: Provider;
  }
}

describe("tests detectGamestopProvider", () => {
  it("detect window.ethereum.isGamestop = true", () => {
    const provider = {
      isGamestop: true,
    };

    window.ethereum = provider;
    detectGmeProvider().then((p) => {
      expect(p).toStrictEqual(provider);
    });
  });

  it("detect window.gamestop.isGamestop = true", () => {
    const provider = {
      isGamestop: true,
    };

    window.gamestop = provider;
    detectGmeProvider().then((p) => {
      expect(p).toStrictEqual(provider);
    });
  });

  it("doesn't detect window.gamestop.isGamestop = false, times out with null", () => {
    const provider = {
      isGamestop: false,
    };

    window.gamestop = provider;
    detectGmeProvider({ timeout: 2000 }).then((p) =>
      expect(p).toStrictEqual(null)
    );
  });

  it("detects window.gamestop.isGamestop after timeout", () => {
    const provider = {
      isGamestop: false,
    };
    setTimeout(() => {
      window.gamestop = provider;
    }, 1500);
    detectGmeProvider({ timeout: 3000 }).then((p) =>
      expect(p).toStrictEqual(provider)
    );
  });

  it("detects window.ethereum.isGamestop after timeout", () => {
    const provider = {
      isGamestop: false,
    };
    setTimeout(() => {
      window.ethereum = provider;
    }, 1500);
    detectGmeProvider({ timeout: 3000 }).then((p) =>
      expect(p).toStrictEqual(provider)
    );
  });

  it("doesn't detect window.ethereum.isGamestop = false", () => {
    const provider = {
      isGamestop: false,
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
