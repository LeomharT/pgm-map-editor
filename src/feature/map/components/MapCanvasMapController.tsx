import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card, CardContent } from '@/components/ui/card';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useMapCanvas2D } from '../hooks/useMapCanvas2D';

export default function MapCanvasMapController() {
  const [zoom, setZoom] = useState(1);

  const { addEventListener } = useMapCanvas2D();

  useEffect(() => {
    addEventListener('transform', ({ transform }) => setZoom(transform.scale));
  }, [addEventListener]);

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
