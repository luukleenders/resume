import classNames from 'classnames';

export function Title({ className }: { className?: string }) {
  const heightClasses = `
  min-h-[100px]
  md:min-h-[116px]
  lg:min-h-[136px]
  xl:min-h-[156px]
  2xl:min-h-[200px]
`;

  return (
    <div
      className={classNames(
        'box-content flex items-end justify-start bg-white/30 px-4 py-8 backdrop-blur-lg lg:items-center dark:bg-slate-900/30',
        heightClasses,
        className
      )}
    >
      <span className='flex flex-col text-slate-900 dark:text-slate-50'>
        <h2 className='-mb-4 text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl'>
          <span className='font-semibold'>curriculum</span>
          <span className='font-light'>vitae</span>
        </h2>
        <h1 className='text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl'>
          <span className='font-light'>luuk</span>
          <span className='font-semibold'>leenders</span>
        </h1>
      </span>
    </div>
  );
}
