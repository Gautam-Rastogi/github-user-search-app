import { Component } from '@angular/core';
import { GithubSearchComponent } from "./github-search/github-search.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [GithubSearchComponent],
  template:  `
  <h1>GitHub User Search</h1>
  <app-github-search></app-github-search> <!-- ✅ use here -->`,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'github-user-search-standalone';
}
