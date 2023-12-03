import React from 'react'
import { Backdrop, CircularProgress } from "@mui/material";
import { useAppSelector } from "../../store/store/store";
import TransitionsSnackbar from '../../components/general/SnackErrorBar';
import SnackError from '../../components/general/SnackError/SnackError';
import Header from '../../components/Header';
import { Outlet } from 'react-router-dom';


type Props = {}

export default function Root() {
    const { loading } = useAppSelector(state => state.appData)
    return (
        <>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Header />
            <Outlet />
            <TransitionsSnackbar />
            <SnackError />
        </>
    )
}