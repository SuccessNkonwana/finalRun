import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MorePopoverPage } from './more-popover.page';

describe('MorePopoverPage', () => {
  let component: MorePopoverPage;
  let fixture: ComponentFixture<MorePopoverPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MorePopoverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MorePopoverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
