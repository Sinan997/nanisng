import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  SimpleChanges,
  computed,
  input,
  signal,
  viewChild,
} from '@angular/core';

@Component({
  selector: 'n-button',
  standalone: true,
  imports: [NgClass],
  template: `
    <button #btn [class]="classList()" [disabled]="loading()">
      @if(loading()) {
      <i class="{{ loadingIcon() }}"></i>
      } @if(icon() && iconPos() === 'left') {
      <i class="{{ icon() }} ms-1"></i>
      {{ label() }}
      }@else {
      {{ label() }}
      <i class="{{ icon() }}"></i>
      }
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  button = viewChild('btn', { read: ElementRef });
  color = input<string>('primary');
  label = input<string>('');
  icon = input<string>('');
  iconPos = input<string>('left');
  loading = input<boolean>(false);
  disabled = input<boolean>(false);
  loadingIcon = input<string>('fas fa-spinner fa-spin');
  shadow = input<boolean>(false);
  rounded = input<boolean>(false);
  outlined = input<boolean>(false);

  private _classList = signal<string[]>(['n-button']);
  classList = computed(() => this._classList());

  ngOnChanges(changes: SimpleChanges): void {
    this.updateColor();
    this.updateShadowClass();
    this.updateRoundedClass();
    this.updateOutlinedClass();
    this.updateLoadingClass();
  }

  updateColor() {
    if (this.color()) {
      this._classList.update((classList) => [
        ...classList,
        'n-button-' + this.color(),
      ]);
    } else {
      this._classList.update((classList) =>
        classList.filter((c) => c !== 'n-button-' + this.color())
      );
    }
  }

  updateLoadingClass() {
    if (this.loading() || this.disabled()) {
      this._classList.update((classList) => [
        ...classList,
        'n-button-disabled',
      ]);
    } else {
      this._classList.update((classList) =>
        classList.filter((c) => c !== 'n-button-disabled')
      );
    }
  }

  updateShadowClass() {
    if (this.shadow()) {
      this._classList.update((classList) => [...classList, 'n-button-shadow']);
    } else {
      this._classList.update((classList) =>
        classList.filter((c) => c !== 'n-button-shadow')
      );
    }
  }

  updateRoundedClass() {
    if (this.rounded()) {
      this._classList.update((classList) => [...classList, 'n-button-rounded']);
    } else {
      this._classList.update((classList) =>
        classList.filter((c) => c !== 'n-button-rounded')
      );
    }
  }

  updateOutlinedClass() {
    if (this.outlined()) {
      this._classList.update((classList) => [
        ...classList,
        'n-button-outlined-' + this.color(),
      ]);
    } else {
      this._classList.update((classList) =>
        classList.filter((c) => c !== 'n-button-outlined-' + this.color())
      );
    }
  }

  resetButtonText() {}
}
