import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from '@emotion/styled';
import Header from "./Header";
import { RiUser3Fill } from "react-icons/ri";
import { BiSolidAlbum } from "react-icons/bi";
import { FaMusic } from "react-icons/fa";
import { SiMusicbrainz } from "react-icons/si";

interface GenreCount {
    genre: string;
    count: number;
}

interface StatisticsState {
    totalArtists: number;
    totalSongs: number;
    totalAlbums: number;
    totalGenres: number;
    genreCounts: GenreCount[];
}

interface ArtistStatistics {
    _id: string;
    totalSongs: number;
    totalAlbums: number;
}
interface GenreCount {
    _id: string;
    count: number;
}


const Statistics: React.FC = () => {

    const [statistics, setStatistics] = useState<StatisticsState>({
        totalArtists: 0,
        totalSongs: 0,
        totalAlbums: 0,
        totalGenres: 0,
        genreCounts: [],
    });

    const [artistStatistics, setArtistStatistics] = useState<ArtistStatistics[]>([]);
    const [albumCounts, setAlbumCounts] = useState<GenreCount[]>([]);


    useEffect(() => {
        axios
            .get('http://localhost:3009/songs/statistics')
            .then((response) => {
                setStatistics(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); // Refresh data when the message changes

    useEffect(() => {
        axios
            .get('http://localhost:3009/songs/artistStats')
            .then((response) => {
                setArtistStatistics(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); // Refresh data when the message changes

    useEffect(() => {
        axios
            .get('http://localhost:3009/songs/albumStats')
            .then((response) => {
                setAlbumCounts(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []); // Refresh data when the message changes


    const DashboardContents = styled.div` 
        display: grid;
        grid-template-columns: 20% 20% 20% 20%;
        justify-content: center;
        column-gap: 4%;
        row-gap: 6%;
        margin-top: 40px;
`;

    const Card = styled.div`
  color: white;
  width: 95%;
  background-color: #20b169;
  border-radius: 10px 0px 0px 10px;
  text-align: center;
  padding: 1px 15px;
  border-right: 5px solid black;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.2);
  display: grid; 
  align-items: center;
  cursor: pointer;
  transition: 0.8s;
  z-index: -1;
  margin-bottom: 50px;
  height: 75%;

  &:hover {
    color: #e4e4e4;
    background-color: black;
    transform: scale(1.08);
    z-index: -1;
  }
`;

    const CardP = styled.p`
    display: flex;
    justify-content: center;
    font-size: 19px;
    margin-bottom: 5px;
    margin-top: 5px;
    gap: 5px
`;

    const CardLabel = styled.label`
  font-size: 35px;
`;
    const Title = styled.p`
font-size: 30px;
font-weight: 600;
color: #20b169;
text-align: center;
margin-bottom: 10px;
margin-top: 30px;
`;

    const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    gap: 5%;
`;

    const CardContainer2 = styled.div`
    display: grid;
    justify-content: center;
`;

    const Label = styled.div`
    display: flex;
    font-size: 21px;
    margin-top: 8px;
`;
    const Label2 = styled.div`
   display: flex;
   font-size: 17px;
   margin-top: 8px;
   gap: 10px
`;

    return (
        <>
            <Header />
            <>
                <Title>Total Statistics</Title>
                <DashboardContents>

                    <Card>
                        <CardP>Total Artists </CardP>
                        <CardContainer>
                            <CardLabel><RiUser3Fill /></CardLabel>
                            <Label>{statistics.totalArtists}</Label>
                        </CardContainer>
                    </Card>


                    <Card>
                        <CardP>Total Songs </CardP>
                        <CardContainer>
                            <CardLabel><FaMusic /></CardLabel>
                            <Label>{statistics.totalSongs}</Label>
                        </CardContainer>
                    </Card>

                    <Card>
                        <CardP>Total Albums </CardP>
                        <CardContainer>
                            <CardLabel><BiSolidAlbum /></CardLabel>
                            <Label>{statistics.totalAlbums}</Label>
                        </CardContainer>
                    </Card>


                    <Card>
                        <CardP>Total Genres </CardP>
                        <CardContainer>
                            <CardLabel><SiMusicbrainz /></CardLabel>
                            <Label>{statistics.totalGenres}</Label>
                        </CardContainer>
                    </Card>

                </DashboardContents>

                <Title>Total songs in Every Genre</Title>

                <DashboardContents>
                    {statistics.genreCounts.map((genreCount) => (
                        <Card>

                            <>
                                <CardP key={genreCount.genre}>Genre : {genreCount.genre} </CardP>

                                <CardContainer>
                                    <CardLabel><SiMusicbrainz /></CardLabel>
                                    <Label>{genreCount.count}</Label>
                                </CardContainer>
                            </>

                        </Card>
                    ))}

                </DashboardContents>

                <Title>Total Songs & Albums Each Artist Has</Title>

                <DashboardContents>
                    {artistStatistics.map((artistStat) => (
                        <Card>
                            <>
                                <CardP key={artistStat._id}><RiUser3Fill /> Artist : {artistStat._id} </CardP>

                                <CardContainer2>
                                    <Label2><FaMusic />  Total Song :  {artistStat.totalSongs}</Label2>
                                    <Label2><BiSolidAlbum /> Total Album : {artistStat.totalAlbums}</Label2>
                                </CardContainer2>
                            </>
                        </Card>
                    ))}

                </DashboardContents>

                <Title>Total songs in each albums</Title>

                <DashboardContents>
                    {albumCounts.map((albumCount) => (
                        <Card>

                            <>
                                <CardP key={albumCount._id}>Album : {albumCount._id} </CardP>

                                <CardContainer>
                                    <CardLabel><BiSolidAlbum /></CardLabel>
                                    <Label>{albumCount.count}</Label>
                                </CardContainer>
                            </>

                        </Card>


                    ))}

                </DashboardContents>




            </>

        </>

    );
};

export default Statistics;
