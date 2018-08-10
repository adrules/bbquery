const API_URL = '/bbqs';

class BbqsApi {

  constructor() {
    this.api = axios.create({
      baseURL: API_URL
    });
  }

  getBbqs() {
    return this.api.get('/locations')
      .then(async response => response.data)
      .catch(error => console.error(error));
  }

  getBbq(id) {
    return this.api.get(`${id}/location`)
      .then(async response => response.data)
      .catch(error => console.error(error));
  }
}
