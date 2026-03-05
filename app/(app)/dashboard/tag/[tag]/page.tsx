import data from "@/app/assets/data/data.json";

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export default async function Tag({ params }: TagPageProps) {
  const { tag } = await params;
  const currentTag = decodeURIComponent(tag).toLowerCase();

  const filteredNotes = data.notes.filter(
    (note) => !note.isArchived && note.tags.some((tag) => tag.toLowerCase() === currentTag),
  );

  return <div></div>;
}
