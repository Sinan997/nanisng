import { Component } from '@angular/core';

@Component({
  selector: 'n-button',
  template: '<button (click)="log()">Click me</button>',
  standalone: true,
})
export class ButtonComponent {
  log() {
    console.log('Button clicked');
  }
}
