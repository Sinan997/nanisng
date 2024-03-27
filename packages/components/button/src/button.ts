import { NgClass, NgTemplateOutlet } from '@angular/common';
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
  imports: [NgClass, NgTemplateOutlet],
  template: `
    <button #btn [class]="classList()" [disabled]="loading()" [type]="type()">
      @if(loading()) {
      <i class="{{ loadingIcon() }}" [ngClass]="loadingIcon() && icon() ? 'me-1': ''"></i>
      } 
      @if(icon() && iconPos() === 'left') {
        <i class="{{ icon() }}"></i>
        {{ label() }}
        <ng-container *ngTemplateOutlet="ngContent"></ng-container>
      }@else if(icon() && iconPos() === 'right'){
        <ng-content></ng-content>
        {{ label() }}
        <i class="{{ icon() }}"></i>
        <ng-container *ngTemplateOutlet="ngContent"></ng-container>
      }@else {
        {{ label() }}
        <ng-container *ngTemplateOutlet="ngContent"></ng-container>
      }
    </button>

    <ng-template #ngContent>
      <ng-content></ng-content>
    </ng-template>
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
  loadingIcon = input<string>('fas fa-spinner fa-spin');
  disabled = input<boolean>(false);
  shadow = input<boolean>(false);
  rounded = input<boolean>(false);
  outlined = input<boolean>(false);
  type = input<string>('button');

  private _classList = signal<string[]>(['n-button']);
  classList = computed(() => this._classList());

  ngOnInit(): void {
    this.updateClasses();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateClasses();
  }

  updateClasses() {
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
        'n-disabled',
      ]);
    } else {
      this._classList.update((classList) =>
        classList.filter((c) => c !== 'n-disabled')
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

  resetButtonText() { }
}
