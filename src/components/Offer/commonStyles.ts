import { colors } from "../../constants/colors";

export const lableStyle = { fontSize: '1.2rem', fontWeight: '500', color: colors.black }

export const editHeading = { fontSize: '2rem', color: colors.primary, marginBottom: '1rem' }

export const subeditHead = { fontWeight: '600', fontSize: '1.5rem', marginBottom: '1rem' }

export const inputStyle = {
    fontSize: '1.3rem',
    color: colors.black
}

export const avatarStyles = {
    width: '30vw',
    height: '30vh',
    borderRadius: 5,
    backgroundColor: colors.greyText,
    alignSelf: "center",
    '@media (max-width: 600px)': {
        width: '70vw',
        height: '30vh'// Adjust the width for smaller screens
    },
}

export const menuItem = (item, selected) => ({
    fontSize: '1.4rem',
    color: item === selected ? 'red' : colors.black, // Customize the color for the selected item
})

export const primaryButton = {
    width: "20vw",
    marginBottom: 20, 
    marginTop: 20, 
    padding: '0.7rem',
    fontSize: '1.2rem',
    '@media (max-width: 600px)': {
        width: '40vw',
    },
}