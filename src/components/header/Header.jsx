// import styles from './style.module.css'
const Header = ({title}) => {
  return (
   <div className='w-full bg-gray-800 h-16  backdrop-blur-md shadow-lg border-b border-gray-700 flex flex-col justify-center '>
    <div className='px-6'>
        <p className={`font-semibold text-[20px] sm:text-2xl lg:text-3xl`}>{title}</p>
    </div>
   </div>
  )
}

export default Header