
import Navbar from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Play, Video } from "lucide-react";
import { Link } from "react-router-dom";

const exampleVideos = [
  {
    id: "ex1",
    title: "Tropical Paradise",
    description: "A tropical beach paradise with crystal clear water, palm trees swaying in the gentle breeze, and soft white sand stretching along the shoreline.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    thumbnail: "https://picsum.photos/seed/ex1/800/450"
  },
  {
    id: "ex2",
    title: "Cyberpunk City",
    description: "A futuristic cyberpunk cityscape with neon lights reflecting off wet streets, flying vehicles zipping between towering skyscrapers, and holographic advertisements glowing in the night.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    thumbnail: "https://picsum.photos/seed/ex2/800/450"
  },
  {
    id: "ex3",
    title: "Enchanted Forest",
    description: "An enchanted forest with magical glowing plants, fireflies dancing between ancient trees, and a mystical pathway leading to a hidden clearing bathed in moonlight.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    thumbnail: "https://picsum.photos/seed/ex3/800/450"
  }
];

const Examples = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col pt-24 px-4 pb-12">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Example Videos</h1>
          <p className="text-muted-foreground mb-12 max-w-2xl">
            See what's possible with our AI video generation. These examples show the quality and variety of videos you can create with simple text prompts.
          </p>
          
          <div className="space-y-16">
            {exampleVideos.map((example) => (
              <div key={example.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden border border-slate-700/50">
                  <img 
                    src={example.thumbnail} 
                    alt={example.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center group">
                    <Button 
                      variant="secondary" 
                      size="icon" 
                      className="opacity-80 hover:opacity-100 transition-opacity"
                      onClick={() => window.open(example.video_url, "_blank")}
                    >
                      <Play className="h-8 w-8" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-2xl font-bold mb-2">{example.title}</h2>
                  <p className="text-muted-foreground mb-6">{example.description}</p>
                  
                  <div className="rounded-md bg-secondary/30 p-4 border border-border mb-6">
                    <h3 className="text-sm font-medium mb-2">Prompt Used:</h3>
                    <p className="text-sm text-muted-foreground italic">"{example.description}"</p>
                  </div>
                  
                  <Button 
                    variant="default" 
                    className="gap-2"
                    onClick={() => {
                      // In a real app, this would pre-fill the textarea on the generate page
                      window.location.href = '/generate';
                    }}
                  >
                    <Video className="h-4 w-4" />
                    <span>Try a Similar Prompt</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to create your own?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              It's your turn to transform your ideas into stunning videos. Just describe what you want to see.
            </p>
            <Link to="/generate">
              <Button size="lg" className="gap-2">
                <Video className="h-5 w-5" />
                <span>Start Creating</span>
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Examples;
