function FilterDetailSection({
  title,
  options,
  selectedOptions,
  onSelect,
  onTitleClick,
}) {
  return (
    <div className="flex w-full border-b-2 border-gray-300 p-4 last:border-0">
      <div
        onClick={onTitleClick}
        className="flex justify-center w-1/12 mt-2 font-bold cursor-pointer"
      >
        {title}
      </div>
      <div className="flex w-11/12 flex-wrap">
        {options.map((option) => (
          <div
            key={option.ko}
            className="flex items-center justify-center w-1/5 p-2"
          >
            <button
              className={`w-full text-center whitespace-nowrap rounded-lg transition-colors ${
                selectedOptions[option.ko]
                  ? "text-black"
                  : "font-light text-gray-400"
              }`}
              onClick={() => onSelect(option.ko)}
            >
              {option.ko}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FilterDetailSection;
