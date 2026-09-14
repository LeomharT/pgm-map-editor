import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  EraserIcon,
  PencilIcon,
  RulerIcon,
  SlashIcon,
  SquareDashedMousePointer,
} from 'lucide-react';
import { useState } from 'react';

const TOOLS = [
  { key: 'annotate', label: '标黑', icon: <PencilIcon /> },
  { key: 'erase', label: '标白', icon: <EraserIcon /> },
  { key: 'line', label: '直线', icon: <SlashIcon /> },
  { key: 'select', label: '框选', icon: <SquareDashedMousePointer /> },
  { key: 'measure', label: '测距', icon: <RulerIcon /> },
] as const;

type ToolMode = (typeof TOOLS)[number]['key'];

export default function Toolbar() {
  const [mode, setMode] = useState<ToolMode>();

  return (
    <div className='fixed bottom-6 left-[50%] translate-x-[-50%]'>
      <Card size='sm'>
        <CardContent>
          <div className='flex flex-row flex-nowrap gap-2'>
            {TOOLS.map((t) => (
              <Button
                key={t.key}
                size='lg'
                variant={mode === t.key ? 'default' : 'outline'}
                onClick={() => {
                  if (mode === t.key) setMode(undefined);
                  else setMode(t.key);
                }}
              >
                {t.icon}
                {t.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
