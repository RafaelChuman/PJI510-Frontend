import { DivPagination } from "./Pagination.styled";
import { PaginationItem } from "./PaginationItem";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageClick: (page: number) => void;
}

const siblingCount = 1;

function pagesToShow(
  totalCountOfRegisters: number,
  registersPerPage: number,
  currentPage: number
): number[] {
  let lastPage = (totalCountOfRegisters / registersPerPage) | 0;
  if (totalCountOfRegisters % registersPerPage > 0) {
    lastPage++;
  }

  const siblingsPages = 1;
  const firstPage = 1;

  const numberPagesToLastPage =
    lastPage - currentPage > siblingsPages
      ? siblingsPages
      : lastPage - currentPage;

  const numberPagesToFirstPage =
    currentPage - 1 > siblingsPages ? siblingsPages : currentPage - 1;

  let pagesGenerated = [
    ...new Array(numberPagesToFirstPage + 1 + numberPagesToLastPage),
  ].map((_, index) => {
    return currentPage - numberPagesToFirstPage + index;
  });

  if (pagesGenerated[0] != firstPage) {
    pagesGenerated = [firstPage, ...pagesGenerated];
  }

  if (pagesGenerated[pagesGenerated.length - 1] != lastPage) {
    pagesGenerated.push(lastPage);
  }

  return pagesGenerated;
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageClick,
}: PaginationProps) {
  const pages = pagesToShow(
    totalCountOfRegisters,
    registersPerPage,
    currentPage
  );

  const firtItem = registersPerPage * (currentPage - 1) + 1;
  const lastItem =
    registersPerPage * currentPage > totalCountOfRegisters
      ? totalCountOfRegisters
      : registersPerPage * currentPage;

  return (
    <DivPagination>
      <div>
      {pages.map((page) => {
          if (currentPage == page) {
            return (
              <PaginationItem
                key={page}
                isCurrent
                number={page}
                onPageClick={onPageClick}
              />
            );
          } else {
            return (
              <PaginationItem
                key={page}
                number={page}
                onPageClick={onPageClick}
              />
            );
          }
        })}
      </div>
        
      <div>
        {
          <p>
            <strong> {`${firtItem}-${lastItem} `} </strong> de {totalCountOfRegisters}
          </p>
        }
      </div>
    </DivPagination>
  );
}
