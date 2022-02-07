import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WysiwygMenuComponent } from './wysiwyg-menu.component';

describe('WysiwygMenuComponent', () => {
  let component: WysiwygMenuComponent;
  let fixture: ComponentFixture<WysiwygMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WysiwygMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WysiwygMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
