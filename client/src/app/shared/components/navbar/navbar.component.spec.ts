import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { ThemeComponent } from '../theme/theme.component';
import { By } from '@angular/platform-browser';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the Menu icon', () => {
    const icon = fixture.debugElement.query(By.css('lucide-angular'));
    expect(icon).toBeTruthy();
  });

  it('should render theme toggle component', () => {
    const theme = fixture.debugElement.query(By.css('app-theme'));
    expect(theme).toBeTruthy();
  });

  it('should emit toggle when .toggle-button is clicked', () => {
    spyOn(component.toggle, 'emit');
    const input = fixture.debugElement.query(
      By.css('button.toggle-button')
    )?.nativeElement as HTMLButtonElement;

    input.click();
    fixture.detectChanges();
    expect(component.toggle.emit).toHaveBeenCalled();
  })
});
