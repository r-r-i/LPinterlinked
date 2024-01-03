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
  // API data variables 
  predatorData: IPredatorCaps;

  // Input variables
  isPc: boolean = true;
  isPlaystation: boolean;
  isXbox: boolean;
  faDesktop = faDesktop;
  faPlaystation = faPlaystation;
  faXbox = faXbox;

  // End of season variables
  seasonEndDate = new Date("february 13, 2024 15:00:00").getTime();
  daysUntilSeasonEnd: number;
  seasonLengthInDays: number = 105;
  countdown: any;

  // Predicted end LP variables
  pcPredictedEndLp: number;
  xboxPredictedEndLp: number;
  playstationPredictedEndLp: number;

  // TODO: User's LP
  userLp: number;
  userRequiredLp: number;

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

  public inputChange(input: number) {
    if (input === 1) {
      this.isPc = true;
      this.isXbox = false;
      this.isPlaystation = false;
    } else if (input === 2) {
      this.isPc = false;
      this.isXbox = false;
      this.isPlaystation = true;
    } else if (input === 3) {
      this.isPc = false;
      this.isXbox = true;
      this.isPlaystation = false;
    }
  }

  // Initialise predicted end cap variables
  private initPredictedPc(predatorData: IPredatorCaps) {
    var daysPast = this.seasonLengthInDays - this.daysUntilSeasonEnd;
    var averageLpIncreasePerDay = predatorData.RP.PC.val / daysPast;
    this.pcPredictedEndLp = averageLpIncreasePerDay * this.seasonLengthInDays;
  }

  private initPredictedPlaystation(predatorData: IPredatorCaps) {
    var daysPast = this.seasonLengthInDays - this.daysUntilSeasonEnd;
    var averageLpIncreasePerDay = predatorData.RP.PS4.val / daysPast;
    this.playstationPredictedEndLp = averageLpIncreasePerDay * this.seasonLengthInDays;
  }

  private initPredictedXbox(predatorData: IPredatorCaps) {
    var daysPast = this.seasonLengthInDays - this.daysUntilSeasonEnd;
    var averageLpIncreasePerDay = predatorData.RP.X1.val / daysPast;
    this.xboxPredictedEndLp = averageLpIncreasePerDay * this.seasonLengthInDays;
  }

  private initPredatorCap() {
    this.apexDataService
    .getPredatorCap()
    .subscribe((predatorCap: IPredatorCaps) => {
      this.predatorData = predatorCap;
      console.log(this.predatorData);
      this.initPredictedPc(this.predatorData);
      this.initPredictedPlaystation(this.predatorData);
      this.initPredictedXbox(this.predatorData);
    });
  }

  


}
