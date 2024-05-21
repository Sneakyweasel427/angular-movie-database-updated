import { Component, OnInit, Input, inject, ViewChild, TemplateRef } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { lastValueFrom } from "rxjs";

import { Movie } from '../models/movie.model';
import { MovieService } from "../services/movie.service";
import { DialogComponent } from "../../shared/dialog/dialog.component";

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  movieService = inject(MovieService);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  dialog = inject(MatDialog);
  @ViewChild('editForm') editForm: TemplateRef<any>;
  @Input() movie: Movie;

  constructor() { }

  ngOnInit() {
  }

  openConfirmationDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      autoFocus: false,
      panelClass: ['dialog-size-medium', 'full-width-content'],
      data: {
        header: 'Remove from library',
        content: `Are you sure you want to remove ${this.movie.name} from your library?`,
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
              this.removeMovie();
            }
          }
        ],
        disableCloseBtn: false
      }
    });

    lastValueFrom(dialogRef.afterClosed()).then((result: boolean) => {
      if (result) {
        this.removeMovie();
      }
    });
  }

  removeMovie() {
    let success = true;
    lastValueFrom(this.movieService.removeMovie(this.movie.id)).catch(() => {
      success = false;
      this.snackBar.open(
        'There was an error removing this movie from your library. Please try again later.',
        null,
        { duration: 7000, panelClass: ['bg-danger', 'text-white'] }
      );
      return;
    }).finally(() => {
      if (success) {
        this.snackBar.open(
          `${this.movie.name} has been removed from your library.`,
          null,
          { duration: 5000, panelClass: ['bg-success', 'text-white'] }
        );
        setInterval(() => {
          this.router.navigate(['/']);
        }, 3000);
      }
    });
  }

  onEditMovie() {
    const dialogRef = this.dialog.open(DialogComponent, {
      disableClose: true,
      autoFocus: false,
      panelClass: ['dialog-size-medium', 'full-width-content'],
      data: {
        header: 'Edit Movie Details',
        content: this.editForm,
        // buttons: [
        //   {
        //     text: 'Cancel',
        //     role: 'cancel',
        //     cssClass: 'bg-primary-100'
        //   },
        //   {
        //     text: 'Remove',
        //     color: 'accent',
        //     handler: () => {
        //       this.removeMovie();
        //     }
        //   }
        // ],
        disableCloseBtn: false
      }
    });
  }

}
