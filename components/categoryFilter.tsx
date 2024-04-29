type Props = {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
  };
  
  const CategoryFilter: React.FC<Props> = ({ categories = [], selectedCategory, onSelectCategory }) => {
    return (
      <div className="categoryList scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
        {categories.map(category => (
          <div key={category} className="sm:border  sm:border-solid sm:border-zinc-700 sm:rounded-3xl sm:hover:bg-green-700 hover:text-slate-50">
            <button
              className={`catItems ${selectedCategory === category ? 'sm:bg-green-600 bg-zinc-800  text-white-A700 rounded-full' : ''}`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          </div>
        ))}
      </div>
    );
  };
  
  export default CategoryFilter;
  