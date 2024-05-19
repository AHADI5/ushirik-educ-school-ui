import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ClassroomService from "../../../services/class_room_service";
import CommuniqueService from "../../../services/communique_service";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";

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

const CreateCommuniqueModal = ({ isOpen, onClose, refreshList }) => {
  const [recipientType, setRecipientType] = useState("");
  const [to, setTo] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [levels, setLevel] = useState([]);
  const [sections, setSection] = useState([]);
  const [individuals, setIndividuals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const param = useParams();

  useEffect(() => {
    // Fetch your data here if needed
    const fetchLevels = async () => {
      try {
        const response = await ClassroomService.getDisponibleLevels(param['schoolID']);
        setLevel(response);
      } catch (error) {
        console.error('Error fetching class levels:', error);
      }
    };

    const fetchSection = async () => {
      try {
        const response = await ClassroomService.getClassroomSection(param['schoolID']);
        setSection(response);
      } catch (error) {
        console.error('Error fetching class sections:', error);
      }
    };

    const fetchStudents = async () => {
      try {
        const response = await ClassroomService.getStudents(param['schoolID']);
        setIndividuals(response);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchLevels();
    fetchSection();
    fetchStudents();
  }, [param]);

  useEffect(() => {
    if (refreshList) {
      // Reset form fields and errors when refreshList is true
      setRecipientType("");
      setTo([]);
      setSubject("");
      setMessage("");
      setError(null);
    }
  }, [refreshList]);

  const handleChange = (event) => {
    setRecipientType(event.target.value);
    setTo([]); // Reset the selected recipients when recipient type changes
  };

  const handleSend = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!subject.trim() || !message.trim()) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    // Prepare data to send
    let recipientIDs = [];
    if (recipientType === "ALL") {
      // If recipient type is ALL, recipient IDs will be empty
      recipientIDs = [];
    } else if (recipientType === "LEVELS" || recipientType === "INDIVIDUAL" || recipientType === "SECTIONS") {
      // If recipient type is LEVELS, INDIVIDUAL, or SECTIONS, set recipientIDs to the selected recipients
      recipientIDs = to;
    }

    const data = {
      title: subject,
      content: message,
      recipientType: recipientType,
      recipientIDs: recipientIDs,
    };

    // Here you can send the data to your API endpoint or perform any other action
    console.log("Data to send:", data);
    setLoading(true);
    try {
      await CommuniqueService.publishCommunique(param['schoolID'], data);
      setSnackbarSeverity("success");
      setSnackbarMessage("Communiqué envoyé avec succès.");
      onClose(); // Close modal on successful send
    } catch (error) {
      console.error('Error sending communique:', error);
      setSnackbarSeverity("error");
      setSnackbarMessage("Erreur lors de l'envoi du communiqué.");
    } finally {
      setLoading(false);
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
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
                <strong className="text-xl align-center cursor-pointer alert-del">
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
                <Box sx={{ width: "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="levels-label">Niveaux</InputLabel>
                    <Select
                      labelId="levels-label"
                      id="levels"
                      multiple
                      value={to}
                      label={"Destinataire"}
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
              {recipientType === "INDIVIDUAL" && (
                <Box sx={{ width: "100%" }}>
                  <FormControl fullWidth>
                    <InputLabel id="individuals-label">Individuels</InputLabel>
                    <Select
                      labelId="individuals-label"
                      id="individuals"
                      label={"Individuel"}
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
                      {individuals.length === 0
                        ? "No Student yet"
                        : individuals.map((individual) => (
                            <MenuItem key={individual.studentID} value={individual.parentEmail}>
                              {individual.parentEmail}
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
                      label={"Section"}
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
              <Button variant="contained" endIcon={<SendIcon />} type="submit" disabled={loading}>
                {loading ? (
                  <div className="flex items-center justify-center">
                    <TailSpin
                      visible={true}
                      height="30"
                      width="30"
                      color="rgb(255,255 ,255)"
                      ariaLabel="tail-spin-loading"
                      radius="0.5"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  </div>
                ) : (
                  "Envoyer"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateCommuniqueModal;
