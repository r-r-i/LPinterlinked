import { Component } from '@angular/core';
import { ApexDataService } from '../../services/apex-data.service';
import { IPredatorCaps } from '../../types/predator-cap.model';
import { CommonModule, DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faPlaystation, faXbox } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-predator-cap',
  standalone: true,
  imports: [DatePipe, CommonModule, FontAwesomeModule],
  templateUrl: './predator-cap.component.html',
  styleUrl: './predator-cap.component.css'
})
export class PredatorCapComponent {   
  predatorData: IPredatorCaps;

  isPc: boolean = true;
  isXbox: boolean;
  isPlaystation: boolean;
  faDesktop = faDesktop;
  faPlaystation = faPlaystation;
  faXbox = faXbox;

  seasonEndDate = new Date("february 13, 2024 15:00:00").getTime();
  daysUntilSeasonEnd: number;
  countdown: any;

  constructor(private apexDataService: ApexDataService) {}

  ngOnInit(): void {
    this.initPredatorCap();
  } 

  x = setInterval(() => {
    var now = new Date().getTime();
    var distance = this.seasonEndDate - now;
    var days = Math.floor(distance / (1000*60*60*24));
    var hours = Math.floor((distance % (1000*60*60*24)) / (1000*60*60));
    // var minutes = Math.floor((distance % (1000*60*60)) / (1000*60));
    // var seconds = Math.floor((distance % (1000*60)) / 1000);

    this.daysUntilSeasonEnd = days;
    this.countdown = days + "D" + " " + hours + "H";
  })

  public inputIsPc() {
    this.isPc = true;
    this.isXbox = false;
    this.isPlaystation = false;

    console.log(this.isPc, this.isPlaystation, this.isXbox)
  }

  public inputIsXbox() {
    this.isPc = false;
    this.isXbox = true;
    this.isPlaystation = false;

    console.log(this.isPc, this.isPlaystation, this.isXbox)
  }

  public inputIsPlaystation() {
    this.isPc = false;
    this.isXbox = false;
    this.isPlaystation = true;
  }

  private initPredatorCap() {
    this.apexDataService
    .getPredatorCap()
    .subscribe((predatorCap: IPredatorCaps) => {
      this.predatorData = predatorCap;
      console.log(this.predatorData);
    });
  }

  


}
