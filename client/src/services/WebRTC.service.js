import { toast } from "react-toastify";

export class WebRTC {
  peerConnection;
  remoteStream;
  constructor() {
    this.peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
          ],
        },
      ],
    });
    
    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        console.log("New ICE candidate:", event.candidate);
      }
    };

    this.peerConnection.onconnectionstatechange = () => {
      console.log("Connection state changed:", this.peerConnection.connectionState);
    };

    this.peerConnection.oniceconnectionstatechange = () => {
      console.log("ICE connection state changed:", this.peerConnection.iceConnectionState);
    };

    this.peerConnection.ontrack = (event) => {
      console.log("Track received in constructor:", event.track.kind);
      this.remoteStream = event.streams[0];
    };

    this.remoteStream = null;
  }

  async LocalStreamSet(stream) {
    try {
      const tracks = stream.getTracks();
      tracks.forEach((track) => {
        console.log("Adding track to peer connection:", track.kind);
        this.peerConnection.addTrack(track, stream);
      });
      console.log("Local stream tracks added to peer connection");
    } catch (error) {
      console.error("Error setting local stream:", error);
      throw error;
    }
  }

  async createOffer() {
    try {
      const offer = await this.peerConnection.createOffer({
        offerToReceiveAudio: true,
        offerToReceiveVideo: true,
      });
      await this.peerConnection.setLocalDescription(new RTCSessionDescription(offer));
      console.log("Offer created and local description set:", offer);
      return offer;
    } catch (error) {
      console.error("Error creating offer:", error);
      throw error;
    }
  }

  async createAnswer(offer) {
    try {
      console.log("Setting remote description from offer");
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
      console.log("Creating answer");
      const answer = await this.peerConnection.createAnswer();
      console.log("Setting local description with answer");
      await this.peerConnection.setLocalDescription(new RTCSessionDescription(answer));
      return answer;
    } catch (error) {
      console.error("Error creating answer:", error);
      throw error;
    }
  }

  async setAnswer(answer) {
    try {
      console.log("Setting remote description from answer");
      await this.peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
      console.log("Remote description set successfully");
    } catch (error) {
      console.error("Error setting remote description:", error);
      throw error;
    }
  }

  async receiveRemoteStream() {
    return new Promise((resolve, reject) => {
      // Check if we already have a valid remote stream
      if (this.remoteStream && this.remoteStream.getTracks().length > 0) {
        console.log("Using existing remote stream:", this.remoteStream.getTracks());
        resolve(this.remoteStream);
        return;
      }

      // Create a new MediaStream if we don't have one
      if (!this.remoteStream) {
        this.remoteStream = new MediaStream();
      }

      // Handler for new tracks
      const trackHandler = (event) => {
        console.log("New track received:", event.track.kind);
        
        // Add the track to our remote stream
        this.remoteStream.addTrack(event.track);
        
        // Log current tracks
        console.log("Current remote stream tracks:", this.remoteStream.getTracks());
        
        // If we have both audio and video tracks (or at least one track), resolve
        if (this.remoteStream.getTracks().length > 0) {
          console.log("Remote stream is ready");
          this.peerConnection.removeEventListener('track', trackHandler);
          resolve(this.remoteStream);
        }
      };

      // Add track handler
      this.peerConnection.addEventListener('track', trackHandler);

      // Check current tracks in case they were added before we set up the handler
      const senders = this.peerConnection.getReceivers();
      senders.forEach(sender => {
        if (sender.track) {
          this.remoteStream.addTrack(sender.track);
        }
      });

      // Add timeout to prevent hanging
      setTimeout(() => {
        if (!this.remoteStream || this.remoteStream.getTracks().length === 0) {
          this.peerConnection.removeEventListener('track', trackHandler);
          console.error("No tracks received within timeout period");
          reject(new Error("Timeout waiting for remote stream tracks"));
        }
      }, 15000); // Increased timeout to 15 seconds
    });
  }

  async sendStream(stream) {
    try {
      const senders = this.peerConnection.getSenders();
      const tracks = stream.getTracks();
      
      for (const track of tracks) {
        console.log("Processing track:", track.kind);
        const sender = senders.find(s => s.track?.kind === track.kind);
        if (sender) {
          console.log("Replacing existing track:", track.kind);
          await sender.replaceTrack(track);
        } else {
          console.log("Adding new track:", track.kind);
          this.peerConnection.addTrack(track, stream);
        }
      }
      console.log("Stream sent successfully");
    } catch (error) {
      console.error("Error sending stream:", error);
      throw error;
    }
  }

  async getIceCandidate() {
    return new Promise((resolve) => {
      if (this.peerConnection.iceGatheringState === "complete") {
        resolve(null);
        return;
      }

      this.peerConnection.addEventListener("icecandidate", (e) => {
        if (e.candidate) {
          console.log("ICE candidate received:", e.candidate);
          resolve(e.candidate);
        }
      }, { once: true });
    });
  }

  async addIceCandidate(candidate) {
    try {
      await this.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
      console.log("ICE candidate added successfully");
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
      throw error;
    }
  }

  async endCall() {
    this.peerConnection.close();
    console.log("Call ended");
  }
}

export default new WebRTC();
