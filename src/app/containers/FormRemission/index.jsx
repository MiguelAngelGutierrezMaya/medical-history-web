import { useState } from 'react'

//Components
import { InputField } from '../../components/InputField'
import { AutocompleteField } from '../../components/AutocompleteField'
import { ItemDataSelected } from '../../components/ItemDataSelected'
import { PopupMessage } from '../../components/PopupMessage'

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
    Button,
    Grid,
    SvgIcon
} from '@material-ui/core'

import logo from '../../../assets/images/logo.png'

// Icons
import { ReactComponent as CloseIcon } from '../../../assets/images/close.svg'
import { ReactComponent as InfoIcon } from '../../../assets/images/info.svg'

// PDF
import { PDFDownloadLink, Page, Text, View, Document, Image } from '@react-pdf/renderer';

// styles & assets
import { useStyles, styles } from './style'

export const FormRemission = (
    {
        userObj,
        profilerObj,
        includeQuantity,
        headers,
        title,
        canEdit,
        list,
        listSelected,
        handleChangeList,
        helperText,
        handleChangeQuantity,
        quantity,
        lendingPresentationsList,
        lendingPresentationSelected,
        lendingPresentationLabel,
        handleChangeLendingsPresentations,
        observation,
        handleChangeObservation,
        addDataToList,
        listKey,
        listDataSelected,
        removeFromList
    }) => {
    const classes = useStyles()

    const [popupMessage, setPopupMessage] = useState({
        open: false,
        type: 'info',
        title: 'Formato de impresión',
        description: '',
        btnLabel: 'Imprimir',
    })

    const [blobObject, setBlobObject] = useState(null)

    // Methods

    const handleOpenCloseModal = (bool) => {
        setPopupMessage({ ...popupMessage, open: bool })
        setBlobObject(null)
    }
    const handleClose = () => handleOpenCloseModal(false)
    const handleOpen = () => handleOpenCloseModal(true)

    const lendings = {};

    for (let i = 0; i <= listDataSelected.length; i++) {
        if (listDataSelected[i] && title !== 'MEDICAMENTOS' && listDataSelected[i].lendingPresentationSelected)
            lendings[listDataSelected[i].lendingPresentationSelected.key]
                ? Array.isArray(lendings[listDataSelected[i].lendingPresentationSelected.key])
                    ? lendings[listDataSelected[i].lendingPresentationSelected.key].push({ ...listDataSelected[i] })
                    : lendings[listDataSelected[i].lendingPresentationSelected.key] = [{ ...listDataSelected[i] }]
                : lendings[listDataSelected[i].lendingPresentationSelected.key] = [{ ...listDataSelected[i] }]
    }

    const lendingsArray = Object.entries(lendings)

    // Create Document Component
    const TableData = ({ el }) => (
        <View style={styles.table_header}>
            <View style={styles.table_rowItem}>
                <Text style={styles.textInfo}>{el.text}</Text>
            </View>
            {
                includeQuantity && (
                    <View style={styles.table_rowItem}>
                        <Text style={styles.textInfo}>{el.quantity}</Text>
                    </View>
                )
            }
            {
                title === 'MEDICAMENTOS' && (
                    <View style={styles.table_rowItem}>
                        <Text align="center" style={styles.textInfo}>{el.lendingPresentationSelected?.text || el.lendingPresentationSelected}</Text>
                    </View>
                )
            }
            <View style={styles.table_rowItem}>
                <Text align="center" style={styles.textInfo}>{el.observation}</Text>
            </View>
        </View>
    )

    const GeneralData = ({ lending }) => (
        <>
            <Image src={logo} style={styles.image} />
            <View style={styles.section}>
                <Text style={styles.title}>REMISIÓN {title}</Text>
            </View>
            <View style={styles.section} wrap={false}>

                <Text style={styles.subtittle}>DATOS DEL PACIENTE</Text>

                <View style={styles.container}>
                    <View style={styles.subcontainer}>
                        <Text style={styles.textBold}>No. Documento:</Text>
                        <Text style={styles.textInfo}>{profilerObj.nuip}</Text>
                    </View>
                    <View style={styles.subcontainer}>
                        <Text style={styles.textBold}>Teléfono:</Text>
                        <Text style={styles.textInfo}>{profilerObj.phoneNumber}</Text>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.subcontainer}>
                        <Text style={styles.textBold}>Nombre:</Text>
                        <Text style={styles.textInfo}>{`${userObj.firstName} ${userObj.surname}`}</Text>
                    </View>
                    <View style={styles.subcontainer}>
                        <Text style={styles.textBold}>Dirección:</Text>
                        <Text style={styles.textInfo}>{profilerObj.address}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.section} wrap={false}>
                <Text style={styles.subtittle}>DETALLE DE LA REMISIÓN</Text>
            </View>
            <View style={styles.section} wrap={false}>
                <View style={styles.table_header}>
                    {
                        headers.map((el, index) =>
                            el !== 'Prestador' && (
                                <View style={styles.table_rowItem}>
                                    <Text key={`pdf-table-${index}`} style={styles.textInfoTitle}>{el}</Text>
                                </View>
                            ))
                    }
                </View>
                {
                    lending !== null
                        ? lending[1].map((el, index) => (<TableData el={el} key={`pdf-table-body-${index}`} />))
                        : listDataSelected.map((el, index) => (
                            <TableData el={el} key={`pdf-table-body-${index}`} />
                        ))
                }
            </View>
        </>
    )

    const PdfDocument = () => (
        <Document>
            {
                title !== 'MEDICAMENTOS' ? lendingsArray.map((el, index) => (
                    <Page size="A4" style={styles.page} key={`pdf-generator-${index}`}>
                        <GeneralData lending={el} />
                        <View style={styles.section} wrap={false}>
                            <Text style={styles.subtittle}>PRESTADOR</Text>
                            <View style={styles.container}>
                                <View style={styles.subcontainer}>
                                    <Text style={styles.textBold}>Nombre:</Text>
                                    <Text style={styles.textInfo}>{el[1][0].lendingPresentationSelected.text}</Text>
                                </View>
                                <View style={styles.subcontainer}>
                                    <Text style={styles.textBold}>Dirección:</Text>
                                    <Text style={styles.textInfo}>{el[1][0].lendingPresentationSelected.address}</Text>
                                </View>
                            </View>
                            <View style={styles.container}>
                                <View style={styles.subcontainer}>
                                    <Text style={styles.textBold}>Teléfono:</Text>
                                    <Text style={styles.textInfo}>{`${el[1][0].lendingPresentationSelected.cellphone}`}</Text>
                                </View>
                            </View>
                        </View>
                    </Page>
                )) : <Page size="A4" style={styles.page}><GeneralData /></Page>
            }
        </Document>
    );

    const handlePrint = () => {
        var fileURL = URL.createObjectURL(blobObject);
        var win = window.open();
        win.document.write('<iframe src="' + fileURL + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>')
        // win.window.print()
    }

    const table = ({ showAction, showLending }) => (
        <TableContainer className={classes.table_container}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead className={classes.tHeaderRow}>
                    <TableRow>
                        {
                            headers.map((el, index) => !showLending && (el === 'Prestador' || el === 'Presentación') ? (<></>) :
                                (
                                    <TableCell align="center" key={`table-${index}`}>{el}</TableCell>
                                ))
                        }
                        {
                            showAction ? (<TableCell align="center">Acción</TableCell>) : (<></>)
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        listDataSelected.map(el => (
                            <ItemDataSelected
                                showAction={showAction}
                                showLending={showLending}
                                includeQuantity={includeQuantity}
                                key={`${listKey}-${el.key}`}
                                item={{
                                    ...el,
                                    text: `${el.text}`
                                }}
                                disabled={!canEdit}
                                onDelete={(item) => removeFromList(item)}
                            />
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    )

    return (
        <>
            <Grid item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className={classes.containers}
            >
                <span><b>{title}</b></span>
            </Grid>
            <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                className={classes.containers}
            >
                <AutocompleteField
                    props={
                        {
                            options: list,
                            getOptionLabel: (option) => option && option.text ? option.text : ''
                        }
                    }
                    disabled={!canEdit}
                    value={listSelected}
                    setValueItem={(item) => handleChangeList(item)}
                    label={helperText}
                ></AutocompleteField>
            </Grid>
            {
                includeQuantity ? (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={6}
                        className={classes.containers}
                    >
                        <InputField
                            autoFocus={false}
                            className={classes.customInput}
                            label={'Cantidad'}
                            type="number"
                            name="cantidad"
                            inputProps={
                                {
                                    disabled: !canEdit,
                                    onChange: (event) => handleChangeQuantity(event),
                                    value: quantity
                                }
                            }
                        />
                    </Grid>
                ) : (
                    <></>
                )
            }
            <Grid
                item
                xs={12}
                sm={includeQuantity ? 12 : 6}
                md={includeQuantity ? 4 : 6}
                lg={includeQuantity ? 4 : 6}
                className={classes.containers}
            >
                <AutocompleteField
                    props={
                        {
                            options: lendingPresentationsList,
                            getOptionLabel: (option) => option && option.text ? option.text : ''
                        }
                    }
                    disabled={!canEdit}
                    value={lendingPresentationSelected}
                    setValueItem={(item) => handleChangeLendingsPresentations(item)}
                    label={lendingPresentationLabel}
                ></AutocompleteField>
            </Grid>
            <Grid
                item
                xs={10}
                sm={10}
                md={includeQuantity ? 4 : 8}
                lg={includeQuantity ? 4 : 8}
                className={classes.containers}
            >
                <InputField
                    autoFocus={false}
                    inputProps={
                        {
                            disabled: !canEdit,
                            onChange: (event) => handleChangeObservation(event),
                            value: observation
                        }
                    }
                    className={classes.customInput}
                    label={'Observaciones'}
                    type="text"
                    name="label"
                    multiline={true}
                    rows={1}
                    rowsMax={1}
                />
            </Grid>
            <Grid
                item
                xs={2}
                sm={2}
                md={4}
                lg={4}
                className={classes.buttonContainers}
            >
                <Button variant="contained" color="primary" onClick={addDataToList} disabled={!canEdit}>
                    Añadir
                </Button>
            </Grid>
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                className={classes.containers}
            >
                <div className={classes.listItems}>
                    <Grid container>
                        <Grid
                            item
                            xs={10}
                            sm={10}
                            md={10}
                            lg={10}
                            className={classes.containers}
                        >
                            {table({ showAction: true, showLending: true })}
                        </Grid>
                        {
                            !canEdit ? (
                                <Grid
                                    item
                                    xs={2}
                                    sm={2}
                                    md={2}
                                    lg={2}
                                    className={classes.print}
                                >
                                    <Button variant="outlined" onClick={handleOpen}>
                                        Imprimir
                                    </Button>
                                </Grid>
                            ) : (<></>)
                        }
                    </Grid>
                </div>
            </Grid>

            <PopupMessage
                open={popupMessage.open}
                type={popupMessage.type}
                title={popupMessage.title}
                description={popupMessage.description}
                btnLabel={popupMessage.btnLabel}
                onClose={handleClose}
                onConfirm={handlePrint}
                customContent={
                    <div className={classes.paper}>
                        <Grid container direction="row" justify="center" alignItems="center">
                            <div className={classes.iconContainer}>
                                <div className={classes.iconBackground}>
                                    <SvgIcon className={classes.infoIcon} component={InfoIcon} viewBox="0 0 488.9 488.9" />
                                </div>
                                <Button className={classes.btnClose} onClick={handleClose}>
                                    <SvgIcon className={classes.iconClose} component={CloseIcon} viewBox="0 0 365.696 365.696" />
                                </Button>
                            </div>
                            <div className={classes.content}>
                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        className={classes.containerLeft}
                                    >
                                        <img src={logo} alt="Logo Siellano" />
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        className={classes.containerRight}
                                    >
                                        {
                                            blobObject === null ? (
                                                <PDFDownloadLink document={<PdfDocument />} fileName={`${userObj.firstName}-${userObj.surname}.pdf`} onClick={handlePrint}>
                                                    {({ blob, url, loading, error }) => {
                                                        if (blob != null && blobObject === null) {
                                                            setBlobObject(blob)
                                                        }
                                                    }
                                                    }
                                                </PDFDownloadLink>
                                            ) : (
                                                <Button
                                                    variant="contained"
                                                    type="submit"
                                                    disableElevation
                                                    onClick={handlePrint}
                                                >
                                                    Imprimir
                                                </Button>
                                            )
                                        }

                                    </Grid>
                                </Grid>
                                <div className={classes.titleContainer}>
                                    <span><b>REMISIÓN {title}</b></span>
                                </div>
                                <div className={classes.container}>
                                    <span><b>DATOS DEL PACIENTE</b></span>
                                </div>
                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        className={classes.containers}
                                    >
                                        <span><b>No. Documento:</b> {profilerObj.nuip}</span>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        className={classes.containers}
                                    >
                                        <span><b>Teléfono:</b> {profilerObj.phoneNumber}</span>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        className={classes.containers}
                                    >
                                        <span><b>Nombre:</b> {`${userObj.firstName} ${userObj.surname}`}</span>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        className={classes.containers}
                                    >
                                        <span><b>Dirección:</b> {profilerObj.address}</span>
                                    </Grid>
                                </Grid>
                                <div className={classes.container}>
                                    <span><b>DETALLE DE LA REMISIÓN</b></span>
                                </div>
                                {table({ showAction: false, showLending: false })}
                                <div className={classes.container}>
                                    <span><b>PRESTADOR</b></span>
                                </div>
                                <Grid container>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        className={classes.containers}
                                    >
                                        <span><b>Nombre:</b> xxxxxxxx</span>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={6}
                                        lg={6}
                                        className={classes.containers}
                                    >
                                        <span><b>Dirección:</b> xxxxxxxx</span>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={12}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        className={classes.containers}
                                    >
                                        <span><b>Teléfono:</b> xxxxxxxx</span>
                                    </Grid>

                                    {title !== 'MEDICAMENTOS' && (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={12}
                                            md={12}
                                            lg={12}
                                            className={classes.containers}
                                        >
                                            <span><i><b>Nota:</b> Se imprimirá un formato media carta por cada prestador diferente en la tabla</i></span>
                                        </Grid>
                                    )}
                                </Grid>
                            </div>
                        </Grid>
                    </div>
                }
            />
        </>
    )
}
