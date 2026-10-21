import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@base-ui/react';
import { PlayIcon } from 'lucide-react';
import { Button } from '../ui/button';

export default function Toolbar() {
  return (
    <div className='fixed top-4 left-[50%] translate-x-[-50%]'>
      <Card size='sm'>
        <CardContent>
          <Separator />
          <Button variant='positive'>
            <PlayIcon fill='currentcolor' />
            Start Navi
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
