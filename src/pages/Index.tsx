import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface Color {
  hex: string;
  name: string;
}

const generateHarmoniousColors = (): Color[] => {
  const baseHue = Math.floor(Math.random() * 360);
  
  const colorCount = Math.random() > 0.5 ? 2 : 3;
  
  const colors: Color[] = [];
  
  for (let i = 0; i < colorCount; i++) {
    let hue: number;
    let saturation: number;
    let lightness: number;
    
    if (i === 0) {
      hue = baseHue;
      saturation = 65 + Math.random() * 25;
      lightness = 50 + Math.random() * 15;
    } else if (colorCount === 2) {
      hue = (baseHue + 180 + (Math.random() * 40 - 20)) % 360;
      saturation = 60 + Math.random() * 30;
      lightness = 45 + Math.random() * 20;
    } else {
      if (i === 1) {
        hue = (baseHue + 120 + (Math.random() * 30 - 15)) % 360;
        saturation = 60 + Math.random() * 30;
        lightness = 50 + Math.random() * 15;
      } else {
        hue = (baseHue + 240 + (Math.random() * 30 - 15)) % 360;
        saturation = 60 + Math.random() * 30;
        lightness = 45 + Math.random() * 20;
      }
    }
    
    const hex = hslToHex(hue, saturation, lightness);
    colors.push({
      hex,
      name: getColorName(hue)
    });
  }
  
  return colors;
};

const hslToHex = (h: number, s: number, l: number): string => {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};

const getColorName = (hue: number): string => {
  if (hue < 30) return 'Red';
  if (hue < 60) return 'Orange';
  if (hue < 90) return 'Yellow';
  if (hue < 150) return 'Green';
  if (hue < 210) return 'Cyan';
  if (hue < 270) return 'Blue';
  if (hue < 330) return 'Purple';
  return 'Red';
};

const Index = () => {
  const [colors, setColors] = useState<Color[]>(generateHarmoniousColors());
  const { toast } = useToast();

  const handleGenerate = () => {
    setColors(generateHarmoniousColors());
  };

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    toast({
      description: `${hex} скопирован`,
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="flex-1 flex items-center justify-center p-6 pb-32">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2 animate-fade-in">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground">
              Палитра
            </h1>
            <p className="text-muted-foreground text-sm">
              Гармоничные цвета для вашего дизайна
            </p>
          </div>

          <div className="space-y-4">
            {colors.map((color, index) => (
              <div
                key={`${color.hex}-${index}`}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                style={{ 
                  backgroundColor: color.hex
                }}
                onClick={() => handleCopyColor(color.hex)}
              >
              <div className="h-32 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 text-center space-y-1 transform group-hover:scale-105 transition-transform duration-300">
                  <div 
                    className="text-2xl font-bold tracking-wide drop-shadow-lg"
                    style={{ 
                      color: getLuminance(color.hex) > 0.5 ? '#1A1F2C' : '#FFFFFF',
                      textShadow: getLuminance(color.hex) > 0.5 ? 'none' : '0 2px 4px rgba(0,0,0,0.3)'
                    }}
                  >
                    {color.hex}
                  </div>
                  <div 
                    className="text-xs opacity-75 font-medium"
                    style={{ 
                      color: getLuminance(color.hex) > 0.5 ? '#1A1F2C' : '#FFFFFF'
                    }}
                  >
                    {color.name}
                  </div>
                </div>

                <div 
                  className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ 
                    color: getLuminance(color.hex) > 0.5 ? '#1A1F2C' : '#FFFFFF'
                  }}
                >
                  <Icon name="Copy" size={18} />
                </div>
              </div>
            </div>
          ))}
        </div>

          <p className="text-center text-xs text-muted-foreground pt-4">
            Нажмите на цвет чтобы скопировать HEX-код
          </p>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent">
        <div className="w-full max-w-md mx-auto">
          <Button
            onClick={handleGenerate}
            size="lg"
            className="w-full h-14 text-base font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Icon name="RefreshCw" size={20} className="mr-2" />
            Новая палитра
          </Button>
        </div>
      </div>
    </div>
  );
};

const getLuminance = (hex: string): number => {
  const rgb = parseInt(hex.slice(1), 16);
  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;
  
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

export default Index;