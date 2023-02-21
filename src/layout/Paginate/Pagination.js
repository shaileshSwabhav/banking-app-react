import Pagination from 'react-bootstrap/Pagination';

const Paginate = (props) => {
  console.log(props);
  const pageCount = Math.ceil(props.totalCount / props?.limit)

  let items = [];
  for (let number = 0; number < pageCount; number++) {
    items.push(
      <Pagination.Item key={number} active={number === props.offset} onClick={() => props.onClick(number)}>
        {number + 1}
      </Pagination.Item>,
    );
  }


  return (
    <>
      <h2>Total: {props.totalCount}</h2>
      <Pagination>{items}</Pagination>
    </>
  );
}

export default Paginate;