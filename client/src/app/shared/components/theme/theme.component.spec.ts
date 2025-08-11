import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeComponent } from './theme.component';

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;

  localStorage.setItem('theme', 'dracula');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize theme from localStorage or default to garden', () => {
    localStorage.removeItem('theme');
    const instance = new ThemeComponent();
    expect(instance.theme).toBe('garden');
  });

  it('should toggle theme between garden and dracula', () => {
    component.theme = 'garden';
    component.toggleTheme();
    expect(component.theme).toBe('dracula');

    component.toggleTheme();
    expect(component.theme).toBe('garden');
  });

  it('should set the theme in localStorage and document attribute', () => {
    component.theme = 'garden';
    component.toggleTheme();
    expect(localStorage.getItem('theme')).toBe('dracula');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dracula');
  });

  it('should load and apply the theme from localStorage on init', () => {
    const theme = localStorage.getItem('theme');

    fixture.detectChanges();
    expect(theme).toBe(component.theme);
    expect(document.documentElement.getAttribute('data-theme')).toBe(theme);
  });
});
