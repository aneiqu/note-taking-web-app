import Form from "next/form";

interface FormTypes {
  children: React.ReactNode;
  buttonText: string;
  formAction: (formData: FormData) => Promise<void>;
}

export default async function AuthForm({ children, buttonText, formAction }: FormTypes) {
  async function handleSubmit(formData: FormData) {
    "use server";
    await formAction(formData);
  }

  return (
    <Form className='flex flex-col gap-4 mt-6 w-full' action={handleSubmit}>
      {children}
      <button
        type='submit'
        className='text-preset-3 py-3 bg-blue-500 hover:bg-blue-700 focus:ring-2 ring-offset-2 ring-neutral-400 text-white rounded-(--radius-8) cursor-pointer duration-200 dark:ring-offset-neutral-950'
      >
        {buttonText}
      </button>
    </Form>
  );
}
