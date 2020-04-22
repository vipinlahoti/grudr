import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Row extends Component {

  static propTypes = {
    label: PropTypes.node,
    rowClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ]),
    labelClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ]),
    elementWrapperClassName: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ]),
    required: PropTypes.bool,
    hasErrors: PropTypes.bool,
    fakeLabel: PropTypes.bool,
    layout: PropTypes.oneOf(['horizontal', 'vertical', 'elementOnly']),
    htmlFor: PropTypes.string
  }

  static defaultProps = {
    label: '',
    rowClassName: '',
    labelClassName: '',
    elementWrapperClassName: '',
    required: false,
    hasErrors: false,
    fakeLabel: false
  }

  renderLabel() {
    if (this.props.layout === 'elementOnly') {
      return '';
    }

    let labelClassNames = [];
    labelClassNames.push('control-label');

    if (this.props.layout === 'horizontal') {
      labelClassNames.push('col-sm-3');
    }

    labelClassNames.push(this.props.labelClassName);

    if (this.props.fakeLabel) {
      return (
        <div className={classNames(labelClassNames)}>
          <strong>
            {this.props.label}
            {this.props.required ? ' *' : null}
          </strong>
        </div>
      )
    }
    
    return (
      <label className={classNames(labelClassNames)} htmlFor={this.props.htmlFor}>
        {this.props.label}
        {this.props.required ? ' *' : null}
      </label>
    )
  }

  render() {
    if (this.props.layout === 'elementOnly') {
      return (
        <span>{this.props.children}</span>
      )
    }

    let cssClasses = {
      row: ['form-group'],
      elementWrapper: []
    };

    if (this.props.hasErrors) {
      cssClasses.row.push('has-error');
      cssClasses.row.push('has-feedback');
    }

    let element = this.props.children;

    if (this.props.layout === 'horizontal') {
      // Horizontal layout needs a 'row' class for Bootstrap 4
      cssClasses.row.push('row');

      cssClasses.elementWrapper.push('col-sm-9');
      cssClasses.elementWrapper.push(this.props.elementWrapperClassName);

      element = (
        <div className={classNames(cssClasses.elementWrapper)}>
          {this.props.children}
        </div>
      )
    }

    cssClasses.row.push(this.props.rowClassName);
    return (
      <div className={classNames(cssClasses.row)}>
        {this.renderLabel()}
        {element}
      </div>
    )
  }

}

export default Row;
