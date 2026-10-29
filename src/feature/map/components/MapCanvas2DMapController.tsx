import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { gsap } from 'gsap';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useMapCanvas2D } from '../hooks/useMapCanvas2D';

export default function MapCanvas2DMapController() {
  const engine = useMapCanvas2D();

  const tweenRef = useRef<gsap.core.Tween>(null);

  const [zoom, setZoom] = useState(engine.viewport.transform.scale);

  useEffect(() => {
    function updateZoom({ transform }: { transform: { x: number; y: number; scale: number } }) {
      setZoom(transform.scale);
    }

    engine.viewport.addEventListener('transform', updateZoom);
    return () => engine.viewport.removeEventListener('transform', updateZoom);
  }, [engine]);

  useEffect(() => {
    return () => {
      tweenRef.current?.kill();
      tweenRef.current = null;
    };
  }, []);

  function resetViewPort() {
    tweenRef.current?.kill();

    const transform = engine.viewport.transform;

    const size = engine.size;
    const boundBox = engine.getContentBounds();

    const targetScale = Math.min(size.width / boundBox.width, size.height / boundBox.height);

    tweenRef.current = gsap
      .to(transform, {
        x: size.width / 2 - (boundBox.x + boundBox.width / 2) * targetScale,
        y: size.height / 2 - (boundBox.y + boundBox.height / 2) * targetScale,
        scale: targetScale,
        duration: 0.2,
        ease: 'power2',
        onUpdate: () => {
          engine.viewport.setTransform(transform);
        },
        onComplete: () => {
          tweenRef.current = null;
        },
      })
      .play();
  }

  return (
    <div className='bg-card absolute bottom-4 left-4 rounded-lg shadow'>
      <ButtonGroup>
        <Button size='icon-lg' variant='ghost' className='h-10 w-10'>
          <MinusIcon />
        </Button>
        <Button size='lg' variant='ghost' className='h-10 w-18' onClick={resetViewPort}>
          {(zoom * 100).toFixed(0)}%
        </Button>
        <Button size='icon-lg' variant='ghost' className='h-10 w-10'>
          <PlusIcon />
        </Button>
      </ButtonGroup>
    </div>
  );
}
