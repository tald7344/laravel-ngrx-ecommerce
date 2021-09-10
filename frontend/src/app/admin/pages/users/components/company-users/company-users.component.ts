import {AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { DataTableDirective } from 'angular-datatables';
import { Observable, Subject, Subscription } from 'rxjs';
import { UserState } from '../../store/user.reducer';
import * as userAction from '../../store/user.actions';
import * as userSelector from '../../store/user.selector';
import { User } from '../../model/user.model';
import {allCompanyUsersSelector} from '../../store/user.selector';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-company-users',
  templateUrl: './company-users.component.html',
  styleUrls: ['./company-users.component.scss']
})
export class CompanyUsersComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild(DataTableDirective, {static: false}) datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  companyUsers: User[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  error$: Observable<any>;
  isDeleted = false;
  isDtInitialized = false;
  companyUsersSubscription: Subscription;

  constructor(private store: Store<UserState>,
              private router: Router,
              private chdec: ChangeDetectorRef) { }

  ngOnInit(): void {  
    // dispatch action
    this.store.dispatch(userAction.loadUsers());
    // Config the table options
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      processing: true
    };

    // Dispatch User Error
    this.store.pipe(select(userSelector.getUserError)).subscribe(
      data => console.log('error', data)
    );
  }

  // Get ALL Users
  getCompanyUsers() {
    this.companyUsers = [];
    this.companyUsersSubscription = this.store.select(userSelector.allCompanyUsersSelector).subscribe(
      data => {
        this.companyUsers = data;
        console.log('data', data);
        if (this.isDtInitialized) {
          this.rerender();
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
      }
    );
  }


  ngAfterViewInit(): void {
    this.getCompanyUsers();
  }

  ngAfterViewChecked() {
    // console.log( "! changement de la date du composant !" );
    this.chdec.detectChanges();
  }


  // Approve New User
  // approve(id: number, approve: boolean) {
  //   const approved = approve ? 0 : 1;
  //   const data = {id, approve: approved};
  //   this.store.dispatch(userAction.approveUser(data));
  // }

  delete(userId: number) {
    if (window.confirm('Are you sure to delete this item ?')) {
      this.store.dispatch(userAction.deleteUser({id: userId}));
      // activate delete button
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
    this.companyUsersSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

}
