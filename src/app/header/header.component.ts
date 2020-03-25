import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Subscription } from 'rxjs';
import { AppState } from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Logout } from '../auth/store/auth.actions';
import { FetchRecipes } from '../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated = false;
  private userSub: Subscription;

  constructor(private dataStorageService: DataStorageService, private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.userSub = this.store.select('auth')
      .pipe(map(state => state.user))
      .subscribe(newUser => {
        this.isAuthenticated = !!newUser;
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new Logout());
  }
}

