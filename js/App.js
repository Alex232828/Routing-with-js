class App {
  constructor() {
    this.init();
  }

  init() {
    this.deridect();
  }

  deridect() {
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
      new Posts().render();
    }
  }
}

new App();
