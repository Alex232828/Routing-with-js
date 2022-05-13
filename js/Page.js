class Page extends Routing {
  constructor() {
    super();

    this.data;
    this.url;
    this.MY_APP = document.querySelector('.container');
    this.userNamesObj = {};
  }

  renderHTML(html) {
    this.MY_APP.innerHTML = html;
  }

  getSorted(sortName, object) {
    sortName.forEach(item => {
      return object[item.id]= item;
    })
  }
}
