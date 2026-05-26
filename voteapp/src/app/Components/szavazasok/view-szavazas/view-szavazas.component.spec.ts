import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSzavazasComponent } from './view-szavazas.component';

describe('ViewSzavazasComponent', () => {
  let component: ViewSzavazasComponent;
  let fixture: ComponentFixture<ViewSzavazasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSzavazasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSzavazasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
