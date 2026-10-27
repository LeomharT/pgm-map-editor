import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { Card, CardContent } from '@/components/ui/card';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useState } from 'react';

export default function MapCanvasMapController() {
  const [zoom] = useState(1);

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
