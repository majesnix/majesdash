import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SystemSettingsFormComponent } from './system-settings-form.component';

describe('SystemSettingsComponent', () => {
  let component: SystemSettingsFormComponent;
  let fixture: ComponentFixture<SystemSettingsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SystemSettingsFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemSettingsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
