import React from 'react';

export default function DirectorForm({ directorData, directorAddress, onDirectorChange }) {
  return (
        <>
            <div className="director-info">
                <div className="flex gap-3">
                    <div className="info">
                        <div className="pb-2">
                            <label htmlFor="firstName" >
                                Nom <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        className="w-full px-4 py-1.5 mb-4 rounded-lg border focus:outline-none focus:border-blue-500"
                        required
                        onChange={onDirectorChange}
                        value={directorData.firstName}
                        />
                    </div>
                    <div className="info">
                        <div className="pb-2">
                            <label htmlFor="lastName"  >
                                Prenom <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        className="w-full px-4 py-1.5 mb-4 rounded-lg border focus:outline-none focus:border-blue-500"
                        required
                        onChange={onDirectorChange}
                        value={directorData.lastName}
                        />
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="info">
                        <div className="pb-2">
                            <label htmlFor="directorE mail" >
                                Email <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <input
                        type="email"
                        name="directorEmail"
                        id="directorEmail"
                        className="w-full px-4 py-1.5 mb-4 rounded-lg border focus:outline-none focus:border-blue-500"
                        required
                        onChange={onDirectorChange}
                        value={directorData.directorEmail}
                        />
                    </div>
                    <div className="info">
                        <div className="pb-2">
                            <label htmlFor="directorEmail" >
                                phone <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <input
                        type="tel"
                        name="directorPhone"
                        id="directorPhone"
                        className="w-full px-4 py-1.5 mb-4 rounded-lg border focus:outline-none focus:border-blue-500"
                        required
                        onChange={onDirectorChange}
                        value={directorData.directorPhone}
                        />
                    </div>

                </div>

                <div className="flex gap-3">
                    <div className="info">
                        <div className="pb-2">
                            <label htmlFor="quarter" > 
                                Quartier <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <input
                            type="text"
                            name="quarter"
                            id="quarter"
                            className="w-full px-4 py-1.5 mb-4 rounded-lg border focus:outline-none focus:border-blue-500"
                            required
                            onChange={onDirectorChange}
                            value={directorAddress.quarter}
                        />
                    </div>
                    <div className="info">
                        <div className="pb-2">
                            <label htmlFor="avenue" >
                                Avenue <span className="text-red-500">*</span>
                            </label>
                        </div>
                        <input
                        type="text"
                        name="avenue"
                        id="avenue"
                        className="w-full px-4 py-1.5 mb-4 rounded-lg border focus:outline-none focus:border-blue-500"
                        required
                        onChange={onDirectorChange}
                        value={directorAddress.avenue}
                        />
                    </div>
                </div>     
            </div>
        </>
  );
}
