import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnouncementFilterComponent } from './announcement-filter.component';

describe('AnnouncementFilterComponent', () => {
  let component: AnnouncementFilterComponent;
  let fixture: ComponentFixture<AnnouncementFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnouncementFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnouncementFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
