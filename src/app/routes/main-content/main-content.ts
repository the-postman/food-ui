import {Component, Output, EventEmitter, OnInit} from "@angular/core";
import {FoodService} from "../../service/food.service";
import {Food} from "../../../assets/Food";

@Component({
  selector: 'main-content',
  templateUrl: './main-content.html',
  providers: [FoodService]
})
export class MainContentComponent implements OnInit {

  @Output() errorEmitter: EventEmitter<any> = new EventEmitter();

  foodService: FoodService;
  isError: boolean;
  showSearch: boolean;
  loading: boolean;
  description: string;
  foods: Array<Food>;

  constructor(foodService: FoodService) {
    this.foodService = foodService;
  }

  ngOnInit() {
    this.showSearch = false;
    this.isError = false;
    this.description = "";
    this.foods = [];
  }

  collectFood() {

    this.errorEmitter.emit('');
    this.isError = false;

    if (this.description.length == 0)
      this.errorEmitter.emit('You cannot search for everything right now');
    else
      this.collectAllFoodByDescription();

  }

  private collectAllFoodByDescription() {

    this.loading = true;

    this.foodService.getFoodByDescription(this.description).subscribe(
      data => {
        this.foods = data;
      },
      error => {
        this.isError = true;
        this.errorEmitter.emit('There was an error contacting the server. ' + error);
      },
      () => {
        this.loading = false;
        console.log('done --- collecting food')
      }
    )

  }

}
