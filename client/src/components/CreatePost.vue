<!-- This template serves as our page a user will use
  to create a post. It has a basic form with text entry
  for the title and body and a submit button. It sends
  a post request to the server to create the post.
  TBA: validation so this page can only be hit when
  a user is actually logged in. -->
<template>
  <div id="create-post">
    <form action method="get" class="form-example">
      <div class="form-example">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required />
      </div>
      <div class="form-example">
        <label for="body">Body:</label>
        <textarea type="text" id="body" name="body" rows="25" cols="30" required />
      </div>
      <div class="form-example">
        <input type="submit" value="Post" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "CreatePost"
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
input,
textarea {
  display: table-cell;
  margin-bottom: 10px;
}

label {
  padding-right: 10px;
}
</style>
