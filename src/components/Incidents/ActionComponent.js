function ActionComponent(props) {

    return (
        <div className="row">
            <div className="col">
                <label className="mt-2">{props.action_label}</label>
                <textarea type="text" className={`form-control ${props.action_class}` }
                    placeholder="Enter incident action here"
                    defaultValue={props.action.description}
                    readOnly={ props.readonly || false }/>
            </div>
        </div>
    );
}

export default ActionComponent;