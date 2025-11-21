import { Component, ChangeDetectionStrategy, forwardRef, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SignaturePadComponent } from '../signature-pad/signature-pad.component';

@Component({
  selector: 'app-signature-input',
  standalone: true,
  imports: [CommonModule, SignaturePadComponent],
  templateUrl: './signature-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SignatureInputComponent),
      multi: true
    }
  ]
})
export class SignatureInputComponent implements ControlValueAccessor {
  activeTab = signal<'draw' | 'upload'>('draw');
  signatureData = signal<string | null>(null);

  private onChange = (value: string | null) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    if (value && typeof value === 'string') {
      this.signatureData.set(value);
    } else {
      this.signatureData.set(null);
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setTab(tab: 'draw' | 'upload'): void {
    this.activeTab.set(tab);
  }

  onSignatureDrawn(data: string): void {
    this.signatureData.set(data);
    this.onChange(data);
    this.onTouched();
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        this.signatureData.set(result);
        this.onChange(result);
        this.onTouched();
      };
      reader.readAsDataURL(file);
    }
  }

  clearSignature(): void {
    this.signatureData.set(null);
    this.onChange(null);
    this.onTouched();
  }
}
