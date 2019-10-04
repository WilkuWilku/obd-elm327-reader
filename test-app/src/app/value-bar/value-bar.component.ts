import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'ns-value-bar',
  templateUrl: './value-bar.component.html',
  styleUrls: ['./value-bar.component.scss']
})
export class ValueBarComponent implements OnInit, OnChanges {

  columns: string;
  scaleDivisorsArray: Array<void>;
  scaleColumns = "*";

  @Input()
  value: number = 0;

  @Input()
  maxValue: number = 100;

  @Input()
  scaleDivisors: number = 2;

  constructor() { }

  ngOnInit() {
    this.scaleDivisorsArray = [];
    for(let i=0; i<this.scaleDivisors; i++)
      this.scaleDivisorsArray.push(undefined);
    this.scaleDivisorsArray.slice(0, this.scaleDivisorsArray.length-1).forEach(v => this.scaleColumns+=",*");
  }

  ngOnChanges(changes: SimpleChanges): void {
    let percent = Math.floor(this.value/this.maxValue*100);
    this.columns = percent + "*, " + (100 - percent) + "*";
  }

  getDivisorValue(index: number){
    let value = Math.ceil(this.maxValue/this.scaleDivisors)*index;
    return value > 0 ? value : "";
  }

  getColorClass(){
    let cls = "bar-color-normal";
    if(this.value > 6000){
      cls = "bar-color-6k";
    } else if(this.value > 5000){
      cls = "bar-color-5k";
    } else if(this.value > 4000){
      cls = "bar-color-4k";
    } else if(this.value > 3000){
      cls = "bar-color-3k";
    } else if(this.value > 2000){
      cls = "bar-color-2k";
    } else if(this.value > 1000){
      cls = "bar-color-1k";
    }
    return cls;
  }
}


