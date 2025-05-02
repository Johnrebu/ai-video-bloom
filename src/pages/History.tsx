
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Play, Video } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

// Mock data for the video history
const mockHistory = [
  {
    id: "1",
    text: "A serene forest with sunlight streaming through the canopy, mist hovering above the forest floor, and a small stream winding through moss-covered rocks.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    created_at: "2025-05-01T14:23:45Z",
    thumbnail: "https://picsum.photos/seed/vid1/400/225"
  },
  {
    id: "2",
    text: "A bustling futuristic cityscape with flying cars, holographic advertisements, and neon lights reflecting off glass skyscrapers during sunset.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    created_at: "2025-04-28T09:11:22Z",
    thumbnail: "https://picsum.photos/seed/vid2/400/225"
  },
  {
    id: "3",
    text: "A peaceful beach at golden hour with gentle waves lapping at the shore, palm trees swaying in the breeze, and a gradient sky of orange, pink, and purple.",
    video_url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    created_at: "2025-04-25T16:40:12Z",
    thumbnail: "https://picsum.photos/seed/vid3/400/225"
  }
];

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
};

const History = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col pt-24 px-4 pb-12">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl font-bold mb-8 text-gradient">Your Video History</h1>
          
          {mockHistory.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockHistory.map((item) => (
                <Card key={item.id} className="bg-card/50 backdrop-blur overflow-hidden border-slate-700/50 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="relative aspect-video bg-slate-900">
                    <img 
                      src={item.thumbnail} 
                      alt={`Thumbnail for ${item.text.substring(0, 20)}...`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-center justify-center group">
                      <Button 
                        variant="secondary" 
                        size="icon" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => window.open(item.video_url, "_blank")}
                      >
                        <Play className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground mb-2">{formatDate(item.created_at)}</p>
                    <p className="line-clamp-3 text-sm mb-4">{item.text}</p>
                    <div className="flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1 text-xs"
                        onClick={() => window.open(item.video_url, "_blank")}
                      >
                        <Play className="h-3 w-3" />
                        <span>Play</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1 text-xs"
                        onClick={() => window.open(item.video_url, "_blank")}
                      >
                        <Download className="h-3 w-3" />
                        <span>Download</span>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <Video className="h-16 w-16 text-primary/40 mb-4" />
              <h3 className="text-xl font-medium mb-2">No Videos Yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md">
                You haven't generated any videos yet. Go to the Generate page to create your first AI video.
              </p>
              <Button className="gap-2" onClick={() => window.location.href = '/generate'}>
                <Video className="h-4 w-4" />
                <span>Create Your First Video</span>
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default History;
