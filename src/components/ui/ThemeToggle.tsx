 import { Moon, Sun, Monitor } from 'lucide-react';
 import { useApp } from '@/contexts/AppContext';
 
 type Theme = 'light' | 'dark' | 'system';
 
 export default function ThemeToggle() {
   const { theme, setTheme } = useApp();
 
   const options: { value: Theme; icon: typeof Sun; label: string }[] = [
     { value: 'light', icon: Sun, label: 'Light' },
     { value: 'dark', icon: Moon, label: 'Dark' },
     { value: 'system', icon: Monitor, label: 'System' },
   ];
 
   return (
     <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
       {options.map((option) => (
         <button
           key={option.value}
           onClick={() => setTheme(option.value)}
           className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all ${
             theme === option.value
               ? 'bg-card text-foreground shadow-sm'
               : 'text-muted-foreground hover:text-foreground'
           }`}
           title={option.label}
         >
           <option.icon className="w-4 h-4" />
           <span className="text-sm font-medium hidden sm:inline">{option.label}</span>
         </button>
       ))}
     </div>
   );
 }