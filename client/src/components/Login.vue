<!-- This template serves as our login handler. There is
  a form to capture user login information and a post request
  which is ran on submit that sends it to the server where
  the user is validated and authenticated. Once that happens
  it will return a user session so the client can recognize
  the user as logged in. -->
<template>
  <div id="login">
    <form action method="get" class="form-example">
      <div class="form-example">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div class="form-example">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required />
      </div>
      <div class="form-example">
        <input type="submit" value="Submit" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
  methods: {
    sendLogin() {
      fetch("http://localhost:3001/all", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }, /* body */)
        .then(response => response.json())
    }
  }
};
</script>

<style>
form {
  text-align: center;
  margin: 0 auto;
}
form.form-example {
  display: table;
}

div.form-example {
  display: table-row;
}

label,
input {
  display: table-cell;
  margin-bottom: 10px;
}

label {
  padding-right: 10px;
}
</style>
