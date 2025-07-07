import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsComponent } from './icons.component';

describe('IconsComponent', () => {
  let component: IconsComponent;
  let fixture: ComponentFixture<IconsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle unknown icon name gracefully', () => {
    component.name = 'non-existent-icon';
    fixture.detectChanges();

    const iconElement = fixture.nativeElement.querySelector('svg');
    expect(iconElement).toBeNull(); // or test for fallback element
  });
});
