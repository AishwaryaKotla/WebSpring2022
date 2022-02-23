import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
interface VenueSearchResponse {
  meta: {};
  response: {
    venues: Venue[];
    confident: boolean;
  };
}
interface RecipeSearchResponse {
  count: number;
  from: number;
  hits: Hit[];
  more: boolean;
  q: string;
  to: number;
}
interface Hit {
  recipe: Recipe;
}
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
      /**
       * Write code to get recipe
       */
      this._http.get('https://api.edamam.com/search?q=' + this.recipeValue + '&app_id=db9927b6'
        + '&app_key=d08fbd177d03c50acff5e26581f28a75')
          .subscribe(({hits}: RecipeSearchResponse) => {
            this.recipeList = hits.map(hit => hit.recipe);
          });
    }
    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null) {
      if (this.recipeValue !== '') {
        /**
         * Write code to get place
         */
        // tslint:disable-next-line:max-line-length
        this._http.get('https://api.foursquare.com/v2/venues/search?client_id=HVNZDHZ3Y2FFR0ZSADDZBP3N30YEA1DZQYOGG35VCUCBUOT4' + '&client_secret=1QTPX3WSGSUFTO0VAGMNEYEJFPDFQO15RGJ3C5RINYJZATWH&v=20180323&limit=10&near=' + this.placeValue + '&query=' + this.recipeValue).
        subscribe(({response}: VenueSearchResponse) => {
          this.venueList = response.venues;
        });
      }
    }
  }

}