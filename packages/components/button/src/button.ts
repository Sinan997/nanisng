import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  SimpleChanges,
  computed,
  input,
  signal,
} from '@angular/core';
import { updateButtonColor } from './button-utils';


@Component({
  selector: 'n-button',
  standalone: true,
  imports: [NgClass],
  template: `<button [class]="classList()">
    {{ label() }}
    <ng-content></ng-content>
  </button> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  readonly color = input<string>('primary');
  readonly label = input<string>('');
  _classList = signal(['n-button', `n-button-${this.color()}`]);
  classList = computed(() => this._classList());

  ngOnChanges({ color }: SimpleChanges): void {
    if (color) {
      this._classList.update((classList) => updateButtonColor(classList, color.currentValue));
    }
  }
}
