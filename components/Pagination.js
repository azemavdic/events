import Link from "next/link";

export const PER_PAGE = 5;

const Pagination = ({ page, total }) => {
  const lastPage = Math.ceil(total / PER_PAGE);
  return (
    <div>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className='btn-secondary'>Nazad</a>
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className='btn-secondary'>Naprijed</a>
        </Link>
      )}
    </div>
  );
};

export default Pagination;
