<template>
  <div class="login-container">
    <h2>Login</h2>
    <input type="text" v-model="username" placeholder="Username">
    <input type="password" v-model="password" placeholder="Password">
    <button @click="login">Login</button>
    <p v-if="error" class="error-message">{{ error }}</p>
    <p>
      Don't have an account?
      <router-link to="/signup">Sign up</router-link>
    </p>
  </div>
</template>

<script>
import {ref} from 'vue';
import {useStore} from 'vuex';
import axios from 'axios';
import {useRouter} from 'vue-router';

export default {
  setup() {
    const username = ref('');
    const password = ref('');
    const error = ref('');
    const store = useStore();
    const router = useRouter();

    const login = async () => {
      try {
        const response = await axios.post('http://localhost:4000/api/users/login', {
          username: username.value,
          password: password.value
        });

        const token = response.data.token;
        store.dispatch('login', token);
        router.push('/');
      } catch (e) {
        error.value = 'Invalid credentials';
      }
    };

    return {username, password, error, login};
  }
};
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  text-align: center;
}

.login-container input {
  margin: 10px 0;
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
}

.login-container button {
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

.login-container a {
  color: blue;
  text-decoration: none;
}

.login-container a:hover {
  text-decoration: underline;
}
</style>