import {Link} from 'react-router-dom'

function IncidentTableRow (props) {

    const incident = props.incident;
    const number = props.num + 1;
    const incident_date = new Date(incident.incident_date).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})
    console.log(incident)
    return (
        <tr>
            <th scope="row">{number}</th>
            <td> {incident.incident_description} </td>
            <td> {incident.recorded_by} </td>
            <td> {incident.branch_id} </td>
            <td> {incident.incident_type} </td>
            <td> {incident.reported_by} </td>
            <td> {incident_date} </td>
            <td> {incident.incident_status} </td>
            <td style={{whiteSpace: 'nowrap'}}>
                <Link to="/edit-incident">
                    <button type="button" className="btn btn-xs btn-primary ">Edit</button>
                </Link>
                <button type="button" className="ml-3 btn btn-xs btn-danger" data-bs-toggle="modal" data-bs-target="#delete_modal">Delete</button>
            </td>
        </tr>
    );
}

export default IncidentTableRow;