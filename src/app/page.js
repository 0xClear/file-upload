"use client"
import styles from "./page.module.css";
import axios from "axios";
import { useState } from "react";
import Modal from "@/component/Modal/Modal";
import { IonIcon } from '@ionic/react';
import { fileTrayOutline, paperPlaneOutline  } from 'ionicons/icons';  // Correct icon name
import Image from "next/image";


//table function 
const Table=({theader, data, columns})=>{
  //const {theader, data, columns}= props
  return <div>
    {/*
    table component 
    */}
    <table className="table striped bordered">
      <thead scope="col">
        <tr>
          {
            theader.map((hValue, hIndex)=>{
              return <th key={hIndex}>{hValue}</th>
            })
          }
        </tr>
      </thead>
      <tbody>
        {
          //data > col 
          //________________
          data.map(
            (tData, tIndex)=>{
              return <tr key={tIndex}>
                {
                  columns.map((colValue, colIndex)=>{
                    return <td key={colIndex}>{tData[colValue]} </td>
                  })
                }
              </tr>
            }
          )
        }
      </tbody>
    </table>
  </div>
}

export default function Home() {
  //image state 
  const [images, setImages] = useState('');
  const [files, setfile] = useState(); 
  const [fileInfo, setFileInfo] = useState(null);

  // const getName= async()=>{
  //   const res = await axios.post('api/auth')
  //   setResult(res?.data?.name)
  // }
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const getInfo= async()=>{
    const res = await axios.get('api/auth')
    setUsers(res?.data)
    console.log("data",users)
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
    const selectedfile= eve.target.files[0]
    if(selectedfile){
      setfile(selectedfile) //store file in state 


      //extract dataInformation 
      const name = selectedfile.name;
      const type = selectedfile.type;
      const size = selectedfile.size;
      setFileInfo({name, type, size}) 

      const reader = new FileReader();
      reader.readAsDataURL(selectedfile);
      reader.onload = ()=>{
        setImages(reader.result)
      }
      reader.onerror = ()=>{
        console.log("failure ")
      }
      console.log("uploaded file ", selectedfile)
    }

  }
  return (<div className="container pt-4">
    {/* <button className="btn btn-outline-primary" onClick={getName}>Get Name </button> */}


    <div>
      <button onClick={getInfo} className="btn btn-outline-danger" >get user Info</button>
    </div>
    <div>
      <div>
        <input  type="file" onChange={handleChange}/>
        <div className=" flex justify-end">

          <img src={images} width={200} height={200} alt="Profile" />
          {fileInfo &&  <div className="p-2 border bg-slate-300" >
            <p>{fileInfo.name}</p>
            <p>{fileInfo.type}</p>
            <p>{fileInfo.size}</p>
          </div>}
        </div>
      </div>
      <button onClick={saveImage} className="btn btn-primary" >Save Image</button>
      <button className="btn btn-outline-success m-3"onClick={()=>setOpen(true)}>
            <IonIcon icon={fileTrayOutline} color="dark" size="100"/> Contact
      </button>
    </div>

    <Modal open={open} onClose={() => setOpen(false)}>
        <div className="text-center w-96">
          <Image src="/images/select.svg" alt="my icon" width={150} height={150} className="mx-auto" />
          <div className="mx-auto my-4 w-48">
            <h3 className="text-lg font-black text-gray-800">Modal Heading</h3>
          </div>
          <div className="flex gap-4">
            <button className="btn btn-outline-success w-32 text-center mx-auto">Send</button>
          </div>
        </div>

    </Modal>
  

      <Table className="table"
        theader={["Name", "Role", "Location", "Hash ID"]}
        data={users} // Assuming 'users' is an array of user objects
        columns={["name", "rno", "loc", "_id"]} // Specify the column names based on the data structure
      />
  </div>
  );
}
