import SkeletonRow from "./SkeletonRow";

const SkeletonTable = ({ rows, columns }) => {
    return (
      <>
        {Array.from({ length: rows }).map((_, idx) => (
          <SkeletonRow key={idx} columns={columns} />
        ))}
      </>
    );
  };
  

  export default SkeletonTable;
 
  