import { Alert, Slide, Snackbar } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../store/store/store';
import { setPopup } from '../../../store/reducer/app-data';

type Props = {

}


function SlideTransition(props) {
    return <Slide {...props} direction="up" />;
}


export default function SnackError({ }: Props) {

    const dispatch = useAppDispatch()
    const { popup } = useAppSelector(state => state.appData)


    const handleClose = () => {
        dispatch(setPopup({ open: false }));
    };


    return (
       
            <Snackbar
                anchorOrigin={{ vertical : 'top', horizontal:'center' }}
                open={popup?.open}
                onClose={handleClose}
                key={SlideTransition.name}
                autoHideDuration={6000}>
                <Alert onClose={handleClose} severity={popup?.severity} sx={{ width: '100%' , alignItems:'center' , fontFamily:'inherit'  ,fontWeight:'700' ,fontSize:'1.5rem' }}>
                    {popup?.message}
                </Alert>
            </Snackbar>
 
    )
}