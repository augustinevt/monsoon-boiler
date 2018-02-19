class MockedLocalStorage {
  constructor() {
    this.store = {
      jwt: 'shoobido'
    };
  }

  getItem(key) {
    return this.store[key] || null;
  };

  setItem(key, value) {
    this.store[key] = value.toString();
  };

  removeItem(key) {
    delete this.store[key];
  };

  clear() {
    this.store = {};
  };
}

window.localStorage = new MockedLocalStorage();
