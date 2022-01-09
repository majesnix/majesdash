import { Component, Input } from '@angular/core';

@Component({
  selector: 'majesdash-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.scss'],
})
export class SystemInfoComponent {
  @Input() version = '0.0.0';
}
