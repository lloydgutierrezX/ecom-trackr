import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { Router } from '@angular/router';

import { provideRouter } from '@angular/router';
import { Component } from '@angular/core';
// Dummy route target
@Component({ template: '' })
class DummyComponent { }

describe('MenuComponent', () => {
  let fixture: ComponentFixture<MenuComponent>;
  let component: MenuComponent;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuComponent],
      providers: [
        provideRouter([
          { path: 'dashboard', component: DummyComponent }
        ])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    router = TestBed.inject(Router);
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

  it('should highlight active route', async () => {
    component.menus = [
      { label: 'Dashboard', icon: 'circle-gauge', route: '/dashboard' }
    ];

    await router.navigateByUrl('/dashboard');
    await fixture.whenStable();
    fixture.detectChanges();

    await fixture.whenStable(); // wait for the DOM to update async parts (e.g., @for, ng-template)
    fixture.detectChanges();

    const activeItem = fixture.nativeElement.querySelector('.active');
    expect(activeItem?.textContent?.trim()).toContain('Dashboard');
  });
});
