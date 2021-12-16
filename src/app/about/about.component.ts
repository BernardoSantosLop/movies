import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  movies: any;

  constructor(private route:ActivatedRoute,private router: Router, private _data: DataService) { 
    this.route.params.subscribe(res => console.log(res.id))
  }

  ngOnInit(){
    this._data.movie.subscribe(res => this.movies = res);
  }

  sendMeHome(){
    this.router.navigate([''])
  }

}