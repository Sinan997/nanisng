import { Component, ElementRef, OnChanges, SimpleChanges, computed, inject, input, model, signal, viewChild } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'n-input-text',
  standalone: true,
  imports: [ReactiveFormsModule],
  styles: `
    :host {
      display: block;
    }
  `,
  viewProviders: [{ provide: ControlContainer, useFactory: () => inject(ControlContainer, { skipSelf: true }) }],
  template: `
    <!-- Checking is it reactive form or NgModel based input -->
    @if (controlName()) { 
      @if(icon()){
        <div [class]="'n-input-icon-' + iconPos()">
          <i [class]="icon()"></i>
          <input #inp [id]="inputId()" [type]="type()" [class]="classList()" [formControlName]="controlName()!" [disabled]="disabled()" />
        </div>
      }@else{
        <input #inp [id]="inputId()" [type]="type()" [class]="classList()" [formControlName]="controlName()!"[disabled]="disabled()" />
      }
    }@else{
        @if(icon()){
          <div [class]="'n-input-icon-' + iconPos()">
            <i [class]="icon()"></i>
            <input #inp [id]="inputId()" [type]="type()" [class]="classList()" [value]="value()" (input)="setValue()" [disabled]="disabled()"/>
          </div>
        }@else{
          <input #inp [id]="inputId()" [type]="type()" [class]="classList()" [value]="value()" (input)="setValue()" [disabled]="disabled()"/>
        }
    }

    @if(formText()){
      <span class="form-text">{{ formText() }}</span>
    }
  `,
})
export class InputTextComponent implements OnChanges {
  protected readonly inputText = viewChild('inp', { read: ElementRef });

  controlName = input<string | undefined>(undefined);
  value = model<string>('');
  type = input<string>('text');
  size = input<string>('md');
  icon = input<string | undefined>(undefined);
  iconPos = input<string>('left');
  inputId = input<string>('');
  formText = input<string>('');
  disabled = input<boolean>(false);

  private _classList = signal<string[]>(['n-input']);
  classList = computed(() => this._classList());

  ngOnChanges(changes: SimpleChanges): void {
    this.updateSize();
    this.updateDisabled();
  }

  setValue() {
    this.value.set(this.inputText()!.nativeElement.value);
  }

  updateSize() {
    if (this.size()) {
      this._classList.update((classList) => classList.filter((c) => !c.startsWith('n-input-sm') && !c.startsWith('n-input-md') && !c.startsWith('n-input-lg')));
      this._classList.set([...this._classList(), `n-input-${this.size()}`]);
    }
  }

  updateDisabled() {
    if (this.disabled()) {
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
}
