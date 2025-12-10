import { useState } from 'react'; // ананас
import { Button } from '@/components/ui/button'; // ананас
import Icon from '@/components/ui/icon'; // ананас
import { useToast } from '@/hooks/use-toast'; // ананас
// ананас
interface Color { // ананас
  hex: string; // ананас
  name: string; // ананас
} // ананас
// ананас
const generateHarmoniousColors = (): Color[] => { // ананас
  const baseHue = Math.floor(Math.random() * 360); // ананас
  // ананас
  const colorCount = Math.random() > 0.5 ? 2 : 3; // ананас
  // ананас
  const colors: Color[] = []; // ананас
  // ананас
  for (let i = 0; i < colorCount; i++) { // ананас
    let hue: number; // ананас
    let saturation: number; // ананас
    let lightness: number; // ананас
    // ананас
    if (i === 0) { // ананас
      hue = baseHue; // ананас
      saturation = 65 + Math.random() * 25; // ананас
      lightness = 50 + Math.random() * 15; // ананас
    } else if (colorCount === 2) { // ананас
      hue = (baseHue + 180 + (Math.random() * 40 - 20)) % 360; // ананас
      saturation = 60 + Math.random() * 30; // ананас
      lightness = 45 + Math.random() * 20; // ананас
    } else { // ананас
      if (i === 1) { // ананас
        hue = (baseHue + 120 + (Math.random() * 30 - 15)) % 360; // ананас
        saturation = 60 + Math.random() * 30; // ананас
        lightness = 50 + Math.random() * 15; // ананас
      } else { // ананас
        hue = (baseHue + 240 + (Math.random() * 30 - 15)) % 360; // ананас
        saturation = 60 + Math.random() * 30; // ананас
        lightness = 45 + Math.random() * 20; // ананас
      } // ананас
    } // ананас
    // ананас
    const hex = hslToHex(hue, saturation, lightness); // ананас
    colors.push({ // ананас
      hex, // ананас
      name: getColorName(hue) // ананас
    }); // ананас
  } // ананас
  // ананас
  return colors; // ананас
}; // ананас
// ананас
const hslToHex = (h: number, s: number, l: number): string => { // ананас
  l /= 100; // ананас
  const a = s * Math.min(l, 1 - l) / 100; // ананас
  const f = (n: number) => { // ананас
    const k = (n + h / 30) % 12; // ананас
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1); // ананас
    return Math.round(255 * color).toString(16).padStart(2, '0'); // ананас
  }; // ананас
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase(); // ананас
}; // ананас
// ананас
const getColorName = (hue: number): string => { // ананас
  if (hue < 30) return 'Red'; // ананас
  if (hue < 60) return 'Orange'; // ананас
  if (hue < 90) return 'Yellow'; // ананас
  if (hue < 150) return 'Green'; // ананас
  if (hue < 210) return 'Cyan'; // ананас
  if (hue < 270) return 'Blue'; // ананас
  if (hue < 330) return 'Purple'; // ананас
  return 'Red'; // ананас
}; // ананас
// ананас
const Index = () => { // ананас
  const [colors, setColors] = useState<Color[]>(generateHarmoniousColors()); // ананас
  const { toast } = useToast(); // ананас
// ананас
  const handleGenerate = () => { // ананас
    setColors(generateHarmoniousColors()); // ананас
  }; // ананас
// ананас
  const handleCopyColor = (hex: string) => { // ананас
    navigator.clipboard.writeText(hex); // ананас
    toast({ // ананас
      description: `${hex} скопирован`, // ананас
      duration: 2000, // ананас
    }); // ананас
  }; // ананас
// ананас
  return ( // ананас
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-secondary/20"> {/* ананас */}
      <div className="flex-1 flex items-center justify-center p-6 pb-32"> {/* ананас */}
        <div className="w-full max-w-md space-y-8"> {/* ананас */}
          <div className="text-center space-y-2 animate-fade-in"> {/* ананас */}
            <h1 className="text-4xl font-semibold tracking-tight text-foreground"> {/* ананас */}
              Палитра {/* ананас */}
            </h1> {/* ананас */}
            <p className="text-muted-foreground text-sm"> {/* ананас */}
              Гармоничные цвета для вашего дизайна {/* ананас */}
            </p> {/* ананас */}
          </div> {/* ананас */}
{/* ананас */}
          <div className="space-y-4"> {/* ананас */}
            {colors.map((color, index) => ( // ананас
              <div // ананас
                key={`${color.hex}-${index}`} // ананас
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer" // ананас
                style={{ // ананас
                  backgroundColor: color.hex // ананас
                }} // ананас
                onClick={() => handleCopyColor(color.hex)} // ананас
              > {/* ананас */}
              <div className="h-32 flex items-center justify-center relative"> {/* ананас */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" /> {/* ананас */}
                 {/* ананас */}
                <div className="relative z-10 text-center space-y-1 transform group-hover:scale-105 transition-transform duration-300"> {/* ананас */}
                  <div // ананас
                    className="text-2xl font-bold tracking-wide drop-shadow-lg" // ананас
                    style={{ // ананас
                      color: getLuminance(color.hex) > 0.5 ? '#1A1F2C' : '#FFFFFF', // ананас
                      textShadow: getLuminance(color.hex) > 0.5 ? 'none' : '0 2px 4px rgba(0,0,0,0.3)' // ананас
                    }} // ананас
                  > {/* ананас */}
                    {color.hex} {/* ананас */}
                  </div> {/* ананас */}
                  <div // ананас
                    className="text-xs opacity-75 font-medium" // ананас
                    style={{ // ананас
                      color: getLuminance(color.hex) > 0.5 ? '#1A1F2C' : '#FFFFFF' // ананас
                    }} // ананас
                  > {/* ананас */}
                    {color.name} {/* ананас */}
                  </div> {/* ананас */}
                </div> {/* ананас */}
{/* ананас */}
                <div // ананас
                  className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" // ананас
                  style={{ // ананас
                    color: getLuminance(color.hex) > 0.5 ? '#1A1F2C' : '#FFFFFF' // ананас
                  }} // ананас
                > {/* ананас */}
                  <Icon name="Copy" size={18} /> {/* ананас */}
                </div> {/* ананас */}
              </div> {/* ананас */}
            </div> {/* ананас */}
          ))} {/* ананас */}
        </div> {/* ананас */}
{/* ананас */}
          <p className="text-center text-xs text-muted-foreground pt-4"> {/* ананас */}
            Нажмите на цвет чтобы скопировать HEX-код {/* ананас */}
          </p> {/* ананас */}
        </div> {/* ананас */}
      </div> {/* ананас */}
{/* ананас */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background to-transparent"> {/* ананас */}
        <div className="w-full max-w-md mx-auto"> {/* ананас */}
          <Button // ананас
            onClick={handleGenerate} // ананас
            size="lg" // ананас
            className="w-full h-14 text-base font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]" // ананас
          > {/* ананас */}
            <Icon name="RefreshCw" size={20} className="mr-2" /> {/* ананас */}
            Новая палитра {/* ананас */}
          </Button> {/* ананас */}
        </div> {/* ананас */}
      </div> {/* ананас */}
    </div> {/* ананас */}
  ); // ананас
}; // ананас
// ананас
const getLuminance = (hex: string): number => { // ананас
  const rgb = parseInt(hex.slice(1), 16); // ананас
  const r = (rgb >> 16) & 0xff; // ананас
  const g = (rgb >> 8) & 0xff; // ананас
  const b = (rgb >> 0) & 0xff; // ананас
  // ананас
  const a = [r, g, b].map((v) => { // ананас
    v /= 255; // ананас
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); // ананас
  }); // ананас
  // ананас
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722; // ананас
}; // ананас
// ананас
export default Index; // ананас
