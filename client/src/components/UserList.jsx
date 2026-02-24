import { ListGroup, Badge } from 'react-bootstrap';

const UserList = ({ users }) => {
  return (
    <section>
      <h2 className="section-title">Team Directory</h2>
      {users.length === 0 ? (
        <p className="mb-0">No users yet. Add one from the form.</p>
      ) : (
        <ListGroup variant="flush">
          {users.map((user) => (
            <ListGroup.Item key={user.id} className="list-item-row">
              <span>{user.name}</span>
              <Badge bg="secondary">{user.role}</Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </section>
  );
};

export default UserList;