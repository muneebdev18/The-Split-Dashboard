import { useEffect } from 'react'
import DotLoader from '../../components/dotLoader/DotLoader'
import {useNavigate} from 'react-router-dom'
import Logo from '../../assets/images/Group 1597883045.png'
const Splash = () => {
    const navigate = useNavigate() // Redirect to the desired page
    useEffect(()=>{
        setTimeout(()=>{
            navigate('/auth/login')
        },3000)
    },[])
  return (
    <div className='h-screen flex flex-col gap-9 justify-center items-center w-full bg-gradient-to-r from-#1F1F1F via-#3C3C3C to-#5F5F5F'>
        <img width={150} height={150} src={Logo} className='mb-5'/>  
        {/* <p className='text-[54px] font-semibold'>Logo</p> */}
        <DotLoader/>
    </div>
  )
}

export default Splash