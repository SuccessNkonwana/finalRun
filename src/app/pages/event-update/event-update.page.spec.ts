import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EventUpdatePage } from './event-update.page';

describe('EventUpdatePage', () => {
  let component: EventUpdatePage;
  let fixture: ComponentFixture<EventUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EventUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
