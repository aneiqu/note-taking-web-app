import Form from "next/form";

interface NotePageParams {
  pageTitle: string;
  pageDescription: string;
  children: React.ReactNode;
}

async function submitForm() {
  "use server";
  return;
}

export default async function SettingsPageContent({
  pageTitle,
  pageDescription,
  children,
}: NotePageParams) {
  return (
    <Form action={submitForm}>
      <div className='flex flex-col gap-2 mt-3 mb-5'>
        <h2 className='text-preset-1'>{pageTitle}</h2>
        <p className='text-preset-5'>{pageDescription}</p>
      </div>
      <div className='flex flex-col gap-4'>{children}</div>
      <button
        type='submit'
        className='text-preset-4 px-4 py-3 bg-blue-500 text-white rounded-lg mt-6 justify-self-end flex'
      >
        Apply Changes
      </button>
    </Form>
  );
}
