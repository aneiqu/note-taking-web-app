interface headerTypes {
  title: string;
  description: string;
}

export default function AuthHeader({ title, description }: headerTypes) {
  return (
    <div className='flex flex-col items-center'>
      <h2 className='text-preset-1 mb-2 dark:text-white'>{title}</h2>
      <p className='text-preset-5 text-neutral-600 dark:text-neutral-300'>{description}</p>
    </div>
  );
}
