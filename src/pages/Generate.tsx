
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Download, Video, Loader } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

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

// This function now selects a video based on the content of the prompt
const generateVideo = async (text: string): Promise<{ video_url: string }> => {
  // Simulate API call with a delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Select a video based on some characteristics of the prompt
  // This is a simple hash function to deterministically select a video based on the prompt text
  let hashCode = 0;
  for (let i = 0; i < text.length; i++) {
    hashCode = ((hashCode << 5) - hashCode) + text.charCodeAt(i);
    hashCode = hashCode & hashCode; // Convert to 32bit integer
  }
  
  // Get absolute value to ensure positive index
  hashCode = Math.abs(hashCode);
  
  // Select a video based on the hash
  const selectedVideo = sampleVideos[hashCode % sampleVideos.length];
  
  return { 
    video_url: selectedVideo
  };
};

const GeneratePage = () => {
  const [text, setText] = useState("");
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

    try {
      setLoading(true);
      const result = await generateVideo(text);
      setVideoURL(result.video_url);
      toast({
        title: "Video Generated!",
        description: "Your AI video has been created successfully.",
      });
    } catch (error) {
      console.error("Error generating video:", error);
      toast({
        title: "Generation Failed",
        description: "There was an error generating your video. Please try again.",
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
              <CardContent>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter a detailed description of the scene you want to create. Be specific about style, mood, colors, and action..."
                  className="min-h-[200px] bg-background/50"
                />
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
              <li>Specify camera movements and transitions if desired</li>
              <li>Keep your description focused on a single coherent scene for best results</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GeneratePage;
