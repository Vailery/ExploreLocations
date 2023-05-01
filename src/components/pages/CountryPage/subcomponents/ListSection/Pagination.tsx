import clsx from "clsx";

interface PaginationProps {
  currentRow: number;
  setCurrentRow: React.Dispatch<React.SetStateAction<number>>;
  pagesOffset: number;
  refetch: () => void;
}

export const Pagination = ({
  currentRow,
  setCurrentRow,
  pagesOffset,
  refetch,
}: PaginationProps) => (
  <div className="rounded-md bg-white">
    <div className="grid max-w-xl grid-cols-7 gap-2 px-3 py-2 shadow-sm lg:px-7">
      <span
        className={clsx(
          "cursor-pointer select-none rounded-md bg-bodyBg py-4 text-center font-bold",
          currentRow === 0 && "bg-buttonBg text-white"
        )}
        onClick={() => {
          setCurrentRow(0);
          refetch();
        }}
      >
        1
      </span>
      {pagesOffset > 1 && (
        <span
          className={clsx(
            "cursor-pointer select-none rounded-md bg-bodyBg py-4 text-center font-bold",
            currentRow === 1 && "bg-buttonBg text-white"
          )}
          onClick={() => {
            currentRow < 4 && setCurrentRow(1);
            refetch();
          }}
        >
          {currentRow < 4 ? 2 : "..."}
        </span>
      )}
      {pagesOffset > 2 && (
        <span
          className={clsx(
            "cursor-pointer select-none rounded-md bg-bodyBg py-4 text-center font-bold",
            currentRow === 2 && "bg-buttonBg text-white"
          )}
          onClick={() => {
            currentRow < 4
              ? setCurrentRow(2)
              : currentRow >= pagesOffset - 4
              ? setCurrentRow(pagesOffset - 5)
              : setCurrentRow(currentRow - 1);
            refetch();
          }}
        >
          {currentRow < 4
            ? 3
            : currentRow >= pagesOffset - 4
            ? pagesOffset - 4
            : currentRow}
        </span>
      )}
      {pagesOffset > 3 && (
        <span
          className={clsx(
            "cursor-pointer select-none rounded-md bg-bodyBg py-4 text-center font-bold",
            (currentRow === 3 ||
              (currentRow >= 4 && currentRow <= pagesOffset - 4)) &&
              "bg-buttonBg text-white"
          )}
          onClick={() => {
            currentRow < 4
              ? setCurrentRow(3)
              : currentRow >= pagesOffset - 4 && setCurrentRow(pagesOffset - 4);
            refetch();
          }}
        >
          {currentRow < 4
            ? 4
            : currentRow >= pagesOffset - 4
            ? pagesOffset - 3
            : currentRow + 1}
        </span>
      )}
      {pagesOffset > 4 && (
        <>
          <span
            className={clsx(
              "cursor-pointer select-none rounded-md bg-bodyBg py-4 text-center font-bold",
              currentRow === pagesOffset - 3 && "bg-buttonBg text-white"
            )}
            onClick={() => {
              currentRow < 4
                ? setCurrentRow(4)
                : currentRow > pagesOffset - 5
                ? setCurrentRow(pagesOffset - 3)
                : setCurrentRow(currentRow + 1);
              refetch();
            }}
          >
            {currentRow < 4
              ? 5
              : currentRow >= pagesOffset - 4
              ? pagesOffset - 2
              : currentRow + 2}
          </span>
          <span
            className={clsx(
              "cursor-pointer select-none rounded-md bg-bodyBg py-4 text-center font-bold",
              currentRow === pagesOffset - 2 && "bg-buttonBg text-white"
            )}
            onClick={() => {
              currentRow >= pagesOffset - 4 && setCurrentRow(pagesOffset - 2);
              refetch();
            }}
          >
            {currentRow >= pagesOffset - 4 ? pagesOffset - 1 : "..."}
          </span>
          <span
            className={clsx(
              "cursor-pointer select-none rounded-md bg-bodyBg py-4 text-center font-bold",
              currentRow === pagesOffset - 1 && "bg-buttonBg text-white"
            )}
            onClick={() => {
              setCurrentRow(pagesOffset - 1);
              refetch();
            }}
          >
            {pagesOffset}
          </span>
        </>
      )}
    </div>
  </div>
);