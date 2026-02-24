import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Form, Button, Stack } from 'react-bootstrap';

const ADD_USER = gql`
  mutation AddUser($name: String!, $role: String!) {
    addUser(name: $name, role: $role) {
      id
      name
      role
    }
  }
`;

const AddUserForm = ({ onUserAdded }) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [addUser, { loading }] = useMutation(ADD_USER);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name.trim() || !role.trim()) return;

    await addUser({
      variables: {
        name: name.trim(),
        role: role.trim()
      }
    });

    setName('');
    setRole('');
    onUserAdded();
  };

  return (
    <section>
      <h2 className="section-title">Add Team Member</h2>
      <Form onSubmit={handleSubmit}>
        <Stack gap={3}>
          <Form.Group controlId="nameInput">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter full name"
              onChange={(event) => setName(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="roleInput">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              value={role}
              placeholder="Enter role"
              onChange={(event) => setRole(event.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Saving...' : 'Add User'}
          </Button>
        </Stack>
      </Form>
    </section>
  );
};

export default AddUserForm;