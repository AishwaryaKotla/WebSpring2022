import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

/* created interface for venue search */

interface VenueSearchResponse {
  meta: {};
  response: {
    venues: Venue[];
    confident: boolean;
  };
}

/* created interface for recipe search */

interface RecipeSearchResponse {
  count: number;
  from: number;
  hits: Hit[];
  more: boolean;
  q: string;
  to: number;
}
/* created interface to track hits*/

interface Hit {
  recipe: Recipe;
}
/* Venue interface */
interface Venue {
  id: string;
  name: string;
  location: {
    address: string;
    postalCode: string;
    city: string;
    state: string;
    country: string;
    formattedAddress: string[];
  };
  categories: {
    name: string;
  };
  referralId: string;
  hasPerk: boolean;
}
/* recipe interface */

interface Recipe {
  calories: number;
  dietLabels: string[];
  healthLabels: string[];
  image: string | null;
  ingredientLines: string[];
  ingredients: {
    image: string | null;
    text: string;
    weight: number;
  }[];
  label: string;
  source: string;
  totalTime: number;
  uri: string;
  url: string;
  yield: number;
}

@Component({
  selector: 'app-search-recipe',
  templateUrl: './search-recipe.component.html',
  styleUrls: ['./search-recipe.component.css']
})
export class SearchRecipeComponent implements OnInit {
  @ViewChild('recipe') recipes: ElementRef;
  @ViewChild('place') places: ElementRef;
  recipeValue: any;
  placeValue: any;
  venueList = [];
  recipeList: Recipe[];

  currentLat: any;
  currentLong: any;
  geolocationPosition: any;

  constructor(private _http: HttpClient) {
  }

  ngOnInit() {

    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.geolocationPosition = position;
        this.currentLat = position.coords.latitude;
        this.currentLong = position.coords.longitude;
      });
  }

  getVenues() {
    this.recipeValue = this.recipes.nativeElement.value;
    this.placeValue = this.places.nativeElement.value;
    if (this.recipeValue !== null) {
      
      this._http.get('https://api.edamam.com/search?q=' + this.recipeValue + '&app_id=24992616'
        + '&app_key=b4d0a13f03a7ec38495042d62b9bf55a')
          .subscribe(({hits}: RecipeSearchResponse) => {
            this.recipeList = hits.map(hit => hit.recipe);
          });
    }
    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null) {
      if (this.recipeValue !== '') {
        
        this._http.get('https://api.foursquare.com/v2/venues/search?client_id=5CKU3C4ADVKGOMYCXBZTOY2QTEXXISPNUGFQYRZGOLS4X4AV' + '&client_secret=QAHNC1HSI1VFLK5ULDPOGXBLEB5RQCCYYODNZDCZG1DXF10W&v=20180323&limit=10&near=' + this.placeValue + '&query=' + this.recipeValue).
        subscribe(({response}: VenueSearchResponse) => {
          this.venueList = response.venues;
        });
      }
    }
  }

}