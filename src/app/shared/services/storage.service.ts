import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  constructor() {}

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
