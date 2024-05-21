import { Component, inject, Input, OnInit } from "@angular/core";
import { UntypedFormGroup, UntypedFormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { lastValueFrom } from "rxjs";

import { MovieService } from "../services/movie.service";
import { Movie } from "../models/movie.model";

@Component({
  selector: "app-add-movie",
  templateUrl: "./add-movie.component.html",
  styleUrls: ["./add-movie.component.scss"],
})
export class AddMovieComponent implements OnInit {
  private router = inject(Router);
  private movieService = inject(MovieService);

  @Input() movie?: Movie;

  movieForm = new UntypedFormGroup({
    name: new UntypedFormControl("", [Validators.required]),
    image: new UntypedFormControl("", [Validators.required]),
    genre: new UntypedFormControl("", [Validators.required]),
    releaseYear: new UntypedFormControl("", [Validators.required]),
  });

  errorMessage: string;
  recentlyAdded: Movie[] = [];

  constructor() {}

  ngOnInit() {
    if (this.movie) {
      this.movieForm.patchValue(this.movie);
    }
  }

  cancel() {
    this.router.navigate(['/']);
    // this.dialogRef.close();
  }

  saveMovie(single = true) {
    if (this.movieForm.valid) {
      lastValueFrom(this.movieService.addMovie(this.movieForm.value)).then((res: Movie) => {
        this.movieForm.reset();
        console.log(res);
        if (single) {
          this.router.navigate([`/movies/${res.id}`]);
        } else {
          this.recentlyAdded.push(res);
        }
      }).catch(() => {
        this.errorMessage = 'Something went wrong. Please try again';
      });
    }
  }

  saveAndAddAnother() {
    this.saveMovie(false);
  }
}
