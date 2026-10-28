import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { MinusIcon, PlusIcon } from 'lucide-react';

export default function MapCanvasMapController() {
  return (
    <div className='bg-background absolute bottom-4 left-4 rounded-lg shadow' onClick={() => {}}>
      <ButtonGroup>
        <Button size='icon-lg' variant='ghost' className='h-10 w-10'>
          <MinusIcon />
        </Button>
        <Button size='lg' variant='ghost' className='h-10 w-18'>
          {(1 * 100).toFixed(0)}%
        </Button>
        <Button size='icon-lg' variant='ghost' className='h-10 w-10'>
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
