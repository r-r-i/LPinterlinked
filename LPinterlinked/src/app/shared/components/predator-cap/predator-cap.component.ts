import { Component } from '@angular/core';
import { ApexDataService } from '../../services/apex-data.service';
import { IPredatorCaps } from '../../types/predator-cap.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-predator-cap',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './predator-cap.component.html',
  styleUrl: './predator-cap.component.css'
})
export class PredatorCapComponent {   
  predatorData: IPredatorCaps;
  testData: IPredatorCaps;

  seasonEndDate = new Date("february 13, 2024 15:00:00").getTime();
  countdown: any;
  daysLeft: number;

  constructor(private apexDataService: ApexDataService) {}

  ngOnInit(): void {
    this.initPredatorCap();
  } 

  x = setInterval(() => {
    var now = new Date().getTime();
    var distance = this.seasonEndDate - now;
    var days = Math.floor(distance / (1000*60*60*24));
    this.daysLeft = days;
    var hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    // var minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    // var seconds = Math.floor((distance % (1000*60)) / 1000);

    this.countdown = days + "D" + hours + "H";
  })

  private initPredatorCap() {
    this.apexDataService
    .getPredatorCap()
    .subscribe((predatorCap: IPredatorCaps) => {
      this.predatorData = predatorCap;
      console.log(this.predatorData);
    });
  }
}
