export const Button = ({ array, nextPage }) => {
  console.log(array)
  if (array.length !== 0) {
    const handleClick = () => {
      nextPage();
    };
    return ( 
      <button type="button" onClick={handleClick}>
        Load more
      </button>
    );
  } else {
    return null;
  }
};