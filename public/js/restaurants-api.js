const API_URL = '/bbqs';

class BbqsApi {

  constructor() {
    this.api = axios.create({
      baseURL: API_URL
    });
  }

  getBbqs() {
    return this.api.get('/')
      .then(async response => response.data)
      .catch(error => console.error(error));
  }
}
