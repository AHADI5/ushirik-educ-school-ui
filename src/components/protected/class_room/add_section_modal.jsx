import React, { useState } from 'react';
import ClassroomService from '../../../services/class_room_service';
import { useParams } from 'react-router-dom';

const CustomModalAddOption = ({ onClose }) => {
    const params = useParams();
    const { schoolID } = params;

    const [newOption, setNewOption] = useState({
        name: '',
        Description: '',
        schoolID: schoolID,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewOption({ ...newOption, [name]: value });
    };

    const handleSubmit = async (e) => {
        console.log(newOption)
        e.preventDefault();
        try {
            await ClassroomService.createClassroomOption(schoolID , newOption);
            console.log('Option ajoutée avec succès');
            onClose();
        } catch (error) {
            console.error('Erreur lors de l\'ajout de l\'option :', error);
        }
    };

    return (
        <div className="p-4 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-95 bg-white border shadow-sm rounded-xl w-auto">
                <div className="flex justify-between items-center  mb-3 py-1.5 px-4 border-b">
                    <h3 className="font-bold text-gray-800">
                        Ajouter une Option
                    </h3>
                    <button
                        type="button"
                        className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100"
                        onClick={onClose}
                    >
                        <span className="sr-only">Close</span>
                        <svg
                            className="flex-shrink-0 size-4"
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="M18 6 6 18" />
                            <path d="m6 6 12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-4 overflow-y-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="max-w-md space-y-3">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={newOption.name}
                                    onChange={handleInputChange}
                                    placeholder="Nom de l'Option"
                                    className=" mb-3 py-1.5 px-4 block w-full border border-gray-500 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="form-group">
                                <textarea
                                    name="Description"
                                    value={newOption.Description}
                                    onChange={handleInputChange}
                                    placeholder="Description de l'Option"
                                    className=" mb-3 py-1.5 px-4 block w-full border border-gray-500 rounded-lg focus:border-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="py-2 px-3 inline-flex items-center gap-x-2 font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700">Ajouter</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CustomModalAddOption;
