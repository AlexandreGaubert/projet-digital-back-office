export function createNews(data) {
  return { type: 'CREATE_NEWS', data: data }
}

export function getNews() {
  return { type: 'GET_NEWS' }
}
