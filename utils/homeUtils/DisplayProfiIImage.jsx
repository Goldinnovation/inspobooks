'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import style from '@styles/usercontentstyle.module.css'
import happyprofilIcon from '@assets/happy.png'
import { getData } from '@components/homeComponents/CalenderContent'
import useSWR, { preload } from 'swr'
import testProfpIC from '@assets/defaultPic2.jpg'



// export const getImage = async() => {

//     try{

//         const res = await fetch('http://localhost:3000/api/user', {
//             method:'GET',    
           
//         })

//     if(!res.ok){
//         console.log('res Error, ')
//         throw new Error(error)

//     }
//     const data = await res.json()
//     return data

//     }catch(error){

//         console.log('GET Profil-Image Fetch Error',error)
//     }

    

// }








const fetcher = (url) => fetch(url).then((res) => res.json())



  const DisplayProfiIImage = () => {
    const {data: profilImageData,error,mutate} = useSWR('http://localhost:3000/api/user', fetcher, {
        refreshInterval: 500,
    })


    
//    const [profilImageData, setProfilImageData] = useState(null)
   
//    const data = await getImage() 
//    setProfilImageData(data)
  



    // useEffect(() => {
    //     const fetchUserProfilPic = async() => {
    //         const data = await getImage()

    //         console.log(data)
    //         setProfilImageData(data)


    //     }

    //     const intervalId = setInterval(fetchUserProfilPic, 5000)
    //     fetchUserProfilPic()

    //     return () => clearInterval(intervalId)
    // }, [])



  return (
    <div>
        
        <div className={style["ImageSection"]}>
           
           
           { profilImageData ? (
            <div className={style["ProfilpiContainer"]}>
               
                 <Image 
                 src={`/${profilImageData.pictureUrl}`}
                 className={style["pictureUrl"]}
                 alt='uploaded Image'
                 fill
                quality={100}
                priority
                
                />
                
            </div>
           ) : (
            <Image
            src={testProfpIC}
            className={style["happyProfilIcon"]}
            alt='default profil Image'
            // fill
            width={130}
            height={130}
            quality={100} />
           )}
        </div>
      
    </div>
  )
}




export default DisplayProfiIImage
// export const dynamic = 'force-dynamic'
