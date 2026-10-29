import { Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../ui/theme-provider';

export default function Toolbar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className='fixed top-2 right-2 z-10'>
      <Button
        className='h-10 w-10'
        variant='default'
        size='icon-lg'
        onClick={() => {
          if (theme === 'dark') setTheme('light');
          if (theme === 'light') setTheme('dark');
          if (theme === 'system') setTheme('dark');
        }}
      >
        <Sun className='h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90' />
        <Moon className='absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0' />
        <span className='sr-only'>Toggle theme</span>
      </Button>
    </div>
  );
}
