import './Error.css';

function Error(props) {
  return (
    <div className="error">{props.children}</div>
  );
};

export default Error;
