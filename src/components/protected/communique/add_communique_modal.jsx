import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import ClassroomService from "../../../services/class_room_service";
import { useParams } from "react-router-dom";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};




const CreateCommuniqueModal = ({ isOpen, onClose }) => {
  const [recipientType, setRecipientType] = useState("");
  const [to, setTo] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [levels , setLevel] = useState([])
  const [sections , setSection] = useState([])
  const [individuals ,setIndividuals] = useState([])

  const param = useParams()

  useEffect(() => {
    // Fetch your data here if needed
    const fetchLevels = async () => {
      try {
        // setLoading(true);
        // Fetch class options from the external service
        const response = await ClassroomService.getDisponibleLevels(param['schoolID']);
      
        setLevel(response);
        console.log("ALL LEVELS :",response)
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching class levels:', error);
        // setLoading(false);
      }
    };

    const fetchSection = async () => {
      try {
        // setLoading(true);
        // Fetch class options from the external service
        const response = await ClassroomService.getClassroomSection(param['schoolID']);
      
        setSection(response);
        console.log("ALL SECTIONS :",response)
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching class levels:', error);
        // setLoading(false);
      }
    };

    const fetchStudents = async () => {
      try {
        // setLoading(true);
        // Fetch class options from the external service
        const response = await ClassroomService.getStudents(param['schoolID']);
      
        setIndividuals(response);
        console.log("ALL STUDENTS :",response)
        // setLoading(false);
      } catch (error) {
        console.error('Error fetching class levels:', error);
        // setLoading(false);
      }
    };

    fetchLevels()
    fetchSection()
    fetchStudents()
  }, []);

  const handleChange = (event) => {
    setRecipientType(event.target.value);
    setTo([]); // Reset the selected recipients when recipient type changes
  };

  const handleSend = (e) => {
    e.preventDefault();
    // Your existing send logic
  };

  return (
    <div className={`fixed z-10 inset-0 ${isOpen ? "block" : "hidden"}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSend}>
            <div className="title-com p-1 flex justify-between">
              <span className="p-2">Ecrire un nouveau communiqué</span>
              <button type="button" className="p-2" onClick={onClose}>
                <strong class="text-xl align-center cursor-pointer alert-del">
                  &times;
                </strong>
              </button>
            </div>
            <div className="px-4 py-3">
              <div className="mb-4 mt-2">
                <FormControl fullWidth>
                  <InputLabel id="recipientType-label">Destinataire</InputLabel>
                  <Select
                    labelId="recipientType-label"
                    id="recipientType"
                    value={recipientType}
                    label="Destinataire"
                    onChange={handleChange}
                    size="small"
                  >
                    <MenuItem value={"ALL"}>TOUS</MenuItem>
                    <MenuItem value={"LEVELS"}>NIVEAUX</MenuItem>
                    <MenuItem value={"INDIVIDUAL"}>INDIVIDUEL</MenuItem>
                    <MenuItem value={"SECTIONS"}>SECTIONS</MenuItem>
                  </Select>
                </FormControl>
              </div>
              {recipientType === "LEVELS" && (
                <Box sx={{ width: "100%"} } >
                  <FormControl fullWidth>
                    <InputLabel id="levels-label">Niveaux</InputLabel>
                    <Select
                      labelId="levels-label"
                      id="levels"
                      multiple
                      value={to}
                      label = {"Destinataire"}
                      onChange={(e) => setTo(e.target.value)}
                      size="small"
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {levels.map((level) => (
                        <MenuItem key={level} value={level}>
                          {level}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}
              <div className="mt-2"></div>
              {recipientType === "INDIVIDUAL" && (
                <Box sx={{ width: "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="individuals-label">Individuels</InputLabel>
                    <Select
                      labelId="individuals-label"
                      id="individuals"
                      label = {"Individuel"}
                      multiple
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      size="small"
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {individuals.length === 0 ? "No Student yet" : individuals.map((individual) => (
                        <MenuItem key={individual} value={individual}>
                          {individual}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}
              {recipientType === "SECTIONS" && (
                <Box sx={{ width: "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="sections-label">Sections</InputLabel>
                    <Select
                      labelId="sections-label"
                      id="sections"
                      multiple
                      label  = {"Section"}
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      size="small"
                      renderValue={(selected) => (
                        <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {sections.map((section) => (
                        <MenuItem key={section.classRoomOptionID} value={section.name}>
                          {/* {console.log(section.classRoomOptionID , section.name)} */}
                          {section.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}
              <div className="mb-4 mt-4">
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Sujet :
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message :
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>
            <div className="bg-gray-50 px-4 p-2">
              <Button variant="contained" endIcon={<SendIcon />} type="submit">
                Envoyer
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCommuniqueModal;
