import { makeStyles } from '@material-ui/core'
import { Color } from '../../../assets/js/color'
import { StyleSheet } from '@react-pdf/renderer';

export const useStyles = makeStyles((theme) => ({
    titleContainer: {
        padding: '5px',
        backgroundColor: Color.dark,
        color: Color.white,
        marginBottom: '10px',
        textAlign: 'center'
    },
    container: {
        padding: '5px',
        backgroundColor: Color.gray,
        marginBottom: '10px'
    },
    containerLeft: {
        marginBottom: '10px',
        textAlign: 'start'
    },
    containerRight: {
        marginBottom: '10px',
        textAlign: 'end'
    },
    containers: {
        padding: '10px'
    },
    listItems: {
        backgroundColor: theme.palette.background.paper,
    },
    customInput: {
        '& .MuiInput-underline:before': {
            borderBottom: `2px solid ${Color.blueDark}`,
        },
        '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: `2px solid ${Color.blueDark}`,
            outline: 'none',
        },
        '& .MuiFormLabel-root': {
            color: `${Color.purpleLight} !important`,
            fontWeight: 500,
        },
        '& label.Mui-focused': {
            color: `${Color.purpleLight} !important`,
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: Color.blueDark,
        },
        '& .MuiInput-underline:hover': {
            borderBottomColor: Color.blueDark,
        },
        '& .MuiInput-underline input': {
            color: Color.blueDark,
            fontWeight: 500,
        },
        '& .MuiInput-underline.Mui-error:after': {
            borderBottomColor: 'red',
        },
        '& input:invalid + fieldset': {
            borderColor: 'red',
            borderWidth: 2,
        },
        '& .MuiFormControl-fullWidth': {
            width: '96%',
        },
    },
    buttonContainers: {
        padding: '10px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'flex-end'
    },
    tHeaderRow: {
        backgroundColor: Color.gray
    },
    print: {
        textAlign: 'end'
    },
    table_container: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    paper: {
        backgroundColor: Color.light,
        boxShadow: theme.shadows[5],
        borderRadius: 20,
        width: '40rem',
        '&:focus': {
            outline: 'none',
        },
    },
    iconContainer: {
        height: 130,
        width: '100%',
        borderRadius: '20px 20px 0 0',
        backgroundColor: Color.purpleLight,
    },
    iconBackground: {
        width: 80,
        height: 80,
        borderRadius: 50,
        backgroundColor: Color.light,
        display: 'flex',
        alignItems: 'center',
        margin: 'auto',
        marginTop: 25,
    },
    infoIcon: {
        fontSize: '2.8rem',
        margin: 'auto',
        color: Color.info,
    },
    iconClose: {
        fontSize: '0.7rem',
        color: Color.dark,
    },
    btnClose: {
        width: 25,
        height: 25,
        borderRadius: 50,
        backgroundColor: Color.light,
        minWidth: 0,
        padding: 0,
        position: 'relative',
        top: -95,
        left: '92%',
        '&:hover': {
            backgroundColor: Color.light,
        }
    },
    content: {
        width: '100%',
        padding: '20px'
    },
}));

export const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: Color.white
    },
    image: {
        width: 145,
        height: 30,
        margin: 10
    },
    section: {
        marginLeft: 10,
        marginRight: 10,
        padding: 5,
    },
    title: {
        textAlign: 'center',
        padding: 5,
        width: '100%',
        backgroundColor: Color.dark,
        color: Color.white,
        fontSize: 14
    },
    subtittle: {
        padding: 5,
        backgroundColor: Color.gray,
        marginBottom: 5,
        fontSize: 14
    },
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    subcontainer: {
        width: '50%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        padding: 3
    },
    textInfo: {
        fontSize: 12
    },
    textInfoTitle: {
        fontSize: 14
    },
    textBold: {
        fontWeight: 'ultrabold',
        fontSize: 12,
        marginRight: 2
    },
    table_header: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginTop: 3,
        marginBottom: 3,
        padding: 3
    },
    table_rowItem: {
        width: '40%',
        display: 'flex',
        flexDirection: 'row',
        padding: 2
    },
});
