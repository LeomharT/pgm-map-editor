import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@base-ui/react';

export default function Toolbar() {
  return (
    <div className='fixed top-2 left-[50%] translate-x-[-50%]'>
      <Card size='sm'>
        <CardContent>
          <Separator />
        </CardContent>
      </Card>
    </div>
  );
}
