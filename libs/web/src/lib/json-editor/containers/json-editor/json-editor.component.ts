/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Output,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'majesdash-json-editor',
  templateUrl: './json-editor.component.html',
  styleUrls: ['./json-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => JsonEditorComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => JsonEditorComponent),
      multi: true,
    },
  ],
})
export class JsonEditorComponent implements ControlValueAccessor, Validator {
  @Input() jsonString = '';
  @Output() jsonStringChange = new EventEmitter<string>();
  parseError = false;
  data: any;

  // this is the initial value set to the component
  public writeValue(obj: any) {
    if (obj) {
      this.data = obj;
      // this will format it with 4 character spacing
      this.jsonString = JSON.stringify(this.data, undefined, 4);
    }
  }

  // registers 'fn' that will be fired wheb changes are made
  // this is how we emit the changes back to the form
  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // validates the form, returns null when valid else the validation object
  // in this case we're checking if the json parsing has passed or failed from the onChange method
  public validate() {
    return !this.parseError
      ? null
      : {
          jsonParseError: {
            valid: false,
          },
        };
  }

  // not used, used for touch input
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public registerOnTouched() {}

  // change events from the textarea
  onChange(event: any) {
    // get value from text area
    const newValue = event.target.value;

    try {
      // parse it to json
      this.data = JSON.parse(newValue);
      this.parseError = false;
    } catch (ex) {
      // set parse error if it fails
      this.parseError = true;
    }

    // update the form
    this.propagateChange(this.data);
  }

  // the method set in registerOnChange to emit changes back to the form
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  propagateChange = (_: any) => {};
}
