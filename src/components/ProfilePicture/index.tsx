import pfp from '@/assets/pfp.png';
import classNames from 'classnames';

export function ProfilePicture({ className }: { className?: string }) {
  return (
    <div
      className={classNames(
        'relative h-[100px] min-h-[100px] w-[100px] overflow-hidden rounded-full bg-slate-500 md:h-[150px] md:min-h-[150px] md:w-[150px] lg:h-[200px] lg:min-h-[200px] lg:w-[200px]',
        className
      )}
    >
      <img
        src={pfp}
        alt='Profile picture'
        className='absolute top-[-10px] h-[150px] object-cover md:top-[-25px] md:h-[225px] lg:h-[300px]'
      />
    </div>
  );
}
