import { Component } from '@angular/core';
import { version } from '../../version';

@Component({
  selector: 'majesdash-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.scss'],
})
export class SystemInfoComponent {
  version = version;
}
