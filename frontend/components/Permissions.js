import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import PropTypes from "prop-types";

import Error from './ErrorMessage';
import Table from './styles/Table';
import SickButton from './styles/SickButton';

const POSSIBLE_PERMISSIONS = [
    'ADMIN',
    'USER',
    'ITEMCREATE',
    'ITEMUPDATE',
    'ITEMDELETE',
    'PERMISSIONUPDATE',
];

const ALL_USERS_QUERY = gql`
    query {
        users {
            id
            name
            email
            permissions
        }
    }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
    mutation updatePermissions($permissions: [Permission], $userId: ID!) {
        updatePermissions(permissions: $permissions, userId: $userId) {
            id
            permissions
            name
            email
        } 
    }
`;

const Permissions = props => (
    <Query query={ALL_USERS_QUERY}>
        {({ data, loading, error }) => (
            <div>
                <Error error={error}/>
                <div>
                    <h2>Manage Permissions</h2>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                {POSSIBLE_PERMISSIONS.map((permission, i) => <th key={i}>{permission}</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map((user, i) => <UserPermission user={user} key={i} />)}
                        </tbody>
                    </Table>
                </div>
            </div>
        )}
    </Query>
);

class UserPermission extends React.Component {
    state = {
        permissions: this.props.user.permissions
    };

    render() {
        const user = this.props.user;
        return (
        <Mutation mutation={UPDATE_PERMISSIONS_MUTATION} variables={{permissions: this.state.permissions, userId: this.props.user.id}}>
            {(updatePermissions, { loading, error }) => (
                <>
                    {error && 
                        <tr>
                            <td>
                                <Error error={error}/>
                            </td>
                        </tr>
                    }

                    <tr>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        {POSSIBLE_PERMISSIONS.map((permission, i) => (
                            <td key={i}>
                                <label htmlFor={`${user.id}-permission-${permission}`}>
                                    <input type="checkbox" id={`${user.id}-permission-${permission}`} checked={this.state.permissions.includes(permission)} value={permission} onChange={this.handlePermissionChange}/>
                                </label>
                            </td>
                        ))}
                        <td>
                            <SickButton
                                type="button"
                                disabled={loading}
                                onClick={updatePermissions}
                            >
                                Updat{loading ? 'ing' : 'e'}
                            </SickButton>
                        </td>
                    </tr>
                </>
            )}
        </Mutation>
        );
    }

    handlePermissionChange = e => {
        const checkbox = e.target;
        const value = checkbox.value;
        let updatedPermissions = [...this.state.permissions];
        
        if(checkbox.checked) {
            updatedPermissions.push(value);
        } else {
            updatedPermissions = updatedPermissions.filter(permission => permission !== value);
        }

        this.setState({ permissions: updatedPermissions });
    }

    static propTypes = {
        user: PropTypes.shape({
            name: PropTypes.string,
            email: PropTypes.string,
            id: PropTypes.string,
            permissions: PropTypes.array
        }).isRequired
    };
}

export default Permissions;