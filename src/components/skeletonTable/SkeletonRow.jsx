const SkeletonRow = ({ columns }) => {
    return (
      <tr className="border-b border-gray-600">
        {Array.from({ length: columns }).map((_, idx) => (
          <td key={idx} className="px-4 py-2">
            <div className="h-4 bg-gray-600 rounded animate-pulse"></div>
          </td>
        ))}
      </tr>
    );
  };

  
  export default SkeletonRow