import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { EllipsisVertical } from 'lucide-react';
import school from '../../assets/school.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const HomeCard = ({ item }: { item: any }) => {
  return (
    <Card className='lg:col-span-4 xl:col-span-3 max-md:col-span-6 max-lg:col-span-6 max-sm:col-span-12 justify-around'>
      <CardContent className='flex relative gap-3 items-center'>
        <div className='rounded-full p-3 bg-accent border-1'>
          <img src={school} className='h-10' />
        </div>
        <div>
          <h1>{item.no}</h1>
          <div className='text-sm'>{item.title}</div>
        </div>
        <div className='absolute right-3 top-2'>
          <EllipsisVertical />
        </div>
      </CardContent>
      <CardFooter className='flex flex-col items-start gap-1'>
        <div className='text-sm text-gray-600'>Number of School</div>
        <Progress className='h-[2px]' value={100} indicatorColor={item.indicator} />
      </CardFooter>
    </Card>
  )
}

export default HomeCard