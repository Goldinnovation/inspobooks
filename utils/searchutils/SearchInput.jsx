"use client"
import searchstyle from '@styles/searchStyle/searchpagestyle.module.css'
import React, { useEffect, useState } from 'react'
import useSWR, { preload } from 'swr'
import Image from 'next/image'
import {debounce} from 'lodash'




const queryUser  = async(searchValue) => {
  try{
    const res = await fetch(`http://localhost:3000/api/search`, {
    method: "POST", 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({searchValue})

  })
  if(!res.ok){
    throw new Error('Invalid res')
  }
  const data = await res.json() 
  return data

  }catch(error){
    console.log('Fail to send information ');
    
  }
 
}




const getqueriedUser = async(userIdPicData) => {
  try{
    const res = await fetch(`http://localhost:3000/api/search/${userIdPicData}`,{
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
     

    })
    if(!res.ok){
      throw new Error('Invalid res')
    }
    const data = await res.json() 
    console.log(data)
    return data
   

  }catch(error){
    // throw new Error(error, "Fetch Error on requesting User on search")
    console.log( "Fetch Error getting User on search",error)
    throw error;
  

  }

}



const SearchInput = () => {

  const [searchValue, setSearchValue] = useState("");
  const [displayUserInfo, setDisplayUserInfo] = useState([])
  const [userIdPicData, setUserIdPicData] = useState("");
  const [displayUserPic, setdisplayUserPic] = useState(null)

  const handleChange = async(e) => {
    const value = e.target.value
    setSearchValue(value)
  
  }
  


  useEffect(() => {
    
      const fetchUserPic = async() => {

        if(userIdPicData !== ""){
          try{

            const userPicData =  await getqueriedUser(userIdPicData)
            setdisplayUserPic(userPicData)

          }catch(error){
              console.error("error fetching ther user pic", error)
          }
        }
     
        
      };


      const fetchUserInfo = async () => {

        try{
          const requestUserInfo = await queryUser(searchValue)
        setDisplayUserInfo(requestUserInfo)
    
       
        if (requestUserInfo.length > 0) {
          setUserIdPicData(requestUserInfo[0].userId)
        }



        }catch(error){
          console.log('Error fetching User input data', error);

        }
  
        
      }; 

      // debounce will execute the api request after a timeslot of 500 ms 

      const debounceFetch = debounce(fetchUserInfo, 500); 

      // debounce is based on the input, so every time there is certain pause the funciton will be executed 
      debounceFetch(searchValue)
    
      // Interval for a periodic fetch 
      const intervalId = setInterval(() => {
        fetchUserPic()
      }, 5000)
    
      // Initial fetch
      fetchUserPic()
     


      return () => {
        clearInterval(intervalId);
        debounceFetch.cancel()
      }
     
  }, [searchValue, userIdPicData])









  return (
    <div>

        <div className={searchstyle['searchContent']}>
        <input type="text" className={searchstyle['searchInput']}  
        onChange={handleChange}
        />
        {/* <button className={searchstyle['searchBtn']} >Search</button> */}
        </div>
       

        <div className={searchstyle['DisplayUserSection']}>
        {displayUserInfo.map((event,i) => (
          <div>
            <div key={i}>
             

              
            <div className={searchstyle['displayUserArea']}>
             
            {displayUserPic && (
            <div className={searchstyle['displayUserContent']}>
              <Image  className={searchstyle['DisplayImageContent']} src={`/${displayUserPic.pictureUrl}`} width={58} height={58} 
              quality={100}
              />

              <div className={searchstyle['displayUserName']}>
              {event.userName} 
              
              </div>
              <div className={searchstyle['searchFollowOption']}> 
                 folgen 
              </div>
            </div>
          )}

            </div>
          
             


             
              
            </div>
          </div>
        ))}

    
            
        </div>

          
      
    </div>

  )
}

export default SearchInput
