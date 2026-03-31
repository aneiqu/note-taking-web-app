interface SpecificationTypes {
  tagText: string;
  textType: "tag" | "search" | "archived";
}

export default function SpecificationText({ tagText, textType }: SpecificationTypes) {
  const formattedTag = tagText ? (
    <span className='text-neutral-950 dark:text-white'>
      ”{tagText[0].toUpperCase() + tagText.slice(1)}”
    </span>
  ) : (
    ""
  );

  const text = {
    tag: (
      <p className='text-neutral-700 dark:text-neutral-300'>
        All notes with the tag {formattedTag} are shown here.
      </p>
    ),
    archived: (
      <p className='text-neutral-700 dark:text-neutral-200'>
        All your archived notes are stored here. You can restore or delete them anytime.
      </p>
    ),
    search: (
      <p className='text-neutral-700 dark:text-neutral-300'>
        All notes matching {formattedTag} are displayed below.
      </p>
    ),
  };

  return <div className='text-preset-5'>{text[textType]}</div>;
}
