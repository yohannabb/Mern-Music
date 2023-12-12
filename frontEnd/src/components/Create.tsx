import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styled from '@emotion/styled';
import Header from './Header';

type Music = {
    title: string;
    artist: string;
    album: string;
    genre: string;
};

function Create() {
    const { register, handleSubmit, formState: { errors } } = useForm<Music>();
    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Music> = async (formData) => {
        try {
            const response: Response = await fetch('http://localhost:3009/songs/addSongs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                Swal.fire({
                    text: `Music Successfully Added`,
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500,
                });
                navigate('/');
            } else {
                const data = await response.json();
                console.error('Error submitting form:', data.error);
            }
        } catch (error: any) {
            console.error('Error:', error.message);
        }
    };

    const Title = styled.p`
    font-size: 30px;
    font-weight: 600;
    color: #20b169;
    text-align: center;
    margin-bottom: 10px;
    margin-top: 30px;
  `;

    const Container = styled.div`
    width: 35%;
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
    width: 100%;
    outline: none;
    border-radius: 6px;
    padding: 0 15px;
    background-color: #20b169;
    color: #ffffff;
    margin-top: 30px;
    margin-bottom: 30px;
    border: none;
  `;
    const Error = styled.span`
  color: red;
`;
    return (
        <>
            <Header />
            <div>
                <Title>Add Music</Title>
                <Container>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Form>
                            <label>Title</label>
                            <Input
                                {...register('title', { required: 'Title is required' })}
                                type="text"
                                placeholder="Title"
                            />
                            {errors.title && <Error>{errors.title.message}</Error>}
                        </Form>
                        <Form>
                            <label>Artist</label>
                            <Input
                                {...register('artist', { required: 'Artist is required' })}
                                type="text"
                                placeholder="Artist"
                            />
                            {errors.artist && <Error>{errors.artist.message}</Error>}
                        </Form>
                        <Form>
                            <label>Album</label>
                            <Input
                                {...register('album', { required: 'Album is required' })}
                                type="text"
                                placeholder="Album"
                            />
                            {errors.album && <Error>{errors.album.message}</Error>}
                        </Form>
                        <Form>
                            <label>Genre</label>
                            <Input
                                {...register('genre', { required: 'Genre is required' })}
                                type="text"
                                placeholder="Genre"
                            />
                            {errors.genre && <Error>{errors.genre.message}</Error>}
                        </Form>
                        <SubmitButton type="submit">Add</SubmitButton>
                    </form>
                </Container>
            </div>
        </>
    );
}

export default Create;
