import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, HostListener, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ManiMenuItems } from 'src/app/client/pages/main-menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [
    trigger('grow', [
      // Note the trigger name
      transition(':enter', [
        // :enter is alias to 'void => *'
        style({ height: '0', overflow: 'hidden' }),
        animate(500, style({ height: '*' }))
      ]),
      transition(':leave', [
        // :leave is alias to '* => void'
        animate(500, style({ height: 0, overflow: 'hidden' }))
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  @Input() header_main_menu: ManiMenuItems[];
  show = true;  // for div slide animation

  constructor(private render: Renderer2,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  // @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    const searchInputBox = this.document.querySelector('#search_input_box') as HTMLDivElement;
    if (document.documentElement.scrollTop > 45) {
      // check if search element is exists and not hide
      if (searchInputBox) {
        this.render.setStyle(searchInputBox, 'max-width', '100vw');
      }
      this.render.setStyle(this.document.querySelector('.header_area'), 'position', 'fixed');
      this.render.setStyle(this.document.querySelector('.main_box'), 'max-width', '100vw');
    } else {
      this.render.setStyle(this.document.querySelector('.header_area'), 'position', 'absolute');
      this.render.setStyle(this.document.querySelector('.main_box'), 'max-width', '1200px');
      // check if search element is exists and not hide
      if (searchInputBox) {
        this.render.setStyle(searchInputBox, 'max-width', '1200px');
      }
    }
  }

  // Make search input field is equal to the header width
  checkSearchWidth() {
    const headerWidth = this.document.querySelector('.main_box').clientWidth;
    this.render.setStyle(this.document.querySelector('#search_input_box'), 'max-width', headerWidth + 'px');
  }


}
