import { Component } from '@angular/core';
import { ApexDataService } from '../../services/apex-data.service';
import { IPredatorCaps } from '../../types/predator-cap.model';

@Component({
  selector: 'app-predator-cap',
  standalone: true,
  imports: [],
  templateUrl: './predator-cap.component.html',
  styleUrl: './predator-cap.component.css'
})
export class PredatorCapComponent { 
  predatorData: IPredatorCaps;

  constructor(private apexDataService: ApexDataService) {}

  ngOnInit(): void {
    this.initPredatorCap();
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
