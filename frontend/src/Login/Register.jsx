import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', formData);
      toast.success(response.data.message, {
        autoClose: 3000,
      });
    } catch (error) {
      toast.error(error.response?.data.message || 'Error registering', {
        autoClose: 3000,
      });
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className={styles.input}
        />
        <div className={styles.buttonContainer}>
          <button type="submit" className={`${styles.button} ${styles.registerButton}`}>
            Register
          </button>
          <button type="button" onClick={handleLoginRedirect} className={`${styles.button} ${styles.registerButton}`}>
            Back
          </button>
        </div>
      </form>
      {/* Toast Container */}
      <ToastContainer position="top-right" />
    </div>
  );
};

export default Register;