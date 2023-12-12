import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import styled from '@emotion/styled';
import Header from "./Header";

interface Music {
    _id: string;
    title: string;
    artist: string;
    album: string;
    genre: string;
}

const Update: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [music, setMusic] = useState<Music | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchMusicData = async () => {
            try {
                const response = await axios.get<Music>(`http://localhost:3009/songs/getSingleSong/${id}`);
                setMusic(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchMusicData();
    }, [id]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (music) {
            setMusic(prevMusic => ({
                ...prevMusic,
                [event.target.name]: event.target.value
            }) as Music);
        } else {
            console.warn("Music is null, cannot update");
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            await axios.put(`http://localhost:3009/songs/updateSong/${id}`, music);
            Swal.fire({
                icon: "success",
                text: "Music Updated Successfully",
                showConfirmButton: false,
                timer: 2500,
            });
            navigate("/");
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Error Updating Music",
                text: 'error',
            });
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (!music) {
        return <p>Music not found</p>;
    }

    const Title = styled.p`
        font-size: 30px;
        font-weight: 600;
        color: #20b169;
        text-align: center;
        margin-bottom: 10px;
        margin-top: 30px;
    `;

    const Container = styled.div`
        width: 100%;
        max-width: 400px; /* Set the desired max-width */
        margin: auto;
    `;

    const Form = styled.div`
        display: grid;
        margin-bottom: 20px;
    `;

    const Input = styled.input`
        position: relative;
        height: 38px;
        outline: none;
        border-radius: 6px;
        padding: 0 15px;
        background-color: rgb(245, 245, 245);
        border: 1px solid rgb(202, 202, 202);
    `;

    const SubmitButton = styled.button`
        position: relative;
        height: 40px;
        outline: none;
        border-radius: 6px;
        padding: 0 15px;
        background-color: #20b169;
        color: #ffffff;
        margin-top: 30px;
        margin-bottom: 30px;
        border: none;
        width: 100%;
        cursor: pointer;
    `;

    return (
        <>
            <Header />

            <Title>UPDATE MUSIC</Title>
            <Container>
                <form onSubmit={handleSubmit}>
                    <Form>
                        <label>TITLE</label>
                        <Input
                            type="text"
                            name="title"
                            value={music.title ?? ''}
                            onChange={handleChange}
                            placeholder="title"
                            required
                        />
                    </Form>
                    <Form>
                        <label>ARTIST</label>
                        <Input
                            type="text"
                            name="artist"
                            id="artist"
                            value={music.artist}
                            onChange={handleChange}
                            placeholder="artist"
                            required
                        />
                    </ Form>

                    <Form>
                        <label>ALBUM</label>
                        <Input
                            type="text"
                            name="album"
                            id="album"
                            value={music.album}
                            onChange={handleChange}
                            placeholder="album"
                            required
                        />
                    </Form>
                    <Form>
                        <label>GENRE</label>
                        <Input
                            type="text"
                            name="genre"
                            id="genre"
                            value={music.genre}
                            onChange={handleChange}
                            placeholder="genre"
                            required
                        />
                    </Form>

                    <SubmitButton type="submit">UPDATE</SubmitButton>
                </form>
            </Container>
        </>
    );
};

export default Update;
