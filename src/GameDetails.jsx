import React from 'react';
import { withStyles } from "@material-ui/core/styles";
import GameDetailsStyle from './GameDetailsStyle';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import Icon from '@material-ui/core/Icon';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class GameDetails extends React.Component{
    render(){
        const { classes, handleRowSelection, renderedData } = this.props;
        return (
            <div>
                <div className={classes.header}>
                        <h1 className={classes.headingStyling}>Specific Game Details</h1>
                        <Button variant="contained" color="primary" onClick={handleRowSelection} className={classes.buttonWidth}>
                            Back
                            <Icon>send</Icon>
                        </Button>
                </div>
                <div>
                    <Paper className={classes.infoPaperStyle}>
                        <Table className={classes.infoTableStyle}>
                            <TableBody >
                                <TableRow>
                                    <TableCell  className={classes.headingTextStyle} align="center">Rank</TableCell>
                                    <TableCell align="center">{renderedData.Rank}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell  className={classes.headingTextStyle} align="center">Global_Sales</TableCell>
                                    <TableCell align="center">{renderedData.Global_Sales}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell  className={classes.headingTextStyle} align="center">Rank</TableCell>
                                    <TableCell align="center">{renderedData.Name}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell  className={classes.headingTextStyle} align="center">Platform</TableCell>
                                    <TableCell align="center">{renderedData.Platform}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.headingTextStyle} align="center">Rank</TableCell>
                                    <TableCell align="center">Global_Sales</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.headingTextStyle} align="center">Publisher</TableCell>
                                    <TableCell align="center">{renderedData.Publisher}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className={classes.headingTextStyle} align="center">Year</TableCell>
                                    <TableCell align="center">{renderedData.Year}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default withStyles(GameDetailsStyle)(GameDetails);
