import * as React from "react";
import { SketchPicker } from 'react-color';

import {
  createStyles, Fab, Grid, Menu, TextField, Theme, Tooltip, withStyles
} from "@material-ui/core";

const styles = (theme: Theme) => createStyles({
  colorGrid: {
    width: 170,
  },
  colorButton: {
    backgroundColor: theme.palette.common.white,
    marginTop: 0,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
    boxShadow: 'none',
  },
  colorPickerButton: {
    backgroundColor: theme.palette.common.white,
    marginRight: theme.spacing(0.25),
    width: theme.spacing(2),
    height: theme.spacing(2),
    minHeight: theme.spacing(2),
    boxShadow: 'none',
  },
  colorField: {
    width: 100,
  },
});

const COLORS = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
                '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800', '#ff5722', '#795548', '#9e9e9e', '#607d8b',
                '#fff', '#000'];

class ColorPicker extends React.Component {
  readonly props: {
    classes: any,
    currentColor: string,
    sidebar?: boolean,
    onChangeColor(e: any): void,
  };

  readonly state = {
    pickerOpen: false,
    pickerAnchorEl: null as any,
  };

  render() {
    const classes = this.props.classes;

    return(
      <Grid container alignItems="center">
        <Grid item className={classes.colorGrid}>
          <Tooltip title="Pick Color">
            <Fab
              className={classes.colorButton}
              style={{backgroundColor: this.props.currentColor}}
              onClick={this.onToggleColorPicker.bind(this)}
              size="medium">
              <div/>
            </Fab>
          </Tooltip>
          <TextField
            className={classes.colorField}
            label="Color"
            value={this.props.currentColor}
            onChange={this.props.onChangeColor.bind(this)}/>
          <Menu
            id="color-picker"
            elevation={1}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            getContentAnchorEl={null}
            anchorEl={this.state.pickerAnchorEl}
            keepMounted
            open={this.state.pickerOpen}
            onClose={this.onToggleColorPicker.bind(this)}>
            <SketchPicker
              color={this.props.currentColor}
              disableAlpha={false}
              presetColors={[]}
              onChange={this.onChangeColor.bind(this)}/>
          </Menu>
        </Grid>
        <Grid item xs={12} sm={this.props.sidebar ? 12 : true}>
          <Grid container alignItems="center">
            {COLORS.map((c) =>
              <Grid key={c} item>
                <Fab
                  className={classes.colorPickerButton}
                  style={{backgroundColor: c}}
                  value={c}
                  onClick={this.props.onChangeColor.bind(this)}
                  size="small">
                  <div/>
                </Fab>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }

  onToggleColorPicker(e: MouseEvent) {
    this.setState({pickerOpen: !this.state.pickerOpen, pickerAnchorEl: this.state.pickerOpen ? null : e.currentTarget});
  }

  onChangeColor(color: any) {
    this.props.onChangeColor({target: {value: color.hex}});
  }
}

export default withStyles(styles)(ColorPicker as any);