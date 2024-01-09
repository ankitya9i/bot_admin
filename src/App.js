import React, { useState, useEffect } from 'react';
import axios from 'axios'

import {
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
} from '@mui/material';

import { MdDelete } from 'react-icons/md';
import { dark } from '@mui/material/styles/createPalette';



function App() {

  const [apiKey, setApiKey] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
   
    fetchApiKey();
    fetchUsers();

  }, []);

  const fetchApiKey = () => {
   
    axios.get('/admin/api-key')
      .then((response) => {

        setApiKey(response.data);

      })
      .catch((error) => {
        console.error('Error fetching API key:', error);
      });
  };

  const updateApiKey = () => {
    
    const newApiKey = prompt('Enter the new API key:');
    if (newApiKey) {
      axios.post('/admin/api-key', { key: newApiKey })
        .then((response) => {
          alert(response.data);
          fetchApiKey();
        })
        .catch((error) => {
          console.error('Error updating API key:', error);
        });
    }
  };

  const deleteUser = (chatId) => {
   
    axios.delete(`/users/${chatId}`)
      .then((response) => {
        alert(response.data.message);
        fetchUsers(); 
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const fetchUsers = () => {
   
    axios.get('/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  return (
    <Container maxWidth="md">

      <Typography variant="h4" color="secondary" gutterBottom>Weather Admin Dashboard</Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px',backgroundColor:'Gray' }}>
        <Typography variant="h5" gutterBottom>Manage API Key</Typography>
        <Typography variant="body1" gutterBottom>Current API Key: {apiKey}</Typography>
        <Button variant="contained" color="secondary" onClick={updateApiKey} style={{ marginTop: '10px' }}>
          Update API Key
        </Button>
      </Paper>

     
      <Paper elevation={3} style={{ padding: '20px',backgroundColor:'burlywood' }}>
        <Typography variant="h5" gutterBottom>Current Users</Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Chat ID</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {users.map((user) => (
                <TableRow key={user.chatId}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.chatId}</TableCell>
                  <TableCell>
                    <button aria-label="delete" onClick={() => deleteUser(user.chatId)}>
                      <MdDelete />
                    </button>
                  </TableCell>
                </TableRow>
              ))}

            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Typography variant="body2" style={{ marginTop: '20px' }}>
        You can find the bot at: <Link href="https://t.me/ankit006bot" target="_blank" rel="noopener noreferrer">telegram-link-to-bot</Link>
      </Typography>

    </Container>
  );
}

export default App;
