'use client';
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';

export default function ImagePicker({label, name}) {
    const imageInput = useRef();
    const [pickedImage, setPickedImage] = useState();
    const handlePickImage = () => {
        imageInput.current.click();
    }
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(!file) {
            setPickedImage(null);
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            setPickedImage(reader.result);
        }
        reader.readAsDataURL(file);
    }
    return (
      <div className={classes.picker}>
          <label htmlFor={name}>{label}</label>
          <div className={classes.controls}>
            <input className={classes.input} required type="file" id={name} name={name} ref={imageInput} onChange={handleImageChange} accept=".jpg,.png,.jpeg" />
            <button className={classes.button} type="button" onClick={handlePickImage}>Pick Image</button>
          </div>
          <div className={classes.preview}>
            {pickedImage && <Image src={pickedImage} alt="Picked" fill />}
            {!pickedImage && <p>No image picked yet.</p>}
          </div>  
      </div>
    );
}