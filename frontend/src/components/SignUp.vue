<template>
  <div class="signup-container">
    <h2>Sign Up</h2>
    <input type="text" v-model="username" placeholder="Username">
    <input type="password" v-model="password" placeholder="Password">
    <button @click="signUp">Sign Up</button>
    <p v-if="error" class="error-message">{{ error }}</p>
    <p>
      Already have an account?
      <router-link to="/login">Log in</router-link>
    </p>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();

    const signUp = async () => {
      try {
        const response = await axios.post('http://localhost:4000/api/users/register', {
          username: username.value,
          password: password.value
        });

        if (response.status === 201) {
          router.push('/login');
        } else {
          error.value = 'Registration failed';
        }
      } catch (err) {
        console.error(err);
        error.value = err.response?.data?.message || 'Registration failed';
      }
    };

    return { username, password, error, signUp };
  }
};
</script>

<style scoped>
.signup-container {
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  text-align: center;
}

.signup-container input {
  margin: 10px 0;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.signup-container button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
}

.error-message {
  color: red;
}

.signup-container a {
  color: blue;
  text-decoration: none;
}

.signup-container a:hover {
  text-decoration: underline;
}
</style>