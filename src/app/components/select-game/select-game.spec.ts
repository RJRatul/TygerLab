import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectGame } from './select-game';

describe('SelectGame', () => {
  let component: SelectGame;
  let fixture: ComponentFixture<SelectGame>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectGame]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectGame);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
