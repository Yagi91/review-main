export default function Paginator({
  count,
  max,
  setPageDetails,
  pageDetails,
}: {
  count: number;
  max: number;
  setPageDetails: any;
  pageDetails: any;
}) {
  const pages = Math.ceil(count / max);

  return (
    <div className="join ">
      {Array(pages)
        .fill(0)
        .map((_, idx) => {
          return (
            <>
              <button
              key={idx}
                onClick={() =>
                  setPageDetails({ ...pageDetails, currentPage: idx + 1 })
                }
                className={`join-item btn ${
                  pageDetails.currentPage === idx + 1 ? "btn-active" : ""
                } `}
              >
                {idx + 1}
              </button>
            </>
          );
        })}
    </div>
  );
}
