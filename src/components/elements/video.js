import react from "react";
import PropTypes from 'prop-types';
import classNames from "classnames";
import Image from "./Image";
import logoVideo from '../../assets/images/logo.png';

const propTypes = {
    url: PropTypes.string,
    label: PropTypes.string,
    thumbnail: PropTypes.string,
    name: PropTypes.string
}

const defaultProps = {
    url: '',
    label: '',
    thumbnail: '',
    name: ''
}

const Video = ({
    url,
    label,
    thumbnail,
    name,
    ...props
}) => {
    return (
        <>
            <video src={url}></video>
        </>
    )
}

Video.propTypes = propTypes;
Video.defaultProps = defaultProps;

export default Video;