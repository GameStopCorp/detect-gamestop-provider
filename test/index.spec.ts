import detectGamestopProvider from ".././src/index";

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
  beforeEach(() => {
    window.gamestop = null;
    window.ethereum = null;
  });

  it("detect window.ethereum.isGamestop = true", () => {
    const provider = {
      isGamestop: true,
    };

    window.ethereum = provider;
    detectGamestopProvider().then((p) => {
      expect(p).toStrictEqual(provider);
    });
  });

  it("detect window.gamestop.isGamestop = true", () => {
    const provider = {
      isGamestop: true,
    };

    window.gamestop = provider;
    detectGamestopProvider().then((p) => {
      expect(p).toStrictEqual(provider);
    });
  });

  it("detects window.gamestop.isGamestop after timeout", () => {
    const provider = {
      isGamestop: true,
    };
    setTimeout(() => {
      window.gamestop = provider;
    }, 1500);
    detectGamestopProvider({ timeout: 3000 }).then((p) =>
      expect(p).toStrictEqual(provider)
    );
  });

  it("detects window.ethereum.isGamestop after timeout", () => {
    const provider = {
      isGamestop: true,
    };
    setTimeout(() => {
      window.ethereum = provider;
    }, 1500);
    detectGamestopProvider({ timeout: 3000 }).then((p) =>
      expect(p).toStrictEqual(provider)
    );
  });

  it("doesn't detect window.ethereum.isGamestop = false", () => {
    const provider = {
      isGamestop: false,
    };

    window.ethereum = provider;
    detectGamestopProvider().then((p) => {
      expect(p).toStrictEqual(null);
    });
  });

  it("doesn't detect window.ethereum not present", () => {
    detectGamestopProvider().then((p) => {
      expect(p).toStrictEqual(null);
    });
  });
});
