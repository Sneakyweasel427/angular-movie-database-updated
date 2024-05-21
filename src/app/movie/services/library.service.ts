import { Injectable } from '@angular/core';
import {Movie} from "../models/movie.model";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LibraryService {
  movieLibrary: BehaviorSubject<Movie[] | null> = new BehaviorSubject(null);
  constructor() { }


}
