import { SearchBar } from "@/components/timeline/searchBar";
import { Post } from "@/components/timeline/post";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function TimelinePage() {
  return (
    <section>
      {/* <SearchBar /> */}
      <div className="grid grid-cols-6 gap-5 py-5 px-3">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="col-span-6 sm:col-span-3 lg:col-span-2">
            <Post />
          </div>
        ))}
      </div>
      <Pagination className="mt-5 mb-20">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
}
