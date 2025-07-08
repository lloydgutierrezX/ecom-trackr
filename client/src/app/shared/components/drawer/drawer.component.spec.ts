import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerComponent } from './drawer.component';
import { By } from '@angular/platform-browser';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';

@Component({ template: '' })
class DummyComponent { }

describe('DrawerComponent', () => {

  let component: DrawerComponent;
  let fixture: ComponentFixture<DrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerComponent],
      providers: [
        provideRouter([{ path: '', component: DummyComponent }]),
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit drawerStateChanged with true when checkbox is checked', () => {
    spyOn(component.drawerStateChanged, 'emit');

    fixture.detectChanges();

    const input = fixture.debugElement.query(
      // Assumes the checkbox has class 'drawer-toggle'
      // If not, update the selector accordingly
      By.css('input.drawer-toggle')
    )?.nativeElement as HTMLInputElement;
    expect(input).toBeTruthy();
    input.checked = true;
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.drawerStateChanged.emit).toHaveBeenCalledWith(true);
  });

  it('should close drawer and emit event on NavigationEnd', async () => {
    const router = TestBed.inject(Router);

    component.drawerToggle.nativeElement = document.createElement('input');
    component.drawerToggle.nativeElement.checked = true;

    const spy = spyOn(component, 'onDrawerChange');

    component.ngAfterViewInit();

    await router.navigateByUrl('/');
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.drawerToggle.nativeElement.checked).toBeFalse();
    expect(spy).toHaveBeenCalled();
  });
});
