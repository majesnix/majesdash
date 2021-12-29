import { Injectable } from '@nestjs/common';
import fetch, { RequestInit } from 'node-fetch';

@Injectable()
export class HttpService {
  get(url: string, requestInit?: RequestInit) {
    return fetch(url, { ...requestInit });
  }

  put(url: string, requestInit?: RequestInit) {
    return fetch(url, { ...requestInit, method: 'PUT' });
  }

  patch(url: string, requestInit?: RequestInit) {
    return fetch(url, { ...requestInit, method: 'PATCH' });
  }

  delete(url: string, requestInit?: RequestInit) {
    return fetch(url, { ...requestInit, method: 'DELETE' });
  }

  post(url: string, requestInit?: RequestInit) {
    return fetch(url, { ...requestInit, method: 'POST' });
  }
}
