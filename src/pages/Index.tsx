
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative py-32 px-4">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-radial from-bloom-purple/20 via-transparent to-transparent" />
          
          <div className="container mx-auto max-w-6xl relative z-10">
            <div className="flex flex-col items-center text-center mb-12 space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-gradient leading-tight">
                Transform Text into<br/>Stunning AI Videos
              </h1>
              <p className="text-xl max-w-2xl text-muted-foreground">
                Bloom uses advanced AI to turn your descriptions into beautiful, 
                cinema-quality videos in seconds. No technical skills required.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/generate">
                  <Button size="lg" className="text-lg px-8">
                    Create Your First Video
                  </Button>
                </Link>
                <Link to="/examples">
                  <Button variant="outline" size="lg" className="text-lg px-8">
                    See Examples
                  </Button>
                </Link>
              </div>
            </div>

            {/* Preview Image */}
            <div className="relative rounded-lg overflow-hidden border border-slate-700/50 shadow-2xl">
              <div className="aspect-w-16 aspect-h-9 bg-muted/30 backdrop-blur animate-pulse-slow">
                <div className="flex flex-col items-center justify-center p-8 text-center">
                  <Video className="h-16 w-16 mb-4 text-primary/70" />
                  <p className="text-xl font-medium text-muted-foreground">Preview video will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4 bg-bloom-dark/50">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Write Your Vision",
                  description: "Describe the scene, mood, style, and any specific elements you want in your video."
                },
                {
                  title: "AI Generation",
                  description: "Our advanced AI analyzes your text and transforms it into a fully-rendered video."
                },
                {
                  title: "Download & Share",
                  description: "Get your finished video to download, share online, or use in your projects."
                }
              ].map((feature, i) => (
                <div key={i} className="rounded-xl border border-border bg-card/50 p-6 hover:shadow-xl transition-all hover:-translate-y-1">
                  <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-primary/10 text-primary">
                    {i + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-8 border-t border-border">
        <div className="container mx-auto text-center text-muted-foreground text-sm">
          <p>© 2025 Bloom. AI-Powered Video Generation.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
