import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../store/store/store'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import OfferCard from './OfferCard';
import { Button, Dialog, DialogActions, DialogTitle, Modal } from '@mui/material';
import ConfirmationDialog from './ConfirmationDialog';
import { deleteDoc } from 'firebase/firestore';
import EditDiscountForm from './EditDiscountCard';
import EditComplimentaryForm from './EditComplimentary';
import { Offer } from '../../@types/interfaces/offer';
import { Merchant } from '../../@types/interfaces/merchant';
import { setAppLoading, setPopup } from '../../store/reducer/app-data';

type Props = {}

export default function TrackOffers({ }: Props) {

    const { userInfo } = useAppSelector(state => state.user) as { userInfo: Merchant };
    const [offers, setOffers] = useState([]);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
    const [offerToDelete, setOfferToDelete] = useState(null);
    const [offerToEdit, setOfferToEdit] = useState({});
    const dispatch = useAppDispatch();
    const [ saving , setSaving ] = useState(false);

    const ref = `/offers/${userInfo?.country}/${userInfo.state}/${userInfo?.division}/${userInfo?.district}/${userInfo.username}/alloffers`;


    const handleDeleteOffer = (delOffer) => {
        // When the delete button is clicked, set the offer to delete
        const offer = offers.find((offer) => offer.id === delOffer.id);
        setOfferToDelete(delOffer);
        setDeleteConfirmationOpen(true);
    };

    const confirmDeleteOffer = () => {
        // Implement the logic to delete the selected offer
        console.log("offerToDelete", offerToDelete)
        if (offerToDelete && offerToDelete?.id) {

            const docRef = doc(db,ref, offerToDelete?.id);
            dispatch(setAppLoading(true))
            deleteDoc(docRef)
                .then(() => {
                    console.log('Document deleted successfully');
                    setOffers(offers.filter((offer) => offer.id !== offerToDelete.id));
                    setOfferToDelete(null);
                    setDeleteConfirmationOpen(false);
                    dispatch(setPopup({open:true,severity:"success",message:"Deleted Successfully!"}))
                })
                .catch((error) => {
                    console.error('Error deleting document:', error);
                }).finally(()=>{
                    dispatch(setAppLoading(false))
                });
        }
    };


    const fetchOffers = async () => {
        dispatch(setAppLoading(true))
        await getDocs(collection(db, ref))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setOffers(newData);
                console.log("newData", newData);
            }).catch(error=>{
                dispatch(setPopup({open:true,severity:"error",message:"Error While Loading Offers."}))
            }).finally(()=>{
                dispatch(setAppLoading(false))
            })
    }

    useEffect(() => {
        fetchOffers();
    }, [])

    const handleStatusChange = (offerID:string, status:boolean) => {
        if(offerID) {
        
        const docRef = doc(db, ref, offerID);

        updateDoc(docRef, { active: status })
            .then(() => {
                console.log('Document updated successfully');
                const updatedData = offers.map((offer) => {
                    if (offer.id == offerID) {
                        return ({
                            ...offer,
                            active: status
                        })
                    }
                    else return offer;
                })
                
                setOffers(updatedData);
            })
            .catch((error) => {
                console.log(error)
                dispatch(setPopup({open:true,severity:"error",message:"Not able to update Status!"}))
            })
        }
    }

    const onConfirmEditSave = (offerId:string, updatedoffer:Offer) => {
        
       if(offerId && updatedoffer){
        const docRef = doc(db, ref, offerId);
        setSaving(true)
        updateDoc(docRef, {...updatedoffer}).then(() => {
                console.log('Document updated successfully');
                const updatedData = offers?.map((offer) => {
                    if (offer.id == offerId) {
                        return ({offer,...updatedoffer})
                    }
                    else return offer;
                });
                setOffers(updatedData);
                dispatch(setPopup({open:true,severity:"success",message:"OFFER updated Successfully!"}))
            })
            .catch((error) => {
                console.error('Error updating document:', error);
            }).finally(()=>{
                setEditModalOpen(false);
                setSaving(false);
            }); 
       }
    }

    const onDiscardEdit = () => {
        setEditModalOpen(false)
    }


    const handleEditOffer = (offer) => {
        setEditModalOpen(true);
        setOfferToEdit(offer)
    }


    if (offers?.length > 0) {
        return (
            <div>
                {offers.map((offer) => (
                    <OfferCard
                        key={offer.id}
                        offer={offer}
                        onDelete={handleDeleteOffer}
                        onEdit={handleEditOffer}
                        onStatusUpdate={handleStatusChange}
                     />
                ))}

                <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)}>
                    {offerToEdit?.offer_type === 'Discount' && 
                        <EditDiscountForm offer = {offerToEdit}
                            onSubmit={onConfirmEditSave}
                            onAbort={onDiscardEdit}
                            saving={saving} />}

                    {offerToEdit?.offer_type === 'Complimentary' && 
                        <EditComplimentaryForm offer={offerToEdit}
                            onSubmit={onConfirmEditSave}
                            onAbort={onDiscardEdit}
                            saving={saving} />}

                </Dialog>

                <ConfirmationDialog
                    open={deleteConfirmationOpen}
                    onClose={() => setDeleteConfirmationOpen(false)}
                    onConfirm={confirmDeleteOffer}
                    offer={offerToDelete}
                />
            </div>
        )
    }
    else {
        return (<h4>No Offers has been Added by you!</h4>)
    }
}