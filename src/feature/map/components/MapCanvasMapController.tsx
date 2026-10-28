import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMapCanvas2D } from '../hooks/useMapCanvas2D';

export default function MapCanvasMapController() {
  const engine = useMapCanvas2D();

  const [zoom, setZoom] = useState(engine.viewport.transform.scale);

  useEffect(() => {
    function updateZoom({ transform }: { transform: { x: number; y: number; scale: number } }) {
      setZoom(transform.scale);
    }

    engine.viewport.addEventListener('transform', updateZoom);
    return () => engine.viewport.removeEventListener('transform', updateZoom);
  }, [engine]);

  return (
    <div className='bg-background absolute bottom-4 left-4 rounded-lg shadow'>
      <ButtonGroup>
        <Button size='icon-lg' variant='ghost' className='h-10 w-10'>
          <MinusIcon />
        </Button>
        <Button
          size='lg'
          variant='ghost'
          className='h-10 w-18'
          onClick={() => {
            engine.viewport.setTransform({ x: 0, y: 0, scale: 1 });
          }}
        >
          {(zoom * 100).toFixed(0)}%
        </Button>
        <Button size='icon-lg' variant='ghost' className='h-10 w-10'>
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
