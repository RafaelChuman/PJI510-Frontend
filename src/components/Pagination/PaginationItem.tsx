interface PaginationItemProps {
  isCurrent?: boolean;
  number: number;
  onPageClick: (page: number) => void;
}

export function PaginationItem({
  isCurrent = false,
  number,
  onPageClick,
}: PaginationItemProps) {
  
  if (isCurrent) {
    return (<button type={"button"}  className="PaginationButton PaginationButtonSelected">{number}</button>);
  } else {
    return (
    
      <button type={"button"} className="PaginationButton" onClick={() => onPageClick(number)}>
        {number}
      </button>
    );
  }
  
}
