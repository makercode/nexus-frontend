import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticsAndPrivacyComponent } from './politics-and-privacy.component';

describe('PoliticsAndPrivacyComponent', () => {
  let component: PoliticsAndPrivacyComponent;
  let fixture: ComponentFixture<PoliticsAndPrivacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticsAndPrivacyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticsAndPrivacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
