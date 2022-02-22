import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';

/* Created venue interface */
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

/* Created recipe interface */

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

/* Created venue search response */

interface VenueSearchResponse {
  meta: {};
  response: {
    venues: Venue[];
    confident: boolean;
  };
} 

/*Created hit interface*/

interface Hit {
  recipe: Recipe;
}

/*Created recipe search response */

interface RecipeSearchResponse {
  count: number;
  from: number;
  hits: Hit[];
  more: boolean;
  q: string;
  to: number;
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
  recipeList = [];

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
      this._http.get('https://api.edamam.com/search?q=' + this.recipeValue + '&app_id=dd05e589' + '&app_key=d286e31aeaacced65a1f58827be986be').subscribe(({hits}: RecipeSearchResponse) => {
          this.recipeList = hits.map(hit => hit.recipe);
        });
    }

    if (this.placeValue != null && this.placeValue !== '' && this.recipeValue != null && this.recipeValue !== '') {
      this._http.get('https://api.foursquare.com/v2/venues/search/?' + '&client_id=3HYLOYYZJGSNFKSXGUJTRCP3AS1XSUMSGEEYCC12NSA5ZE4L'
            + '&client_secret=UNB54WUBXYT3IFZ3ZWJ2XBH04ULLTQLCGFEO5XIDGMGBCONS' + '&v=20180928&limit=10&&near=' + this.placeValue +'&v=20220202'+ 'a' +
            '' + this.recipeValue).
        subscribe(({response}: VenueSearchResponse) => {
          this.venueList = response.venues;
        });
    }
  }
}
