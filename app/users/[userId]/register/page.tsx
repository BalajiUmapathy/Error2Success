import React from 'react'
import Image from 'next/image'



import Link from 'next/link';
import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patients.actions';

const Resgister = async  ({params:{userId}}: SearchParamProps) => {
 const user = await getUser(userId);

  return (
    <div 
      className="flex h-screen bg-cover bg-center relative"
      style={{ 
        backgroundImage: "url('/one.jpg')",
        backgroundSize: 'cover', 
        backgroundPosition: 'center'
      }}
    >
   
    <section className="remove-scrollbar container ">
      <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
       {/* our logo comes here */}
        {/* <Image
              src="/assets/icons/logo-full.svg"
              height={1000}
              width={1000}
              alt="patient"
              className="mb-12 h-10 w-fit"
        /> */}
         <RegisterForm user = {user} />   
            <p className="copyright py-12">
              © 2024 UrbanNet
            </p>
         
        </div>
      </section>

      
    </div>
  )
}

export default Resgister