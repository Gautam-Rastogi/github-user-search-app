import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { GithubSearchComponent } from './app/github-search/github-search.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', component: GithubSearchComponent }
];

bootstrapApplication(AppComponent, 
  {
    providers: [
      provideHttpClient(),
      provideAnimations(),
      provideRouter(routes),
      importProvidersFrom(ReactiveFormsModule)
    ]
  }
)
