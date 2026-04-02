import { SVGProps } from "react";

interface OptionTypes {
  Icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  optionTitle: string;
  optionDescription: string;
  radioName: string;
  variant: "stroke" | "fill";
}

export default function SettingsOption({
  Icon,
  optionTitle,
  optionDescription,
  radioName,
  variant,
}: OptionTypes) {
  return (
    <label className='flex p-4 items-center gap-4 bg-neutral-100 rounded-xl border border-neutral-200 cursor-pointer dark:bg-neutral-950 dark:border-neutral-700'>
      <div className='p-2 bg-white rounded-xl border border-neutral-200 dark:bg-neutral-950 dark:border-neutral-700'>
        <Icon
          className={`${variant === "stroke" ? "dark:**:stroke-white" : "dark:**:fill-white"}`}
        />
      </div>
      <div>
        <h3 className='text-preset-4 dark:text-white'>{optionTitle}</h3>
        <p className='text-preset-6 text-neutral-700 dark:text-neutral-300'>{optionDescription}</p>
      </div>
      <input
        type='radio'
        name={radioName}
        className='appearance-none w-3 h-3 border-2 border-neutral-200 dark:border-neutral-600 rounded-full bg-white dark:bg-neutral-950 focus:border-blue-500 focus:border-4 duration-200 ml-auto'
      />
    </label>
  );
}
