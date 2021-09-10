import {
  AfterContentChecked,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { UserState } from '../../store/user.reducer';
import * as userAction from '../../store/user.actions';
import * as userSelector from '../../store/user.selector';
import { Observable, Subject, Subscription } from 'rxjs';
import { User } from '../../model/user.model';
import { DataTableDirective } from 'angular-datatables';
import { ToastrService } from 'ngx-toastr';
import {NavigationEnd, Router} from '@angular/router';
import {UsersService} from '../../services/users.service';
declare var $;

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  @ViewChild(DataTableDirective, {static: false}) datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  users: User[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  error$: Observable<any>;
  isDeleted = false;
  isDtInitialized = false;
  usersSubscription: Subscription;

  constructor(private store: Store<UserState>,
              private chdec: ChangeDetectorRef) { }

  ngOnInit(): void {
    // dispatch action
    this.store.dispatch(userAction.loadUsers());
    // Config the table options
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 25],
      responsive: true
    };

    // Dispatch User Error
    this.store.pipe(select(userSelector.getUserError)).subscribe(
      data => console.log('error', data)
    );
  }

  // Get ALL Users
  getUsers() {
    this.users = [];
    this.usersSubscription = this.store.pipe(select(userSelector.allUsersSelector)).subscribe(
      data => {
        this.users = data;
        console.log(data);
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
    // Get all admins
    this.getUsers();
  }

  ngAfterViewChecked() {
    this.chdec.detectChanges();
  }

  // Approve New User
  approve(id: number, approve: boolean) {
    const approved = approve ? 0 : 1;
    const data = {id, approve: approved};
    this.store.dispatch(userAction.approveUser(data));
  }

  delete(userId: number) {
    if (window.confirm('Are you sure to delete this item ?')) {
      this.store.dispatch(userAction.deleteUser({id: userId}));
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
    this.usersSubscription.unsubscribe();
    this.dtTrigger.unsubscribe();
  }

}
