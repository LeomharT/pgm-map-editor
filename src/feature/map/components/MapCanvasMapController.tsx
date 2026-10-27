import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card, CardContent } from '@/components/ui/card';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMapCanvas2D } from '../hooks/useMapCanvas2D';

export default function MapCanvasMapController() {
  const { engine } = useMapCanvas2D();

  const [zoom, setZoom] = useState(engine?.transform.scale ?? 1);

  useEffect(() => {
    if (!engine) return;

    function updateZoom({ transform }: { transform: { x: number; y: number; scale: number } }) {
      setZoom(transform.scale);
    }

    engine.current.transform.addEventListener('transform', updateZoom);
    return () => engine.current.transform.removeEventListener('transform', updateZoom);
  }, [engine]);

  return (
    <div className='absolute bottom-4 left-4' onClick={() => {}}>
      <Card className='p-1'>
        <CardContent className='p-1'>
          <ButtonGroup>
            <Button size='icon' variant='ghost'>
              <MinusIcon />
            </Button>
            <Button variant='ghost' className='w-18'>
              {(zoom * 100).toFixed(0)}%
            </Button>
            <Button size='icon' variant='ghost'>
              <PlusIcon />
            </Button>
          </ButtonGroup>
        </CardContent>
      </Card>
    </div>
  );
}
