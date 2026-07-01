import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accepted-offer-receiver',
  imports: [],
  templateUrl: './accepted-offer-receiver.html',
  styleUrl: './accepted-offer-receiver.scss',
})
export class AcceptedOfferReceiver {
  readonly activeRoute = inject(ActivatedRoute);

  ngOnInit() {
    if (this.activeRoute.snapshot.paramMap.has('answer')) {
      console.log('Answer string found in route parameters, processing answer...');
      const answerstring = this.activeRoute.snapshot.paramMap.get('answer');

      const channel = new BroadcastChannel('answer');
      const timeoutId = setTimeout(() => {
        console.warn('No answer received within timeout period, closing BroadcastChannel');
        channel.close();
      }, 60000); // 1 minute timeout
      channel.onmessage = (event) => {
        console.log('Acknowledgment received from BroadcastChannel:', event.data);
        channel.close();
        clearTimeout(timeoutId);
      }
      
      channel.postMessage(answerstring);
    } else {
      console.warn('No answer string found in route parameters');
    }
  }
}
