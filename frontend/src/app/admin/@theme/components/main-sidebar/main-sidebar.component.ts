import { DatePipe, DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { PRIMARY_OUTLET } from '@angular/router';
import { SidebarMenuItems } from 'src/app/admin/pages/sidebar-menu';

@Component({
  selector: 'app-main-sidebar',
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss'],
})
export class MainSidebarComponent implements OnInit {
  @Input() sidebar_menu : SidebarMenuItems[];


  constructor() { }

  ngOnInit(): void {
  }

}
