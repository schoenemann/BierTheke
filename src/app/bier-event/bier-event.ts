import { Component, OnInit, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-bier-event',
  imports: [],
  templateUrl: './bier-event.html',
  styleUrl: './bier-event.scss',
})
export class BierEvent implements OnInit {
  readonly connection = new RTCPeerConnection();
  offerString: WritableSignal<string|undefined> = signal(undefined);

  ngOnInit() {
    console.log('BierEvent initialized');

    this.createOffer();
  }

  protected createOffer() {
    const channel = this.connection.createDataChannel('bier-channel');
    this.setupChannelEvents(channel);

    this.connection.createOffer().then(offer => {
      this.connection.setLocalDescription(offer);
      const offerstring = JSON.stringify(offer);
      this.offerString.set(offerstring);

      console.log('Offer created and set as local description:', window.location.origin + `/biergit?c=${encodeURIComponent(offerstring)}`);
      this.listenForAnswer();
    }).catch(error => {
      console.error('Error creating offer:', error);
    });
  }

  private setupChannelEvents(channel: RTCDataChannel) {
    channel.onopen = () => {
      console.log('Data channel opened:', channel.label);
    };
    channel.onmessage = (msgEvent) => {
      console.log('Message received on data channel:', msgEvent.data);
    };
    channel.onerror = (error) => {
      console.error('Data channel error:', error);
    };
  }

  private listenForAnswer() {
    const answerChannel = new BroadcastChannel('answer');
    const timeoutId = setTimeout(() => {
      console.warn('No answer received within timeout period, closing BroadcastChannel');
      answerChannel.close();
    }, 60000); // 1 minute timeout
    answerChannel.onmessage = (event) => {
      console.log('Answer received from BroadcastChannel:', event.data);
      this.handleAnswer(event.data).then(() => {
        console.log('Answer processed successfully');
        answerChannel.postMessage({});
        answerChannel.close();
        clearTimeout(timeoutId);
      }).catch(error => {
        console.error('Error processing answer:', error);
        answerChannel.postMessage({ error: 'Error processing answer' });
      });
    };
  }

  private handleAnswer(answerString: string) {
    try {
      const answer = JSON.parse(answerString);
      return this.connection.setRemoteDescription(answer).then(() => {
        console.log('Remote description set successfully:', answer);
      }).catch(error => {
        console.error('Error setting remote description:', error);
        throw error;
      });
    } catch (error) {
      console.error('Error parsing answer string:', error);
      return Promise.reject(error);
    }
  }
}
