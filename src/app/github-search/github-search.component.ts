import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-github-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './github-search.component.html',
  styleUrl: './github-search.component.scss'
})
export class GithubSearchComponent implements OnInit {
  searchControl = new FormControl('');
  userData: any = null;
  errorMsg: string | null = null;
  loading = false;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      filter((username): username is string => username !== null && username.trim() !== ''),
      switchMap((username: string) => {
        if (!username) return of(null);
        this.loading = true;
        this.errorMsg = null;
        return this.http.get(`https://api.github.com/users/${username}`).pipe(
          catchError(err => {
            this.errorMsg = 'User not found';
            return of(null);
          })
        );
      })
    ).subscribe(data => {
      this.loading = false;
      this.userData = data;
    });
  }
}
