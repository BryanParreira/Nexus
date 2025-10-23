// components/ai-content-generator.tsx
"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Sparkles,
  Copy,
  Download,
  Share2,
  RefreshCw,
  Wand2,
  Twitter,
  Facebook,
  Linkedin,
  Instagram,
  Hash,
  AtSign,
  Smile,
  TrendingUp,
  Calendar,
  Image as ImageIcon,
  FileText,
  Link as LinkIcon,
  Zap,
  Check,
  Loader2,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const AIContentGenerator = () => {
  const [generationMode, setGenerationMode] = useState<"topic" | "url" | "improve" | "image">("topic");
  const [inputText, setInputText] = useState("");
  const [platform, setPlatform] = useState("twitter");
  const [tone, setTone] = useState("professional");
  const [length, setLength] = useState([50]);
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeEmojis, setIncludeEmojis] = useState(false);
  const [includeCTA, setIncludeCTA] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string[]>([]);
  const [selectedVariation, setSelectedVariation] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const platforms = [
    { id: "twitter", name: "Twitter", icon: Twitter, color: "text-sky-500", limit: 280 },
    { id: "facebook", name: "Facebook", icon: Facebook, color: "text-blue-600", limit: 5000 },
    { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "text-blue-700", limit: 3000 },
    { id: "instagram", name: "Instagram", icon: Instagram, color: "text-pink-500", limit: 2200 },
  ];

  const tones = [
    { id: "professional", name: "Professional", description: "Formal and business-like" },
    { id: "casual", name: "Casual", description: "Friendly and conversational" },
    { id: "funny", name: "Funny", description: "Humorous and entertaining" },
    { id: "inspirational", name: "Inspirational", description: "Motivational and uplifting" },
    { id: "educational", name: "Educational", description: "Informative and teaching" },
    { id: "promotional", name: "Promotional", description: "Sales-focused and persuasive" },
  ];

  const mockGenerations = {
    topic: [
      "🚀 Exciting developments in AI technology are reshaping how we work and create. The future is here, and it's more accessible than ever. What innovations are you most excited about? #AI #Technology #Innovation",
      "The AI revolution isn't coming—it's already here. From content creation to data analysis, artificial intelligence is transforming every industry. Are you ready to embrace the change? 🤖 #ArtificialIntelligence #DigitalTransformation",
      "Artificial Intelligence is no longer science fiction. It's the tool that's democratizing creativity, productivity, and innovation for everyone. What will you create with AI? ✨ #AITools #FutureOfWork",
    ],
    url: [
      "📰 Just read an incredible article about the latest AI breakthroughs. The implications for businesses are massive. Check out the full story and let me know your thoughts! #AI #Business #Innovation",
      "This article perfectly captures why AI is the most important technology of our generation. A must-read for anyone in tech or business. Link in bio! 🔗 #TechNews #ArtificialIntelligence",
    ],
    improve: [
      "🎯 Transform your business with cutting-edge AI solutions that deliver real results. Our platform helps you automate, optimize, and grow faster than ever before. Ready to level up? #BusinessGrowth #AITools",
      "💡 Discover how AI can revolutionize your workflow. Our intelligent platform learns from your needs and adapts to help you achieve more in less time. Join thousands of successful teams today! #Productivity #AI",
    ],
  };

  const handleGenerate = async () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    setGeneratedContent([]);
    
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockContent = generationMode === "topic" 
      ? mockGenerations.topic 
      : generationMode === "url"
      ? mockGenerations.url
      : mockGenerations.improve;
    
    setGeneratedContent(mockContent);
    setSelectedVariation(0);
    setIsGenerating(false);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleUseContent = () => {
    // Navigate to social media page with pre-filled content
    console.log("Using content:", generatedContent[selectedVariation]);
  };

  const selectedPlatform = platforms.find(p => p.id === platform);

  return (
    <div className="w-full">
      {/* Stats/Info Bar - With Gradient */}
      <div className="px-4 md:px-6 lg:px-8 pt-6 pb-4 border-b bg-muted/30">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Generations Used</p>
                <Sparkles className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47 / 100</div>
              <p className="text-xs text-muted-foreground mt-1">Pro plan</p>
            </CardContent>
          </Card>

          <Card className="from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">This Month</p>
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                +23% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Saved Templates</p>
                <FileText className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1">Ready to use</p>
            </CardContent>
          </Card>

          <Card className="from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">Posts Created</p>
                <Calendar className="w-4 h-4 text-muted-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground mt-1">From AI content</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 md:p-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Section */}
          <Card className="from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
            <CardHeader>
              <CardTitle>Generate Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Generation Mode Tabs */}
              <div>
                <Label>Generation Mode</Label>
                <Tabs value={generationMode} onValueChange={(v) => setGenerationMode(v as any)} className="mt-2">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="topic">
                      <Wand2 className="w-4 h-4 mr-2" />
                      Topic
                    </TabsTrigger>
                    <TabsTrigger value="url">
                      <LinkIcon className="w-4 h-4 mr-2" />
                      URL
                    </TabsTrigger>
                    <TabsTrigger value="improve">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Improve
                    </TabsTrigger>
                    <TabsTrigger value="image">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Image
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Input Field */}
              <div>
                <Label htmlFor="content-input">
                  {generationMode === "topic" && "What topic would you like to write about?"}
                  {generationMode === "url" && "Enter URL to generate content from"}
                  {generationMode === "improve" && "Paste content to improve"}
                  {generationMode === "image" && "Describe the image or upload"}
                </Label>
                <Textarea
                  id="content-input"
                  placeholder={
                    generationMode === "topic"
                      ? "e.g., AI in marketing, sustainable business practices..."
                      : generationMode === "url"
                      ? "https://example.com/article"
                      : generationMode === "improve"
                      ? "Paste your existing content here..."
                      : "Describe the image content..."
                  }
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  rows={4}
                  className="mt-2"
                />
              </div>

              {/* Platform Selection */}
              <div>
                <Label>Target Platform</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {platforms.map((p) => {
                    const Icon = p.icon;
                    return (
                      <Button
                        key={p.id}
                        variant={platform === p.id ? "default" : "outline"}
                        className="h-auto py-3"
                        onClick={() => setPlatform(p.id)}
                      >
                        <div className="flex flex-col items-center gap-1">
                          <Icon className={`w-5 h-5 ${platform === p.id ? '' : p.color}`} />
                          <span className="text-xs">{p.name}</span>
                        </div>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Tone Selection */}
              <div>
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t.id} value={t.id}>
                        <div>
                          <div className="font-medium">{t.name}</div>
                          <div className="text-xs text-muted-foreground">{t.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Content Length */}
              <div>
                <Label>Content Length: {length}%</Label>
                <Slider
                  value={length}
                  onValueChange={setLength}
                  min={0}
                  max={100}
                  step={10}
                  className="mt-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>Short</span>
                  <span>Medium</span>
                  <span>Long</span>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <Label>Options</Label>
                <div className="flex items-center justify-between">
                  <Label htmlFor="hashtags" className="cursor-pointer">Include Hashtags</Label>
                  <Switch
                    id="hashtags"
                    checked={includeHashtags}
                    onCheckedChange={setIncludeHashtags}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="emojis" className="cursor-pointer">Include Emojis</Label>
                  <Switch
                    id="emojis"
                    checked={includeEmojis}
                    onCheckedChange={setIncludeEmojis}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="cta" className="cursor-pointer">Include Call-to-Action</Label>
                  <Switch
                    id="cta"
                    checked={includeCTA}
                    onCheckedChange={setIncludeCTA}
                  />
                </div>
              </div>

              {/* Generate Button */}
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !inputText.trim()}
                className="w-full"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Content</CardTitle>
                {generatedContent.length > 0 && (
                  <Badge variant="secondary">
                    {generatedContent.length} variations
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {generatedContent.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">Ready to create amazing content?</h3>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    Fill in the details on the left and click "Generate Content" to let AI create
                    engaging social media posts for you.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Variation Selector */}
                  <div className="flex gap-2">
                    {generatedContent.map((_, index) => (
                      <Button
                        key={index}
                        variant={selectedVariation === index ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedVariation(index)}
                      >
                        Variation {index + 1}
                      </Button>
                    ))}
                  </div>

                  {/* Content Display */}
                  <Card className="bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="prose prose-sm max-w-none">
                          <p className="whitespace-pre-wrap leading-relaxed">
                            {generatedContent[selectedVariation]}
                          </p>
                        </div>

                        {/* Character Count */}
                        <div className="flex items-center justify-between text-xs text-muted-foreground pt-4 border-t">
                          <span>
                            {generatedContent[selectedVariation].length} / {selectedPlatform?.limit} characters
                          </span>
                          <span
                            className={
                              generatedContent[selectedVariation].length > (selectedPlatform?.limit || 280)
                                ? "text-destructive"
                                : "text-green-600"
                            }
                          >
                            {generatedContent[selectedVariation].length <= (selectedPlatform?.limit || 280)
                              ? "✓ Within limit"
                              : "⚠ Too long"}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleCopy(generatedContent[selectedVariation], selectedVariation)}
                      variant="outline"
                      className="flex-1"
                    >
                      {copiedIndex === selectedVariation ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                    <Button variant="outline">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                    <Button onClick={handleUseContent}>
                      <Share2 className="w-4 h-4 mr-2" />
                      Use in Post
                    </Button>
                  </div>

                  {/* Quick Actions */}
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Quick Modifications</Label>
                    <div className="flex flex-wrap gap-2">
                      <Button variant="outline" size="sm">
                        <Zap className="w-3 h-3 mr-1" />
                        Make Shorter
                      </Button>
                      <Button variant="outline" size="sm">
                        <Zap className="w-3 h-3 mr-1" />
                        Make Longer
                      </Button>
                      <Button variant="outline" size="sm">
                        <Hash className="w-3 h-3 mr-1" />
                        Add Hashtags
                      </Button>
                      <Button variant="outline" size="sm">
                        <Smile className="w-3 h-3 mr-1" />
                        Add Emojis
                      </Button>
                      <Button variant="outline" size="sm">
                        <AtSign className="w-3 h-3 mr-1" />
                        Add CTA
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Templates Section */}
        <Card className="from-primary/5 to-card dark:bg-card bg-gradient-to-t shadow-xs mt-6">
          <CardHeader>
            <CardTitle>Popular Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: "Product Launch", description: "Announce new products", icon: Sparkles },
                { name: "Behind the Scenes", description: "Show your team culture", icon: FileText },
                { name: "Customer Testimonial", description: "Share success stories", icon: TrendingUp },
                { name: "How-To Guide", description: "Educational content", icon: FileText },
                { name: "Industry News", description: "Share trending topics", icon: TrendingUp },
                { name: "Milestone Celebration", description: "Celebrate achievements", icon: Calendar },
              ].map((template) => {
                const Icon = template.icon;
                return (
                  <Card key={template.name} className="cursor-pointer hover:shadow-md transition-shadow from-primary/5 to-card dark:bg-card bg-gradient-to-t">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{template.name}</h4>
                          <p className="text-xs text-muted-foreground">{template.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIContentGenerator;