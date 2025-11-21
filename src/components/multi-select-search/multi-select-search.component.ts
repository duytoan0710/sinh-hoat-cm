import { Component, ChangeDetectionStrategy, input, signal, forwardRef, HostListener, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-multi-select-search',
  templateUrl: './multi-select-search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultiSelectSearchComponent),
      multi: true
    }
  ]
})
export class MultiSelectSearchComponent implements ControlValueAccessor {
  options = input<string[]>([]);
  label = input<string>('');
  
  selectedItems = signal<string[]>([]);
  searchTerm = signal('');
  isOpen = signal(false);

  private onChange = (value: string[]) => {};
  private onTouched = () => {};

  constructor(private elementRef: ElementRef) {}

  get filteredOptions(): string[] {
    const allOptions = this.options();
    const selected = this.selectedItems();
    const term = this.searchTerm().toLowerCase();
    
    // Filter out already selected options
    const availableOptions = allOptions.filter(opt => !selected.includes(opt));
    
    // Filter by search term if it exists
    if (!term) {
      return availableOptions;
    }
    return availableOptions.filter(opt => opt.toLowerCase().includes(term));
  }

  toggleDropdown(): void {
    this.isOpen.update(val => !val);
    if (!this.isOpen()) {
      this.searchTerm.set('');
    }
  }

  selectItem(item: string): void {
    this.selectedItems.update(items => [...items, item]);
    this.searchTerm.set('');
    this.onChange(this.selectedItems());
    this.isOpen.set(false); // Close dropdown after selection
  }
  
  removeItem(itemToRemove: string): void {
    this.selectedItems.update(items => items.filter(item => item !== itemToRemove));
    this.onChange(this.selectedItems());
  }

  // ControlValueAccessor implementation
  writeValue(value: string[]): void {
    this.selectedItems.set(value || []);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
      this.searchTerm.set('');
    }
  }
}