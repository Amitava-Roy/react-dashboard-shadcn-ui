import { Input } from "@/components/ui/input";

type SearchProps = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export default function Search({ query, setQuery }: SearchProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center py-4">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value?.toLowerCase())}
        placeholder="Search for Title & Keywords..."
        className="w-full sm:max-w-sm mb-2 sm:mb-0 sm:mr-4"
      />
    </div>
  );
}
