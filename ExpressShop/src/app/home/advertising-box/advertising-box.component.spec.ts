import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingBoxComponent } from './advertising-box.component';

describe('AdvertisingBoxComponent', () => {
  let component: AdvertisingBoxComponent;
  let fixture: ComponentFixture<AdvertisingBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisingBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdvertisingBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
