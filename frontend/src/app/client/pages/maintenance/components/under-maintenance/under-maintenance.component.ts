import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';

@Component({
  selector: 'app-under-maintenance',
  templateUrl: './under-maintenance.component.html',
  styleUrls: ['./under-maintenance.component.scss']
})
export class UnderMaintenanceComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    
  }

}
