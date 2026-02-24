import { gql, useQuery } from '@apollo/client';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import AppHeader from './components/AppHeader';
import AddUserForm from './components/AddUserForm';
import UserList from './components/UserList';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      role
    }
  }
`;

const App = () => {
  const { data, loading, error, refetch } = useQuery(GET_USERS);  
};

export default App;