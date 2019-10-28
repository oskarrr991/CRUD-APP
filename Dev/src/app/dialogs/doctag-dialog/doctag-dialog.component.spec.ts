import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctagDialogComponent } from './doctag-dialog.component';

describe('DoctagDialogComponent', () => {
  let component: DoctagDialogComponent;
  let fixture: ComponentFixture<DoctagDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctagDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctagDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
