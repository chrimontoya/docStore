import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaperComponent } from './paper-component';

describe('PaperComponent', () => {
  let component: PaperComponent;
  let fixture: ComponentFixture<PaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PaperComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
