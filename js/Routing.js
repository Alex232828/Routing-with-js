class Routing {
  constructor() {
  }

  getPage(routeName, id = '', ...args) {
    history.pushState(null, null, `${routeName}/${id}/${args}`);
  }

  setEvents() {
    window.addEventListener('click', (event) => {
      const post = event.target.dataset.post;
      const userId = event.target.dataset.user;
      const albums = event.target.dataset.albums;
      const photos = event.target.dataset.photos;
      const todos = event.target.dataset.todos;

      if (post) {
        this.getPage('/posts', post);
        new Post(post).render();
      }
      if (userId) {
        this.getPage('/users', userId);
        new Users(userId).render();
      }
      if (todos) {
        this.getPage('/users', todos, 'todos');
        new Todos(todos).render();
      }
      if (albums) {
        this.getPage('/users', albums, 'albums');
        new Albums(albums).render();
      }
      if (photos) {
        this.getPage('/albums', photos, 'photos');
        new Photos(photos).render();
      }
    })
  }
}
