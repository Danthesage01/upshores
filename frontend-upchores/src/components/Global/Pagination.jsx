const Pagination = ({
  currentPage,
  totalPosts,
  postsPerPage,
  paginate,
  nextPage,
  prevPage,
  totalPages,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div className=" absolute bottom-8 left-1/2 transform -translate-x-1/2 h-[48px] w-[312px] shadow-[0px_8.46px_42.32px_rgba(145,145,145,0.2)] bg-white rounded-[18px] mx-auto flex justify-between items-center px-2">
      <div
        onClick={prevPage}
        disabled={currentPage === 1}
        className={`w-[32px] h-[32px] ${
          currentPage === 1 ? "cursor-not-allowed" : "cursor-pointer"
        }  border-[#F1F1F1] border bg-primary-500 hover:bg-primary-700 flex justify-center items-center rounded-[8px]`}
      >
        <span>
          <svg
            width="5"
            height="9"
            viewBox="0 0 5 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.06 8.65234L5 7.71234L1.94667 4.65234L5 1.59234L4.06 0.652344L0.0599996 4.65234L4.06 8.65234Z"
              fill="white"
            />
          </svg>
        </span>
      </div>

      <div className=" flex justify-center items-center  gap-3">
        <p>Page</p>

        {/* Page Selector */}
        {currentPage ? (
          <div className="w-[70px] h-[32px] border focus-within:ring-1 border-[#DDDDDD] rounded-[8px] flex justify-center items-center  gap-4">
            <select
              value={currentPage}
              onChange={(e) => paginate(Number(e.target.value))}
              className="bg-transparent border-none cursor-pointer focus:right-0 focus:border-none focus:outline-none text-center outline-none  border-0 focus:border-0 focus:ring-0"
            >
              {pageNumbers.map((number) => (
                <option
                  key={number}
                  value={number}
                >
                  {number}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="w-[70px] h-[32px] border-[#DDDDDD] border rounded-[8px] flex justify-center items-center  gap-4">
            <span>1</span>

            <span>
              <svg
                width="11"
                height="7"
                viewBox="0 0 11 7"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.21655 0.884379C9.35799 0.73573 9.54899 0.652344 9.74803 0.652344C9.94708 0.652344 10.1381 0.73573 10.2795 0.884379C10.3493 0.957373 10.4048 1.04438 10.4427 1.14034C10.4805 1.2363 10.5 1.33929 10.5 1.44332C10.5 1.54734 10.4805 1.65033 10.4427 1.74629C10.4048 1.84225 10.3493 1.92926 10.2795 2.00225L6.03202 6.42068C5.89026 6.56912 5.69913 6.65234 5.5 6.65234C5.30087 6.65234 5.10974 6.56912 4.96798 6.42068L0.720486 2.00225C0.650654 1.92926 0.595199 1.84225 0.557346 1.74629C0.519493 1.65033 0.5 1.54734 0.5 1.44332C0.5 1.33929 0.519493 1.2363 0.557346 1.14034C0.595199 1.04438 0.650654 0.957373 0.720486 0.884379C0.861925 0.73573 1.05292 0.652344 1.25197 0.652344C1.45101 0.652344 1.64201 0.73573 1.78345 0.884379L5.50163 4.50795L9.21655 0.884379Z"
                  fill="#333333"
                />
              </svg>
            </span>
          </div>
        )}

        {currentPage ? (
          <p>
            {currentPage} of {totalPages}
          </p>
        ) : (
          <p>1 of 1</p>
        )}
      </div>

      <div
        onClick={nextPage}
        disabled={currentPage * postsPerPage >= totalPosts}
        className={`w-[32px] h-[32px] bg-primary-500 ${
          currentPage * postsPerPage >= totalPosts
            ? "cursor-not-allowed"
            : "cursor-pointer"
        } border-[#F1F1F1] hover:bg-primary-700 rounded-[8px] flex justify-center items-center`}
      >
        <svg
          width="5"
          height="9"
          viewBox="0 0 5 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.94 0.652344L0 1.59234L3.05333 4.65234L0 7.71234L0.94 8.65234L4.94 4.65234L0.94 0.652344Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default Pagination;
