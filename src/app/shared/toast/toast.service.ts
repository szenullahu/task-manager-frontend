import {Injectable, signal} from '@angular/core';

type ToastType = 'success' | 'danger' | 'warning' | 'info';

@Injectable({providedIn: 'root'})
export class ToastService {
  toastMessage = signal<string | null>(null);
  toastType = signal<ToastType>('success'); // ✅ default is 'success'

  show(message: string, type: ToastType = 'success', duration = 4000) {
    this.toastMessage.set(message);
    this.toastType.set(type);
    setTimeout(() => this.toastMessage.set(null), duration);
  }

  clear() {
    this.toastMessage.set(null);
  }
}
