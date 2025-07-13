import type { ChangeEventHandler, Ref } from "react";
import Search from "../icons/Search";

function SearchBox({
  onChange,
  ref
}: {
  onChange: ChangeEventHandler<HTMLInputElement>;
  ref: Ref<HTMLInputElement>
}) {
  return (
    <div className="search-wrapper">
      <div className="search-box">
        <Search color="var(--grey)" size={15} />
        <input ref={ref} type="text" placeholder="Search" onChange={onChange} />
      </div>
    </div>
  );
}

export default SearchBox;
