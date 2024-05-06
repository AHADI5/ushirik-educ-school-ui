import React from 'react';

export default function SchoolForm({ schoolData, schoolAddress, onSchoolChange , onSchoolAddressChange }) {
  return (
    <>
        <div className="school items-center">
           <div className='flex gap-3 justify-center items-center'>
                <div className="info">
                    <div className="pb-2">
                        <label htmlFor="name">
                        Nom <span className="text-red-500">*</span>
                        </label>
                    </div>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="w-full px-2 mb-5 py-1.5 rounded-lg border focus:outline-none focus:border-blue-500"
                        required
                        onChange={onSchoolChange}
                        value={schoolData.name}
                    />
                </div>
                <div className="info">
                    <div className="pb-2">
                        <label htmlFor="name">
                        Type <span className="text-red-500">*</span>
                        </label>
                    </div>
                    <select 
                         name="type"
                         id="name"
                         className="w-full px-4 mb-5 py-1.5 rounded-lg border focus:outline-none focus:border-blue-500"
                         required
                         onChange={onSchoolChange}
                         value={schoolData.type}
                        >
                        <option value="">Type</option>
                        <option value="PRIMARY">PRIMAIRE</option>
                        <option value="SECONDARY">SECONDAIRE</option>
                    </select>
                </div>
           </div>
           <div className="flex gap-3">
                <div className="info">
                    <div className="pb-2">
                        <label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                        </label>
                    </div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="w-full px-2 mb-5 py-1.5 rounded-lg border focus:outline-none focus:border-blue-500"
                        required
                        onChange={onSchoolChange}
                        value={schoolData.email}
                    />
                </div>
                <div className="info">
                    <div className="pb-2">
                        <label htmlFor="postalBox">
                        Boite Postale <span className="text-red-500">*</span>
                        </label>
                    </div>
                    <input
                        type="text"
                        name="postalBox"
                        id="postalBox"
                        className="w-full px-2 mb-5 py-1 rounded-lg border focus:outline-none focus:border-blue-500"
                        required
                        onChange={onSchoolChange}
                        value={schoolData.postalBox}
                    />
                </div>
           </div>
           <div className="flex gap-3">
                <div className="info">
                    <div className="pb-2">
                        <label htmlFor="schoolQuarter">
                        Quartier <span className="text-red-500">*</span>
                        </label>
                    </div>
                    <input
                        type="text"
                        name="schoolQuarter"
                        id="schoolQuarter"
                        className="w-full px-2 mb-5 py-1.5 rounded-lg border focus:outline-none focus:border-blue-500"
                        required
                        onChange={onSchoolAddressChange}
                        value={schoolAddress.schoolQuarter}
                    />
                </div>
                <div className="info">
                    <div className="pb-2">
                        <label htmlFor="schoolAvenue">
                        Avenue <span className="text-red-500">*</span>
                        </label>
                    </div>
                    <input
                        type="text"
                        name="schoolAvenue"
                        id="schoolAvenue"
                        className="w-full px-2 mb-5 py-1.5 rounded-lg border focus:outline-none focus:border-blue-500"
                        required
                        onChange={onSchoolAddressChange}
                        value={schoolAddress.schoolAvenue}
                    />
                </div>
            </div>
        </div>
        

        

    
    </>


  )
   
           
            
        
    
}
