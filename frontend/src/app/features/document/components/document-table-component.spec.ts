import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DocumentTableComponent } from './document-table-component';

describe('DocumentTableComponent', () => {
  let component: DocumentTableComponent;
  let fixture: ComponentFixture<DocumentTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentTableComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
