import react from "react";
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { VscTriangleDown } from 'react-icons/vsc';
import { Link } from "react-router-dom";

const propTypes = {
    children: PropTypes.array,
    name: PropTypes.string,
    status: PropTypes.string,
    disabled: PropTypes.bool,
    placeholder: PropTypes.string,
    className: PropTypes.string
}

const defaultProps = {
    children: null,
    name: '',
    status: '',
    disabled: false,
    placeholder: '',
    className: ''
}

const DropDown = ({
    children,
    name,
    status,
    disabled,
    placeholder,
    className,
    ...props
}) => {
    const classes = classNames(
        'dropdown',
        status && `dropdown-${status}`,
        className
    );

    return (
        <>
            <ul {...props} className={classes}>
                {children && children.map((item, index) => { return item.dropdown ?
                    (
                        <li key={index} className="dropdown-item dropdown-item--mega">
                            <span>{item.name} <VscTriangleDown style={{display: 'inline-block'}} className="dropdown-icon-mega"/></span>
                            <DropDown children={item.dropdown} className="dropdown-mega"/>
                        </li>
                    ):
                    (
                        <li key={index} className="dropdown-item"><Link to={item.href}>{item.name}</Link></li>
                    )
                })}
            </ul>
        </>
    )
}

DropDown.prototype = propTypes;
DropDown.defaultProps = defaultProps;

export default DropDown;