import './selectOption.css';

const SelectOptionCard = ({ CATEGORY_DATA, isLoading,setValues,values }) => {


  const handleOptionChange = (e) => {
  
    setValues({...values,category:e.target.value})
  };

  
  return (
    <div>
      <p className="font-semibold text-[15px] mb-2">Select Types:</p>
      <div className="radio-inputs">
        {isLoading && (
          <>
           
              <div role="status" className="max-w-sm animate-pulse">
                <div className="h-6 bg-gray-200 rounded-md dark:bg-gray-500 w-full mb-4"></div>
              </div>
            
          </>
        )}
        {
          CATEGORY_DATA?.map((item, index) => {
            return (
              <>
                <label className="radio" key={index}>
                  <input
                    type="radio"
                    name="radio"
                    value={item?.category}
                    checked={values?.category === item?.category}
                    onChange={handleOptionChange}
                  />
                  <span className="name capitalize">{item?.category}</span>
                </label>
              </>
            )
          })
        }

      </div>
    </div>
  );
};

export default SelectOptionCard;
