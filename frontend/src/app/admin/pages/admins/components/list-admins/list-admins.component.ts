import { AfterContentChecked, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { interval, Observable, Subject, Subscription } from 'rxjs';
import { Admin } from '../../models/admin.model';
import * as adminActions from '../../store/admin.actions';
import * as adminSelector from '../../store/admin.selector';
import { DataTableDirective } from 'angular-datatables';
import {setLoadSpinner} from '../../../../../store/shared/shared.actions';
declare var $;


@Component({
  selector: 'app-list-admins',
  templateUrl: './list-admins.component.html',
  styleUrls: ['./list-admins.component.scss']
})
export class ListAdminsComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  @ViewChild(DataTableDirective, {static: false}) datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  admins: Admin[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  isDeleted = false;
  isDtInitialized = false;
  subscription: Subscription;

  constructor(private store: Store<Admin[]>,
              private chdec: ChangeDetectorRef) {}



  ngOnInit() {
    this.store.dispatch(setLoadSpinner({status: true}));
    this.store.dispatch(adminActions.loadAdmins());

    // Config the table options
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25, 50],
      processing: true,
    };

    // Dispatch User Error
    this.store.pipe(select(adminSelector.adminErrors)).subscribe(
      data => console.log('error', data)
    );
  }

  ngAfterViewInit(): void {
    // Get all admins
    this.getAdmins();
  }

  ngAfterViewChecked()
  {
    // console.log( "! changement de la date du composant !" );
    this.chdec.detectChanges();
  }

  // Get All Admins
  getAdmins() {
    this.admins = [];
    // this.chdec.detectChanges();
    this.subscription = this.store.pipe(select(adminSelector.adminsSelector)).subscribe(data => {
      if (data) {
        this.admins = data;
        if (this.isDtInitialized) {
            this.rerender();
          } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
      }
    });
  }


  // Delete custom admin
  delete(adminID: number) {
    if (window.confirm('Are you sure to delete this item ?')) {
      this.store.dispatch(adminActions.deleteAdmin({id: adminID}));
    }
  }

  rerender(): void {
    if (this.datatableElement) {
      this.datatableElement?.dtInstance?.then((dtInstance: DataTables.Api) => {
         dtInstance.destroy();
         this.dtTrigger.next();
        });
    }
  }

  ngOnDestroy(): void {
    // this.admins = [];
    this.subscription.unsubscribe();
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
