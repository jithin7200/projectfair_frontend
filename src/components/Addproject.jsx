import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';

function Addproject() 
{
const [show, setShow] = useState(false);

const {setAddResponse} =useContext(addResponseContext)

const [projectDeatails,setProjectDeatails]=useState({
title:"",
language:"",
github:"",
website:"",
overview:"",
projectImage:""
})
const [preview,setPreview]= useState("")
const [token,setToken]=useState("")
const [key,setKey]= useState(1)

console.log(projectDeatails);
console.log(preview);
console.log(token);

const handleFile =(e)=>{
    // console.log(e.target.files[0]);
    setProjectDeatails({...projectDeatails,projectImage:e.target.files[0]})
    
}

const handleClose = () => {setShow(false);
handleCancel()
}
const handleShow = () => setShow(true);

const handleCancel =()=>{
  setProjectDeatails({
    title:"",
   language:"",
   github:"",
   website:"",
   overview:"",
   projectImage:""
  })
  setPreview("")
  if(key==1) {
    setKey(0)
  }
  else{
    setKey(1)
  }
}
const handleAdd = async()=>{
  const {title,language,github,website,overview,projectImage}=projectDeatails
  if(!title || !language || !github || !website || !overview|| !projectImage){
    toast.info('Please fill the form completely')
  }
  else{
    
     const reqBody = new FormData()

     reqBody.append("title",title)
     reqBody.append("language",language)
     reqBody.append("github",github)
     reqBody.append("website",website)
     reqBody.append("overview",overview)
     reqBody.append("projectImage",projectImage)


     if(token){
  const reqHeader ={
   "Content-Type":"multipart/form-data",
   "Authorization":`Bearer ${token}`

  }
  const result = await addProjectApi(reqBody,reqHeader)
  console.log(result);
  if(result.status==200){
    toast.success('Project added successfully')
      setTimeout(()=>{
        handleClose()
      },2003)
      setAddResponse(result)

  }
  else if(result.status==406)
  {
    toast.warning(result.response.data)
    handleCancel()
  }
  else{
    toast.error('something went wrong')
    handleClose()
  }
}
else{
  toast.warning('Please login')
   }
    }
}
 


useEffect(()=>{
if (projectDeatails.projectImage) {
 setPreview(URL.createObjectURL(projectDeatails.projectImage))
}
},[projectDeatails.projectImage])

useEffect(()=>{
if(sessionStorage.getItem("token")){
  setToken(sessionStorage.getItem("token"))
}
},[])
  return (
    <>
      <button onClick={handleShow} className='btn btn-success rounded-0'style={{backgroundColor:'rgb()62,179,24'}}>Add project</button>
      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
                <div className="col-md-6">
                    <label htmlFor="projectImage">
                        <input id='projectImage' type="file" style={{display:'none'}} key={key} onChange={(e)=>handleFile(e)}/>
                        <img src={preview?preview:"https://static.vecteezy.com/system/resources/previews/000/420/681/original/picture-icon-vector-illustration.jpg"} alt="no image" srcset="" className='w-100' />
                    </label>
                </div>
                <div className="col-md-6">
                    <div className="md-3">
                        <input type="text" value={projectDeatails.title} onChange={(e)=>setProjectDeatails({...projectDeatails,title:e.target.value})} placeholder='Title' className='form-control'/>
                    </div>
                    <div className="md-3">
                    <input type="text"     value={projectDeatails.language}onChange={(e)=>setProjectDeatails({...projectDeatails,language:e.target.value})} placeholder='Language' className='form-control'/>
                    </div>
                    <div className="md-3">
                    <input type="text"    value={projectDeatails.github} onChange={(e)=>setProjectDeatails({...projectDeatails,github:e.target.value})}placeholder='Github' className='form-control'/>
                    </div>
                    <div className="md-3">
                    <input type="text"    value={projectDeatails.website} onChange={(e)=>setProjectDeatails({...projectDeatails,website:e.target.value})}placeholder='Website' className='form-control'/>
                    </div>
                    <div className="md-3">
                        <textarea rows={5} value={projectDeatails.overview} onChange={(e)=>setProjectDeatails({...projectDeatails,overview:e.target.value})} className='form-control' placeholder='Overview'></textarea>
                    </div>
                </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
           Add
          </Button>
        </Modal.Footer>
        <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      </Modal>
      
    </>
  )
}

export default Addproject
