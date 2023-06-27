import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authentication/auth.guard';

import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { BookListComponent } from './books/book-list/book-list.component';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookCreateComponent } from './books/book-create/book-create.component';
import { AuthorListComponent } from './authors/author-list/author-list.component';
import { AuthorCreateComponent } from './authors/author-create/author-create.component';
import { GenreListComponent } from './genres/genre-list/genre-list.component';
import { GenreCreateComponent } from './genres/genre-create/genre-create.component';

const routes: Routes = [
  { 
    path: '', 
    canActivate: [AuthGuard], 
    children: [
      { path: '', redirectTo: '/books', pathMatch: 'full' },
      { path: 'books', component: BookListComponent },
      { path: 'books/create', component: BookCreateComponent},
      { path: 'books/edit/:id', component: BookCreateComponent }, 
      { path: 'books/:id', component: BookDetailComponent },
      { path: 'authors', component: AuthorListComponent },
      { path: 'authors/create', component: AuthorCreateComponent },
      { path: 'authors/edit/:id', component: AuthorCreateComponent },
      { path: 'genres', component: GenreListComponent },
      { path: 'genres/create', component: GenreCreateComponent},
      { path: 'genres/edit/:id', component: GenreCreateComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/login' }, // Catch any unspecified routes and redirect to login
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
