import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { PredatorCapComponent } from './app/shared/components/predator-cap/predator-cap.component';

bootstrapApplication(PredatorCapComponent, appConfig)
  .catch((err) => console.error(err));
