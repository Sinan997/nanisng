import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from 'nanisng/button';

@Component({
  selector: 'app-button-intro',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
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
