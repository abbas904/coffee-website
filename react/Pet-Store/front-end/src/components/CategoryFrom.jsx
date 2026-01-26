const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = "Submit",
  handleDelete,
}) => {
  return (
    <div className="p-3 sm:p-4 md:p-5">
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <input
          type="text"
          className="py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg w-full border border-petPrimary focus:outline-none focus:ring-2 focus:ring-petPrimary"
          placeholder="Write category name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row gap-2  sm:gap-4 sm:justify-between">
          <button
            type="submit"
            className="w-full sm:w-auto bg-petPrimary text-white py-2 px-4 rounded-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
          >
            {buttonText}
          </button>

          {handleDelete && (
            <button
              type="button"
              onClick={handleDelete}
              className="w-full sm:w-auto bg-petPrimary text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
