import React, { useState } from 'react'
import { IonIcon } from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import Image from 'next/image';
import Modal from '../Modal/Modal';
import Input from '@/common/Input';


//dynamic form-component
const DynamicForm =({fields})=>{
  return(
    <form className='space-y-4'>
      {
        fields.map((field, index)=>{
          if(field.type==='textarea'){
            return(
              <div key={index}>
                <label htmlFor={field.name} className=' block text-left text-[16px] font-medium text-gray-700' >
                  {field.placeholder}
                </label>
                <textarea 
                  name={field.name}
                  rows={field.rows || 4}
                  placeholder={field.placeholder}
                  required={field.required}
                  className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
                />
              </div>
            )
          }
          //input component from common
          return(
            <div key={index}>
              <label htmlFor={field.name} className='block text-left text-[16px] font-medium text-gray-700'>
                {field.placeholder}
              </label>
              <Input
                name={field.name}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
              />
            </div>
          )
        })
      }
      <div className='text-center'>
        <button type='submit' className='inline-flex justify-center px-4 py-2 text-white bg-[#08061a] rounded-lg shadow-sm hover:bg-[#181346] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'>
          Absenden
        </button>
      </div>
    </form>
  )
}

const ContactForm = () => {
    //form Input 
    const [formData, setFormData] =useState({
        name: '',
        email: '',
        message: '',
        subject: '', //for dropdown menu 
    });
    //Error validation
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        message: '',
        subject: '', //for error 
    });
    //submit validation
    const [isSubmitting, setIsSubmitting] =useState(false);

    //formular structure 
    const formFields = [
      {name: 'name', type: 'text', placeholder:'Ihre Name', required: true },
      {name: 'email', type: 'email', placeholder: 'Ihre E-Mail-Adresse', 
        required: true },
      {name: 'subject', type: 'text', placeholder: 'Betreff', 
        required: false 
      },
      { 
        name: 'message', 
        type: 'textarea', 
        placeholder: 'Ihre Nachricht', 
        required: true, 
        rows: 5 
      },
    ]

  return (
    <div className='p-4'>
      <DynamicForm fields={formFields} />
    </div>
  )
}

export default ContactForm