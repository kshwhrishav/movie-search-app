import React, { useEffect, useState } from "react";

const MovieSearch = () => {
  const [searchInput, setSearchInput] = useState(null);

  useEffect(() => {
    console.log(searchInput);
  },[searchInput]);

  const handleSearchInput = (value) => {
    setSearchInput(value);
  };
  return (
    <div className="flex flex-col justify-center items-center mt-[32px] gap-[32px]">
      <div className="font-[700] text-[32px]">Movie Search</div>
      
      <input
        type="text"
        className="b-2 border-[#3c59df]"
        value={searchInput}
        onChange={(e) => handleSearchInput(e?.target?.value)}
      />
    </div>
  );
};

export default MovieSearch;
