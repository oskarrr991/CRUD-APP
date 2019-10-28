import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctagsComponent } from './doctags.component';

describe('DoctagsComponent', () => {
  let component: DoctagsComponent;
  let fixture: ComponentFixture<DoctagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
