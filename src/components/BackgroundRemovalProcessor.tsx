import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { loadImageFromUrl, removeBackground } from '@/utils/backgroundRemoval';
import { useToast } from '@/hooks/use-toast';

const PLATFORM_IMAGES = [
  {
    id: 'heat-map',
    url: '/lovable-uploads/39f6c574-c37a-4480-81a0-f7dffa586ff2.png',
    name: 'Heat Map'
  },
  {
    id: 'shelf-recommendations', 
    url: '/lovable-uploads/51b85827-96ab-438f-a0ad-7f4451812b36.png',
    name: 'Shelf Recommendations'
  },
  {
    id: 'rack-optimization',
    url: '/lovable-uploads/5a8d1503-65e8-427d-976e-d5a6800daba4.png',
    name: 'Rack Optimization'
  },
  {
    id: 'efficiency-analysis',
    url: '/lovable-uploads/ebb91bd1-6032-4611-97a7-8676a230e690.png',
    name: 'Efficiency Analysis'
  },
  {
    id: 'analytics-relocated',
    url: '/lovable-uploads/7306dcba-ce5e-424c-995e-b7faceb94c01.png',
    name: 'Analytics Relocated Products'
  }
];

export const BackgroundRemovalProcessor = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImages, setProcessedImages] = useState<{[key: string]: string}>({});
  const { toast } = useToast();

  const processAllImages = async () => {
    setIsProcessing(true);
    const processed: {[key: string]: string} = {};
    
    try {
      for (const imageInfo of PLATFORM_IMAGES) {
        toast({
          title: "Processing image",
          description: `Processing ${imageInfo.name}...`
        });
        
        console.log(`Processing ${imageInfo.name}...`);
        
        // Load the image
        const img = await loadImageFromUrl(imageInfo.url);
        
        // Remove background
        const processedBlob = await removeBackground(img);
        
        // Create object URL for the processed image
        const processedUrl = URL.createObjectURL(processedBlob);
        processed[imageInfo.id] = processedUrl;
        
        console.log(`Completed processing ${imageInfo.name}`);
      }
      
      setProcessedImages(processed);
      
      toast({
        title: "Success!",
        description: "All images processed successfully. Check console for download links."
      });
      
      // Log download instructions
      console.log('=== PROCESSED IMAGES ===');
      Object.entries(processed).forEach(([id, url]) => {
        console.log(`${id}: ${url}`);
        console.log(`Right-click the URL above and "Save link as" to download the processed image.`);
      });
      
    } catch (error) {
      console.error('Error processing images:', error);
      toast({
        title: "Error",
        description: "Failed to process images. Check console for details.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadImage = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${filename}-no-bg.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border max-w-sm">
      <h3 className="font-semibold mb-2">Background Removal Tool</h3>
      <Button 
        onClick={processAllImages}
        disabled={isProcessing}
        className="w-full mb-2"
      >
        {isProcessing ? 'Processing...' : 'Remove Backgrounds'}
      </Button>
      
      {Object.keys(processedImages).length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-gray-600">Processed Images:</p>
          {Object.entries(processedImages).map(([id, url]) => (
            <Button
              key={id}
              variant="outline"
              size="sm"
              onClick={() => downloadImage(url, id)}
              className="w-full text-xs"
            >
              Download {id}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};