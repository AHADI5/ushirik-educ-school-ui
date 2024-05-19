import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { Box, Modal, Button, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import MultiStepForm from "../../protected/students/multisteps_form";
import ClassroomService from "../../../services/class_room_service";
import { useParams } from "react-router-dom";

const FullFeaturedCrudGrid = ({
  columns,
  initialRows,
  fetchUrl,
  editUrl,
  deleteUrl,
}) => {
  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams()

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(fetchUrl);
        const data = await response.json();
        setRows(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchUrl]);

  const handleRowEditStop = (params, event) => {
    if (params.reason === "rowFocusOut") {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = async (id) => {
    setLoading(true);
    try {
      await fetch(deleteUrl, {
        method: "DELETE",
        body: JSON.stringify({ id }),
      });
      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Failed to delete row", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleFormSubmit = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch(editUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const newRow = await response.json();
      setRows((prevRows) => [...prevRows, newRow]);
      setOpen(false);
    } catch (error) {
      console.error("Failed to submit form", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchClassrooms = async () => {
    try {
      const response = await ClassroomService.getClassrooms(params.schoolID); // Replace with actual URL
      const data = await response;
      console.log("classRooms " , data)
      return data;
    } catch (error) {
      console.error("Failed to fetch classrooms", error);
      return [];
    }
  };

  const columnsWithActions = [
    ...columns.filter((column) => column.field !== "parent_details"),
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{ color: "primary.main" }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: "100%", width: "100%" }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add record
        </Button>
      </Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <DataGrid
          rows={rows}
          columns={columnsWithActions}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
        />
      )}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            width: 400,
            margin: "50px auto",
            padding: 4,
            backgroundColor: "white",
          }}
        >
          <MultiStepForm
            onSubmit={handleFormSubmit}
            fetchClassrooms={fetchClassrooms}
          />
        </Box>
      </Modal>
    </Box>
  );
};

FullFeaturedCrudGrid.propTypes = {
  columns: PropTypes.array.isRequired,
  initialRows: PropTypes.array.isRequired,
  fetchUrl: PropTypes.string.isRequired,
  editUrl: PropTypes.string.isRequired,
  deleteUrl: PropTypes.string.isRequired,
};

export default FullFeaturedCrudGrid;
