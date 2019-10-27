export class Http {

  async fetch(url, method = 'GET', body = undefined, headers = {}) {
    return this.xhr(url, method, headers);
  }

  // bit old school.
  xhr(url, method = 'GET', body = undefined, headers = {}) {
    return new Promise( (resolve, reject) => {
      const xhr = new XMLHttpRequest();

      for (const key in headers) {
        if (headers.hasOwnProperty(key)) {
          xhr.setRequestHeader(key, headers[key]);
        }
      }

      xhr.addEventListener('readystatechange', (x) => {
        const target = x.target;
        if (target.readyState === 4 && target.status === 200) {
          resolve(x.target.responseText);
        } else if (target.readyState === 4 && target.status !== 200) {
          reject(x);
        }
      });

      xhr.open(method, url);
      xhr.send(body);
    });
  }

}
