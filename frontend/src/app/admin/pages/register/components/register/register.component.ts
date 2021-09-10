import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  constructor(@Inject(DOCUMENT) private document: Document,
              private render: Renderer2) { }

  ngOnInit(): void {
    this.render.addClass(this.document.body, 'register-page');
  }

  ngOnDestroy() {
    this.render.removeClass(this.document.body, 'register-page');
  }

}
