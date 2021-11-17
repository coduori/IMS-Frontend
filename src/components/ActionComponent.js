function ActionComponent(props) {

    return (
        <div className="row">
            <div className="col">
                <label>{props.action_label}</label>
                <textarea type="text" className={`form-control ${props.action_class}` } placeholder="Enter incident action here"/>
            </div>
        </div>
    );
}

export default ActionComponent;