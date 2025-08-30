import {ApplicationRef, createComponent, EnvironmentInjector, inject, Injectable} from '@angular/core';
import {ConfirmDialogComponent} from './confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  private injector = inject(EnvironmentInjector);
  private appRef = inject(ApplicationRef);

  confirm(options: {
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
  }): Promise<boolean> {
    return new Promise((resolve) => {
      const componentRef = createComponent(ConfirmDialogComponent, {
        environmentInjector: this.injector,
      });

      const domEl = componentRef.location.nativeElement;
      Object.assign(componentRef.instance, {
        ...options,
        confirm: () => {
          resolve(true);
          this.cleanup(componentRef);
        },
        cancel: () => {
          resolve(false);
          this.cleanup(componentRef);
        },
      });

      this.appRef.attachView(componentRef.hostView);
      document.body.appendChild(domEl);
    });
  }

  private cleanup(componentRef: any) {
    this.appRef.detachView(componentRef.hostView);
    componentRef.destroy();
  }
}
