import { makeStyles } from '@material-ui/core';
import { darken } from 'polished';

export default makeStyles((theme) => ({
    storeCard: {
        height: 370,
        width: '33%',
        boxShadow: '3px 5px 14px -2px rgba(0,0,0,0.46)',
        background: '#FFF',

        marginBottom: '.5rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        cursor: 'pointer',
        borderRadius: '5px',
        color: '#000',
        transition: 'all  .2s',
        backgroundColor: darken(0.02, '#fff'),
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '3px 5px 14px -2px rgba(0,0,0,0.46)',
        },
        '& img': {
            width: '100%',
            height: 'auto',
            maxHeight: '70%',
            minWidth: '70%',
            minHeight: '70%',
            borderTopLeftRadius: '5px',
            borderTopRightRadius: '5px',
            objectFit: 'contain',
            padding: '5px'
        },
        '& h3': {
            fontSize: 14,
        },
        '& button': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            '& svg': {
                fontSize: '2rem'
            },

            background: '#fff',
            border: '2px solid #4d4d4d',
            padding: '0.8rem 1.4rem',
            color: '#4d4d4d',
            borderRadius: '4px',
            marginTop: '4px',

            fontSize: '1rem',
            lineHeight: '1rem',
            letterSpacing: '2px',
            fontWeight: '600',
            height: '3rem',
        },
        [theme.breakpoints.down('sm')]: {
            width: '49%',
            marginBottom: '.6rem',
            '& img': {
                objectFit: 'contain',
                minHeight: '50%',
            },
            height: 'auto',
            minHeight: 370,
            maxHeight: 400,
        },
        [theme.breakpoints.down('xs')]: {
            width: '49%',
            padding: '0px',
            height: 'auto',
            minHeight: 370,
            maxHeight: 400,
        },

    },
    bodyCard: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        height: '30%',
        width: '100%',
        padding: '.5rem',
        '& p': {
            fontSize: '1.2rem',
            lineHeight: '1rem',
            fontWeight: '600',
            color: 'rgb(66, 70, 77)',
            height: '3rem',
            marginBottom: '2px',
            textOverflow: 'ellipsis',
            ["-webkit-line-clamp"]: 3
        },
        '& span': {
            fontSize: '.95rem',
            lineHeight: '1rem',
            color: 'rgb(66, 70, 77)',
            height: '3rem',
        },
        [theme.breakpoints.down('xs')]: {
            height: '50%',
            justifyContent: 'flex-start',
            '& p': {
                fontSize: '1.2rem',
                height: 'auto',
                marginTop: '1rem'
            },
            '& span': {
                height: 'auto',
                marginTop: '1rem'
            },
            '& button': {
                position: 'absolute',
                bottom: '4px',
                width: '94%'
            },
        },
    },
    imgStore: {
        width: '100%',
    }
}));
