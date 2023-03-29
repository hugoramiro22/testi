import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { 
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    IconButton
} from '@material-ui/core';
import {
    Edit as EditIcon,
    DeleteOutline as DeleteOutlineIcon
} from "@material-ui/icons";

import TableRowSkeleton from "../../components/TableRowSkeleton";

import { makeStyles } from "@material-ui/core/styles";

import { i18n } from "../../translate/i18n";

const useStyles = makeStyles(theme => ({
    tableHeader : {
		backgroundColor : "#1cb14e",
		"& > tr > th": {
			color : "white"
		}
	},
	firstHeader : {
		borderTopLeftRadius : "100px",
		borderRight : "solid 3px",
        width : "10%"
	},
	commonHeader : {
		borderRight : "solid 3px",
        width : "80%"
	},
	lastHeader : {
		borderTopRightRadius : "100px",
		borderLeft : "solid 3px",
	},
	bottomCell : {
		borderBottomRightRadius : "100px",
		borderBottomLeftRadius : "100px",
		color : "white",
		borderBottom : "none",
		backgroundColor : "#1cb14e"
	}
}));

function QuickMessagesTable(props) {
    const { messages, showLoading, editMessage, deleteMessage, readOnly } = props
    const [loading, setLoading] = useState(true)
    const [rows, setRows] = useState([])

    const classes = useStyles();

    useEffect(() => {
        if (Array.isArray(messages)) {
            setRows(messages)
        }
        if (showLoading !== undefined) {
            setLoading(showLoading)    
        }
    }, [messages, showLoading])

    const handleEdit = (message) => {
        editMessage(message)
    }

    const handleDelete = (message) => {
        deleteMessage(message)
    }

    const renderRows = () => {
        return rows.map((message) => {
            return (
                <TableRow key={message.id}>
                    <TableCell align="center">{message.shortcode}</TableCell>
                    <TableCell align="left">{message.message}</TableCell>
                    { !readOnly ? (
                        <TableCell align="center">
                            <IconButton
                                size="small"
                                onClick={() => handleEdit(message)}
                            >
                                <EditIcon />
                            </IconButton>

                            <IconButton
                                size="small"
                                onClick={() => handleDelete(message)}
                            >
                                <DeleteOutlineIcon />
                            </IconButton>
                        </TableCell>
                    ) : null}
                </TableRow>
            )
        })
    }

    return (
        <Table size="small">
            <TableHead className={classes.tableHeader}>
                <TableRow>
                    <TableCell className={classes.firstHeader} align="center">{i18n.t("quickAnswerTable.table.shortcut")}</TableCell>
                    { !readOnly ? (
                        <>
                            <TableCell className={classes.commonHeader} align="center">{i18n.t("quickAnswerTable.table.message")}</TableCell>
                            <TableCell className={classes.lastHeader} align="center">{i18n.t("quickAnswerTable.table.action")}</TableCell>
                        </>
                    ) : <TableCell className={classes.lastHeader} align="left">{i18n.t("quickAnswerTable.table.message")}</TableCell>}
                </TableRow>
            </TableHead>
            <TableBody>
                {loading ? <TableRowSkeleton columns={readOnly ? 2 : 3} /> : renderRows()}
                <TableRow>
                    <TableCell className={classes.bottomCell} align = "center" colSpan={readOnly ? 2 : 3}>{i18n.t("quickAnswerTable.table.bottom")}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}

QuickMessagesTable.propTypes = {
    messages: PropTypes.array.isRequired,
    showLoading: PropTypes.bool,
    editMessage: PropTypes.func.isRequired,
    deleteMessage: PropTypes.func.isRequired
}

export default QuickMessagesTable;