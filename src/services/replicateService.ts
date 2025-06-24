
export interface ReplicateVideoResponse {
  id: string;
  status: string;
  output?: string[];
  error?: string;
}

export class ReplicateService {
  private apiKey: string;
  private baseUrl = 'https://api.replicate.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateVideo(prompt: string): Promise<string> {
    console.log('Starting video generation with prompt:', prompt);
    
    // Create a prediction using a text-to-video model
    const response = await fetch(`${this.baseUrl}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: "9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351", // Stable Video Diffusion model
        input: {
          prompt: prompt,
          num_frames: 25,
          num_inference_steps: 25,
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Failed to create prediction: ${response.statusText}`);
    }

    const prediction = await response.json();
    console.log('Prediction created:', prediction);

    // Poll for completion
    return this.pollForCompletion(prediction.id);
  }

  private async pollForCompletion(predictionId: string): Promise<string> {
    const maxAttempts = 60; // 5 minutes max
    let attempts = 0;

    while (attempts < maxAttempts) {
      const response = await fetch(`${this.baseUrl}/predictions/${predictionId}`, {
        headers: {
          'Authorization': `Token ${this.apiKey}`,
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to get prediction status: ${response.statusText}`);
      }

      const prediction: ReplicateVideoResponse = await response.json();
      console.log('Prediction status:', prediction.status);

      if (prediction.status === 'succeeded' && prediction.output) {
        return prediction.output[0];
      } else if (prediction.status === 'failed') {
        throw new Error(prediction.error || 'Video generation failed');
      }

      // Wait 5 seconds before next poll
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    }

    throw new Error('Video generation timed out');
  }
}
