interface FormTypes {
  children: React.ReactNode;
  buttonText: string;
}

export default function AuthForm({ children, buttonText }: FormTypes) {
  return (
    <form className='flex flex-col gap-4 mt-6 w-full' action=''>
      {children}
      <button
        type='submit'
        className='text-preset-3 py-3 bg-blue-500 text-white rounded-(--radius-8) cursor-pointer'
      >
        {buttonText}
      </button>
    </form>
  );
}
