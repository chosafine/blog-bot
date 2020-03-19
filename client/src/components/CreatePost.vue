<template>
  <div id="create-post">
    <form action="" method="get" class="form-example">
      <div class="form-example">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required/>
      </div>
      <div class="form-example">
        <label for="body">Body:</label>
        <textarea type="text" id="body" name="body" rows="25" cols="30" required/>
      </div>
      <div class="form-example">
        <input type="submit" value="Post">
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
  color: #2c3e50;
  margin: 0 auto;
}
form.form-example {
    display: table;
}

div.form-example {
    display: table-row;
}

label, input, textarea {
    display: table-cell;
    margin-bottom: 10px;
}

label {
    padding-right: 10px;
}
</style>
