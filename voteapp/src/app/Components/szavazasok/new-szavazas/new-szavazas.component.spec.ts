import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSzavazasComponent } from './new-szavazas.component';

describe('NewSzavazasComponent', () => {
  let component: NewSzavazasComponent;
  let fixture: ComponentFixture<NewSzavazasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSzavazasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSzavazasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
