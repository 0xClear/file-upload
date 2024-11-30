"use client"
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [result, setResult] = useState('')
  //image state 
  const [images, setImages] = useState('');
  const [files, setfile] = useState(); 

  const getName= async()=>{
    const res = await axios.post('api/auth')
    setResult(res?.data?.name)
  }

  const getInfo= async()=>{
    const res = await axios.get('api/auth')
    console.log("data", res)
  }

  //save image
  const saveImage= async(eve)=>{
    //saveImage 
    const formdata = new FormData();
    formdata.append("image", files)
    formdata.append('name', "UV")
    const res = await axios.post('api/upload', formdata, {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    })

    console.log("Formdata :", formdata, res)
  }

  //TODO upload image using multer 
  //handle input change
  const handleChange=(eve)=>{
    const file= eve.target.files[0]
    setfile(files)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>{
      setImages(reader.result)
    }
    reader.onerror = ()=>{
      console.log("failure ")
    }
    file
    console.log("uploaded file ",)

  }
  return (<div>
    <button onClick={getName}>Get Name </button>
    <h1>users:  {result}</h1>

    <div>
      <button onClick={getInfo}>get user Info</button>
    </div>
    <div>
      <div>
        <input  type="file" onChange={handleChange}/>
        <img src={images} width={100} height={100} />
      </div>
      <button onClick={saveImage} >Save Image</button>
    </div>
  </div>
  );
}
