import Image from 'next/image';
import classNames from 'classnames';

export function ProfilePicture({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        'relative h-[100px] min-h-[100px] w-[100px] overflow-hidden rounded-full bg-slate-500 md:h-[116px] md:min-h-[116px] md:w-[116px] lg:h-[136px] lg:min-h-[136px] lg:w-[136px] xl:h-[156px] xl:min-h-[156px] xl:w-[156px] 2xl:h-[200px] 2xl:min-h-[200px] 2xl:w-[200px]',
        className
      )}
    >
      <Image
        src='/pfp.png'
        alt='Profile picture'
        priority
        height={300}
        width={300}
        className='absolute top-[-10px] h-[150px] object-cover md:top-[-25px] md:h-[216px] lg:h-[236px] xl:h-[256px] 2xl:h-[300px]'
      />
    </div>
  );
}
