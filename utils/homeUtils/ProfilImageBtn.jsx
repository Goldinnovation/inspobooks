'use client'
import React, { useState } from 'react'
import styles from '@styles/usercontentstyle.module.css'
import happyprofilIcon from '@assets/happy.png'
import Image from 'next/image'
import { use } from 'passport'
import CameraIcon from '@assets/camera.png'

const ProfilImageBtn = () => {

    const [profilImagepreview, setProfilImagePreview] = useState(null)
    const [previewArea, setPreviewArea] = useState(false)
    const [uplaodImage, setUploadImage] = useState({
        UserProfilImage:""
    })




    const handleUploadClick = () => {

        document.getElementById('uplaodProfilImageInput').click()
    }


    const handletoggle = () => {
        setPreviewArea(!previewArea)

    }


    const handleUplaodImage = (e) => {
        
        const file = e.target.files[0]
        

        if(file){
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilImagePreview(reader.result);
                setUploadImage(profilImagepreview =>({...profilImagepreview, UserProfilImage: file}))
            }

            if (file && (file.type.match(/image\/jpeg/) || file.type.match(/image\/png/))){
                reader.readAsDataURL(file);
            }
            else {
                console.error('Invalid file type. Only JPEG and PNG are supported.');
              }
        }


    }

    const handleCloseCLick = () => { 
        setProfilImagePreview(null)
        setPreviewArea(false)
    }

    const handleSubmit  = async(e) => {
        e.preventDefault();

        const formData = new FormData(); 
        formData.append('UserProfilImage', uplaodImage.UserProfilImage)


        try{
            const res = await fetch('http://localhost:3000/api/user',{
                method:'POST', 
                body: formData

            })
            if(!res.ok){
                throw new Error(`res issue ${res.status}`)
            }

            const data = await res.json(); 
            console.log(data)
            setProfilImagePreview(null)
            setPreviewArea(false)

          
           

        }catch(error){
            console.error('Send Error, Fetch', error)

        }
        

    }


  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className={styles["profilPicSection"]}>
            <input type="file" className="UserProfilImage" id='uplaodProfilImageInput'  onChange={handleUplaodImage} hidden/>
           
                
                <Image
                src={happyprofilIcon}
                className='happyProfilIcon'
                alt='defaul profil Image'
                width={100}
                height={100}
                
                />
                    
                

            </div>

            {previewArea &&(
                <div className={styles["previewSection"]}>
                    <div onClick={handleCloseCLick} className={styles["previewSectionCloseBtn"]}>x</div>
                    <div className={styles["previewSectionImage"]}>
                    {profilImagepreview && <Image src={profilImagepreview} alt="Uploaded ProfilImage" width={150} height={150}  border-radius={10} />}
                    </div>
                    <div className={styles["previewSectionBtn"]}>
                    <button  type='button' onClick={handleUploadClick} className={styles["previewBtntryAgain"]}>Upload</button>
                    <button  onClick={handleSubmit} className={styles["previewBtnSubmit"]} >Submit</button>
                       
                    </div>
                </div>
            )}

            <div className={styles["BtnSection"]}>
            <div  onClick={handletoggle} className={styles["uploadprofilImageBtn"]}><Image src={CameraIcon} height={20} width={20}/></div>
            </div>
        
       


        </form>
       
    </div>
  )
}

export default ProfilImageBtn