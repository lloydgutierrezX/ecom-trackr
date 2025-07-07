import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { Router } from '@angular/router';

import { provideRouter } from '@angular/router';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct number of top-level menu items', () => {
    component.menus = [
      { label: 'Dashboard', icon: 'circle-gauge', route: '/dashboard' },
      { label: 'Transactions', icon: 'hand-coins', route: '/transactions' },
    ]

    fixture.detectChanges();
    const items = fixture.nativeElement.querySelectorAll('li');
    expect(items.length).toBe(2);
  });

  it('should highlight active route', () => {
    const router = TestBed.inject(Router);
    spyOnProperty(router, 'url').and.returnValue('/dashboard');

    component.menus = [{ label: 'Dashboard', icon: 'circle-gauge', route: '/dashboard' }];
    fixture.detectChanges();

    const activeItem = fixture.nativeElement.querySelector('.active');
    expect(activeItem?.textContent?.trim()).toBe('Dashboard');
  });
});
