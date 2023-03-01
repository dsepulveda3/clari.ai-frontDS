import { useState } from "react";
import { Send, ThumbDown, ThumbUp } from '@mui/icons-material'
import { Box, Button, IconButton, Typography } from '@mui/material'
import TextInput from "./TextInput";
import { blue } from "@mui/material/colors";



const css = {
    container: {
        maxWidth: 800,
        margin: 'auto',
        padding: '36px 24px'
    },
    textarea: {
        width: '200%',

        minHeight: 100,
        height: 'fit-content',
        border: 'none',
        padding: 12,
        boxSizing: 'border-box',
        fontFamily: "'Quicksand', sans-serif",
        fontWeight: 100,
        fontSize: 14,
        color: "#1a1a1a",
        lineHeight: 1.5,
        background: 'whitesmoke',
        borderRadius: 12
    },
    buttons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        gap: 2,
        marginTop: 1,
        color: "#1a1a1a",


    }
}

function OpinionForm(props) {

    //const [inputValue, setInputValue] = useState("");
    const T = props.T;
    const D = props.D;
    const handleInputChange = (event) => {
        //setInputValue(event.target.value);
        props.setFeedbackContent(event.target.value);
    };


    const handleSubmit = () => {
        //console.log(`Input value: ${inputValue}`);
        console.log("handling submit")
        props.setShowPopup(false);
        props.setThanksFeedback(true);
        props.createFeedbackQuestion();
        // Add your code to handle the submitted text here
    };

    return (
        <Box sx={css.container}>
            <Typography variant='h4'>{T(D.use_of_feedback)}</Typography>

            <TextInput
                style={css.textarea}
                type="text"
                value={props.contentFeedback}
                onChange={handleInputChange}
                placeholder="Give us your opinion about the answer"
            />
            <Box sx={{ textAlign: 'end', margin: '12px 0' }}>
                <Button ref={props.elementRef} style={css.buttons} onClick={handleSubmit} color="secondary" variant="contained" endIcon={<Send />}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
}

export default OpinionForm;