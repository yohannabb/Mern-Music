import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import Button from "@mui/material/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AiOutlinePlus } from "react-icons/ai";
import 'animate.css';
import styled from '@emotion/styled';
import Header from "./Header";

interface Music {
  _id: string;
  title: string;
  artist: string;
  album: string;
}

const MusicList: React.FC = () => {
  const [collections, setCollections] = useState<Music[]>([]);
  const [deleteMessage, setDeleteMessage] = useState<string>("");

  useEffect(() => {
    axios
      .get<Music[]>('http://localhost:3009/songs/getAllSong')
      .then((response) => {
        setCollections(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [deleteMessage]); // Refresh data when the message changes

  const navigate = useNavigate();
  const renderEditUserButton = (id: string) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="success"
          size="small"
          onClick={() => { navigate(`/Update/${id}`) }}
        >
          Update
        </Button>
      </strong>
    );
  };

  const renderDeleteButton = (id: string) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => {
            handleClickDelete(id);
          }}>
          Delete
        </Button>
      </strong>
    );
  };


  const columns = [
    {
      field: "_id",
      headerName: "ID",
      width: 250,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "title",
      headerName: "Title",
      width: 180,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "artist",
      headerName: "Artist",
      width: 180,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "genre",
      headerName: "Genre",
      width: 180,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "album",
      headerName: "Album",
      width: 180,
      headerClassName: "column-header",
      cellClassName: "column-cell",
    },
    {
      field: "Update",
      headerClassName: "column-header",
      width: 150,
      renderCell: (params: any) => renderEditUserButton(params.row._id),
    },
    // {
    //   field: "Detail",
    //   headerClassName: "column-header",
    //   width: 150,
    //   renderCell: (params: any) => renderDetialButton(params.row._id),
    // },
    {
      field: "Delete",
      headerClassName: "column-header",
      width: 150,
      renderCell: (params: any) => renderDeleteButton(params.row._id),
    },
  ];

  const formattedData = collections.map((item, index) => ({
    id: index + 1, // Assign a unique id to each row
    ...item,
  }));

  const handleClickDelete = (id: string) => {
    Swal.fire({
      text: `Are you sure You Want to Delete this Music`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00cc44',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ok!',
      showCloseButton: true,
      showClass: {
        popup: 'animate__animated animate__shakeX'
      },
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(id);
      }
    });
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:3000/songs/deleteSong/${id}`)
      .then(() => {
        setDeleteMessage('Data deleted successfully');
        setCollections((prevCollections) => prevCollections.filter((music) => music._id !== id));
      })
      .catch((error) => {
        console.log(error);
        setDeleteMessage('Error deleting data');
      });
    console.log(id);
  };


  const Table = styled.p`
height: '80vh'
width: '98%'
margin: 'auto'
marginTop: '10px'
marginBottom: '0px'
textAlign: 'center'
`;

  const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 15px;
  margin-top: 20px;
`;

  const Buttons = styled.button`
  background-color: #004766;
  color: rgb(227, 227, 227);
  padding: 8px 25px;
  border: none;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
`;


  return (
    <>
      <div>
        <Header />

        <Table>
          <ButtonContainer >
            <Link to="/Create" style={{ textDecoration: 'none' }}>
              <Buttons>
                <AiOutlinePlus style={{ fontSize: '18px', color: 'white' }}></AiOutlinePlus>
                Add Music
              </Buttons>
            </Link>
          </ButtonContainer>
          <DataGrid
            sx={{
              m: 2,
              border: 1,
              borderColor: 'primary.light',
              '& .MuiDataGrid-cell:hover': { color: 'primary.main' },
            }}
            checkboxSelection
            rows={formattedData}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
          />
        </Table>
      </div>

    </>
  );
}

export default MusicList;