import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Download, Video, Loader, Key } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import { ReplicateService } from "@/services/replicateService";

// Sample video URLs for different prompt types
const sampleVideos = [
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"
];

// This function selects videos based on keywords in the prompt
const generateVideo = async (text: string): Promise<{ video_url: string }> => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  const lowerPrompt = text.toLowerCase();

  let videoUrl = "";
  
  if (lowerPrompt.includes("forest") || lowerPrompt.includes("nature")) {
    videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
  } else if (lowerPrompt.includes("city") || lowerPrompt.includes("car")) {
    videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
  } else if (lowerPrompt.includes("ocean") || lowerPrompt.includes("beach")) {
    videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4";
  } else if (lowerPrompt.includes("space") || lowerPrompt.includes("sci-fi")) {
    videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4";
  } else if (lowerPrompt.includes("adventure") || lowerPrompt.includes("action")) {
    videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4";
  } else {
    videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4"; // Fallback
  }
  
  return { 
    video_url: videoUrl
  };
};

const GeneratePage = () => {
  const [text, setText] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Text Required",
        description: "Please enter a description for your video",
        variant: "destructive"
      });
      return;
    }

    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Replicate API key",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      const replicateService = new ReplicateService(apiKey);
      const videoUrl = await replicateService.generateVideo(text);
      
      setVideoURL(videoUrl);
      toast({
        title: "Video Generated!",
        description: "Your AI video has been created successfully.",
      });
    } catch (error) {
      console.error("Error generating video:", error);
      toast({
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "There was an error generating your video. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col pt-24 px-4 pb-12">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-8 text-gradient">Generate Your Video</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="bg-card/50 backdrop-blur border-slate-700/50">
              <CardHeader>
                <CardTitle>Describe Your Vision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="apiKey" className="block text-sm font-medium mb-2">
                    <Key className="inline h-4 w-4 mr-1" />
                    Replicate API Key
                  </label>
                  <Input
                    id="apiKey"
                    type="password"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Enter your Replicate API key (r8_...)"
                    className="bg-background/50"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Get your API key from <a href="https://replicate.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">replicate.com</a>
                  </p>
                </div>
                
                <div>
                  <label htmlFor="prompt" className="block text-sm font-medium mb-2">Video Description</label>
                  <Textarea
                    id="prompt"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter a detailed description of the video you want to create..."
                    className="min-h-[200px] bg-background/50"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button 
                  onClick={handleGenerate} 
                  disabled={loading}
                  className="gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      <Video className="h-4 w-4" />
                      <span>Generate Video</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-card/50 backdrop-blur border-slate-700/50">
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center min-h-[200px]">
                {videoURL ? (
                  <div className="w-full relative">
                    <video 
                      controls 
                      className="w-full rounded-md"
                      src={videoURL}
                    >
                      Your browser does not support the video tag.
                    </video>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="absolute top-2 right-2 gap-1"
                      onClick={() => window.open(videoURL, "_blank")}
                    >
                      <Download className="h-4 w-4" />
                      <span>Download</span>
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
                    <Video className="h-12 w-12 mb-4 opacity-50" />
                    <p>Your video will appear here after generation</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Tips for Great Results</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Be specific about visual elements like colors, lighting, and scene composition</li>
              <li>Describe the mood and atmosphere you want to create</li>
              <li>Mention style references (cinematic, animated, realistic, etc.)</li>
              <li>Keep your description focused on a single coherent scene for best results</li>
              <li>Video generation may take 2-5 minutes depending on complexity</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GeneratePage;
