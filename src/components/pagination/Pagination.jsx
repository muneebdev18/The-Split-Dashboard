import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Pagination = ({ totalPost, postPerPage, setCurrentPage, currentPage, temp }) => {
    const Prev = () => {
        if (currentPage >= 2) {
            setCurrentPage(currentPage - 1);
        }
    }

    const Next = () => {
        if (currentPage < totalPost / postPerPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    return (
        <div>
            <div className='flex flex-row justify-center items-center overflow-hidden sm:pt-0 xsm:pt-4'>
                <div className='rounded-[8px]'>
                    <button onClick={Prev} className='border-2 border-[#5d687a] text-white rounded-lg p-2 cursor-pointer'>
                        <MdKeyboardArrowLeft size={20} color='#ffffff' />
                    </button>
                </div>
                <div className='flex flex-row px-2'>
                    <p className='text-gray-100 text-[15px] font-bold'>{currentPage}/{postPerPage}</p>
                </div>
                <div className='rounded-[8px]'>
                    <button
                        onClick={Next}
                        className="border-2 border-[#5d687a] text-white rounded-lg p-2 cursor-pointer"
                        disabled={temp >= totalPost}
                    >
                        <MdKeyboardArrowRight size={20} color='#ffffff' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Pagination;