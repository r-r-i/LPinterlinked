// Components
import { Component } from '@angular/core';
// Services
import { ApexDataService } from '../../services/apex-data.service';
// Modules
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule, DatePipe } from '@angular/common';
// Models
import { IPredatorCaps } from '../../types/predator-cap.model';
// Icons
import { faDesktop } from '@fortawesome/free-solid-svg-icons';
import { faPlaystation, faXbox, faDiscord, faTwitter } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-predator-cap',
  standalone: true,
  imports: [
    DatePipe, 
    CommonModule, 
    FontAwesomeModule, 
    FormsModule,
  ],
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
  
  // Icons
  faDesktop = faDesktop;
  faPlaystation = faPlaystation;
  faXbox = faXbox;
  faDiscord = faDiscord;
  faTwitter = faTwitter;

  // End of season variables
  seasonEndDate = new Date("april 2, 2024 05:30:00").getTime();
  daysUntilSeasonEnd: number;
  seasonLengthInDays: number = 105;
  countdown: any;

  // Predicted end LP variables
  pcPredictedEndLp: number;
  xboxPredictedEndLp: number;
  playstationPredictedEndLp: number;

  // User's LP variables
  userLpRequiredTotal: number;
  userLpRequiredPerDay: number;
  userIsSafe: boolean;

  constructor(private apexDataService: ApexDataService) { }

  ngOnInit(): void {
    this.initPredatorCap();
  }

  // Reset form input and user summary on selected input change
  private clearForm() {
    (<HTMLFormElement>document.getElementById("userLpForm")).reset();
    this.userLpRequiredTotal = NaN;
  }

  // Timer countdown to season end date
  x = setInterval(() => {
    var now = new Date().getTime();
    var distance = this.seasonEndDate - now;
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    this.daysUntilSeasonEnd = days;
    this.countdown = days + "D" + " " + hours + "H";
  })

  // Change data shown based on user's selected input
  public inputChange(input: number) {
    this.clearForm();
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

  // Initialise User's current LP
  public initUserLp() {
    this.userIsSafe = false;
    let currentUserLp = parseFloat((<HTMLInputElement>document.getElementById("userLpValue")).value);
    if (this.isPc === true) {
      if (currentUserLp > this.pcPredictedEndLp) {
        this.userIsSafe = true;
      }
      this.userLpRequiredTotal = this.pcPredictedEndLp - currentUserLp;
      this.userLpRequiredPerDay = this.userLpRequiredTotal / this.daysUntilSeasonEnd;
    }
    else if (this.isPlaystation === true) {
      if (currentUserLp > this.playstationPredictedEndLp) {
        this.userIsSafe = true;
      }
      this.userLpRequiredTotal = this.playstationPredictedEndLp - currentUserLp;
      this.userLpRequiredPerDay = this.userLpRequiredTotal / this.daysUntilSeasonEnd;
    }
    else if (this.isXbox === true) {
      if (currentUserLp > this.xboxPredictedEndLp) {
        this.userIsSafe = true;
      }
      this.userLpRequiredTotal = this.xboxPredictedEndLp - currentUserLp;
      this.userLpRequiredPerDay = this.userLpRequiredTotal / this.daysUntilSeasonEnd;
    }
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
