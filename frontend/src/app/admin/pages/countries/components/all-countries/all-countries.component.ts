import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DataTableDirective} from 'angular-datatables';
import {Admin} from '../../../admins/models/admin.model';
import {Subject, Subscription} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {setLoadSpinner} from '../../../../../store/shared/shared.actions';
import * as countriesActions from '../../store/countries.actions';
import * as countriesSelector from '../../store/countries.selector';
import {Countries} from '../../model/countries.model';
import {CountriesState} from '../../store/countries.reducer';

@Component({
  selector: 'app-all-countries',
  templateUrl: './all-countries.component.html',
  styleUrls: ['./all-countries.component.scss']
})
export class AllCountriesComponent implements OnInit, AfterViewInit, OnDestroy, AfterViewChecked {
  @ViewChild(DataTableDirective, {static: false}) datatableElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  countries: Countries[] = [];
  dtTrigger: Subject<any> = new Subject<any>();
  isDeleted = false;
  isDtInitialized = false;
  subscription: Subscription;

  constructor(private store: Store<CountriesState>,
              private chdec: ChangeDetectorRef) {}



  ngOnInit() {
    this.store.dispatch(setLoadSpinner({status: true}));
    this.store.dispatch(countriesActions.loadCountries());

    // Config the table options
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu : [5, 10, 25, 50],
      processing: true
    };

    // Dispatch User Error
    this.store.pipe(select(countriesSelector.getCountriesErrorSelector)).subscribe(
      data => console.log('error', data)
    );
  }

  ngAfterViewInit(): void {
    // Get all countries
    this.getCountries();
  }

  ngAfterViewChecked() {
    // console.log( "! changement de la date du composant !" );
    this.chdec.detectChanges();
  }

  // Get All Countries
  getCountries() {
    this.countries = [];
    // this.chdec.detectChanges();
    this.subscription = this.store.pipe(select(countriesSelector.getCountriesSelector)).subscribe(data => {
      if (data) {
        console.log(data);
        this.countries = data;
        if (this.isDtInitialized) {
          this.rerender();
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
      }
    });
  }


  // Delete custom country
  delete(countryID: string, flagUrl: string) {
    if (window.confirm('Are you sure to delete this item ?')) {
      this.store.dispatch(countriesActions.deleteCountry({id: countryID }));
      if (flagUrl) {
        this.store.dispatch(countriesActions.deleteCountryFlag({ flagUrl }));
      }
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
    // this.countries = [];
    this.subscription.unsubscribe();
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
