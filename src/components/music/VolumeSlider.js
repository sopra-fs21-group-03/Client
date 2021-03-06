import React, { Component } from "react"
import {Slider, Handles } from "react-compound-slider"
import WhiteVolumeIcon from "./volume-control-white.png"
import styled from 'styled-components';
import SpotifyAuthWindow from "./SpotifyAuthWindow";

const ReglerContainer = styled.div `
`;

export function Handle({
    // your handle component
    handle: { id, value, percent },
    getHandleProps
}) {
    return (
        <div
            style={{
                left: `${percent}%`,
                position: "absolute",
                marginLeft: -15,
                marginTop: 7,
                width: 20,
                height: 20,
                border: 0,
                textAlign: "center",
                cursor: "pointer",
                borderRadius: "50%",
                backgroundColor: "#1DB954",
                color: "#fff"
            }}
            {...getHandleProps(id)}
        >
        </div>
    );
}

const sliderStyle = {
    // Give the slider some width
    position: "relative",
    width: "100%",
    height: 30,
    marginTop: 2,
    marginRight: 50,
    marginBottom: 5,
    marginLeft: 30
};

const railStyle = {
    position: "absolute",
    width: "100%",
    height: 2,
    marginTop: 15.5,
    backgroundColor: "#ffffff"
};

const domain = [1, 100];
const defaultValues = [1];

class VolumeSlider extends Component {

    constructor(props) {
        super(props);
        console.log("start of constructor", this.state);
    }
    state = {
        values: defaultValues.slice(),
        update: defaultValues.slice()
    };

    onUpdate = update => {
        this.setState({ update });
        let volume = update / 100;
        this.props.onChange(volume);
    };
    onChange = values => {
        let volume = values / 100;
        this.setState({ values }, () => {
            console.log(this.state.update);
        });
        this.props.onChange(volume);
        console.log(volume)
    };

    render() {
        const {
            state: { values, update }
        } = this;

        return (
                    <ReglerContainer>
                            <Slider
                                mode={2}
                                step={1}
                                domain={domain}
                                rootStyle={sliderStyle}
                                onUpdate={this.onUpdate}
                                onChange={this.onChange}
                                values={values}
                            >
                                <div style={railStyle} />
                                <Handles>
                                    {({ handles, getHandleProps }) => (
                                        <div className="slider-handles">
                                            {handles.map(handle => (
                                                <Handle
                                                    key={handle.id}
                                                    handle={handle}
                                                    domain={domain}
                                                    getHandleProps={getHandleProps}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </Handles>
                            </Slider>
                    </ReglerContainer>
        );
    }
}

export default VolumeSlider;