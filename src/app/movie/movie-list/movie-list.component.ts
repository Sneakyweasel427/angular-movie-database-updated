import { Component, inject, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { lastValueFrom } from "rxjs";

import { Movie } from "../models/movie.model";
import { MovieService } from "../services/movie.service";
import { DialogComponent } from "../../shared/dialog/dialog.component";

@Component({
  selector: "app-movie-list",
  templateUrl: "./movie-list.component.html",
  styleUrls: ["./movie-list.component.scss"]
})
export class MovieListComponent implements OnInit {
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  movies: Movie[];
  loading = true;

  sortOption = 'name';

  // inject movie & navbar services
  constructor(
    private movieService: MovieService
  ) {}

  ngOnInit() {
    this.getMovies();
  }

  openConfirmationDialog(movie: Movie) {
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      autoFocus: false,
      panelClass: ['dialog-size-medium', 'full-width-content'],
      data: {
        header: 'Remove from library',
        content: `Are you sure you want to remove ${movie.name} from your library?`,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'bg-primary-100'
          },
          {
            text: 'Remove',
            color: 'accent',
            handler: () => {
              dialogRef.close(true);
            }
          }
        ],
        disableCloseBtn: false
      }
    });

    lastValueFrom(dialogRef.afterClosed()).then((result: boolean) => {
      if (result) {
        this.removeMovie(movie);
      }
    });
  }

  removeMovie(movie: Movie) {
    let success = true;
    lastValueFrom(this.movieService.removeMovie(movie.id)).then(() => {
    }).catch(() => {
      success = false;
      this.snackBar.open(
        'There was an error removing this movie from your library. Please try again later.',
        null,
        { duration: 7000, panelClass: ['bg-danger', 'text-white'] }
      );
      return;
    }).finally(() => {
      if (success) {
        this.getMovies();
        this.snackBar.open(
          `${movie.name} has been removed from your library.`,
          null,
          { duration: 5000, panelClass: ['bg-success', 'text-white'] }
        );
      }
    });
  }

  getMovies() {
    this.loading = true;
    lastValueFrom(this.movieService.getMoviesFromHttp()).then((movies: Movie[]) => {
      this.movies = movies;
    }).catch(() => {
      console.log('error loading movies');
    }).finally(() => {
      setInterval(() => this.loading = false, 1000);
    });
  }
}
