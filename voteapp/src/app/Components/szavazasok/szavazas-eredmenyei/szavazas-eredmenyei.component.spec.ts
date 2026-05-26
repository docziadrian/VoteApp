import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SzavazasEredmenyeiComponent } from './szavazas-eredmenyei.component';

describe('SzavazasEredmenyeiComponent', () => {
  let component: SzavazasEredmenyeiComponent;
  let fixture: ComponentFixture<SzavazasEredmenyeiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SzavazasEredmenyeiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SzavazasEredmenyeiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
