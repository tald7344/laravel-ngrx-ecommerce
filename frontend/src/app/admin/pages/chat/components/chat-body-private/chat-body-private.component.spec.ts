import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatBodyPrivateComponent } from './chat-body-private.component';

describe('ChatBodyPrivateComponent', () => {
  let component: ChatBodyPrivateComponent;
  let fixture: ComponentFixture<ChatBodyPrivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatBodyPrivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatBodyPrivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
