import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OsszesSzavazasComponent } from './osszes-szavazas.component';

describe('OsszesSzavazasComponent', () => {
  let component: OsszesSzavazasComponent;
  let fixture: ComponentFixture<OsszesSzavazasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OsszesSzavazasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OsszesSzavazasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
