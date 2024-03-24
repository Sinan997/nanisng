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
    <input #inp [id]="labelId()" [type]="type()" [class]="classList()" [formControlName]="controlName()!" />
    }@else{
    <input #inp [id]="labelId()" [type]="type()" [class]="classList()" [value]="value()" (input)="setValue()" />
    }
  `,
})
export class InputTextComponent implements OnChanges {
  protected readonly inputText = viewChild('inp', { read: ElementRef });

  controlName = input<string | undefined>(undefined);
  icon = input<string | undefined>(undefined);
  iconPos = input<string>('left');
  value = model<string>('');
  type = input<string>('text');
  size = input<string>('md');
  label = input<string>('');
  labelId = input<string>('');

  private _classList = signal<string[]>(['n-input']);
  classList = computed(() => this._classList());

  ngOnChanges(changes: SimpleChanges): void {
    this.updateSize();
  }

  setValue() {
    this.value.set(this.inputText()!.nativeElement.value);
  }

  updateSize() {
    if (this.size()) {
      console.log('update', this.size());
      this._classList.update((classList) => classList.filter((c) => !c.startsWith('n-input-sm') && !c.startsWith('n-input-md') && !c.startsWith('n-input-lg')));
      this._classList.set([...this._classList(), `n-input-${this.size()}`]);
    }
  }
}
