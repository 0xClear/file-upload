"use client"
import Image from "next/image";
import styles from "./page.module.css";
import axios from "axios";
import { useState } from "react";

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
        </div>
      </div>
      <button onClick={saveImage} >Save Image</button>
    </div>


    {/*
    
    **
    user Info 
    */}
      <Table
        theader={["Name", "Role", "Location", "Hash ID"]}
        data={users} // Assuming 'users' is an array of user objects
        columns={["name", "role", "location", "hashId"]} // Specify the column names based on the data structure
      />
  </div>
  );
}
