import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeComponent } from './theme.component';

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;

  localStorage.setItem('theme', 'dim');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize theme from localStorage or default to cupcake', () => {
    localStorage.removeItem('theme');
    const instance = new ThemeComponent();
    expect(instance.theme).toBe('cupcake');
  });

  it('should toggle theme between cupcake and dim', () => {
    component.theme = 'cupcake';
    component.toggleTheme();
    expect(component.theme).toBe('dim');

    component.toggleTheme();
    expect(component.theme).toBe('cupcake');
  });

  it('should set the teheme in localStorage and document attribute', () => {
    component.theme = 'cupcake';
    component.toggleTheme();
    expect(localStorage.getItem('theme')).toBe('dim');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dim');
  });

  it('should load and apply the theme from localStorage on init', () => {
    fixture.detectChanges();

    expect(component.theme).toBe('dim');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dim');
  });
});
