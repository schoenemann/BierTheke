import { Routes } from '@angular/router';
import { BierEvent } from './bier-event/bier-event';
import { BiergitComponent } from './biergit-component/biergit-component';
import { AcceptedOfferReceiver } from './bier-event/accepted-offer-receiver/accepted-offer-receiver';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: BierEvent,
    },
    {
        path: 'accepted/:answer',
        component: AcceptedOfferReceiver,
    },
    {
        path: 'biergit',
        component: BiergitComponent,
    }
];
