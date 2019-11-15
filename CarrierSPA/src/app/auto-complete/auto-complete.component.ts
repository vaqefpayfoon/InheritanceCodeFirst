import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer'
import { CityService } from '../_services/city.service';
import { City } from '../_models/city';
import { map } from 'rxjs/operators/map'
import { of } from 'rxjs'
import { DropDown, AutoComplete } from '../_models/dropDown';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css']
})
export class AutoCompleteComponent implements OnInit, AfterViewChecked {

  cities: City[];
  citiesName: string[];
  names: string[];
  ngOnInit() {
    setTimeout(() => {
      this.dataService = this.completerService.local(this.searchData2, 'name', 'name');
      console.log('data source assigned');
      this.names = this.searchData2.map(x => x.name);
    }, 1200);
  }

  protected searchStr: string;
  protected captain: string;
  protected dataService: CompleterData;
  protected searchData = [
    { color: 'red', value: '#f00' },
    { color: 'green', value: '#0f0' },
    { color: 'blue', value: '#00f' },
    { color: 'cyan', value: '#0ff' },
    { color: 'magenta', value: '#f0f' },
    { color: 'yellow', value: '#ff0' },
    { color: 'black', value: '#000' }
  ];
  protected searchData2: AutoComplete[];
  protected captains = ['James T. Kirk', 'Benjamin Sisko', 'Jean-Luc Picard', 'Spock', 'Jonathan Archer',
   'Hikaru Sulu', 'Christopher Pike', 'Rachel Garrett' ];

  constructor(private completerService: CompleterService, private cityService: CityService) {
    //this.dataService = completerService.local(this.searchData, 'color', 'color');
    this.cityService.getCitiesName().subscribe((city: string[]) => {
      console.log(city);
      this.citiesName = city
    }, (error) => {
      console.log(error);
    });
    //var myJsonString = JSON.stringify(this.cities);
    // this.cityService.getCities().subscribe((city: City[]) => {
    //   this.cities = city
    // });
    this.cityService.getCitiesAutoComplete().subscribe((city: AutoComplete[]) => {
      console.log(city);
      this.searchData2 = city
    }, (error) => {
      console.log(error);
    });
  }
  ngAfterViewChecked() {

  }
  data12:any;
  bring() {
    // for (let entry of this.cities) {
    //   let data: AutoComplete = {name: entry.cityName, id: entry.id}
    //   this.searchData2.push(data);
    // }


    // this.dataService = this.completerService.local(this.searchData2, 'cityName', 'id');

  }
}
