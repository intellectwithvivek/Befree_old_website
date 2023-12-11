
import styles from './Contact.module.css'
import React, { useState } from 'react';
import { TextField, Button, Container, Card,
     CardContent, Typography ,CircularProgress ,Snackbar} from '@mui/material';
import emailjs from '@emailjs/browser';
import { colors } from '../../constants/colors';


const ContactUsForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [sending,setIssending] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSnackbarOpen = () => {
    setOpen(true);
  };

  const handleSnackbarClose = () => {
    setOpen(false);
  };


  const sendEmail = () => {
    setIssending(true);
    const templateParams = {
        subject:name,
        from_name: name,
        message: message,
        reply_to:email,
        phone
    };
    emailjs.send('service_yqb5v26', 'template_4vid2a7', templateParams, 'vpI8ehggS7u569JhQ')
      .then((result) => {
          console.log(result.text);
          handleSnackbarOpen();
          setMessage('');
      }, (error) => {
          console.log(error.text);
      }).finally(()=>{
        setIssending(false);
      });
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    const validationErrors = {};
    if (!name) {
      validationErrors.name = 'Name is required';
    }
    if (!email) {
      validationErrors.email = 'Email is required';
    } else if (!validateEmail(email)) {
      validationErrors.email = 'Invalid email format';
    }
    if (!phone) {
      validationErrors.phone = 'Phone Number is required';
    } else if (!validatePhone(phone)) {
      validationErrors.phone = 'Invalid phone number format';
    }
    if (!message) {
      validationErrors.message = 'Message is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Perform your desired action with the form data
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Message:', message);
    sendEmail();
    // Clear the form fields and errors
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setErrors({});
  };

  return (
    <div className={styles.contact}>
    <h3 style={{textAlign:'center',marginTop:20,marginBottom:20}}>We Would love to hear from you!</h3>
    <Snackbar
    style={{position:'absolute',bottom:0,left:"40%"}}
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Message Sent Successfully 😊"
      />
    <Container maxWidth="sm" style={{paddingBottom:20}}>
    <Card style={{ border: '1.5px solid grey',
                   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                   padding:10,
                   borderRadius:10}}>
       <h3 style={{textAlign:'center',color:colors.primary}}>Get in touch with us!</h3>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.name}
              helperText={errors.name}
              InputProps={{
                style: {
                  borderColor: errors.name ? 'red' : 'blue',
                },
              }}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.email}
              helperText={errors.email}
              InputProps={{
                style: {
                  borderColor: errors.email ? 'red' : 'blue',
                },
              }}
            />
            <TextField
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              margin="normal"
              error={!!errors.phone}
              helperText={errors.phone}
              InputProps={{
                style: {
                  borderColor: errors.phone ? 'red' : 'blue',
                },
              }}
            />
            <TextField
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              error={!!errors.message}
              helperText={errors.message}
              InputProps={{
                style: {
                  borderColor: errors.message ? 'red' : 'blue',
                },
              }}
            />
            
           <div style={{ display: 'flex', justifyContent: 'center' }}>
           {sending?<CircularProgress size={25} thickness={5}/>:
           <Button type="submit" variant="contained" color="primary">
             Submit
           </Button>}
         </div>
          </form>
        </CardContent>
      </Card>
    </Container>
    </div>
  );
};

export default ContactUsForm;


