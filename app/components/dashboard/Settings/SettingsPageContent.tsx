import SaveIcon from "@/app/assets/icons/icon-checkmark.svg";
import CloseIcon from "@/app/assets/icons/icon-cross.svg";
import toast from "react-hot-toast";
interface NotePageParams {
  pageTitle: string;
  pageDescription: string;
  children: React.ReactNode;
  updateFunction: () => void;
}

export default function SettingsPageContent({
  pageTitle,
  pageDescription,
  children,
  updateFunction,
}: NotePageParams) {
  async function clickHandler() {
    updateFunction();
    toast(
      (t) => (
        <div className='flex items-center'>
          <p>Settings updated successfully!</p>
          <button onClick={() => toast.dismiss(t.id)}>
            <CloseIcon className='-mr-3 ml-5 cursor-pointer **:stroke-neutral-400 dark:**:stroke-neutral-800' />
          </button>
        </div>
      ),
      {
        icon: <SaveIcon className='**:fill-green-500' />,
      },
    );
  }

  return (
    <>
      <div className='flex flex-col gap-2 mt-3 mb-5'>
        <h2 className='text-preset-1 lg:text-preset-3 dark:text-white'>{pageTitle}</h2>
        <p className='text-preset-5 dark:text-neutral-300'>{pageDescription}</p>
      </div>
      <div className='flex flex-col gap-4'>{children}</div>
      <button
        onClick={clickHandler}
        className='text-preset-4 px-4 py-3 bg-blue-500 text-white rounded-lg mt-6 justify-self-end flex'
      >
        Apply Changes
      </button>
    </>
  );
}
