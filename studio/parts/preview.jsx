import React from 'react';
import PropTypes from 'prop-types';

class Preview extends React.PureComponent {
  static propTypes = {
    document: PropTypes.object,
  };

  static defaultProps = {
    document: null,
  };

  render() {
    const { options } = this.props;
    const { displayed } = this.props.document;

    if (!displayed) {
      return (
        <div>
          <p style={{ padding: '1em' }}>There is no document to preview</p>
        </div>
      );
    }

    const url = displayed.slug?.current ? `${options.url}${displayed.slug.current}` : options.url;

    if (!url) {
      return (
        <div>
          <p style={{ padding: '1em' }}>Error constructing the web front-end URL.</p>
        </div>
      );
    }

    return (
      <div>
        <div>
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              border: 0,
            }}
            src={url}
            frameBorder="0"
            allow="autoplay"
          />
        </div>
      </div>
    );
  }
}

export default Preview;
