import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-biergit-component',
  imports: [],
  templateUrl: './biergit-component.html',
  styleUrl: './biergit-component.scss',
})
export class BiergitComponent {
  readonly connection = new RTCPeerConnection();
  readonly activeRoute = inject(ActivatedRoute);

  protected answerlink: WritableSignal<string|undefined> = signal(undefined);

  ngOnInit() {
    this.connection.ondatachannel = (event) => {
      this.setupChannelEvents(event.channel);
    };

    if (this.activeRoute.snapshot.queryParamMap.has('c')) {
      console.log('Offer string found in route parameters, processing offer...');
      const offerstring = this.activeRoute.snapshot.queryParamMap.get('c');
      this.processOfferString(offerstring!);
    } else {
      console.warn('No offer string found in route parameters');
    }
  }

  private processOfferString(offerString: string) {
    try {
      const offer = JSON.parse(offerString);
      return this.acceptOffer(offer);
    } catch (error) {
      console.error('Error parsing offer string:', error);
      return Promise.reject(error);
    }
  }

  private acceptOffer(offer: RTCSessionDescriptionInit) {
    return this.connection.setRemoteDescription(offer).then(() => {
      console.log('Remote description set successfully:', offer);
    }).then(() => this.connection.createAnswer().then(answer => {
      this.connection.setLocalDescription(answer);
      console.log('Answer created and set as local description:', answer);
      this.answerlink.set(window.location.origin + `/accepted/${encodeURIComponent(JSON.stringify(answer))}`);
    }).catch(error => {
      console.error('Error creating answer:', error);
      throw error;
    }), error => {
      console.error('Error setting remote description:', error);
      throw error;
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
}
