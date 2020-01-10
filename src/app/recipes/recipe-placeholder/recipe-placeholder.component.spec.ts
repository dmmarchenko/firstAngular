import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipePlaceholderComponent } from './recipe-placeholder.component';

describe('RecipePlaceholderComponent', () => {
  let component: RecipePlaceholderComponent;
  let fixture: ComponentFixture<RecipePlaceholderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipePlaceholderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipePlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
