import { Component, signal } from '@angular/core';
import { ButtonComponent } from 'nanisng/button';

@Component({
  selector: 'app-button-intro',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './button-intro.component.html',
})
export class ButtonIntroComponent {
  loading = signal(false);

  makeLoading() {
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
    }, 1200);
  }
}
