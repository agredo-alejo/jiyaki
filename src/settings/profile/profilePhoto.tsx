import React, { useState, useRef } from 'react'
import "./profilePhoto.scss"
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { updateDoc } from 'firebase/firestore';
import { useAuth } from '../../shared/authContext';
import DeleteIcon from '@mui/icons-material/Delete';
import { FaUserCircle } from 'react-icons/fa';
import { useClickOutside } from '../../shared/utils';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


function ProfilePhoto() {
    const { dbUser } = useAuth()
    const [showSelectOption, setShowSelectOption] = useState(false)


    const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0]
        if (!file) return

        const photoRef = ref(storage, file.name)
        setShowSelectOption(false)
        await uploadBytes(photoRef, file)

        let photoURL = await getDownloadURL(photoRef)

        await updateDoc(dbUser?.ref, {
            photoURL: photoURL
        })
    }



    return (<>
        <div className={`${showSelectOption ? "modal" : "hide"}`}>
            <UpdatePhotoModal modalState={[showSelectOption, setShowSelectOption]} />
        </div>

        <div className="profileImgContainer">
            <div onClick={() => setShowSelectOption(true)} className="profileImg">

                {
                    dbUser?.photoURL === "" || !dbUser.photoURL ?
                        <FaUserCircle /> :
                        <img src={dbUser?.photoURL} />
                }


                <input className="hide" type="file" accept="image/*" onChange={imageHandler} id="profilePhotoInput" />


            </div>
        </div>
    </>)
}

export default ProfilePhoto





function UpdatePhotoModal({ modalState }: any) {
    const [showSelectOption, setShowSelectOption] = modalState
    const { dbUser } = useAuth()

    const [showConfirm, setShowConfirm] = useState(false)



    const deleteProfilePicture = async () => {
        await updateDoc(dbUser?.ref, {
            photoURL: ""
        })
    }


    const selectOptionRef = useRef<null | HTMLDivElement>(null)
    useClickOutside(selectOptionRef, () => {
        setShowSelectOption(false)
        setShowConfirm(false)
    })
    return (
        <div ref={selectOptionRef} className="profileImgSelectOption">
            <div className={`${showConfirm ? "hide" : "selectOptionBody"}`}>

                <h3>Selecciona una opcion</h3>
                <span>
                    <p>Subir foto</p>
                    <label htmlFor="profilePhotoInput">
                        <CloudUploadIcon className="profileIcon editIcon" />
                    </label>
                </span>
                <span>
                    <p>Eliminar foto </p>
                    <DeleteIcon className={`profileIcon ${dbUser?.photoURL != "" ? "deleteIcon" : "hide"}`} onClick={() => { setShowConfirm(true) }} />
                </span>
            </div>
            <span className={`${showConfirm ? "confirmDelete" : "hide"}`}>
                <p >Eliminar foto de perfil</p>
                <div className="deleteButtons">

                    <button onClick={() => { setShowConfirm(false) }} >Cancelar</button>
                    <button onClick={deleteProfilePicture} >Confirmar</button>
                </div>
            </span>
        </div>
    )

}
