import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[

    trigger('movies', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
            style({opacity: 1, transform: 'translateY(0)', offset: 1}),

          ]))]),{optional: true}),

      
            query(':leave', stagger('300ms', [
            animate('.6s ease-in', keyframes([
              style({opacity: 1, transform: 'translateY(0)', offset: 0}),
              style({opacity: .5, transform: 'translateY(35px)', offset: .3}),
              style({opacity: 0, transform: 'translateY(-75%)', offset: 1}),
  
            ]))]),{optional: true}),
      ])
    ])

  ]
})
export class HomeComponent implements OnInit {

  itemCount: number;
  btnText: string = `Agregar pelicula`;
  

  nameText: string = ``;
  genderText: string = ``;
  release_yearText: string = ``;
  commentText: string = ``;


  movies = [];
  
  constructor(private _data: DataService) { }

  ngOnInit() {
    

    this._data.movie.subscribe(res=> this.movies = res);
    this._data.changeMovies(this.movies);

    this._data.getMovies()
     .subscribe((data: any) => {
      //alert(JSON.stringify(data.users));

      this.movies = data.users;
      this._data.changeMovies(this.movies);

    });setTimeout(() => {
      this.itemCount = this.movies.length;
    }, 2100);


  } 


  addItem(){

   
      var payload = {
        name : this.nameText,
        gender : this.genderText,
        release_year: this.release_yearText,
        comment: this.commentText
      }
  
  
      this._data.postMovie(payload)
      .subscribe((data: any) => {
     
        this.movies.push(payload);
   
        this.nameText ='';
        this.genderText ='';
        this.release_yearText ='';
        this.commentText ='';

        this.itemCount=this.movies.length;
        this._data.changeMovies(this.movies);
  
     });
     setTimeout(() => {
       alert(`¡La pelicula ${this.nameText} fue publicada con exito!`);
    }, 2500);
    
  }


  removeItem(i){
    this.movies.splice(i,  1); 
    this._data.changeMovies(this.movies); 
     
  } 

}